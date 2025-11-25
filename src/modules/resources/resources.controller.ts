import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceEntity } from '../../entities/resource.entity';
import { UppercasePipe } from '../../common/pipes/uppercase.pipe';
import { UppercaseResponsePipe } from '../../common/pipes/uppercase-response.pipe';
import { IdParamDto } from '../../dto/id-param.dto';
import { SearchQueryDto } from '../../dto/search-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import type { Response } from 'express';
import { CsvParserService } from '../../utils/csv-parser.service';
import { CsvGeneratorService } from '../../utils/csv-generator.service';
import type { Multer } from 'multer';

@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly csvParserService: CsvParserService,
    private readonly csvGeneratorService: CsvGeneratorService,
  ) {}

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

  // CSV Import endpoint
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importFromCsv(
    @UploadedFile(new FileValidationPipe()) file: Multer.File,
  ) {
    try {
      const { validResources, invalidRows } =
        await this.csvParserService.parseCsvToResources(file.buffer);

      // Save valid resources
      const savedResources = validResources.map((resource) =>
        this.resourcesService.create(resource),
      );

      return {
        message: 'CSV import completed',
        validRecords: savedResources.length,
        invalidRecords: invalidRows.length,
        invalidRows: invalidRows,
        savedResources: savedResources,
      };
    } catch (error) {
      return {
        message: 'Error importing CSV',
        error: error.message,
      };
    }
  }

  // CSV Export endpoint
  @Get('export')
  async exportToCsv(@Query() query: SearchQueryDto, @Res() res: Response) {
    try {
      // Get filtered resources based on query parameters
      const resources = this.resourcesService.search(
        query.name,
        query.minPrice ? Number(query.minPrice) : undefined,
        query.maxPrice ? Number(query.maxPrice) : undefined,
      );

      // Define headers for CSV (excluding sensitive data if any)
      const headers = ['id', 'name', 'description', 'category', 'price'];

      // Generate CSV content
      const csvContent = this.csvGeneratorService.generateCsv(
        resources,
        headers,
      );

      // Set response headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=resources.csv',
      );
      res.status(HttpStatus.OK).send(csvContent);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error exporting CSV',
        error: error.message,
      });
    }
  }
}
