import { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import {
    useAudioRecorder,
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorderState,
    useAudioPlayer
} from "expo-audio";

const SoundRecorder = () => {
    const [recordedUri, setRecordedUri] = useState<string | null>(null);

    const audioRecorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY,
        (status) => console.log('Recording status', status)
    );
    const recorderState = useAudioRecorderState( audioRecorder );

    const player = useAudioPlayer( recordedUri ?? undefined );

    const record = async () => {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
    }
    
    const stopRecording = async () => {
        // The recording will be available on `audioRecorder.uri`.
        await audioRecorder.stop();
        setRecordedUri(audioRecorder.uri);
    }

    const playAudio = async () => {
        if (!recordedUri) {
            Alert.alert("No recording found");
            return;
        }

        await player.seekTo(0);
        player.play();
    };

    useEffect(() => {
        (async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            if(!status.granted) {
                Alert.alert("Permission to access microphone was denied!");
            }

            setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        })();
    }, []);

    return (
        <View
            style={styles.container}
        >
            <Button
                title={recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}
                onPress={recorderState.isRecording ? stopRecording : record}
            />
            <Button
                title={player.playing ? "Playing..." : "Play the audio"}
                onPress={() => {
                    playAudio()
                    // if (!recordedUri) return;
                    // player.seekTo(0);
                    // player.play();
                    // player.seekTo(0); // For Replay
                    // console.log(player.isAudioSamplingSupported)
                    // player.play();
                    
                    // console.log(player.currentStatus)
                }}
            />
            <Button
                title="Check"
                onPress={async () => {
                    try {
                        const formData = new FormData();
                        formData.append("audio", {
                            uri: audioRecorder.uri,
                            type: "audio/m4a",  // or "audio/wav" if you convert
                            name: "speech.m4a"
                        } as any);

                        // Add expected text
                        formData.append("expected_text", "Ich heiße Anna"); // Replace with your actual expected text

                        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/speech/evaluate`, {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Content-Type": "multipart/form-data"  // Some setups may not require this; React Native may handle it automatically
                            }
                        });

                        if (!res.ok) {
                            const text = await res.text(); // Read HTML or error message
                            console.log("Error response:", text);
                            return;
                        }

                        const data = await res.json();

                        console.log("Success!", data)
                    }
                    catch(err) {
                        console.error("Speech Checking Failed!", err)
                    }
                }}
            />
        </View>
    );
}

export default SoundRecorder;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        // backgroundColor: "#ECF0F1",
        padding: 10
    }
});