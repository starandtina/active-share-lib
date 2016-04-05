if (typeof define !== 'function') {
  var define = require('amdefine')(module, require);
}

define(function (require, exports, module) {
  const $ = require('jquery');

  function GlobalHeader() {
    this.initialize = function (context) {
      // var components = context.getComponents()
    }
  }

  GlobalHeader.render = function (event) {
    const $html = event.get$Html();
    const $button = $(`<div class='global-header__button' data-render='mock/Button'></div>`);

    $html.append(`<h1>GlobalHeader loaded</h1>`);
    $html.append($button);

    event.addToRenderQueue($button);
  }

  module.exports = GlobalHeader;
});
