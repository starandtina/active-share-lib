(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("jquery"), require("underscore"), require("html-wrapper"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone", "jquery", "underscore", "html-wrapper"], factory);
	else if(typeof exports === 'object')
		exports["ActiveShareLib"] = factory(require("backbone"), require("jquery"), require("underscore"), require("html-wrapper"));
	else
		root["ActiveShareLib"] = factory(root["backbone"], root["jquery"], root["underscore"], root["html-wrapper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _backbone = __webpack_require__(3);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _htmlWrapper = __webpack_require__(6);

	var _htmlWrapper2 = _interopRequireDefault(_htmlWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function stopListening(target) {
	  if (target) {
	    if (_underscore2.default.isFunction(target.stopListening)) {
	      target.stopListening();
	    }
	    if (_underscore2.default.isFunction(target.stopListeningToAll)) {
	      target.stopListeningToAll();
	    }
	  }
	}

	_backbone2.default.View.prototype.close = function () {
	  // Disposing arch-html components and call `dispose` method on every component if exists
	  _underscore2.default.chain(this.$el.find('[data-render]').toArray()).filter(function (componentDOM) {
	    return (0, _jquery2.default)(componentDOM).data('_impl');
	  }).map(function (componentDOM) {
	    return _htmlWrapper2.default.getComponent(componentDOM);
	  }).compact().filter(function (component) {
	    return _underscore2.default.isFunction(component['dispose']);
	  }).invoke('dispose');

	  // Your custom clean code placed here
	  if (this.onClose) {
	    this.onClose();
	  }

	  // `stopListening` on Model and Collection
	  stopListening.call(this, this.model);
	  stopListening.call(this, this.collection);

	  // Remove this view by taking the element out of the DOM, and removing any
	  // applicable Backbone.Events listeners.
	  this.$el.remove();
	  this.stopListening();

	  // Off any events that current view is bound to
	  this.off();

	  return this;
	};

	var BackboneBaseView = function (_Backbone$View) {
	  _inherits(BackboneBaseView, _Backbone$View);

	  function BackboneBaseView(options) {
	    _classCallCheck(this, BackboneBaseView);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BackboneBaseView).call(this, options));

	    _this.name = null;
	    _this.parentView = null;


	    _underscore2.default.bindAll.apply(_underscore2.default, [_this].concat(_underscore2.default.functions(_this)));

	    _this.options = _underscore2.default.extend(_this.options || {}, options || {});
	    _this.name = _this.name || _underscore2.default.uniqueId('view');

	    var mixins = [].concat(_this.mixins);
	    _underscore2.default.forEach(mixins, function (mixin) {
	      _underscore2.default.extend(this, mixin);
	    }, _this);
	    return _this;
	  }

	  _createClass(BackboneBaseView, [{
	    key: 'getInnerHtml',
	    value: function getInnerHtml() {
	      var template = this.getTemplate();
	      var data = this.getTemplateData();

	      this._preRender();

	      if (template == null) {
	        throw new Error(this.name + ": template \"" + this.getTemplateName() + "\" not found.");
	      }

	      return _htmlWrapper2.default.localize.parse(template(data));
	    }
	  }, {
	    key: 'getTemplate',
	    value: function getTemplate() {
	      return this.template;
	    }
	  }, {
	    key: 'getTemplateName',
	    value: function getTemplateName() {
	      return this.name;
	    }
	  }, {
	    key: 'getTemplateData',
	    value: function getTemplateData() {
	      var data;
	      var parsedOptions;

	      if (this.model) {
	        data = this.model.toJSON();
	      } else if (this.collection) {
	        data = {
	          models: this.collection.toJSON(),
	          meta: this.collection.meta,
	          params: this.collection.params
	        };
	      }

	      // Remove options that are duplicates in the templates
	      parsedOptions = _underscore2.default.omit(this.options, ['model', 'collection', 'meta', 'params']);

	      return _underscore2.default.extend({}, data, parsedOptions);
	    }
	  }, {
	    key: 'getAttributes',
	    value: function getAttributes() {
	      var attributes = {};

	      attributes['data-view'] = this.name;

	      return attributes;
	    }
	  }, {
	    key: '_preRender',
	    value: function _preRender() {
	      this.trigger('preRender');
	    }
	  }, {
	    key: '_postRender',
	    value: function _postRender() {
	      this.removeChildViews();
	      this.addReferences();
	      this.trigger('postRender');

	      return this;
	    }
	  }, {
	    key: '_preRenderComponents',
	    value: function _preRenderComponents() {
	      this.trigger('preRenderComponents');
	    }
	  }, {
	    key: '_postRenderComponents',
	    value: function _postRenderComponents() {
	      var hash = this._references || _underscore2.default.result(this, 'references');

	      for (var item in hash) {
	        this[item] = _htmlWrapper2.default.getComponent(this.$(hash[item]));
	      }
	      this.trigger('postRenderComponents');
	    }
	  }, {
	    key: 'onRenderComponentsDone',
	    value: function onRenderComponentsDone() {
	      _htmlWrapper2.default.app.applyPermissionsToHtml(this.$el);
	      _htmlWrapper2.default.app.applyFeaturesToHtml(this.$el);
	      this._postRenderComponents();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var html = this.getInnerHtml();

	      this.$el.html(html);
	      this.$el.attr(this.getAttributes());
	      this._postRender();

	      this._preRenderComponents();
	      _htmlWrapper2.default.render(this.$el, function () {
	        return _this2.onRenderComponentsDone();
	      });

	      return this;
	    }
	  }, {
	    key: 'preRender',
	    value: function preRender() {}
	  }, {
	    key: 'postRender',
	    value: function postRender() {}
	  }, {
	    key: 'preRenderComponents',
	    value: function preRenderComponents() {}
	  }, {
	    key: 'postRenderComponents',
	    value: function postRenderComponents() {}
	  }, {
	    key: 'registerChildView',
	    value: function registerChildView(view, name) {
	      var childViews = this.getChildViews();
	      // Storage for our child view
	      name = name || view.cid;
	      childViews[name] = view;

	      if (view.el) {
	        view.parent = view.parentView = this;
	      }

	      return view;
	    }

	    // Proxy for `registerChildView`

	  }, {
	    key: 'registerSubview',
	    value: function registerSubview() {
	      this.registerChildView.apply(this, arguments);
	    }
	  }, {
	    key: 'renderChildViews',
	    value: function renderChildViews(selector, view) {
	      var selectors;

	      if (_underscore2.default.isObject(selector)) {
	        selectors = selector;
	      } else {
	        selectors = {};
	        selectors[selector] = view;
	      }

	      if (!selectors) return;

	      _underscore2.default.each(selectors, function (view, selector) {
	        // create a reference back to this (parent) view
	        view.parent = view.parentView = this;
	        view.selector = selector;

	        if (view.appendToParent) {
	          view.name = selector;
	          view.render();
	          this.$el.append(view.el);
	        } else {
	          // change the view's element (`this.el` property), including re-delegation events
	          view.setElement(this.$(selector)).render();
	        }
	        // cache the childViews in order to remove it when exiting
	        this.registerChildView(view);
	      }, this);

	      return this;
	    }
	  }, {
	    key: 'assign',
	    value: function assign() {
	      this.renderChildViews.apply(this, arguments);
	    }
	  }, {
	    key: 'where',
	    value: function where(attrs, first) {
	      var matches = _underscore2.default.matches(attrs);
	      var childViews = this.getChildViews();
	      return this[first ? 'find' : 'filter'](childViews, function (childView) {
	        return matches(childView);
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find() {
	      return _underscore2.default.find.apply(_underscore2.default, arguments);
	    }
	  }, {
	    key: 'filter',
	    value: function filter() {
	      return _underscore2.default.filter.apply(_underscore2.default, arguments);
	    }
	  }, {
	    key: 'findWhere',
	    value: function findWhere(attrs) {
	      return this.where(attrs, true);
	    }
	  }, {
	    key: 'getChildViewsByName',
	    value: function getChildViewsByName(name) {
	      return this.where({
	        name: name
	      });
	    }
	  }, {
	    key: 'getChildViewByName',
	    value: function getChildViewByName(name) {
	      return this.findWhere({
	        name: name
	      });
	    }
	  }, {
	    key: 'getChildViewBySelector',
	    value: function getChildViewBySelector(selector) {
	      return this.findWhere({
	        selector: selector
	      });
	    }
	  }, {
	    key: 'getSubViewBySelector',
	    value: function getSubViewBySelector() {
	      return this.getChildViewBySelector.apply(this, arguments);
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(channel) {
	      if (_underscore2.default.isFunction(this[channel])) {
	        this[channel].apply(this, [].slice.call(arguments, 1));
	      }

	      _backbone2.default.View.prototype.trigger.apply(this, arguments);

	      return this;
	    }

	    // Rendering a collections with individual views.
	    // Just pass it the collection, and the view to use for the items in the
	    // collection.

	  }, {
	    key: 'renderCollection',
	    value: function renderCollection(collection, ViewClass, container, opts) {
	      var self = this;
	      var views = [];
	      var options = _underscore2.default.defaults(opts || {}, {
	        filter: null,
	        viewOptions: {},
	        reverse: false
	      });
	      var containerEl = this.$(container);

	      function getViewBy(model) {
	        return _underscore2.default.find(views, function (view) {
	          return model === view.model;
	        });
	      }

	      function addView(model, index, collection) {
	        var matches = options.filter ? options.filter(model) : true;
	        var view;

	        if (matches) {
	          model.set('_isLast', collection.length - 1 === index, {
	            silent: true
	          });
	          view = getViewBy(model);
	          if (!view) {
	            view = new ViewClass(_underscore2.default.chain({
	              model: model,
	              collection: collection
	            }).extend(options.viewOptions).value());
	            views.push(view);
	            view.parent = self;
	            view.renderedByParentView = true;
	            view.render({
	              containerEl: container
	            });
	            // store a reference on the view to it's collection views
	            // so we can clean up memory references when we're done
	            self.registerChildView(view);
	          }
	          // give the option for the view to choose where it's inserted if you so choose
	          if (!view.insertSelf) containerEl[options.reverse ? 'prepend' : 'append'](view.el);
	          view.delegateEvents();
	        }
	      }

	      function reRender() {
	        if (collection.length === 0) {
	          return;
	        }
	        var parent = containerEl[0];
	        // Damn it! IE 8 will throw error here as whether the slice function can be applied successfully to a host object is implementation-dependent.
	        // var childNodes = Array.prototype.slice.call(parent.childNodes);
	        var childNodes = _underscore2.default.toArray(parent.childNodes);
	        _underscore2.default.each(childNodes, function (child) {
	          parent.removeChild(child);
	        });
	        collection.each(addView);
	      }
	      this.listenTo(collection, 'add', addView);
	      this.listenTo(collection, 'remove', function (model) {
	        var index = views.indexOf(getViewBy(model));
	        if (index !== -1) {
	          views.splice(index, 1)[0].remove();
	        }
	      });
	      this.listenTo(collection, 'move sort', reRender);
	      this.listenTo(collection, 'refresh reset', function () {
	        while (views.length) {
	          views.pop().remove();
	        }
	        reRender();
	      });
	      reRender();
	    }
	  }, {
	    key: 'addReferences',
	    value: function addReferences(hash) {
	      hash = hash || _underscore2.default.result(this, 'references');

	      this._references = _underscore2.default.defaults({}, this._references, hash);

	      for (var item in hash) {
	        this['$' + item] = this.$(hash[item]);
	      }
	    }

	    // Reducing boilerplate and set up one-one releation between DOM and component

	  }, {
	    key: 'references',
	    value: function references() {
	      return _underscore2.default.reduce(_underscore2.default.result(this, 'dom') || {}, function (memo, v, k) {
	        memo[_underscore2.default.camelize(k.toLocaleLowerCase())] = v;

	        return memo;
	      }, {});
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      // Disposing view hierarchies
	      this.removeChildViews();
	      this.childViews = null;
	      this.parentView = null;

	      // Prefer to use `listenTo` instead of `this.model.on` but we should prevent it from memory leak
	      var obj = this.model || this.collection;

	      if (obj) {
	        obj.off(null, null, this);
	      }

	      // Removing current view out of the DOM
	      // Stop listening any events binding through `listenTo`
	      this.close();
	    }

	    // Refer to **fnd/arch/events/NavExitEvent** for argument of navExitEvent

	  }, {
	    key: 'exit',
	    value: function exit(navExitEvent) {
	      this.remove();

	      // 1. Empty **#navigationContainer**
	      // 2. Navigate to a brand path
	      navExitEvent && navExitEvent.complete();
	    }
	  }, {
	    key: 'removeChildViews',
	    value: function removeChildViews() {
	      _underscore2.default.forEach(this.getChildViews(), function (childView, name) {
	        this.removeChildView(childView, name);
	      }, this);

	      return this;
	    }
	  }, {
	    key: 'removeChildView',
	    value: function removeChildView(childView, name) {
	      name = name || childView.cid;

	      if (childView && _underscore2.default.isFunction(childView.close)) {
	        childView.close();
	      }

	      var childViews = this.getChildViews();

	      delete childViews[name];
	    }
	  }, {
	    key: 'getChildViews',
	    value: function getChildViews() {
	      this.childViews = this.childViews || {};

	      return this.childViews;
	    }

	    // Used by `active.navigator` as an entry point

	  }, {
	    key: 'enter',
	    value: function enter() {
	      this.render();

	      return this.$el;
	    }
	  }]);

	  return BackboneBaseView;
	}(_backbone2.default.View);

	exports.default = BackboneBaseView;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});
;