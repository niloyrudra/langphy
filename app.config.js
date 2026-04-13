import "dotenv/config";

export default {
  expo: {
    name: "Langphy",
    slug: "langphy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon-1024x1024.png",
    scheme: "langphy",
    userInterfaceStyle: "automatic",
    // enableHermes: true,
    newArchEnabled: true, // ***
    ios: {
      supportsTablet: true,
      icon: "./assets/images/app-icon-1024x1024.png",
    },
    android: {
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-1024x1024.png",
        backgroundColor: "#061E3E" // "#F9FAFB"
      },
      package: "com.niloyrudra.langphy",
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/app-icon-1024x1024.png"
    },
    plugins: [
      "expo-audio",
      "expo-asset",
      "expo-router",
      "expo-sqlite",
      "expo-web-browser",
      "expo-secure-store",
      "expo-notifications",
      "expo-background-task",
      "expo-speech-recognition",
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
          imageWidth: 180, //200,
          resizeMode: "contain",
          backgroundColor: "#F9FAFB",
          dark: {
            image: "./assets/images/app-splash-dark.png",
            backgroundColor: "#012C4A"
          }
        }
      ],
      "expo-font"
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
