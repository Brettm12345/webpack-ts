import {
  CheckerPlugin,
  TsConfigPathsPlugin
} from 'awesome-typescript-loader'
import { join } from 'path'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { WebpackBar } from 'webpackbar'

import { makeConfig } from '../src'

const config = makeConfig({
  entry: "src/index.ts",
  resolve: {
    extensions: [".ts", ".js", ".mjs", ".json"],
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    libraryTarget: "commonjs",
    path: join(__dirname, "dist"),
    filename: "[name].js"
  },
  externals: [nodeExternals(), "bcrypt"],
  target: "node",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: require.resolve("awesome-typescript-loader"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CheckerPlugin(), new WebpackBar()]
} as Configuration);

module.exports = config;
