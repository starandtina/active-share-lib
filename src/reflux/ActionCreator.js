import FluxEventEmitter from './EventEmitter'
import EventEmitter from 'eventemitter3'

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
    if (!allowed[d] && FluxEventEmitter[d]) {
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
    emitter: _.extend({}, new EventEmitter())
  }, FluxEventEmitter, new EventEmitter(), options);

  var functor = function functor() {
    return functor.emit.apply(functor, arguments);
  };

  // Extending `context` and `childActions` so we can access child actions using `this` in action listener
  _.extend(functor, context, childActions);

  return functor;
}

var createActions = (function () {
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
})();

export { createAction, createActions }
