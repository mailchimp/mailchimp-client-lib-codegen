if (!process.env.GITHUB_ACTION) {
  require('dotenv').config();
}

const MailchimpMarketing = require('@postlight/mailchimp_sdk_playground');
const api = new MailchimpMarketing.DefaultApi();

const defaultClient = MailchimpMarketing.ApiClient.instance;

// configure basic auth
const auth = defaultClient.authentications['basicAuth'];
auth.username = process.env.MARKETING_USER;
auth.password = process.env.MARKETING_PASS;

// eventually we'll want to use a template that returns Promises rather than uses callbacks,
// but for now, let's make a convenience wrapper
const pingAsync = () => {
  return new Promise((resolve, reject) => {
    api.getPing((err, data, response) => {
      if (err) {
        reject(err);
      } else {
        if (response.ok) {
          resolve(data ? data : response.text);
        } else {
          reject(new Error(`Status code ${response.status}`));
        }
      }
    });
  });
};

const run = async () => {
  try {
    const res = await pingAsync();
    console.log(`Got ping response:\n\n${JSON.stringify(res)}`);
  } catch (err) {
    console.log(`Error getting ping: ${err.message}`);
  }
};

run();
