import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
        res => console.log('email successfully sent'),
        err => console.log('Error occurred: ' + err.message)
      );
  }
}
