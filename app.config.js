import "dotenv/config";

export default {
  expo: {
    name: "Langphy",
    slug: "langphy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash-screen/logo-light-mode.png",
    scheme: "langphy",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/splash-screen/logo-light-mode.png",
        backgroundColor: "#F9FAFB"
      },
      package: "com.niloyrudra.langphy"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon/Dolphin.png"
    },
    plugins: [
      "expo-router",
      "expo-speech-recognition",
      "expo-web-browser",
      [
        "expo-ads-admob",
        {
          userTrackingPermission: "This identifier will be used to deliver personalized ads to you."
        }
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-screen/logo-light-mode.png",
          imageWidth: 286,
          resizeMode: "contain",
          backgroundColor: "#F9FAFB",
          dark: {
            image: "./assets/images/splash-screen/logo-dark-mode.png",
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
