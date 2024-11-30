import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // Number of entries to return
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  // Number of entries to skip from start
  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
