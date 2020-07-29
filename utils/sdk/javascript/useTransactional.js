if (!process.env.GITHUB_ACTION) {
  require('dotenv').config();
}

const MailchimpTransactional = require('@postlight/transactional_sdk_playground');
const api = new MailchimpTransactional.DefaultApi();

// eventually we'll want to use a template that returns Promises rather than uses callbacks,
// but for now, let's make a convenience wrapper
const pingAsync = () => {
  return new Promise((resolve, reject) => {
    api.postUsersPing(
      { key: process.env.TRANSACTIONAL_KEY },
      (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          if (response.ok) {
            resolve(data ? data : response.text);
          } else {
            reject(new Error(`Status code ${response.status}`));
          }
        }
      }
    );
  });
};

const run = async () => {
  try {
    const res = await pingAsync();
    console.log(`Got ping response: ${res}`);
  } catch (err) {
    console.log(`Error getting ping: ${err.message}`);
  }
};

run();
