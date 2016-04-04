if (typeof define !== 'function') {
  var define = require('amdefine')(module, require);
}

define(function (require, exports, module) {
  function Button() {
    this.initialize = function () {
    }
  }

  Button.render = function (event) {
    var $html = event.get$Html();
    $html.html('<button type="button">Button</button>');
  }

  module.exports = Button;
});
