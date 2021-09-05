const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
 
module.exports = merge(common, {
   mode: "production",
   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: "/node_modules/",
               use: [
                   {
                       loader: "babel-loader",
                       options: {
                           presets: ["@babel/preset-env"]
                       }
                   }
               ]
           },
           {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: "css-loader"
                }
            ]
        }
       ]
   },
   optimization : {
       minimizer : [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
   },
   plugins : [new MiniCssExtractPlugin({filename : "[name].[contentHash].css"})]
})