import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceEntity } from '../../entities/resource.entity';

@Controller('admin/resources')
export class AdminResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('create')
  createResource(@Body() resource: ResourceEntity): ResourceEntity {
    return this.resourcesService.create(resource);
  }

  @Put('update/:id')
  updateResource(
    @Param('id') id: string,
    @Body() updated: Partial<ResourceEntity>,
  ): ResourceEntity {
    return this.resourcesService.update(Number(id), updated);
  }

  @Delete('delete/:id')
  deleteResource(@Param('id') id: string): { message: string } {
    this.resourcesService.delete(Number(id));
    return { message: `Resource with id=${id} deleted successfully` };
  }
}