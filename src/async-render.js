import 'babel-polyfill'

import $ from 'jquery'
import requirejs from 'requirejs'


function renderComponent($componentDOM) {
  return new Promise((resolve, reject) => {
    const renderer = $componentDOM.data('render');

    requirejs([renderer], function (Component) {
      const isRendered = $componentDOM.data('rendered');

      if (!isRendered) {
        Component.render({
          get$Html() {
            return $componentDOM;
          }
        });
        $componentDOM.data('rendered', true);
      }

      resolve({
        Component: Component,
        $componentDOM: $componentDOM
      });
    });
  });
}

function createQueue($el) {
  let $queue = $el.find('[data-render]');

  $el.each(function (index, componentDOM) {
    const $componentDOM = $(componentDOM);
    const componentRenderer = $componentDOM.data('render');

    if (componentRenderer) {
      $queue = $queue.add($componentDOM);
    }
  });

  return $queue.sort(function (a, b) {
    const aDepth = $(a).parentsUntil($el.parent()).length;
    const bDepth = $(b).parentsUntil($el.parent()).length;

    // If `b` is more deeper than `a` in DOM tree, then it will be placed after `a`
    return aDepth - bDepth;
  }).toArray();
}

export default async function render($el, callback) {
  try {
    const componentsQueue = createQueue($el);
    const renderPromises = componentsQueue.map((componentDOM) => renderComponent($(componentDOM)));
    const components = await Promise.all(renderPromises);

    for (let c of components) {
      const ComponentConstructor = c.Component;
      const $componentDOM = c.$componentDOM;

      const componentInstance = new ComponentConstructor($componentDOM);
      $componentDOM.data('_impl', componentInstance);

      componentInstance.initialize();
    }

    if (typeof callback === 'function') {
      callback(components);
    }

  } catch (err) {
    console.error(err);
  }
}
