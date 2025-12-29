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
import { SpeechResult } from "@/types";

const useSpeechRecorder = ( text: string | null ) => {
    const [ expectedText, setExpectedText ] = useState<string | null>(text);
    const [ recordedUri, setRecordedUri ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ isRecordingDone, setIsRecordingDone ] = useState<boolean>(false)
    const [ result, setResult ] = useState<SpeechResult | null>(null);
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
        setError(null);
        setResult(null);
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
    }, [audioRecorder]);

    const stopRecording = useCallback(async () => {
        await audioRecorder.stop();
        setRecordedUri(audioRecorder.uri ?? null);
        setIsRecordingDone(true)
    }, [audioRecorder]);

    /* 🔊 Playback */
    const play = useCallback(async () => {
        if (!recordedUri) return;
        await player.seekTo(0);
        player.play();
    }, [player, recordedUri]);

    /* ☁️ Send to backend (Whisper → SpaCy) */
    const analyzeSpeech = useCallback(async () => {
        if(!expectedText) {
            setError("No expected text found!");
            return;
        }
        if (!recordedUri) {
            setError("No recording found!");
            return;
        }

        try {
            setLoading(true);
            console.log( "Action triggered..." )
            const formData = new FormData();
            formData.append("audio", {
                uri: recordedUri,
                name: "speech.m4a",
                type: "audio/m4a",
            } as any);

            formData.append("expected_text", expectedText);

            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/speech/evaluate`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }
            console.log("No error during fetching....")
            const data = await res.json();

            setResult(data);

            console.log("data:", data)

        } catch (err: any) {
            console.error(err);
            setError("Speech analysis failed");
        } finally {
            setLoading(false);
        }
    }, [recordedUri, expectedText]);

    return {
        /* state */
        isRecording: recorderState.isRecording,
        isPlaying: player.playing,
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
        analyzeSpeech,
    };
}

export default useSpeechRecorder;