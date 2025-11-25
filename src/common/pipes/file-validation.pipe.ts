import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import type { Multer } from 'multer';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly maxSize: number; // 2MB
  private readonly allowedExtensions: string[];

  constructor(maxSizeInMB: number = 2, allowedExtensions: string[] = ['.csv']) {
    this.maxSize = maxSizeInMB * 1024 * 1024;
    this.allowedExtensions = allowedExtensions;
  }

  transform(value: Multer.File) {
    if (!value) {
      throw new BadRequestException('File is required');
    }

    // Check file size
    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds ${this.maxSize / (1024 * 1024)}MB limit`,
      );
    }

    // Check file extension
    const fileExt = extname(value.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(fileExt)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedExtensions.join(', ')}`,
      );
    }

    // Check MIME type for CSV
    if (fileExt === '.csv' && value.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid CSV file');
    }

    return value;
  }
}
