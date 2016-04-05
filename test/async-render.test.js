import test from 'tape'

import $ from 'jquery'
import render from '../src/async-render'
import requirejs from 'requirejs'
import GlobalHeader from './mock/GlobalHeader'
import GlobalHeaderWithAddToRenderQueue from './mock/GlobalHeaderWithAddToRenderQueue'


requirejs.config({
  baseUrl: __dirname,
  nodeRequire: require
});

test('asyn-render', function (t) {
  t.plan(4);

  const globalHeaderId = 'global-header';
  const componentHTML = `<div id='${globalHeaderId}' data-render='mock/GlobalHeader'>GlobalHeader Placeholder<div data-render='mock/Button'></div></div>`;

  render($(componentHTML), function (context) {
    const components = context.components;
    const c = components[0];
    const ComponentConstructor = c.Component;
    const $componentDOM = c.$componentDOM;

    t.equal($componentDOM.text(), 'GlobalHeader loaded', 'The combined text contents of GlobalHeader component is "GlobalHeader loaded"');
    t.equal($componentDOM.data('rendered'), true, 'GlobalHeader component should has been rendered with "data-rendered" as true')
    t.equal($componentDOM.attr('id'), globalHeaderId, `GlobalHeader component should has id of ${globalHeaderId}`);
    t.ok($componentDOM.data('_impl') instanceof ComponentConstructor, 'The custom data "_impl" of Component DOM stores the instance of Component');
  });
});


test('asyn-render#addToRenderQueue', function (t) {
  t.plan(2);

  const globalHeaderId = 'global-header';
  const componentHTML = `<div id='${globalHeaderId}' data-render='mock/GlobalHeaderWithAddToRenderQueue'>GlobalHeader Placeholder<div data-render='mock/Button'></div></div>`;

  render($(componentHTML), function (context) {
    const components = context.components;
    const globalHeader = context.getComponents()[globalHeaderId];

    const c = components[0];
    const ComponentConstructor = c.Component;
    const $componentDOM = c.$componentDOM;

    t.deepEqual(globalHeader, $componentDOM.data('_impl'), 'We could get component through `getComponents` API which returns map of rendered components');
    t.equal($componentDOM.find('.global-header__button').length, 1, 'We should have rendered the Button added through method of `addToRenderQueue`');
  });
});
