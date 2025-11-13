import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceEntity } from '../../entities/resource.entity';
import { UppercasePipe } from '../../common/pipes/uppercase.pipe';
import { UppercaseResponsePipe } from '../../common/pipes/uppercase-response.pipe';
import { IdParamDto } from '../../dto/id-param.dto';
import { SearchQueryDto } from '../../dto/search-query.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('list')
  getAllResources(): ResourceEntity[] {
    return this.resourcesService.findAll();
  }

  @Get('details/:id')
  getResourceById(@Param() params: IdParamDto): ResourceEntity {
    return this.resourcesService.findOneById(Number(params.id));
  }

  @Get('search-by-name')
  @UsePipes(UppercaseResponsePipe)
  searchByName(@Query('name', UppercasePipe) name: string) {
    return this.resourcesService.searchByName(name);
  }

  @Get('search')
  searchResources(@Query() query: SearchQueryDto): ResourceEntity[] {
    return this.resourcesService.search(
      query.name,
      query.minPrice ? Number(query.minPrice) : undefined,
      query.maxPrice ? Number(query.maxPrice) : undefined,
    );
  }
}
