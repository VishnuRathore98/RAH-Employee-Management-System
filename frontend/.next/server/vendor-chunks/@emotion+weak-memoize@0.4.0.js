"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@emotion+weak-memoize@0.4.0";
exports.ids = ["vendor-chunks/@emotion+weak-memoize@0.4.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ weakMemoize)\n/* harmony export */ });\nvar weakMemoize = function weakMemoize(func) {\n  var cache = new WeakMap();\n  return function (arg) {\n    if (cache.has(arg)) {\n      // Use non-null assertion because we just checked that the cache `has` it\n      // This allows us to remove `undefined` from the return value\n      return cache.get(arg);\n    }\n\n    var ret = func(arg);\n    cache.set(arg, ret);\n    return ret;\n  };\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGVtb3Rpb24rd2Vhay1tZW1vaXplQDAuNC4wL25vZGVfbW9kdWxlcy9AZW1vdGlvbi93ZWFrLW1lbW9pemUvZGlzdC9lbW90aW9uLXdlYWstbWVtb2l6ZS5lc20uanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0MiLCJzb3VyY2VzIjpbIi9ob21lL3Zwc3IvRGVza3RvcC9wcm9qZWN0cy9qcy10cy1weS9SQUgtRW1wbG95ZWUtTWFuYWdlbWVudC1TeXN0ZW0vZnJvbnRlbmQvbm9kZV9tb2R1bGVzLy5wbnBtL0BlbW90aW9uK3dlYWstbWVtb2l6ZUAwLjQuMC9ub2RlX21vZHVsZXMvQGVtb3Rpb24vd2Vhay1tZW1vaXplL2Rpc3QvZW1vdGlvbi13ZWFrLW1lbW9pemUuZXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB3ZWFrTWVtb2l6ZSA9IGZ1bmN0aW9uIHdlYWtNZW1vaXplKGZ1bmMpIHtcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAoY2FjaGUuaGFzKGFyZykpIHtcbiAgICAgIC8vIFVzZSBub24tbnVsbCBhc3NlcnRpb24gYmVjYXVzZSB3ZSBqdXN0IGNoZWNrZWQgdGhhdCB0aGUgY2FjaGUgYGhhc2AgaXRcbiAgICAgIC8vIFRoaXMgYWxsb3dzIHVzIHRvIHJlbW92ZSBgdW5kZWZpbmVkYCBmcm9tIHRoZSByZXR1cm4gdmFsdWVcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoYXJnKTtcbiAgICB9XG5cbiAgICB2YXIgcmV0ID0gZnVuYyhhcmcpO1xuICAgIGNhY2hlLnNldChhcmcsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHdlYWtNZW1vaXplIGFzIGRlZmF1bHQgfTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js\n");

/***/ })

};
;