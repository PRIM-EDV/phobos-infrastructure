import { Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';
import { winstonConfig } from "./config/winston.config.js";

import * as Winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {
    private logger: Winston.Logger = Winston.createLogger(winstonConfig);
    private context: string = '';
    private levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];

    constructor() {}

    public log(message: any, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('log')) this.logger.info(message, { context: context });
    }

    public warn(message: any, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('warn')) this.logger.warn(message, { context: context });
    }

    public error(message: any, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('error')) this.logger.error(message, { context: context });
    }

    public verbose?(message: any, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('verbose')) this.logger.verbose(message, { context: context });
    }

    public fatal?(message: any, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('fatal')) this.logger.log('fatal', message, { context: context });
    }

    public debug(msg: string, ...optionalParams: any[]) {
        const context = optionalParams[0] || this.context;
        if (this.levels.includes('debug')) this.logger.debug(msg, { context: context });
    }

    setContext(context: string) {
        this.context = context;
    }

    setLogLevels(levels: LogLevel[]) {
        this.levels = levels;
    }
}