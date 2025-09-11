import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { AdminResourcesController } from './admin-resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  controllers: [ResourcesController, AdminResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}