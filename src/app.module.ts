import { Module } from '@nestjs/common';
import { ResourcesModule } from './modules/resources/resources.module';

@Module({
  imports: [ResourcesModule],
})
export class AppModule {}