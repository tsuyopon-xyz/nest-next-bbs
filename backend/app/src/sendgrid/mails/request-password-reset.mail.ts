import * as sendgrid from '@sendgrid/mail';

export class RequestPasswordResetMail {
  static type = 'request.password.reset.mail.to';

  constructor(private to: string, private from: string, private jwt: string) {}

  public message(): sendgrid.MailDataRequired {
    const emailConfirmationUrl = process.env.RESET_PASSWORD_URL;
    return {
      to: this.to,
      from: this.from,
      subject: '【パスワードリセット】パスワードのリセットはこちらから',
      text: `${emailConfirmationUrl}?token=${this.jwt} をクリックして本登録を完了してください。（有効期限1時間）`,
      html: `<strong><a href="${emailConfirmationUrl}?token=${this.jwt}">${emailConfirmationUrl}?token=${this.jwt}</a>をクリックして本登録を完了してください。（有効期限1時間）</strong>`,
    };
  }
}
