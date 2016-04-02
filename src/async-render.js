import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

function renderComponent() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Hello World!')
    }, 1000);
  });
}

export default async function render() {
  var file = await renderComponent();
  main();
  console.log(file);
}

function getUser(cb) {
  return new Promise((resolve, reject) => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(quote => {
        if (typeof cb === 'function') {
          cb(quote)
        }
        resolve(quote)
      })
      .catch(reject);
  });
}

function printMessage(msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve(msg);
    }, 2000);
  });
}

async function main() {
  try {
    console.log('Gonna get a quote');
    const quote = await getUser();
    console.log(quote);
    await printMessage('test msg');
    console.log('a message was printed after 2s');
  } catch (error) {
    console.error(error);
  }
}
