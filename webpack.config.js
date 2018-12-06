const path = require("path");

module.exports = {
	// entry point, output, plugins, loaders
	entry: "./jsMapi/src/js/index.js",
	output: {
		path: path.resolve(__dirname,"jsMapi/dist"),
		filename: "js/bundle.js"
	},

	devServer : {
		contentBase : path.resolve(__dirname,"jsMapi/dist")
	}
};