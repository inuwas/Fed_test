var webpack = require('webpack');
var jQuery = require('jquery');
var path = require('path');
module.exports = {
	//entry point
	entry: {
		//['./src/js/app.js','jquery']
		app: ['./src/js/app.js', './node_modules/bootstrap/dist/css/bootstrap.min.css','./src/css/custom-css.css', 'font-awesome-webpack'],
		//app: ['./src/js/app.js'],
		vendor: ['angular','bootstrap','font-awesome-webpack']
	},

	output:{
		/*path: 'dist',
		filename: 'bundle.js'*/
		path: path.resolve(__dirname, "dist"),
    	publicPath: "dist/",
    	filename: "bundle.js"
	},
	module:{
		loaders:[
			{ 	test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
			{ 	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ 	
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file-loader", 

				/*query: {
				    outputPath: 'fonts/',
				    publicPath: 'fonts/' // That's the important part
				}*/
			},
			//{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      		//{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader: "babel-loader",
				query:{
					presets:['es2015']
				}
			},
			{
		        test: /\.css$/,
		        loader: "style-loader!css-loader"
		    },
		    { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
		    {
		        test: /\.json$/,
		        loader: 'json-loader'
		    }, {
		        test: /\.txt$/,
		        loader: 'raw-loader'
		    }, 
			//{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
		    // {
		    //     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
		    //     loader: 'url-loader?limit=10000'
		    // },
		    // {
		    //     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
		    //     loader: 'file-loader?limit=10000'
		    // }
		]
	},
	plugins: [
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
        new webpack.ProvidePlugin({   
	        jQuery: "jquery",
	        $: "jquery",
	        jquery: "jquery",
	        "window.jQuery": "jquery"
	    }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
	watch: true
}
