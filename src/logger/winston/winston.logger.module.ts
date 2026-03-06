import { Module } from '@nestjs/common';
import { WinstonLogger } from './winston.logger.js';

@Module({
    exports: [
        WinstonLogger
    ],
    providers: [
        WinstonLogger
    ]
})
export class WinstonLoggerModule {}
