module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // This is now our one and only shortcut
            '@': './',
          },
        },
      ],
    ],
  };
};

// this a babel.config.js file