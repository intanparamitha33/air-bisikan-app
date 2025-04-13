const { getDefaultConfig } = require('expo/metro-config');

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);
  return {
    ...config,
    resolver: {
      ...config.resolver,
      assetExts: [...config.resolver.assetExts, 'json', 'bin'],
    },
  };
};

// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// config.resolver.assetExts.push(
//     'json', // json extension
//     'bin' // for file weights TFJS
// );

// module.exports = config;