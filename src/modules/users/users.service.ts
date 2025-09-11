import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'john', role: 'user' },
    { id: 3, username: 'maria', role: 'user' },
  ];

  findAll(): UserEntity[] {
    return this.users;
  }
}