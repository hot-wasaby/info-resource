import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceEntity } from '../../entities/resource.entity';
import { UppercasePipe } from '../../common/pipes/uppercase.pipe';
import { UppercaseResponsePipe } from '../../common/pipes/uppercase-response.pipe';

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

  @Get('search-by-name')
  @UsePipes(UppercaseResponsePipe)
  searchByName(@Query('name', UppercasePipe) name: string) {
    return this.resourcesService.searchByName(name);
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