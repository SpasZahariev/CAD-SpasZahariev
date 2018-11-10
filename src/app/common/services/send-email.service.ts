import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MailService } from '@sendgrid/mail';

// const sgMail = MailService;


@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private postEmailURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/postEmail';

  constructor (private http: HttpClient) {}

  // sending an email message to multiple addresses using SendGrid
  public sendMultiple(recipients: string[], sender: string, text: string) {

    const params = {
      recipients: recipients,
      sender: sender,
      text: text
    };

      this.http
      .post(this.postEmailURL, params, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => location.reload(),
        err => console.log('Error occurred: ' + err.message)
      );
  }
}
