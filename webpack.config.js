import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodeExternals from 'webpack-node-externals';
import Webpack from 'webpack';
import dotenv from 'dotenv';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const fileLocation = fileURLToPath(import.meta.url);
const currentDirectory = dirname(fileLocation);
dotenv.config();
export default () => [
  {
    entry: { browser: './src/client/main.js' },
    mode: 'development',
    output: {
      filename: 'main.js',
      path: path.resolve(currentDirectory, 'dist/public'),
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/client/index.html',
      }),
      new Webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(process.env.SERVICE_URL),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
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
    entry: './src/server/bin/www',
    mode: 'development',
    target: 'node',
    externals: [NodeExternals()],
    output: {
      filename: 'server.cjs',
      path: path.resolve(currentDirectory, 'dist/server'),
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.dust'],
      modules: ['node_modules'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // To pass run time variable to built code.
      new Webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(process.env.SERVICE_URL),
      }),
      // Copy dustjs template view folder to dist folder
      new CopyPlugin({
        patterns: [{ from: 'src/server/views', to: 'views' }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
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
