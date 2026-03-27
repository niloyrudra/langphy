/**
 * feedback.ts
 * Central feedback engine for the German learning app.
 * Handles sounds (expo-audio), haptics (expo-haptics), and toast triggers.
 *
 * Usage:
 *   import { triggerFeedback } from '@/utils/feedback';
 *   await triggerFeedback('correct');
 */

// import { useAudioPlayer } from 'expo-audio';
import { toastError, toastSuccess } from '@/services/toast.service';
import { toast } from '@backpackapp-io/react-native-toast';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import * as Haptics from 'expo-haptics';

// ─── Feedback Event Types ────────────────────────────────────────────────────

export type FeedbackEvent =
    | 'correct'        // User answered correctly (ding / light tap)
    | 'incorrect'      // User answered wrong (dull thud / error buzz)
    | 'streak'         // Streak updated (satisfying chime + medium haptic)
    | 'lessonComplete' // Lesson finished — results pop-up appears (pop + success buzz)
    | 'sessionComplete'// Full session done — celebration (fanfare + strong haptic)
    | 'tap'            // Generic UI tap (subtle tick)
    | 'swipe'          // Card swipe / navigation (soft whoosh)
    | 'xpGain'         // XP badge appears (sparkle chime)
    | 'timerWarning';  // Timer running low (urgent tick)

// ─── Sound Asset Map ─────────────────────────────────────────────────────────
//
// Place these audio files in: assets/sounds/
// Recommended free sources:
//   • https://freesound.org  (search: "ui correct", "fanfare short", etc.)
//   • https://mixkit.co/free-sound-effects/
//
// All files should be short (< 3s), normalised to -12 dBFS.

export const SOUND_ASSETS: Record<FeedbackEvent, any> = {
    correct:         require('../assets/sounds/correct.wav'),
    incorrect:       require('../assets/sounds/incorrect.wav'),
    streak:          require('../assets/sounds/streak.wav'),
    lessonComplete:  require('../assets/sounds/lesson_complete.wav'),
    sessionComplete: require('../assets/sounds/session_complete.wav'),
    tap:             require('../assets/sounds/tap.wav'),
    swipe:           require('../assets/sounds/swipe.wav'),
    xpGain:          require('../assets/sounds/xp_gain.wav'),
    timerWarning:    require('../assets/sounds/timer_warning.wav'),
};

// ─── Haptic Map ──────────────────────────────────────────────────────────────

type HapticStyle =
    | 'light'
    | 'medium'
    | 'heavy'
    | 'success'
    | 'warning'
    | 'error'
    | 'none';

const HAPTIC_MAP: Record<FeedbackEvent, HapticStyle> = {
    correct:         'success',
    incorrect:       'error',
    streak:          'medium',
    lessonComplete:  'success',
    sessionComplete: 'heavy',
    tap:             'light',
    swipe:           'light',
    xpGain:          'medium',
    timerWarning:    'warning',
};

// ─── Haptic Runner ───────────────────────────────────────────────────────────

async function runHaptic(style: HapticStyle): Promise<void> {
    try {
        switch (style) {
        case 'light':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
        case 'medium':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
        case 'heavy':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
        case 'success':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
        case 'warning':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            break;
        case 'error':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
        case 'none':
        default:
            break;
        }
    } catch {
        // Haptics not supported on this device — silently ignore
    }
}

// ─── useFeedback Hook ────────────────────────────────────────────────────────
//
// Use this hook inside any component. It returns a `triggerFeedback` function
// that plays sound + haptic for a given FeedbackEvent.
//
// Example:
//   const { triggerFeedback } = useFeedback();
//   await triggerFeedback('correct');

export function useFeedback() {
    /**
     * expo-audio's useAudioPlayer is designed for a single persistent player.
     * For UI feedback sounds (short, fire-and-forget), we call it per event.
     * For each event we instantiate a fresh player — this is intentional since
     * feedback sounds are short-lived and don't need lifecycle management.
     */

    const triggerFeedback = async (
        event: FeedbackEvent,
        options: { sound?: boolean; haptic?: boolean } = { sound: true, haptic: true }
    ) => {
        const { sound = true, haptic = true } = options;

        // Run haptic and sound in parallel for immediate feel
        await Promise.all([
            haptic ? runHaptic(HAPTIC_MAP[event]) : Promise.resolve(),
            sound  ? playFeedbackSound(event)     : Promise.resolve(),
        ]);
    };

    return { triggerFeedback };
}

// ─── Standalone Sound Player ─────────────────────────────────────────────────
//
// Used internally. Creates a one-shot audio player for short UI sounds.

async function playFeedbackSound(event: FeedbackEvent): Promise<void> {
    try {
        const { AudioPlayer } = await import('expo-audio');
        // const player = new AudioPlayer(SOUND_ASSETS[event]);
        const player = createAudioPlayer(SOUND_ASSETS[event]);
        await player.play();
        // Auto-cleanup after the sound is likely done (max 4s buffer)
        setTimeout(() => {
            try { player.release(); } catch { /* already cleaned up */ }
        }, 4000);
    } catch (err) {
        console.warn(`[feedback] Could not play sound for event "${event}":`, err);
    }
}

// ─── Preloader (optional, call at app startup) ────────────────────────────────
//
// Preloading isn't strictly required with expo-audio, but calling this at
// app startup warms up the audio session so the first sound plays instantly.
//
// In your root layout or App.tsx:
//   useEffect(() => { preloadFeedbackSounds(); }, []);

export async function preloadFeedbackSounds(): Promise<void> {
    try {
        // const { setAudioModeAsync } = await import('expo-audio');
        await setAudioModeAsync({
            playsInSilentMode: true, // Play even when iOS silent switch is on
        });
        toastSuccess("Sound effect is on!");
    } catch (err) {
        console.warn('[feedback] Could not configure audio mode:', err);
        toastError("Sound effect is not ready!");
    }
}