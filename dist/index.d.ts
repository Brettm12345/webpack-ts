import { Configuration } from 'webpack';
interface Args {
    config: Configuration;
}
export declare const makeConfig: (config: Configuration) => (a: Args) => import("rambda").Merge<Configuration, Configuration>;
export {};
