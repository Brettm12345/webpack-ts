# Webpack TS

![npm bundle size](https://img.shields.io/bundlephobia/minzip/webpack-ts?style=flat-square)
![David](https://img.shields.io/david/brettm12345/webpack-ts?style=flat-square)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/Brettm12345/webpack-ts?style=flat-square)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/Brettm12345/webpack-ts?style=flat-square)


A neat little tool that helps you make webpack configs with typescript typings.

## Usage

```bash
yarn add -D webpack-ts
```

## Example

```typescript
// webpack.config.ts
import { makeConfig } from 'webpack-ts';
import { join } from 'path'

const config = makeConfig({
  entry: "dist/index.js",
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js"
  }
})

module.exports = config
```

## Editor integration

![editorIntegration](assets/editorIntegration.png)

![intelliSense](assets/intelliSense.png)