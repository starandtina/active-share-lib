export default {
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
