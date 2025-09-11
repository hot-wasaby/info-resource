import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('search')
  searchResources(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ): ResourceEntity[] {
    return this.resourcesService.search(
      name,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );
  }
}