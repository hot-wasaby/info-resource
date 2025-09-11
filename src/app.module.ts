import { Module } from '@nestjs/common';
import { ResourcesModule } from './modules/resources/resources.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [ResourcesModule, UsersModule, AdminModule],
})
export class AppModule {}
