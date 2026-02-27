import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
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

const initialState = {
    expectedText: null as string | null,
    recordedUri: null as string | null,
    loading: false,
    isRecordingDone: false,
    result: null as SpeechResultType | null,
    error: null as string | null,
};

const useSpeechRecorder = ( text: string | null ) => {
    const [ expectedText, setExpectedText ] = useState<string | null>(text);
    const { triggerLessonResult } = useCelebration();
    const [ recordedUri, setRecordedUri ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ isRecordingDone, setIsRecordingDone ] = useState<boolean>(false)
    const [ result, setResult ] = useState<SpeechResultType | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const audioRecorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY,
        (status) => console.log('Recording status', status)
    );

    const recorderState = useAudioRecorderState( audioRecorder );

    const player = useAudioPlayer( recordedUri ?? undefined );

    useEffect(() => {
        ( async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            if( !status.granted ) {
                Alert.alert("Permission to access microphone was denied!");
            }

            setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        })();
    }, []);

    /* ▶️ Recording controls */
    const startRecording = useCallback(async () => {
        try {    
            setError(null);
            setResult(null);

            if (!recorderState.isRecording) {
                await audioRecorder.prepareToRecordAsync();
                audioRecorder.record();
            }
        } catch(e) {
            setError("Recorder failed. Please try again.");
        }
    }, [audioRecorder]);

    const stopRecording = useCallback(async () => {
        try {
            await audioRecorder.stop();
            setRecordedUri(audioRecorder.uri ?? null);
            setIsRecordingDone(true);

            // 🔥 Immediately prepare for next recording
            await audioRecorder.prepareToRecordAsync();
        } catch(e) {
           setError("Recorder stopping failed. Please try again.");
        }
    }, [audioRecorder]);

    /* 🔊 Playback */
    const play = useCallback(async () => {
        try {
            if (!recordedUri) return;
            await player.seekTo(0);
            player.play();
        } catch(e) {
           setError("Recorder playing failed. Please try again.");
        }
    }, [player, recordedUri]);

    /* 🔊 Pause */
    const pause = useCallback(async () => {
        if (!recordedUri) return;
        // await player.seekTo(0);
        player.pause();
    }, [player, recordedUri]);

    /* ☁️ Send to backend (Whisper → SpaCy) */
    const analyzeSpeech = useCallback(async (callbackFn: () => void) => {
        if (!expectedText) {
            setError("No expected text found!");
            return;
        }

        if (!recordedUri) {
            setError("No recording found!");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("audio", {
                uri: recordedUri.startsWith("file://")
                    ? recordedUri
                    : `file://${recordedUri}`,
                name: "speech.m4a",
                type: "audio/m4a",
            } as any);

            formData.append("expected_text", expectedText);

            console.log("Starting Job...");

            const startRes = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/speech/evaluate`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!startRes.ok) {
                throw new Error(await startRes.text());
            }

            const { job_id } = await startRes.json();

            // 🔥 Proper async polling loop
            let attempts = 0;
            const MAX_ATTEMPTS = 60;

            while (attempts < MAX_ATTEMPTS) {
                attempts++;

                console.log("Polling attempt:", attempts);

                const res = await fetch(
                    `${process.env.EXPO_PUBLIC_API_BASE}/speech/result/${job_id}`
                );

                if (!res.ok) {
                    throw new Error("Polling failed");
                }

                const response = await res.json();
                console.log("Res", response)

                if (response.status === "done") {
                    setResult(response.data);

                    triggerLessonResult({
                        actualQuery: expectedText,
                        result: response.data,
                        onContinue: callbackFn,
                        onRetry: () => {},
                    });

                    setLoading(false);
                    return;
                }

                // wait 2 seconds before next attempt
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            // timeout case
            setError("Speech analysis timeout");
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError("Speech analysis failed");
            setLoading(false);
        }

    }, [recordedUri, expectedText]);

    const reset = useCallback(async () => {
        try {
            if (recorderState.isRecording) {
                await audioRecorder.stop();
            }

            // 🔥 THIS IS CRITICAL
            await audioRecorder.prepareToRecordAsync();

            setRecordedUri(null);
            setIsRecordingDone(false);
            setResult(null);
            setError(null);
            setLoading(false);

            // optional: reset expected text
            setExpectedText(text ?? null);

            // reset player position
            if (player) {
                await player.pause(); // No .stop() method in AudioPlayer
                // await player.seekTo(0);
            }
        } catch (e) {
            console.warn("Reset failed", e);
        }
    }, [audioRecorder, recorderState.isRecording, player, text]);

    return {
        /* state */
        isRecording: recorderState.isRecording,
        isPlaying: player.playing,
        isPaused: player.paused,
        isRecordingDone,
        recordedUri,
        loading,
        result,
        error,

        /* actions */
        setExpectedText,
        startRecording,
        stopRecording,
        play,
        pause,
        reset,
        analyzeSpeech,
    };
}

export default useSpeechRecorder;