// src/facebook-guidelines-scores/dtos/patch-facebook-guidelines-score.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateFacebookGuidelinesScoreDto } from './create-facebook-guidelines-score.dto';

export class PatchFacebookGuidelinesScoreDto extends PartialType(
  CreateFacebookGuidelinesScoreDto,
) {
  // Include ID if you want to pass it in the body for your patch operation.
  id: number;
}
