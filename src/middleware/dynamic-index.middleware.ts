import { Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DynamicIndexMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  }
}