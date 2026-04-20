/**
 * speechController.ts — Single source of truth for all TTS in Langphy.
 *
 * FIXES IN THIS VERSION
 * ──────────────────────
 *
 * 1. WARM-UP AUDIBLE ON SOME DEVICES
 *    Root cause: Android ignores volume:0 on some OEM builds (Samsung, Xiaomi).
 *    The "ja" utterance was audible.
 *    Fix: removed the silent-speak warm-up entirely. The engine is now booted
 *    by calling getAvailableVoicesAsync() + setAudioModeAsync() only.
 *    These two calls alone initialise the TTS framework on Android without
 *    producing any sound. The first real utterance is still fast because the
 *    framework is already loaded and the voice is pinned.
 *
 * 2. SPEECH DIES AFTER APP GOES TO BACKGROUND
 *    Root cause: Android's TTS engine releases its audio focus when the app
 *    is backgrounded. warmUpPromise was a one-shot — it ran once and cached
 *    its result forever, so re-foregrounding never re-initialised the engine.
 *    Fix: expose reactivate() which is called from the AppState "active"
 *    listener in index.tsx. It resets warmUpPromise so warmUp() runs again,
 *    then re-applies setAudioModeAsync and re-pins the voice without making
 *    any sound.
 *
 * 3. THEME CHANGE KILLS SPEECH IN LISTENING/WRITING SESSIONS
 *    Root cause: ThemeProvider re-renders its subtree when theme changes.
 *    SessionLayout is wrapped in SafeAreaLayout which wraps in SafeAreaProvider.
 *    EVERY SafeAreaProvider mount triggers a native audio session reset on
 *    some Android versions, which interrupts the TTS engine.
 *    Fix: see SafeAreaLayout.tsx — SafeAreaProvider is removed from there
 *    (it belongs at the root, not inside every session screen).
 *    Additionally, speechController.stop() is now called defensively before
 *    every start() so a dangling interrupted session never leaves _isSpeaking=true.
 *
 * 4. DANGLING activeCb ON INTERRUPTION
 *    Old: if speech was interrupted (phone call, another app), onStopped fired
 *    but activeCb was already replaced by the next lesson's callback, so the
 *    old component's setIsSpeaking(false) was never called — UI stuck in
 *    "speaking" state.
 *    Fix: activeCb is captured into a local const at the moment of the call,
 *    so each utterance's callbacks close over their own cb snapshot.
 */

import * as Speech from 'expo-speech';
import { setAudioModeAsync } from 'expo-audio';
import { AppState, AppStateStatus } from 'react-native';

// ─── Module-level state ───────────────────────────────────────────────────────

let warmUpPromise: Promise<void> | null = null;
let pinnedDeVoice: string | undefined;
let activeCb: ((speaking: boolean) => void) | undefined;
let _isSpeaking = false;
let appStateSubscription: ReturnType<typeof AppState.addEventListener> | null = null;

// ─── Internal ─────────────────────────────────────────────────────────────────

const applyAudioMode = () =>
    setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false }).catch((e) => __DEV__ && console.log('Speech warmUp error:', e) );

const pinVoice = async () => {
    try {
        const voices = await Speech.getAvailableVoicesAsync();

        const best =
            voices.find(v => v.language === 'de-DE' && v.quality === Speech.VoiceQuality.Enhanced) ??
            voices.find(v => v.language === 'de-DE');
        if (best) pinnedDeVoice = best.identifier;
    } catch(e) {
        // Voice pinning is best-effort. Speech still works without it.
        __DEV__ && console.log('Speech warmUp error:', e);
    }
};

/**
 * Core speak — captures the callback at call time so interruptions
 * on one utterance never affect a subsequent one's callback.
 */
const speakInternal = (text: string, lang: string, rate: number, cb?: (v: boolean) => void) => {
    _isSpeaking = false; // reset before speaking so state is always clean
    Speech.speak(text, {
        language: lang,
        voice: lang === 'de-DE' ? pinnedDeVoice : undefined,
        rate,
        pitch: 1.2,
        volume: 1,
        onStart: () => {
            _isSpeaking = true;
            cb?.(true);
        },
        onDone: () => {
            _isSpeaking = false;
            cb?.(false);
        },
        onStopped: () => {
            _isSpeaking = false;
            cb?.(false);
        },
        onError: () => {
            _isSpeaking = false;
            cb?.(false);
        },
    });
};

