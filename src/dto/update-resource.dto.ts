import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Length,
  IsUrl,
} from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUrl()
  referenceUrl?: string;
}
