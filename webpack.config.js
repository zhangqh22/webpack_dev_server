const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理目录
const HtmlWebpackPlugin = require('html-webpack-plugin') // 抽取html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取css

module.exports = {
	mode: 'development',
	entry:{
	   index: './src/index.js' // 入口文件
	},
	output:{
	   filename: 'static/js/[name].[hash:5].js',
	   path: path.resolve(__dirname, './build') // 打包目录
	},
	module: {
		rules: [
			// css
			{
	            test: /\.css$/,
	            exclude: '/node_modules',
	            use: [
		            {loader: MiniCssExtractPlugin.loader},
		            {loader: 'css-loader'}
	            ]
	        },
	        // less
	        {
	        	test: /a.less$/,
	        	exclude: '/node_modules',
	            use: [
		            {loader: MiniCssExtractPlugin.loader},
		            {loader: 'css-loader'},
		            {loader: 'less-loader'}
	            ]
	        },
	        {
	        	test: /b.less$/,
	        	exclude: '/node_modules',
	            use: [
		            {loader: 'style-loader'}, // 项目运行的时候，动态追加到html中，用style标签把样式包起来
		            {loader: 'css-loader'},
		            {loader: 'less-loader'}
	            ]
	        },
	        // 文件(mp4、mp3等)
	        {
		        test: /\.(mp4|mp3)$/,
		        exclude: '/node_modules',
		        use: [
		          	{
			            loader: 'file-loader',
			            options: {
			            	name: '[name].[hash:5].[ext]',
			            	outputPath: 'static/video'
			            }
		          	}
		        ]
	      	},
	      	// 图片
	      	{
		        test: /\.(png|jpg|gif)$/,
		        exclude: '/node_modules',
		        use: [
			        {
			            loader: 'url-loader',
			            options: {
			              	limit: 8192,
			              	name: '[name].[hash:5].[ext]',
			            	outputPath: 'static/images',
			            	publicPath: '../images' // 指定图片目录，解决图片路径不对的问题
			            }
			        }
		        ]
	      	}
        ]
	},
	plugins: [
		new CleanWebpackPlugin(), // 默认打包目录
        new MiniCssExtractPlugin({
        	filename: 'static/css/[name].[hash:5].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 默认在打包目录下新建html文件
            template: './public/index.html' // html模块
        }),
	],
	devServer: {
		open: true, // 自动打开浏览器
		hot: true,
		compress: true, // 资源文件通过压缩传输
		port: 3000,
		noInfo: true // 控制台不打印信息
	},
	stats: { 
		children: false // 用于解决Entrypoint undefined = index.html问题
	}
}