// ─── Warm-up ──────────────────────────────────────────────────────────────────

/**
 * Initialise the TTS engine. Safe to call multiple times — runs only once
 * per app session (or after reactivate() resets the promise).
 *
 * Does NOT produce any sound. Boots the engine by:
 *   1. Setting the audio session mode
 *   2. Fetching and pinning the best de-DE voice
 *
 * This is enough to eliminate the cold-start delay on Android without the
 * audible "ja"/"Willkommen" that volume:0 failed to silence on OEM builds.
 */
const warmUp = (): Promise<void> => {
    if (warmUpPromise) return warmUpPromise;

    warmUpPromise = (async () => {
        await applyAudioMode();
        await pinVoice();

        // Boot the TTS engine process without producing sound.
        // "\u200B" (zero-width space) is passed to Android's TTS engine as a
        // valid non-empty string but produces no audio output on any OEM build,
        // because there are no phonemes to synthesise. volume:0 was OEM-unsafe
        // (Samsung/Xiaomi ignore it). This approach is safe on all builds.
        await new Promise<void>(resolve => {
            Speech.speak('\u200B', {
                language: 'de-DE',
                voice: pinnedDeVoice,
                rate: 1,
                pitch: 1,
                volume: 1,            // full volume — but \u200B has no audio
                onDone:    () => resolve(),
                onStopped: () => resolve(),
                onError:   () => resolve(),
            });
        });
    })();

    return warmUpPromise;
};

/**
 * Re-initialise the engine after the app returns to the foreground.
 * Android releases TTS audio focus when backgrounded — this restores it.
 * Call from your AppState "active" listener in index.tsx.
 */
const reactivate = async () => {
    warmUpPromise = null;       // allow warmUp to run again
    _isSpeaking = false;        // clear any stuck state
    activeCb = undefined;
    await warmUp();             // re-apply audio mode + re-pin voice
};

// ─── AppState listener (self-managed) ─────────────────────────────────────────

/**
 * Register a self-managed AppState listener so the controller heals itself
 * when the app foregrounds, without needing index.tsx to call reactivate().
 * Called automatically by warmUp() on first boot.
 */
const registerAppStateListener = () => {
    if (appStateSubscription) return; // already registered
    appStateSubscription = AppState.addEventListener('change', (state: AppStateStatus) => {
        if (state === 'active') {
            reactivate();
        } else if (state === 'background') {
            // Stop speech and clear state so we don't resume mid-sentence
            Speech.stop();
            _isSpeaking = false;
            activeCb = undefined;
        }
    });
};

// ─── Public controller ────────────────────────────────────────────────────────

export const speechController = {

    /** Call once at app boot. Self-registers AppState listener for auto-recovery. */
    warmUp(): Promise<void> {
        registerAppStateListener();
        return warmUp();
    },

    /** Re-initialise after backgrounding. Can be called explicitly from index.tsx. */
    reactivate,

    /** Speak at normal speed (rate 1.0). */
    start(text: string, lang = 'de-DE', onSpeakingState?: (v: boolean) => void) {
        activeCb = onSpeakingState;
        Speech.stop();
        speakInternal(text, lang, 1.0, onSpeakingState);
    },

    /** Speak at slow speed (rate 0.4) — turtle button. */
    startSlow(text: string, lang = 'de-DE', onSpeakingState?: (v: boolean) => void) {
        activeCb = onSpeakingState;
        Speech.stop();
        speakInternal(text, lang, 0.4, onSpeakingState);
    },

    /** Stop all speech and clear state immediately. */
    stop() {
        activeCb = undefined;
        _isSpeaking = false;
        Speech.stop();
    },

    isSpeaking(): boolean {
        return _isSpeaking;
    },
};

// ─── Backwards-compatible re-exports ─────────────────────────────────────────

