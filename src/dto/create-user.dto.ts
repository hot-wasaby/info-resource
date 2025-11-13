export class CreateUserDto {
  username: string;
  role: 'admin' | 'user';
}
