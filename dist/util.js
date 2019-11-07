"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return mergeDeepArray(sources);
}
exports.mergeDeep = mergeDeep;
// In almost any situation where you could succeed in getting the
// TypeScript compiler to infer a tuple type for the sources array, you
// could just use mergeDeep instead of mergeDeepArray, so instead of
// trying to convert T[] to an intersection type we just infer the array
// element type, which works perfectly when the sources array has a
// consistent element type.
function mergeDeepArray(sources) {
    var target = sources[0] || {};
    var count = sources.length;
    if (count > 1) {
        var pastCopies = [];
        target = shallowCopyForMerge(target, pastCopies);
        for (var i = 1; i < count; ++i) {
            target = mergeHelper(target, sources[i], pastCopies);
        }
    }
    return target;
}
exports.mergeDeepArray = mergeDeepArray;
function isObject(obj) {
    return obj !== null && typeof obj === "object";
}
function mergeHelper(target, source, pastCopies) {
    if (isObject(source) && isObject(target)) {
        // In case the target has been frozen, make an extensible copy so that
        // we can merge properties into the copy.
        if (Object.isExtensible && !Object.isExtensible(target)) {
            target = shallowCopyForMerge(target, pastCopies);
        }
        Object.keys(source).forEach(function (sourceKey) {
            var sourceValue = source[sourceKey];
            if (hasOwnProperty.call(target, sourceKey)) {
                var targetValue = target[sourceKey];
                if (sourceValue !== targetValue) {
                    // When there is a key collision, we need to make a shallow copy of
                    // target[sourceKey] so the merge does not modify any source objects.
                    // To avoid making unnecessary copies, we use a simple array to track
                    // past copies, since it's safe to modify copies created earlier in
                    // the merge. We use an array for pastCopies instead of a Map or Set,
                    // since the number of copies should be relatively small, and some
                    // Map/Set polyfills modify their keys.
                    target[sourceKey] = mergeHelper(shallowCopyForMerge(targetValue, pastCopies), sourceValue, pastCopies);
                }
            }
            else {
                // If there is no collision, the target can safely share memory with
                // the source, and the recursion can terminate here.
                target[sourceKey] = sourceValue;
            }
        });
        return target;
    }
    // If source (or target) is not an object, let source replace target.
    return source;
}
function shallowCopyForMerge(value, pastCopies) {
    if (value !== null &&
        typeof value === "object" &&
        pastCopies.indexOf(value) < 0) {
        if (Array.isArray(value)) {
            value = value.slice(0);
        }
        else {
            value = __assign({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        pastCopies.push(value);
    }
    return value;
}