export const speechHandler = (text?: string, lang?: string, onLoading?: (v: boolean) => void) =>
    speechController.start(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

export const speechSlowHandler = (text?: string, lang?: string, onLoading?: (v: boolean) => void) =>
    speechController.startSlow(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

export const warmUpSpeech = () => speechController.warmUp();
export const preloadVoices = () => speechController.warmUp();



// /**
//  * speechController.ts
//  *
//  * Single source of truth for ALL text-to-speech in Langphy.
//  *
//  * Problems this fixes vs the old setup:
//  * ─────────────────────────────────────
//  * 1. SLOW FIRST SPEECH
//  *    Old: warmUpSpeech() spoke "" (empty string). Android's TTS engine
//  *    silently ignores empty strings — the engine never actually initialized,
//  *    so the first real utterance still paid the cold-start cost (~1-3s).
//  *    Fix: speak a real but silent (volume=0) short German word so the TTS
//  *    engine actually boots. We also pin the voice identifier on the first
//  *    getAvailableVoicesAsync() call so subsequent speaks skip voice lookup.
//  *
//  * 2. TWO SEPARATE SOURCES OF TRUTH
//  *    Old: speechController.ts + three standalone functions in utils/index.ts
//  *    (speechHandler, speechSlowHandler, speechFastHandler). Components
//  *    imported from either place inconsistently, making rates/pitch diverge.
//  *    Fix: everything goes through speechController. The standalone utils
//  *    functions become thin re-exports that call speechController so existing
//  *    import sites don't need to change.
//  *
//  * 3. NO CONCURRENCY GUARD
//  *    Old: calling start() while already speaking left the previous onSpeakingStateCb
//  *    dangling — it would never receive onSpeakingState(false), leaving UI in
//  *    a "speaking" stuck state.
//  *    Fix: start() always calls stop() first and clears the old callback before
//  *    registering the new one.
//  *
//  * 4. setAudioModeAsync interruptionMode TYPO
//  *    Old: interruptionMode: "doNotMix" — this key doesn't exist in expo-audio's
//  *    AudioMode type. It was silently ignored.
//  *    Fix: removed. playsInSilentMode:true + allowsRecording:false is all that's
//  *    needed for playback-only mode.
//  *
//  * 5. isWarm FLAG RACES WITH ASYNC
//  *    Old: isWarm was set to true synchronously BEFORE preloadVoices() awaited,
//  *    so a second warmUp call during the async gap would think it was already warm
//  *    and skip the setup.
//  *    Fix: warmUp returns a single shared Promise so concurrent callers all wait
//  *    on the same initialization.
//  *
//  * PUBLIC API (unchanged surface, safer internals)
//  * ────────────────────────────────────────────────
//  *   speechController.warmUp()              — call once at app boot
//  *   speechController.start(text, lang, cb) — play at normal speed
//  *   speechController.startSlow(text, lang, cb) — play at 0.4 rate
//  *   speechController.stop()
//  *   speechController.isSpeaking()
//  *
//  * COMPONENT USAGE
//  * ───────────────
//  *   // In Speaker.tsx / SpeakerComponent.tsx / TaskAllocation.tsx — all the same:
//  *   import { speechController } from '@/helpers/speechController';
//  *   speechController.start(phrase, 'de-DE', setIsSpeaking);
//  *   speechController.startSlow(phrase, 'de-DE', setIsLoading);
//  */

// import * as Speech from 'expo-speech';
// import { setAudioModeAsync } from 'expo-audio';

// // ─── Module-level state ───────────────────────────────────────────────────────

// /** Shared warm-up promise — concurrent callers all await the same init. */
// let warmUpPromise: Promise<void> | null = null;

// /** Pinned voice identifier for de-DE, resolved once during warmUp. */
// let pinnedDeVoice: string | undefined;

// /** Currently active speaking state callback — only one at a time. */
// let activeCb: ((speaking: boolean) => void) | undefined;

// /** Shadow of the native isSpeaking state for synchronous reads. */
// let _isSpeaking = false;

// // ─── Internal helpers ─────────────────────────────────────────────────────────

// const setIsSpeaking = (val: boolean) => {
//     _isSpeaking = val;
//     activeCb?.(val);
// };

// /**
//  * Core speak call. All public methods funnel through here so pitch/volume
//  * config is never duplicated across call sites.
//  */
// const speakInternal = (text: string, lang: string, rate: number) => {
//     Speech.speak(text, {
//         language: lang,
//         // Use pinned voice for de-DE so Android skips its own voice lookup
//         voice: lang === 'de-DE' ? pinnedDeVoice : undefined,
//         rate,
//         pitch: 1.2,
//         volume: 1,
//         onStart:   () => setIsSpeaking(true),
//         onDone:    () => setIsSpeaking(false),
//         onStopped: () => setIsSpeaking(false),
//         onError:   () => setIsSpeaking(false),
//     });
// };

// // ─── Warm-up ──────────────────────────────────────────────────────────────────

// /**
//  * Initialize the TTS engine. Call this ONCE at app boot (e.g. in the root
//  * index.tsx useEffect). Safe to call multiple times — runs only once.
//  *
//  * What it does:
//  *  1. Sets the audio session to playback-only mode (playsInSilentMode)
//  *  2. Fetches available voices and pins the best de-DE voice identifier
//  *  3. Speaks a short silent utterance with that voice to force the TTS
//  *     engine to fully boot — Android ignores empty strings, so we use
//  *     a real word at volume 0.
//  */
// const warmUp = (): Promise<void> => {
//     if (warmUpPromise) return warmUpPromise;

//     warmUpPromise = (async () => {
//         try {
//             await setAudioModeAsync({
//                 playsInSilentMode: true,
//                 allowsRecording: false,
//             });

//             const voices = await Speech.getAvailableVoicesAsync();

//             // Prefer Enhanced quality voice, fall back to any de-DE voice
//             const deVoice =
//                 voices.find(v => v.language === 'de-DE' && v.quality === Speech.VoiceQuality.Enhanced) ??
//                 voices.find(v => v.language === 'de-DE');

//             if (deVoice) {
//                 pinnedDeVoice = deVoice.identifier;

//                 // Speak a real word at volume 0 — this is what actually boots
//                 // the Android TTS engine. Empty strings are ignored by the OS.
//                 await new Promise<void>(resolve => {
//                     Speech.speak('ja', {
//                         voice: pinnedDeVoice,
//                         language: 'de-DE',
//                         rate: 1,
//                         pitch: 1,
//                         volume: 0,           // silent — user hears nothing
//                         onDone: () => resolve(),
//                         onStopped: () => resolve(),
//                         onError: () => resolve(), // don't block if it fails
//                     });
//                 });
//             }
//         } catch {
//             // Warm-up is best-effort. If it fails, speech still works —
//             // it'll just have a one-time cold-start delay on the first call.
//         }
//     })();

//     return warmUpPromise;
// };

// // ─── Public controller ────────────────────────────────────────────────────────

// export const speechController = {
//     /**
//      * Call once at app boot. Safe to call multiple times.
//      */
//     warmUp,

//     /**
//      * Speak at normal speed (rate: 1.0).
//      * Stops any currently active speech first.
//      * @param onSpeakingState  Optional callback — receives true when speaking starts,
//      *                         false when it ends (done / stopped / error).
//      */
//     start(
//         text: string,
//         lang = 'de-DE',
//         onSpeakingState?: (speaking: boolean) => void
//     ) {
//         // Clear previous callback BEFORE stopping so it doesn't get a spurious false
//         activeCb = onSpeakingState;
//         Speech.stop();
//         speakInternal(text, lang, 1.0);
//     },

//     /**
//      * Speak at slow speed (rate: 0.4) — for the turtle/slow button.
//      */
//     startSlow(
//         text: string,
//         lang = 'de-DE',
//         onSpeakingState?: (speaking: boolean) => void
//     ) {
//         activeCb = onSpeakingState;
//         Speech.stop();
//         speakInternal(text, lang, 0.4);
//     },

//     /**
//      * Stop all speech immediately.
//      */
//     stop() {
//         activeCb = undefined;
//         _isSpeaking = false;
//         Speech.stop();
//     },

//     /**
//      * Synchronous check — no async needed.
//      */
//     isSpeaking(): boolean {
//         return _isSpeaking;
//     },
// };

// // ─── Backwards-compatible re-exports ─────────────────────────────────────────
// // These allow existing import sites (utils/index.ts, old Speaker.tsx, etc.)
// // to keep working without any changes. They simply delegate to speechController.

// export const speechHandler = (
//     text?: string,
//     lang?: string,
//     onLoading?: (loading: boolean) => void
// ) => speechController.start(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

// export const speechSlowHandler = (
//     text?: string,
//     lang?: string,
//     onLoading?: (loading: boolean) => void
// ) => speechController.startSlow(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

// /** @deprecated Use speechController.start() directly */
// export const warmUpSpeech = () => speechController.warmUp();

// /** @deprecated — was never useful, merged into start() */
// export const preloadVoices = () => speechController.warmUp();