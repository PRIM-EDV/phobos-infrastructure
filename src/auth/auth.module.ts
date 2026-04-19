import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WinstonLoggerModule } from '../logger/index.js';
import { AuthService } from './auth.service.js';


@Module({
  imports: [
    HttpModule,
    WinstonLoggerModule
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}