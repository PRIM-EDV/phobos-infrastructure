import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AngularDevProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'http://localhost:4200',
    changeOrigin: true,
    ws: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    if (req.url.startsWith('/api')) {
      return next();
    }
    this.proxy(req, res, next);
  }
}