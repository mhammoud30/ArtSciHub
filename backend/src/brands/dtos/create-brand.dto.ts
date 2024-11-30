import { IsString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Vertical } from '../enums/vertical.enum';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  name: string;

  @IsEnum(Vertical)
  @IsNotEmpty()
  vertical: Vertical;
}
