// 参考記事: Nest.js におけるモジュール開発 - Sendgrid Module
// https://zenn.dev/mikakane/articles/nestjs-sendgridmodule
import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridEmitter } from './sendgrid.emitter';

@Module({})
export class SendgridModule {
  static register(apikey: string) {
    return {
      module: SendgridModule,
      providers: [
        {
          provide: 'SENDGRID_API_KEY',
          useValue: apikey,
        },
        SendgridService,
        SendgridEmitter,
      ],
      exports: [SendgridEmitter],
    };
  }
}
