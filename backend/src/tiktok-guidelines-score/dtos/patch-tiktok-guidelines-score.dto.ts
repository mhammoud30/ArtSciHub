// src/tiktok-guidelines-scores/dtos/patch-tiktok-guidelines-score.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTiktokGuidelinesScoreDto } from './create-tiktok-guidelines-score.dto';

export class PatchTiktokGuidelinesScoreDto extends PartialType(
  CreateTiktokGuidelinesScoreDto,
) {
  // Optionally include an ID if you patch by passing ID in the body
  id: number;
}
