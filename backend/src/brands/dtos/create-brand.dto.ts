import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Vertical } from '../enums/vertical.enum';
import { Market } from '../enums/market.enum';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  name: string;

  @IsEnum(Vertical)
  @IsNotEmpty()
  vertical: Vertical;

  @IsString()
  @IsOptional()
  socialMediaLink?: string;

  @IsEnum(Market)
  @IsNotEmpty()
  market: Market;
}
