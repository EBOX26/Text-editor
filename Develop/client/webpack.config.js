const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    // Set the build mode to development
    mode: "development",
    // Define entry points for files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Specify the output configuration for bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Configure webpack plugins
    plugins: [
      // Plugin to generate HTML file and inject bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Test Editor",
      }),
      // Plugin to inject a custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Plugin to create a manifest.json file for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "T.E",
        description: "This is a Text Editor",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // Configure webpack module rules
    module: {
      // Define rules for processing CSS files
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Define rules for processing JavaScript files using Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Use babel-loader to transpile ES6 code
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};