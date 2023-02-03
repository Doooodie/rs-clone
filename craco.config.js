const path = require('path');
const { CracoAliasPlugin } = require('react-app-alias');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    // plugins: {
    //   add: [
    //     new StyleLintPlugin({
    //       configBasedir: __dirname,
    //       context: path.resolve(__dirname, 'src'),
    //       files: ['**/*.css'],
    //     }),
    //   ],
    // },
  },
};
