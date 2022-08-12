import * as sendgrid from '@sendgrid/mail';

export class SignUpConfirmMail {
  static type = 'signup.confirm.mail.to';

  constructor(private to: string, private from: string, private jwt: string) {}

  public message(): sendgrid.MailDataRequired {
    const emailConfirmationUrl = process.env.EMAIL_CONFIRMATION_URL;
    return {
      to: this.to,
      from: this.from,
      subject: '【仮登録】本登録はまだ終わっていません',
      text: `${emailConfirmationUrl}?token=${this.jwt} をクリックして本登録を完了してください。（有効期限1時間）`,
      html: `<strong><a href="${emailConfirmationUrl}?token=${this.jwt}">${emailConfirmationUrl}?token=${this.jwt}</a>をクリックして本登録を完了してください。（有効期限1時間）</strong>`,
    };
  }
}
