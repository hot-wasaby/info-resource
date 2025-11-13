import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const allowed = [
  'Energie',
  'Stocare',
  'Agricultură',
  'Construcții',
  'Apă',
  'Iluminat',
  'Transport',
  'Mediu',
];

export function CategoryValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCategory',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && allowed.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be one of: ${allowed.join(', ')}`;
        },
      },
    });
  };
}
