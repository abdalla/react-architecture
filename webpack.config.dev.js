import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';

export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
	entry: [
		'react-hot-loader/patch',

		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.\
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'src'),
		hot: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new DashboardPlugin()
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: ['file-loader']
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/font-woff'
						}
					}
				]
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/octet-stream'
						}
					}
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'image/svg+xml'
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /(\.css|\.scss|\.sass)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')],
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [path.resolve(__dirname, 'src', 'scss')],
							sourceMap: true
						}
					}
				]
			}
		]
	}
};
