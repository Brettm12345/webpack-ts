"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rambda_1 = require("rambda");
exports.makeConfig = function (config) { return function (a) {
    return rambda_1.merge(a.config, config);
}; };
