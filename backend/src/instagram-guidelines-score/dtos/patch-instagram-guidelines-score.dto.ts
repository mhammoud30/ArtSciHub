// src/instagram-guidelines-scores/dtos/patch-instagram-guidelines-score.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateInstagramGuidelinesScoreDto } from './create-instagram-guidelines-score.dto';

export class PatchInstagramGuidelinesScoreDto extends PartialType(
  CreateInstagramGuidelinesScoreDto,
) {
  // If you patch by sending ID in the request body, include it here:
  id: number;
}
