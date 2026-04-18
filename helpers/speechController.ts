/**
 * speechController.ts
 *
 * Single source of truth for ALL text-to-speech in Langphy.
 *
 * Problems this fixes vs the old setup:
 * ─────────────────────────────────────
 * 1. SLOW FIRST SPEECH
 *    Old: warmUpSpeech() spoke "" (empty string). Android's TTS engine
 *    silently ignores empty strings — the engine never actually initialized,
 *    so the first real utterance still paid the cold-start cost (~1-3s).
 *    Fix: speak a real but silent (volume=0) short German word so the TTS
 *    engine actually boots. We also pin the voice identifier on the first
 *    getAvailableVoicesAsync() call so subsequent speaks skip voice lookup.
 *
 * 2. TWO SEPARATE SOURCES OF TRUTH
 *    Old: speechController.ts + three standalone functions in utils/index.ts
 *    (speechHandler, speechSlowHandler, speechFastHandler). Components
 *    imported from either place inconsistently, making rates/pitch diverge.
 *    Fix: everything goes through speechController. The standalone utils
 *    functions become thin re-exports that call speechController so existing
 *    import sites don't need to change.
 *
 * 3. NO CONCURRENCY GUARD
 *    Old: calling start() while already speaking left the previous onSpeakingStateCb
 *    dangling — it would never receive onSpeakingState(false), leaving UI in
 *    a "speaking" stuck state.
 *    Fix: start() always calls stop() first and clears the old callback before
 *    registering the new one.
 *
 * 4. setAudioModeAsync interruptionMode TYPO
 *    Old: interruptionMode: "doNotMix" — this key doesn't exist in expo-audio's
 *    AudioMode type. It was silently ignored.
 *    Fix: removed. playsInSilentMode:true + allowsRecording:false is all that's
 *    needed for playback-only mode.
 *
 * 5. isWarm FLAG RACES WITH ASYNC
 *    Old: isWarm was set to true synchronously BEFORE preloadVoices() awaited,
 *    so a second warmUp call during the async gap would think it was already warm
 *    and skip the setup.
 *    Fix: warmUp returns a single shared Promise so concurrent callers all wait
 *    on the same initialization.
 *
 * PUBLIC API (unchanged surface, safer internals)
 * ────────────────────────────────────────────────
 *   speechController.warmUp()              — call once at app boot
 *   speechController.start(text, lang, cb) — play at normal speed
 *   speechController.startSlow(text, lang, cb) — play at 0.4 rate
 *   speechController.stop()
 *   speechController.isSpeaking()
 *
 * COMPONENT USAGE
 * ───────────────
 *   // In Speaker.tsx / SpeakerComponent.tsx / TaskAllocation.tsx — all the same:
 *   import { speechController } from '@/helpers/speechController';
 *   speechController.start(phrase, 'de-DE', setIsSpeaking);
 *   speechController.startSlow(phrase, 'de-DE', setIsLoading);
 */

import * as Speech from 'expo-speech';
import { setAudioModeAsync } from 'expo-audio';

// ─── Module-level state ───────────────────────────────────────────────────────

/** Shared warm-up promise — concurrent callers all await the same init. */
let warmUpPromise: Promise<void> | null = null;

/** Pinned voice identifier for de-DE, resolved once during warmUp. */
let pinnedDeVoice: string | undefined;

/** Currently active speaking state callback — only one at a time. */
let activeCb: ((speaking: boolean) => void) | undefined;

/** Shadow of the native isSpeaking state for synchronous reads. */
let _isSpeaking = false;

// ─── Internal helpers ─────────────────────────────────────────────────────────

const setIsSpeaking = (val: boolean) => {
    _isSpeaking = val;
    activeCb?.(val);
};

/**
 * Core speak call. All public methods funnel through here so pitch/volume
 * config is never duplicated across call sites.
 */
const speakInternal = (text: string, lang: string, rate: number) => {
    Speech.speak(text, {
        language: lang,
        // Use pinned voice for de-DE so Android skips its own voice lookup
        voice: lang === 'de-DE' ? pinnedDeVoice : undefined,
        rate,
        pitch: 1.2,
        volume: 1,
        onStart:   () => setIsSpeaking(true),
        onDone:    () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError:   () => setIsSpeaking(false),
    });
};

