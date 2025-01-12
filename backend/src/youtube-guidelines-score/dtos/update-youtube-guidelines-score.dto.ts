// src/youtube-guidelines-scores/dto/update-youtube-guidelines-score.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateYoutubeGuidelinesScoreDto } from './create-youtube-guidelines-score.dto';

export class UpdateYoutubeGuidelinesScoreDto extends PartialType(
  CreateYoutubeGuidelinesScoreDto,
) {
  id: number;
}
