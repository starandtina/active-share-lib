import test from 'tape'

import $ from 'jquery'
import render from '../src/async-render'
import requirejs from 'requirejs'
import GlobalHeader from './mock/GlobalHeader'

test('asyn-render', function (t) {
  t.plan(4);

  const globalHeaderId = 'global-header';

  requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require
  });

  const componentHTML = `<div id='${globalHeaderId}' data-render='mock/GlobalHeader'>GlobalHeader Placeholder<div data-render='mock/Button'></div></div>`;

  render($(componentHTML), function (components) {
    const c = components[0];
    // console.log(components)
    const ComponentConstructor = c.Component;
    const $componentDOM = c.$componentDOM;

    t.equal($componentDOM.text(), 'GlobalHeader loaded', 'The combined text contents of GlobalHeader component is "GlobalHeader loaded"');
    t.equal($componentDOM.data('rendered'), true, 'GlobalHeader component should has been rendered with "data-rendered" as true')
    t.equal($componentDOM.attr('id'), globalHeaderId, `GlobalHeader component should has id of ${globalHeaderId}`);
    t.ok($componentDOM.data('_impl') instanceof ComponentConstructor, 'The custom data "_impl" of Component DOM stores the instance of Component');
  });
});
