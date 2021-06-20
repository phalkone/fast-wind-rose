const typescript = require('neutrinojs-typescript');
const reactComponents = require('@neutrinojs/react-components');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({
      compilerOptions: {
        target: 'es5',
        lib: [
          'dom',
          'dom.iterable',
          'esnext'
        ],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        strictNullChecks: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react',
        downlevelIteration: true
      },
      include: [
        'src'
      ]
    }),
    reactComponents({
      style : {
        test : /\.s[ca]ss$/i,
        modulesTest: /\.modules.s[ca]ss$/i,
        loaders: [
          { loader: require.resolve('sass-loader'), useId: 'sass' }
        ]
      }
    })
  ],
};
