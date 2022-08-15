import { Inject, Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { SignUpConfirmMail } from './mails/signup-confirm.mail';
import { RequestPasswordResetMail } from './mails/request-password-reset.mail';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SendgridService {
  constructor(@Inject('SENDGRID_API_KEY') private apiKey) {
    sendgrid.setApiKey(apiKey);
  }

  sendgrid() {
    return sendgrid;
  }

  /**
   * @see https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail#quick-start-hello-email
   * @param msg
   */
  private send(msg: sendgrid.MailDataRequired) {
    console.log(
      `${SendgridService.name}: 現在コメントアウトでメールを送らないようにしている`,
    );
    // return sendgrid.send(msg);
  }

  @OnEvent(SignUpConfirmMail.type)
  sendSignUpConfirmMail(msg: SignUpConfirmMail) {
    return this.send(msg.message());
  }

  @OnEvent(RequestPasswordResetMail.type)
  sendRequestPasswordResetMail(msg: RequestPasswordResetMail) {
    return this.send(msg.message());
  }
}
