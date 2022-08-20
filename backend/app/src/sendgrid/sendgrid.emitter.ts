import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { SignUpConfirmMail } from './mails/signup-confirm.mail';
import { RequestPasswordResetMail } from './mails/request-password-reset.mail';

@Injectable()
export class SendgridEmitter {
  constructor(private event: EventEmitter2) {}

  sendSignUpConfirmMail(to: string, from: string, jwt: string) {
    return this.event.emit(
      SignUpConfirmMail.type,
      new SignUpConfirmMail(to, from, jwt),
    );
  }

  sendRequestPasswordResetMail(to: string, from: string, jwt: string) {
    return this.event.emit(
      RequestPasswordResetMail.type,
      new RequestPasswordResetMail(to, from, jwt),
    );
  }
}
