import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdminMessage() {
    return { message: 'Zona administrativă - doar pentru admini' };
  }
}
