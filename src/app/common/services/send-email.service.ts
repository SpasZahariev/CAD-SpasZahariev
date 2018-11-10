import { Injectable } from '@angular/core';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);

@Injectable()
export class SendEmailService {

  // sending an email message to multiple addresses using SendGrid
  public sendMultiple(emails: string[], content: string) {
    const msg = {
      to: 'spaszahariev54@gmail.com',
      from: 'spas.zah@gmail.com',
      subject: 'Cloud Application Development',
      text: 'hi, hoping this works - spas z.',
      html: content
    };
    sgMail.sendMultiple(msg);
  }
}
