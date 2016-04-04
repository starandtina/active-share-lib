(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ActiveShareLib"] = factory();
	else
		root["ActiveShareLib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(306);


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildUrl = exports.interpolate = undefined;

	var _interpolate = __webpack_require__(307);

	var _interpolate2 = _interopRequireDefault(_interpolate);

	var _buildUrl = __webpack_require__(308);

	var _buildUrl2 = _interopRequireDefault(_buildUrl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.interpolate = _interpolate2.default;
	exports.buildUrl = _buildUrl2.default;

/***/ },

/***/ 307:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = interpolate;
	// Replaces nummeric placeholders like {0} in a string with arguments
	// passed to the function
	// eg: interpolate('Quantity of {0} can not be less than {1}.', 'Small', 40)
	// eg: interpolate('Quantity of {name} can not be less than {maxQuantity}.', {name:'small', maxQuantity: 40})
	// eg: interpolate('Quantity of {name} can not be less than {maxQuantity}.', {name: function(name){return name.toUpperCase();}, maxQuantity: 40})
	function interpolate() {
	  var args = Array.prototype.slice.call(arguments);
	  var str = args.shift();
	  var context = args[0];
	  var toString = Object.prototype.toString;

	  context = args.length === 1 ? context !== null && /\[object Array\]|\[object Object\]/.test(toString.call(context)) ? context : args : args;

	  return str.replace(/{([\s\S]+?)}/g, function (match, interpolateStr) {
	    var replacer = context[interpolateStr];

	    if (toString.call(replacer) === '[object Function]') {
	      replacer = replacer(interpolateStr);
	    }

	    return replacer === null || replacer === void 0 ? '' : replacer;
	  });
	}
	module.exports = exports['default'];

/***/ },

/***/ 308:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildUrl;
	// buildUrl('http://www.a.com/?a=1', {
	//   b: 1,
	//   c: 'khalil zhang'
	// }); -- http://www.a.com/?a=1&b=1&c=khalil%20zhang
	function buildUrl(url, params) {
	  var q = [];
	  for (var key in params) {
	    q.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
	  }
	  if (q.length !== 0) {
	    var sep = url.indexOf('?') === -1 ? '?' : '&';
	    url = url + sep + q.join('&'); // eslint-disable-line no-param-reassign
	  }

	  return url;
	}
	module.exports = exports['default'];

/***/ }

/******/ })
});
;