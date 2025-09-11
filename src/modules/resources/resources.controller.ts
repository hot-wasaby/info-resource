import { Controller, Get, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceEntity } from '../../entities/resource.entity';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('list')
  getAllResources(): ResourceEntity[] {
    return this.resourcesService.findAll();
  }

  @Get('details/:id')
  getResourceById(@Param('id') id: string): ResourceEntity {
    return this.resourcesService.findOneById(Number(id));
  }
}