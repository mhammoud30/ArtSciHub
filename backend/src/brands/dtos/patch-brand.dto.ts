import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsInt } from 'class-validator';

export class PatchBrandDto extends PartialType(CreateBrandDto) {
  @IsInt()
  id: number; // Brand ID

  @IsInt()
  updatedBy: number; // User ID for the updater
}
