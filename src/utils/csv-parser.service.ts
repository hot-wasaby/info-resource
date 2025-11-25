import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { Readable } from 'stream';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CsvParserService {
  async parseCsvToResources(buffer: Buffer): Promise<{
    validResources: CreateResourceDto[];
    invalidRows: { row: number; errors: string[] }[];
  }> {
    return new Promise((resolve, reject) => {
      const validResources: CreateResourceDto[] = [];
      const invalidRows: { row: number; errors: string[] }[] = [];

      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      let rowIndex = 0;

      stream
        .pipe(parse({ columns: true, skip_empty_lines: true }))
        .on('data', async (row) => {
          rowIndex++;

          // Skip header row
          if (rowIndex === 1) return;

          try {
            // Map row data to DTO
            const resourceData = {
              name: row.name || row.Name,
              description: row.description || row.Description,
              category: row.category || row.Category,
              price: parseFloat(row.price || row.Price),
            };

            // Convert to DTO instance
            const resourceDto = plainToInstance(
              CreateResourceDto,
              resourceData,
            );

            // Validate the DTO
            const errors = await validate(resourceDto);

            if (errors.length > 0) {
              const errorMessages = errors.flatMap((error) => {
                if (error.constraints) {
                  return Object.values(error.constraints);
                }
                return [];
              });
              invalidRows.push({ row: rowIndex, errors: errorMessages });
            } else {
              validResources.push(resourceDto);
            }
          } catch (error) {
            invalidRows.push({ row: rowIndex, errors: [error.message] });
          }
        })
        .on('end', () => {
          resolve({ validResources, invalidRows });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
