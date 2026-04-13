import { useState, useEffect, useCallback, useRef } from "react";
import {
    useAudioRecorder,
    useAudioRecorderState,
    useAudioPlayer,
    RecordingPresets,
    AudioModule,
    setAudioModeAsync,
} from "expo-audio";
import { SpeechResultType } from "@/types";
import { useCelebration } from "@/context/CelebrationContext";
import { getSpeechResultByJobId, speechEvaluate } from "@/services/speech.service";
import { toastError, toastLoading, toastSuccess } from "@/services/toast.service";

const useSpeechRecorder = () => {
    const { triggerLessonResult } = useCelebration();

    // ── State ──────────────────────────────────────────────────────────────────
    const [ recordedUri,     setRecordedUri     ] = useState<string | null>(null);
    const [ loading,         setLoading         ] = useState<boolean>(false);
    const [ isRecordingDone, setIsRecordingDone ] = useState<boolean>(false);
    const [ result,          setResult          ] = useState<SpeechResultType | null>(null);
    const [ error,           setError           ] = useState<string | null>(null);

    // Keep a ref in sync with state so callbacks always see the latest URI
    // without needing it in their dependency arrays.
    const recordedUriRef = useRef<string | null>(null);
    useEffect(() => { recordedUriRef.current = recordedUri; }, [recordedUri]);

    // ── Audio hooks ────────────────────────────────────────────────────────────
    const audioRecorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY,
        (status) => console.log('Recording status', status)
    );
    const recorderState = useAudioRecorderState(audioRecorder);
    const player = useAudioPlayer(recordedUri ?? undefined);

    // ── Permissions ────────────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            if (!status.granted) toastError("Permission to access microphone was denied!");
            await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
        })();
    }, []);

    // ── Recording ──────────────────────────────────────────────────────────────
    const startRecording = useCallback(async () => {
        // toastSuccess("Start recording..");
        try {
            setError(null);
            setResult(null);
            if (!recorderState.isRecording) {
                await audioRecorder.prepareToRecordAsync();
                audioRecorder.record();
            }
        } catch (e) {
            setError("Recorder failed. Please try again.");
            toastError("Recorder failed. Please try again.");
        }
    }, [audioRecorder]);

    const stopRecording = useCallback(async () => {
        try {
            await audioRecorder.stop();
            // audioRecorder.uri is available synchronously after stop()
            const uri = audioRecorder.uri ?? null;
            setRecordedUri(uri);
            recordedUriRef.current = uri;
            setIsRecordingDone(true);
            // Re-prepare immediately so the recorder is ready for the next lesson
            await audioRecorder.prepareToRecordAsync();
            // toastSuccess("Stop recording");
        } catch (e) {
            setError("Recorder stopping failed. Please try again.");
            toastError("Recorder stopping failed. Please try again.");
        }
    }, [audioRecorder]);

    // ── Playback ───────────────────────────────────────────────────────────────
    const play = useCallback(async () => {
        try {
            if(!recordedUriRef.current) return;
            await player.seekTo(0);
            player.play();
        } catch (e) {
            setError("Recorder playing failed. Please try again.");
        }
    }, [player]);

    const pause = useCallback(async () => {
        if (!recordedUriRef.current) return;
        player.pause();
    }, [player]);

    // ── Reset — called between lessons ─────────────────────────────────────────
    /**
     * IMPORTANT: reset must be fully synchronous from the caller's perspective.
     * The sequence is:
     *   1. Stop any active recording (ignore error if already stopped)
     *   2. Re-prepare the recorder so it's ready for the next lesson
     *   3. Clear all state — recordedUri, isRecordingDone, result, error
     *   4. Pause the player (no .stop() in expo-audio AudioPlayer)
     *
     * We do NOT call resolveCurrent() here — that's the screen's responsibility
     * after the modal chain has completed.
     */
    const reset = useCallback(async () => {
        try {
            // Stop gracefully — may already be stopped, that's fine
            try { await audioRecorder.stop(); } catch (_) {}

            // Re-prepare so startRecording() works immediately on next lesson
            await audioRecorder.prepareToRecordAsync();

            // Clear all state
            setRecordedUri(null);
            recordedUriRef.current = null;
            setIsRecordingDone(false);
            setResult(null);
            setError(null);
            setLoading(false);

            // Pause playback (expo-audio has no stop())
            try { await player.pause(); } catch (_) {}

            toastSuccess("Lesson reset!", {duration: 1000});
        } catch (e) {
            console.warn("Reset failed", e);
            toastError("Lesson reset failed!", {duration: 1000});
        }
    }, [audioRecorder, player]);

    // ── Speech analysis ────────────────────────────────────────────────────────
    const analyzeSpeech = useCallback(async (
        expectedText: string,
        callbackFn: (e: SpeechResultType) => void
    ) => {
        if (!expectedText?.trim()) {
            setError("No expected text found!");
            toastError("Task text missing!");
            return;
        }

        // Use ref so this doesn't depend on state in dep array
        const uri = recordedUriRef.current;
        if (!uri) {
            setError("No recording found!");
            toastError("No recording found!");
            return;
        }

        const toastId = toastLoading("Analyzing Speech...");

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("audio", {
                uri: uri.startsWith("file://") ? uri : `file://${uri}`,
                name: "speech.m4a",
                type: "audio/m4a",
            } as any);
            formData.append("expected_text", expectedText);

            const startRes = await speechEvaluate(formData);
            if (!startRes.ok) throw new Error(await startRes.text());
            const { job_id } = await startRes.json();

            // Poll until done or timeout
            const MAX_ATTEMPTS = 60;
            for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
                const res      = await getSpeechResultByJobId(`${job_id}`);
                const response = await res.json();

                if (response.status === "done") {
                    if (response.data.error) {
                        toastError(response.data.error, { id: toastId! });
                        setLoading(false);
                        return;
                    }

                    const speechResult: SpeechResultType = response.data;
                    setResult(speechResult);
                    toastSuccess("Speech analysis successful!", { id: toastId! });

                    triggerLessonResult({
                        actualQuery: expectedText,
                        result: speechResult,
                        onContinue: async () => callbackFn(speechResult),
                        onRetry: reset,
                    });

                    setLoading(false);
                    return;
                }

                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            // Timed out
            setError("Speech analysis timeout");
            toastError("Speech analysis timeout!", { id: toastId! });
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError("Speech analysis failed");
            toastError("Speech analysis failed", { id: toastId! });
            setLoading(false);
        }
    }, [reset, triggerLessonResult]);
    // Note: recordedUri intentionally NOT in dep array — we use recordedUriRef instead.

    // ── Return ─────────────────────────────────────────────────────────────────
    return {
        isRecording:    recorderState.isRecording,
        isPlaying:      player.playing,
        isPaused:       player.paused,
        isRecordingDone,
        recordedUri,
        loading,
        result,
        error,

        startRecording,
        stopRecording,
        play,
        pause,
        reset,
        analyzeSpeech,
    };
};

export default useSpeechRecorder;