// metro.config.js for Expo SDK 54 — with SVG support + custom modules
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// 1. Keep the original resolver values
const { assetExts, sourceExts } = defaultConfig.resolver;

// 2. Apply your SVG transformer configuration
defaultConfig.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
defaultConfig.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
defaultConfig.resolver.sourceExts = [...sourceExts, "svg"];

// 3. Keep your missing-asset-registry patch
defaultConfig.resolver.extraNodeModules = {
  "missing-asset-registry-path": require.resolve(
    "react-native/Libraries/Image/AssetRegistry"
  ),
};

// 4. Export the properly configured config object
module.exports = defaultConfig;