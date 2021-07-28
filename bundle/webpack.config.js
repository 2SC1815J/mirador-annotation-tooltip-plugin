const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const pjson = require('../package.json');

module.exports = {
  mode: 'production',
  entry: './bundle/index.js',
  output: {
    filename: 'mirador.bundle.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.BannerPlugin(() => {
      const titlePlugin = `${pjson.name} v${pjson.version}\n\n`;
      const licensePlugin = fs.readFileSync('./LICENSE', 'utf8');
      return `${titlePlugin}${licensePlugin}`;
    }),
    new webpack.BannerPlugin(() => {
      const titleMirador = 'Mirador with support for displaying annotations on videos\n\n';
      const licenseMirador = fs.readFileSync('./node_modules/mirador/LICENSE', 'utf8');
      return `${titleMirador}${licenseMirador}}`;
    }),
  ],
};
