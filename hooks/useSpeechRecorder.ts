import { useState, useEffect, useCallback } from "react";
// import { Alert } from "react-native";
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

const initialState = {
    expectedText: null as string | null,
    recordedUri: null as string | null,
    loading: false,
    isRecordingDone: false,
    result: null as SpeechResultType | null,
    error: null as string | null,
};

const useSpeechRecorder = () => {
    const { triggerLessonResult, resolveCurrent } = useCelebration();
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
                // Alert.alert("Permission to access microphone was denied!");
                toastError("Permission to access microphone was denied!");
            }

            setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        })();
    }, []);

    /* ▶️ Recording controls */
    const startRecording = useCallback(async () => {
        toastSuccess("Start recording..");
        try {    
            setError(null);
            setResult(null);

            if (!recorderState.isRecording) {
                await audioRecorder.prepareToRecordAsync();
                audioRecorder.record();
            }
        } catch(e) {
            setError("Recorder failed. Please try again.");
            toastError("Recorder failed. Please try again.");
        }
    }, [audioRecorder]);

    const stopRecording = useCallback(async () => {
        try {
            await audioRecorder.stop();
            setRecordedUri(audioRecorder.uri ?? null);
            setIsRecordingDone(true);

            // 🔥 Immediately prepare for next recording
            await audioRecorder.prepareToRecordAsync();

            toastSuccess("Stop recording");
        } catch(e) {
           setError("Recorder stopping failed. Please try again.");
           toastError("Recorder stopping failed. Please try again.");
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
    const analyzeSpeech = useCallback(async ( expectedText: string, callbackFn: () => void) => {
        if (!expectedText?.trim()) {
            setError("No expected text found!");
            toastError("No text found!");
            return;
        }

        if (!recordedUri) {
            setError("No recording found!");
            toastError("No recording found!");
            return;
        }

        const toastId = toastLoading("Analizing Speech...");

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

            const startRes = await speechEvaluate(formData);
            
            if (!startRes.ok) {
                throw new Error(await startRes.text());
            }

            const { job_id } = await startRes.json();

            // const startRes = await api.post("/speech/evaluate", formData);


            // if ( startRes.status !== 200 ) {
            //     throw new Error(await startRes.statusText);
            // }

            // const { job_id } = await startRes.data;

            // 🔥 Proper async polling loop
            let attempts = 0;
            const MAX_ATTEMPTS = 60;

            while (attempts < MAX_ATTEMPTS) {
                attempts++;

                console.log("Polling attempt:", attempts);

                const res = await getSpeechResultByJobId(`${job_id}`);

                console.log("Res", res)
                const response = await res.json()
                // if (response.status === 200) {
                if (response.status === "done") {
                    if ( response.data.error) {
                        // Show "No speech detected" message to user instead of crashing
                        // return <NoSpeechDetected message={response.data.error} />

                        toastError( response.data.error, { id: toastId! });
                        return;
                    }

                    setResult(response.data);

                    toastSuccess("Speech analysis successful!", { id: toastId! });

                    // Model initiate
                    triggerLessonResult({
                        actualQuery: expectedText,
                        result: response.data,
                        onContinue: callbackFn,
                        onRetry: reset,
                    });

                    setLoading(false);
                    return;
                }

                // wait 2 seconds before next attempt
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            // timeout case
            setError("Speech analysis timeout");
            toastError("Speech analysis timeout!", { id: toastId! })
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError("Speech analysis failed");
            toastError("Speech analysis failed", { id: toastId! });
            setLoading(false);
        }

    }, [recordedUri]);

    const reset = useCallback(async () => {
        try {
            try {
                await audioRecorder.stop();
            } catch (e) {
            // ignore if already stopped
            }
            // if (recorderState.isRecording) {
            //     await audioRecorder.stop();
            // }

            // 🔥 THIS IS CRITICAL
            await audioRecorder.prepareToRecordAsync();

            setRecordedUri(null);
            setIsRecordingDone(false);
            setResult(null);
            setError(null);
            setLoading(false);

            // reset player position
            if (player) {
                await player.pause(); // No .stop() method in AudioPlayer
                // await player.seekTo(0);
            }

            resolveCurrent();

            toastSuccess("Lesson reset!");

        } catch (e) {
            console.warn("Reset failed", e);
            toastError(`Lesson reset failed!`)
        }
    }, [audioRecorder, player, resolveCurrent]);

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
        startRecording,
        stopRecording,
        play,
        pause,
        reset,
        analyzeSpeech,
    };
}

export default useSpeechRecorder;