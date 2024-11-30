import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsInt } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsInt()
  updatedBy: number; // User ID for the updater
}