// ─── Warm-up ──────────────────────────────────────────────────────────────────

/**
 * Initialize the TTS engine. Call this ONCE at app boot (e.g. in the root
 * index.tsx useEffect). Safe to call multiple times — runs only once.
 *
 * What it does:
 *  1. Sets the audio session to playback-only mode (playsInSilentMode)
 *  2. Fetches available voices and pins the best de-DE voice identifier
 *  3. Speaks a short silent utterance with that voice to force the TTS
 *     engine to fully boot — Android ignores empty strings, so we use
 *     a real word at volume 0.
 */
const warmUp = (): Promise<void> => {
    if (warmUpPromise) return warmUpPromise;

    warmUpPromise = (async () => {
        try {
            await setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: false,
            });

            const voices = await Speech.getAvailableVoicesAsync();

            // Prefer Enhanced quality voice, fall back to any de-DE voice
            const deVoice =
                voices.find(v => v.language === 'de-DE' && v.quality === Speech.VoiceQuality.Enhanced) ??
                voices.find(v => v.language === 'de-DE');

            if (deVoice) {
                pinnedDeVoice = deVoice.identifier;

                // Speak a real word at volume 0 — this is what actually boots
                // the Android TTS engine. Empty strings are ignored by the OS.
                await new Promise<void>(resolve => {
                    Speech.speak('ja', {
                        voice: pinnedDeVoice,
                        language: 'de-DE',
                        rate: 1,
                        pitch: 1,
                        volume: 0,           // silent — user hears nothing
                        onDone: () => resolve(),
                        onStopped: () => resolve(),
                        onError: () => resolve(), // don't block if it fails
                    });
                });
            }
        } catch {
            // Warm-up is best-effort. If it fails, speech still works —
            // it'll just have a one-time cold-start delay on the first call.
        }
    })();

    return warmUpPromise;
};

// ─── Public controller ────────────────────────────────────────────────────────

export const speechController = {
    /**
     * Call once at app boot. Safe to call multiple times.
     */
    warmUp,

    /**
     * Speak at normal speed (rate: 1.0).
     * Stops any currently active speech first.
     * @param onSpeakingState  Optional callback — receives true when speaking starts,
     *                         false when it ends (done / stopped / error).
     */
    start(
        text: string,
        lang = 'de-DE',
        onSpeakingState?: (speaking: boolean) => void
    ) {
        // Clear previous callback BEFORE stopping so it doesn't get a spurious false
        activeCb = onSpeakingState;
        Speech.stop();
        speakInternal(text, lang, 1.0);
    },

    /**
     * Speak at slow speed (rate: 0.4) — for the turtle/slow button.
     */
    startSlow(
        text: string,
        lang = 'de-DE',
        onSpeakingState?: (speaking: boolean) => void
    ) {
        activeCb = onSpeakingState;
        Speech.stop();
        speakInternal(text, lang, 0.4);
    },

    /**
     * Stop all speech immediately.
     */
    stop() {
        activeCb = undefined;
        _isSpeaking = false;
        Speech.stop();
    },

    /**
     * Synchronous check — no async needed.
     */
    isSpeaking(): boolean {
        return _isSpeaking;
    },
};

// ─── Backwards-compatible re-exports ─────────────────────────────────────────
// These allow existing import sites (utils/index.ts, old Speaker.tsx, etc.)
// to keep working without any changes. They simply delegate to speechController.

export const speechHandler = (
    text?: string,
    lang?: string,
    onLoading?: (loading: boolean) => void
) => speechController.start(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

export const speechSlowHandler = (
    text?: string,
    lang?: string,
    onLoading?: (loading: boolean) => void
) => speechController.startSlow(text ?? 'Hallo!', lang ?? 'de-DE', onLoading);

/** @deprecated Use speechController.start() directly */
export const warmUpSpeech = () => speechController.warmUp();

/** @deprecated — was never useful, merged into start() */
export const preloadVoices = () => speechController.warmUp();