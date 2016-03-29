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

var getChannel = function (string, prefix) {
  prefix = prefix || 'on';
  return prefix + capitalize(string);
};

/**
 * A convenience method that listens to all listenables in the given object.
 *
 * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
 */
export default {
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
    var unsubscriber = function () {
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
  listenToMany: function (listenables) {
    var allListenables = flattenListenables(listenables);
    for (var key in allListenables) {
      var channel = getChannel(key);
      var callbackName = this[channel] ? channel : this[key] ? key : undefined;
      if (callbackName) {
        this.listenToActionOrStore(
          allListenables[key],
          callbackName
        );
      }
    }
  }
};
