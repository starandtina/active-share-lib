import 'babel-polyfill'

import $ from 'jquery'
import requirejs from 'requirejs'


function renderComponent($componentDOM) {
  return new Promise((resolve, reject) => {
    const renderer = $componentDOM.data('render');
    let isCallingAddToRenderQueue = false;

    requirejs([renderer], function (Component) {
      const isRendered = $componentDOM.data('rendered');

      if (!isRendered) {
        Component.render({
          get$Html() {
              return $componentDOM;
            },
            getElement() {
              return $componentDOM;
            },
            render($el) {

            },
            addToRenderQueue($el) {
              isCallingAddToRenderQueue = true;
              render($el, () => {
                isCallingAddToRenderQueue = false;
                resolve({
                  Component: Component,
                  $componentDOM: $componentDOM
                });
              })
            },
            complete() {}
        });
        $componentDOM.data('rendered', true);
      }

      if (!isCallingAddToRenderQueue) {
        resolve({
          Component: Component,
          $componentDOM: $componentDOM
        });
      }
    });
  });
}

function createRenderQueue($el) {
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

async function render($el, callback) {
  try {
    const componentsQueue = createRenderQueue($el);
    const renderPromises = componentsQueue.map((componentDOM) => renderComponent($(componentDOM)));
    const components = await Promise.all(renderPromises);
    const componentsMap = {};
    const callbackContext = {
      components: components,
      getComponents() {
        return componentsMap;
      }
    };

    for (let c of components) {
      const ComponentConstructor = c.Component;
      const $componentDOM = c.$componentDOM;
      const componentId = $componentDOM.attr('id');
      const componentInstance = new ComponentConstructor($componentDOM);

      $componentDOM.data('_impl', componentInstance);

      if (componentId) {
        componentsMap[componentId] = componentInstance;
      }

      componentInstance.initialize(callbackContext);
    }

    if (typeof callback === 'function') {
      callback(callbackContext);
    }
  } catch (err) {
    console.error(err);
  }
}

export default render;
