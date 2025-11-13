import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    role?: string;
  }
}

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userRole = (req.headers['x-role'] as string) || 'User';

    req.role = userRole;

    if (req.path.startsWith('/admin') && userRole !== 'Admin') {
      throw new ForbiddenException('Access denied: Admins only');
    }

    next();
  }
}
