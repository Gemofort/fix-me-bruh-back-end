// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
const config = require('config');

sgMail.setApiKey(config.get('sendGrid').apiKey);

exports.sendEmail = async (templateId, to, body) => {
  await sgMail.send({
    templateId,
    to,
    dynamicTemplateData: body,
    from: `${config.get('sendGrid.baseEmail')}`,
  });
};
