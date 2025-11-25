import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { AdminResourcesController } from './admin-resources.controller';
import { ResourcesService } from './resources.service';
import { CsvParserService } from '../../utils/csv-parser.service';
import { CsvGeneratorService } from '../../utils/csv-generator.service';

@Module({
  controllers: [ResourcesController, AdminResourcesController],
  providers: [ResourcesService, CsvParserService, CsvGeneratorService],
})
export class ResourcesModule {}
