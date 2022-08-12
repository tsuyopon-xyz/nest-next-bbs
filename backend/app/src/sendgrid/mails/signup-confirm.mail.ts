import * as sendgrid from '@sendgrid/mail';

export class SignUpConfirmMail {
  static type = 'signup.confirm.mail.to';

  constructor(private to: string, private from: string, private jwt: string) {}

  public message(): sendgrid.MailDataRequired {
    return {
      to: this.to,
      from: this.from,
      subject: '【仮登録】本登録はまだ終わっていません',
      text: `https://tsuyopon.xyz/?confirm=${this.jwt} をクリックして本登録を完了してください。（有効期限1時間）`,
      html: `<strong><a href="https://tsuyopon.xyz/?confirm=${this.jwt}">https://tsuyopon.xyz/?confirm=${this.jwt}</a>をクリックして本登録を完了してください。（有効期限1時間）</strong>`,
    };
  }
}
