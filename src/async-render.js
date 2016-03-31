import 'babel-polyfill';

function renderComponent() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Hello World!')
    }, 1000);
  });
}

export default async function render() {
  var file = await renderComponent();

  console.log(file);
}
