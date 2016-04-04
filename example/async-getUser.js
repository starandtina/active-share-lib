import fetch from 'isomorphic-fetch'

function getUser(cb) {
  return new Promise((resolve, reject) => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(user => {
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
    console.log('Gonna get a user');
    const user = await getUser();
    console.log(user);
    await printMessage('test msg');
    console.log('a message was printed after 2s');
  } catch (error) {
    console.error(error);
  }
}
