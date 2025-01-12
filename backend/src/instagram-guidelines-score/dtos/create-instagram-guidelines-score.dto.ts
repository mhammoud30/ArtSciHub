// src/instagram-guidelines-scores/dtos/create-instagram-guidelines-score.dto.ts

import { IsBoolean, IsEnum } from 'class-validator';

export class CreateInstagramGuidelinesScoreDto {
  @IsEnum(['STORY', 'REEL'], {
    message: "type must be either 'STORY' or 'REEL'",
  })
  type: 'STORY' | 'REEL';

  // Shared columns
  @IsBoolean()
  brandLogoEarly: boolean;

  @IsBoolean()
  humanized: boolean;

  @IsBoolean()
  optimisedForSoundOff: boolean;

  @IsBoolean()
  simpleMessage: boolean;

  @IsBoolean()
  soundOn: boolean;

  // Fields that differ for Reels and Stories
  @IsBoolean()
  aspectRatio: boolean;

  @IsBoolean()
  optimalLength: boolean;
}
