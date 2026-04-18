import "dotenv/config";

export default {
  expo: {
    name: "Langphy",
    slug: "langphy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "langphy",
    userInterfaceStyle: "automatic",
    // enableHermes: true,
    newArchEnabled: true, // ***
    ios: {
      supportsTablet: true,
      icon: "./assets/images/logo.png",
    },
    android: {
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#061E3E" // "#F9FAFB"
      },
      package: "com.niloyrudra.langphy",
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png"
    },
    plugins: [
      "expo-audio",
      "expo-asset",
      "expo-router",
      "expo-sqlite",
      "expo-web-browser",
      "expo-secure-store",
      // "expo-notifications",
      "expo-background-task",
      "expo-speech-recognition",
      "expo-font",
      [
        "expo-notifications",
        {
          // Notification icon shown in the Android status bar and drawer.
          // Must be a white-on-transparent PNG — NOT your full colour logo.
          // Using the colour logo here is the most common cause of a
          // grey/white square appearing instead of your icon on Android 5+.
          // Create a 96x96 white-on-transparent version and reference it here.
          icon: "./assets/images/notification-icon.png",
          color: "#00BCD4",
          defaultChannel: "default",
        },
      ],
      // [
      //   "react-native-google-mobile-ads",
      //   {
      //     androidAppId: "ca-app-pub-xxxxxxxx~xxxxxxxx"
      //   }
      // ]
      [
        "expo-splash-screen",
        {
          image: "./assets/images/app-splash-light.png",
          imageWidth: 160,
          resizeMode: "contain",
          backgroundColor: "#F9FAFB",
          dark: {
            image: "./assets/images/app-splash-dark.png",
            imageWidth: 160,
            backgroundColor: "#012C4A",
          },
        }
      ],
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      api_base: process.env.EXPO_PUBLIC_API_BASE,
      router: {},
      eas: {
        projectId: "b0b0ee89-261f-4471-b02d-e1d7aa2b975e"
      }
    }
  }
}
