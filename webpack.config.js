import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodeExternals from 'webpack-node-externals';

const fileLocation = fileURLToPath(import.meta.url);
const currentDirectory = dirname(fileLocation);

export default [
  {
    entry: { browser: './client/main.js' },
    mode: 'development',
    output: {
      filename: 'main.js',
      path: path.resolve(currentDirectory, 'dist/public'),
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './client/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  },
  {
    entry: './server/bin/www',
    mode: 'development',
    target: 'node',
    externals: [NodeExternals()],
    output: {
      filename: 'server.cjs',
      path: path.resolve(currentDirectory, 'dist'),
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.dust'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  },
];
