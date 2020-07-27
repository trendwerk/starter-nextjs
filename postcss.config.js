module.exports = {
  plugins: [
    'postcss-easy-import',
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-nested',
    'tailwindcss',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
}
