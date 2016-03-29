import Backbone from 'backbone'
import _ from 'underscore'
import FluxListenerMixin from './ListenerMixin'
import FluxEventEmitter from './EventEmitter'
import EventEmitter from 'eventemitter3'

var modelSpec = _.extend({}, {
  constructor: function () {
    this.emitter = new EventEmitter();
    this.eventEmitterToken = 'store-change';
    if (this.listenables) {
      var arr = [].concat(this.listenables);
      for (var i = 0; i < arr.length; i++) {
        this.listenToMany(arr[i]);
      }
    }

    Backbone.Model.apply(this, arguments);
  }
}, FluxListenerMixin, FluxEventEmitter);

export default Backbone.Model.extend(modelSpec);
