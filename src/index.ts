import { merge } from 'rambda'
import { Configuration } from 'webpack'

interface Args {
  config: Configuration;
}

export const makeConfig = (config: Configuration) => (a: Args) =>
  merge(a.config, config);
