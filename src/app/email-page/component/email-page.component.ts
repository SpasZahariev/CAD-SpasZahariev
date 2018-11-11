import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { IMessage, IAccessCookie } from 'src/app/common/interfaces/interfaces';
import { SendEmailService } from 'src/app/common/services/send-email.service';
import { CookieService } from 'ngx-cookie-service';
import { ProjectCardComponent } from 'src/app/dashboard-page/project-card/component/project-card.component';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.css']
})
export class EmailPageComponent implements OnInit {
  visible = true;
  public textForm = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: IMessage[] = [];

  constructor(
    private emailService: SendEmailService,
    private cookieService: CookieService) {}

  public ngOnInit() {
    if (localStorage.getItem('emails')) {
      const storedEmails = JSON.parse(localStorage.getItem('emails'));
      localStorage.removeItem('emails');
      storedEmails.map((address) => {
        this.emails.push({
          email: address
        });
      });
    }
  }

  // adding email to recipients
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our email
    if ((value || '').trim()) {
      this.emails.push({ email: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // removing email from recipients
  remove(email: IMessage): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }


  public send() {
    const text: string = this.textForm.value;
    const recipients = [];
    if (text !== null && this.emails.length > 0) {
      this.emails.forEach((message: IMessage) => {
        recipients.push(message.email);
      });
      const cookie: IAccessCookie = JSON.parse(this.cookieService.get('accessCookie'));
      const sender = cookie.email;

      this.emailService.sendMultiple(recipients, sender, text);
    }
  }
}
