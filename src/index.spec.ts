import { join } from 'path'
import { Configuration } from 'webpack'

import { makeConfig } from './'

test("makeConfig", () => {
  const config: Configuration = {
    entry: "dist/index.js",
    output: {
      path: join(__dirname, "dist"),
      filename: "[name].js"
    }
  };
  expect([
    makeConfig(config)({ config }),
    makeConfig(config)({ config: {} }),
    makeConfig({})({ config })
  ]).toEqual(expect.arrayContaining<Configuration>([config]));
});
