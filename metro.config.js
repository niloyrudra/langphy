const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = config.resolver;

  // Configure transformer for SVGs
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];

  // Map missing asset registry path
  config.resolver.extraNodeModules = {
    "missing-asset-registry-path": require.resolve("react-native/Libraries/Image/AssetRegistry"),
  };

  return config;
})();