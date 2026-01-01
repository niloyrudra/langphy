import * as Speech from "expo-speech";
import { setAudioModeAsync } from "expo-audio";

let isWarm = false;
let currentText = "";
let currentLang = "de-DE";
let isSpeaking = false;
let pausedIndex = 0;

let onSpeakingStateCb: ((v: boolean) => void) | undefined;

export const preloadVoices = async () => {
  const voices = await Speech.getAvailableVoicesAsync();
  console.log("Available voices:", voices);
  
  // Optinal: pick a default voice to force-load
  const deVoice = voices.find( voice => voice.language === "de-DE" );
  
  if( deVoice ) {
    Speech.speak(
      ".",
      {
        voice: deVoice.identifier,
        volume: 0,
        rate: 1,
        pitch: 1,
      }
    );
  }
}

export const warmUpSpeech = async () => {
  if (isWarm) return;

  // 1️⃣ Initialize audio session (CRITICAL)
  setAudioModeAsync({
    interruptionMode: "doNotMix",
    // allowsRecordingIOS: false,
    // shouldDuckAndroid: true,
    // staysActiveInBackground: false,
    playsInSilentMode: true,
    allowsRecording: false,
  });

  preloadVoices();

  // // Silent or ultra-short speech initializes the engine
  // Speech.speak(" ", {
  //   volume: 0,
  //   rate: 1,
  //   pitch: 1,
  // });

  isWarm = true;
};

const speakInternal = (text: string) => {
  Speech.speak(text, {
    language: currentLang,
    rate: 1,
    pitch: 1.2,
    volume: 1,

    onStart: () => {
      isSpeaking = true;
      onSpeakingStateCb?.(true);
    },

    onDone: () => {
      isSpeaking = false;
      pausedIndex = 0;
      onSpeakingStateCb?.(false);
    },

    onStopped: () => {
      isSpeaking = false;
      onSpeakingStateCb?.(false);
    },

    onError: () => {
      isSpeaking = false;
      onSpeakingStateCb?.(false);
    },
  });
};

export const speechController = {
  async start(
    text: string,
    lang = "de-DE",
    onSpeakingState?: (v: boolean) => void
  ) {

    await warmUpSpeech();

    Speech.stop();

    currentText = text;
    currentLang = lang;
    pausedIndex = 0;
    onSpeakingStateCb = onSpeakingState;

    speakInternal(text);
  },

  stop() {
    Speech.stop();
    pausedIndex = 0;
    isSpeaking = false;
    onSpeakingStateCb?.(false);
  },

  pause() {
    if (!isSpeaking) return;

    Speech.stop();
    isSpeaking = false;
    onSpeakingStateCb?.(false);

    // crude but effective word-based pause
    const words = currentText.split(" ");
    pausedIndex = Math.floor(words.length / 3); // approximate
  },

  resume() {
    if (isSpeaking || pausedIndex === 0) return;

    const words = currentText.split(" ");
    const remaining = words.slice(pausedIndex).join(" ");

    speakInternal(remaining);
  },

  isSpeaking() {
    return isSpeaking;
  },
};