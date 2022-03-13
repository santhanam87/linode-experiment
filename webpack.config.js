import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodeExternals from 'webpack-node-externals';
import Webpack from 'webpack';
import dotenv from 'dotenv';

const fileLocation = fileURLToPath(import.meta.url);
const currentDirectory = dirname(fileLocation);
dotenv.config();
export default ()=>[
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
				BACKEND_URL:JSON.stringify(process.env.SERVICE_URL)
			})
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
		entry: './src/server/bin/www',
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
		plugins: [
			new Webpack.DefinePlugin({
				BACKEND_URL:JSON.stringify(process.env.SERVICE_URL)
			})
		],
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
