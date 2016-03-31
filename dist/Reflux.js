(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["ActiveShareLib"] = factory(require("backbone"), require("underscore"));
	else
		root["ActiveShareLib"] = factory(root["backbone"], root["underscore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ActionCreator = __webpack_require__(8);

	var _StoreCreator = __webpack_require__(11);

	var _StoreCreator2 = _interopRequireDefault(_StoreCreator);

	var _Model = __webpack_require__(12);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Reflux = {};

	Reflux.createAction = _ActionCreator.createAction;

	Reflux.createActions = _ActionCreator.createActions;

	Reflux.createStore = _StoreCreator2.default;

	Reflux.Model = _Model2.default;

	exports.default = Reflux;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createActions = exports.createAction = undefined;

	var _EventEmitter = __webpack_require__(9);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _eventemitter = __webpack_require__(10);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var allowed = {
	  preEmit: 1,
	  shouldEmit: 1
	};

	// Creates an action functor object
	function createAction(options) {
	  options = options || {};

	  if (!_.isObject(options)) {
	    options = {
	      actionName: options
	    };
	  }

	  for (var d in options) {
	    if (!allowed[d] && _EventEmitter2.default[d]) {
	      throw new Error("Cannot override API method " + d + " in action creation. Use another method name instead.");
	    }
	  }

	  var i = 0;
	  var childActions = {};
	  options.children = options.children || [];
	  for (; i < options.children.length; i++) {
	    var name = options.children[i];
	    childActions[name] = createAction(name);
	  }

	  var context = _.defaults({
	    eventEmitterToken: 'action',
	    emitter: _.extend({}, new _eventemitter2.default())
	  }, _EventEmitter2.default, new _eventemitter2.default(), options);

	  var functor = function functor() {
	    return functor.emit.apply(functor, arguments);
	  };

	  // Extending `context` and `childActions` so we can access child actions using `this` in action listener
	  _.extend(functor, context, childActions);

	  return functor;
	}

	var createActions = function () {
	  var reducer = function reducer(definitions, actions) {
	    var keys = _.keys(definitions);
	    _.forEach(keys, function (actionName) {
	      var val = definitions[actionName];
	      actions[actionName] = createAction(val);
	    });
	  };

	  return function (definitions) {
	    var actions = {};
	    if (_.isArray(definitions)) {
	      definitions.forEach(function (val) {
	        if (_.isObject(val)) {
	          reducer(val, actions);
	        } else {
	          actions[val] = createAction(val);
	        }
	      });
	    } else {
	      reducer(definitions, actions);
	    }
	    return actions;
	  };
	}();

	exports.createAction = createAction;
	exports.createActions = createActions;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  /**
	   * Hook used by the publisher that is invoked before emitting
	   * and before `shouldEmit`. The arguments are the ones that the action
	   * is invoked with. If this function returns something other than
	   * undefined, that will be passed on as arguments for shouldEmit and
	   * emission.
	   */
	  preEmit: function preEmit() {},

	  /**
	   * Hook used by the publisher after `preEmit` to determine if the
	   * event should be emitted with given arguments. This may be overridden
	   * in your application, default implementation always returns true.
	   *
	   * @returns {Boolean} true if event should be emitted
	   */
	  shouldEmit: function shouldEmit() {
	    return true;
	  },

	  /**
	   * Subscribes the given callback for action triggered
	   *
	   * @param {Function} callback The callback to register as event handler
	   * @param {Mixed} [optional] bindContext The context to bind the callback with
	   * @returns {Function} Callback that unsubscribes the registered event handler
	   */
	  listen: function listen(callback, bindContext) {
	    bindContext = bindContext || this;

	    var eventHandler = function eventHandler(args) {
	      if (aborted) {
	        return;
	      }
	      callback.apply(bindContext, args);
	    };
	    var me = this;
	    var aborted = false;

	    this.emitter.on(this.eventEmitterToken, eventHandler);

	    return function () {
	      aborted = true;
	      me.emitter.off(me.eventEmitterToken, eventHandler);
	    };
	  },

	  /**
	   * Publishes an event (if `shouldEmit` agrees)
	   */
	  emit: function emit() {
	    var args = arguments;
	    var pre = this.preEmit.apply(this, args);

	    args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
	    if (this.shouldEmit.apply(this, args)) {
	      this.emitter.emit(this.eventEmitterToken, args);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createStore;

	var _Model = __webpack_require__(12);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createStore(options) {
	  var Store = _Model2.default.extend(options);

	  return new Store();
	}
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(3);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _ListenerMixin = __webpack_require__(13);

	var _ListenerMixin2 = _interopRequireDefault(_ListenerMixin);

	var _EventEmitter = __webpack_require__(9);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _eventemitter = __webpack_require__(10);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modelSpec = _underscore2.default.extend({}, {
	  constructor: function constructor() {
	    this.emitter = new _eventemitter2.default();
	    this.eventEmitterToken = 'store-change';
	    if (this.listenables) {
	      var arr = [].concat(this.listenables);
	      for (var i = 0; i < arr.length; i++) {
	        this.listenToMany(arr[i]);
	      }
	    }

	    _backbone2.default.Model.apply(this, arguments);
	  }
	}, _ListenerMixin2.default, _EventEmitter2.default);

	exports.default = _backbone2.default.Model.extend(modelSpec);
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * Extract child listenables from a parent from their
	 * children property and return them in a keyed Object
	 *
	 * @param {Object} listenable The parent listenable
	 */
	var mapChildListenables = function mapChildListenables(listenable) {
	  var children = {};
	  var childName;
	  for (var i = 0; i < (listenable.children || []).length; ++i) {
	    childName = listenable.children[i];
	    if (listenable[childName]) {
	      children[childName] = listenable[childName];
	    }
	  }
	  return children;
	};

	/**
	 * Make a flat dictionary of all listenables including their
	 * possible children (recursively), concatenating names in camelCase.
	 *
	 * @param {Object} listenables The top-level listenables
	 */
	var flattenListenables = function flattenListenables(listenables) {
	  var flattened = {};
	  for (var key in listenables) {
	    var listenable = listenables[key];
	    var childMap = mapChildListenables(listenable);

	    // recursively flatten children
	    var children = flattenListenables(childMap);

	    // add the primary listenable and chilren
	    flattened[key] = listenable;
	    for (var childKey in children) {
	      var childListenable = children[childKey];
	      flattened[key + capitalize(childKey)] = childListenable;
	    }
	  }

	  return flattened;
	};

	var getChannel = function getChannel(string, prefix) {
	  prefix = prefix || 'on';
	  return prefix + capitalize(string);
	};

	/**
	 * A convenience method that listens to all listenables in the given object.
	 *
	 * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
	 */
	exports.default = {
	  /**
	   * Sets up a subscription to the given listenable for the context object
	   *
	   * @param {Action|Store} listenable An Action or Store that should be listened to.
	   * @param {Function|String} callback The callback to register as event handler
	   * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
	   */
	  listenToActionOrStore: function listenToActionOrStore(listenable, callback) {
	    if (!listenable || !_.isFunction(listenable, 'listen')) {
	      return;
	    }

	    var subs = this.subscriptions = this.subscriptions || [];
	    var desub = listenable.listen(this[callback] || callback, this);
	    var unsubscriber = function unsubscriber() {
	      var index = subs.indexOf(subscriptionObj);
	      if (index === -1) {
	        return;
	      }
	      subs.splice(index, 1);
	      desub();
	    };
	    var subscriptionObj = {
	      stop: unsubscriber,
	      listenable: listenable
	    };
	    subs.push(subscriptionObj);
	    return subscriptionObj;
	  },

	  /**
	   * Stops listening to a single listenable
	   *
	   * @param {Action|Store} listenable The action or store we no longer want to listen to
	   * @returns {Boolean} True if a subscription was found and removed, otherwise false.
	   */
	  stopListeningTo: function stopListeningTo(listenable) {
	    var subs = this.subscriptions || [];
	    for (var i; i < subs.length; i++) {
	      var sub = subs[i];
	      if (sub.listenable === listenable) {
	        sub.stop();
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Stops all subscriptions and empties subscriptions array
	   */
	  stopListeningToAll: function stopListeningToAll() {
	    var remaining;
	    var subs = this.subscriptions || [];
	    while (remaining = subs.length) {
	      subs[0].stop();
	    }
	  },
	  /**
	   * Listen to many actions at the same time
	   */
	  listenToMany: function listenToMany(listenables) {
	    var allListenables = flattenListenables(listenables);
	    for (var key in allListenables) {
	      var channel = getChannel(key);
	      var callbackName = this[channel] ? channel : this[key] ? key : undefined;
	      if (callbackName) {
	        this.listenToActionOrStore(allListenables[key], callbackName);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;