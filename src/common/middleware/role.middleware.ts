import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const userRole = req.headers['x-role'] || 'User';

    (req as any).role = userRole;

    if (req.path.startsWith('/admin') && userRole !== 'Admin') {
      throw new ForbiddenException('Access denied: Admins only');
    }

    next();
  }
}