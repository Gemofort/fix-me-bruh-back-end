// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
const config = require('config');

sgMail.setApiKey(config.get('sendGrid').apiKey);

module.exports = async (to, from, subject, text, html) => {
  //   const msg = {
  //     to: 'test@example.com',
  //     from: 'test@example.com',
  //     subject: 'Sending with Twilio SendGrid is Fun',
  //     text: 'and easy to do anywhere, even with Node.js',
  //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   };

  await sgMail.send({
    to,
    from,
    subject,
    text,
    html,
  });
};
