import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UppercaseResponsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Array.isArray(value)) {
      return value.map((item) =>
        item.name ? { ...item, name: item.name.toUpperCase() } : item,
      );
    }
    if (value && typeof value === 'object' && value.name) {
      return { ...value, name: value.name.toUpperCase() };
    }
    return value;
  }
}
