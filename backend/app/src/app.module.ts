import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        RESET_PASSWORD_URL: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
        SENDGRID_EMAIL_FROM: Joi.string().required(),
      }),
      envFilePath: `${process.cwd()}/.env`,
    }),
    EventEmitterModule.forRoot(),
    SendgridModule.register(process.env.SENDGRID_API_KEY),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
