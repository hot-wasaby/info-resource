import { ResourcesModule } from './modules/resources/resources.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RoleMiddleware } from './common/middleware/role.middleware';

@Module({
  imports: [ResourcesModule, UsersModule, AdminModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // middleware pe toate rutele
  }
}
