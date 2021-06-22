const typescript = require('neutrinojs-typescript');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({ tsconfig: {
      compilerOptions: {
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true
      }
    }}),
    reactComponents({
      style : {
        test : /\.s[ca]ss$/i,
        modulesTest: /\.modules.s[ca]ss$/i,
        loaders: [
          { loader: require.resolve('sass-loader'), useId: 'sass' }
        ]
      }
    }),
    jest()
  ],
};
