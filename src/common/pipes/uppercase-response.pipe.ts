import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class UppercaseResponsePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (
          item &&
          typeof item === 'object' &&
          'name' in item &&
          typeof (item as Record<string, unknown>).name === 'string'
        ) {
          return {
            ...(item as Record<string, unknown>),
            name: (
              (item as Record<string, unknown>).name as string
            ).toUpperCase(),
          };
        }
        return item;
      });
    }
    if (
      value &&
      typeof value === 'object' &&
      'name' in value &&
      typeof (value as Record<string, unknown>).name === 'string'
    ) {
      return {
        ...(value as Record<string, unknown>),
        name: ((value as Record<string, unknown>).name as string).toUpperCase(),
      };
    }
    return value;
  }
}
