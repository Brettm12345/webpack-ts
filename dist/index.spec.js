"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
test("makeConfig", function () {
    var config = {
        entry: "index.js"
    };
    expect([
        _1.makeConfig(config)({ config: config }),
        _1.makeConfig(config)({ config: {} }),
        _1.makeConfig({})({ config: config })
    ]).toEqual(expect.arrayContaining([config]));
});
