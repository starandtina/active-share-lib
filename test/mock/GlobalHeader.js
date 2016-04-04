if (typeof define !== 'function') {
  var define = require('amdefine')(module, require);
}

define(function (require, exports, module) {
  function GlobalHeader() {
    this.initialize = function (context) {
      // var components = context.getComponents()
    }
  }

  GlobalHeader.render = function (event) {
    var $html = event.get$Html();
    $html.html('<h1>GlobalHeader loaded</h1>');
  }

  module.exports = GlobalHeader;
});
