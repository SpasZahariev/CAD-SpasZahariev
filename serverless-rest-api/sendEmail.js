const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'spaszahariev54@gmail.com',
  from: 'spas.zah@gmail.com',
  subject: 'Another one',
  text: 'hi, hoping this works - spas z.',
  html: '<strong>I am not even sure what this is for</strong>',
};
sgMail.send(msg);
