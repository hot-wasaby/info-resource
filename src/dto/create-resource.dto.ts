import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';
import { CategoryValidator } from '../common/validators/category.validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;

  @IsString()
  @IsNotEmpty()
  @CategoryValidator({
    message:
      'Category must be one of Energie, Stocare, Agricultura, Construcții, Apă, Iluminat, Transport, Mediu',
  })
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsUrl()
  referenceUrl?: string;
}
