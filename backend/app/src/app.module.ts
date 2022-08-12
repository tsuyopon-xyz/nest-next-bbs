import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { isDevelopment, isTest } from './utils/env';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: `${process.cwd()}/.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: isTest()
        ? process.env.DATABASE_USER_TEST
        : process.env.DATABASE_USER,
      password: isTest()
        ? process.env.DATABASE_PASSWORD_TEST
        : process.env.DATABASE_PASSWORD,
      database: isTest()
        ? process.env.DATABASE_NAME_TEST
        : process.env.DATABASE_NAME,
      entities: [User],
      synchronize: isDevelopment() || isTest(),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
