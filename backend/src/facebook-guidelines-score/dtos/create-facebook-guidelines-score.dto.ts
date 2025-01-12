// src/facebook-guidelines-scores/dtos/create-facebook-guidelines-score.dto.ts

import { IsBoolean } from 'class-validator';

export class CreateFacebookGuidelinesScoreDto {
  @IsBoolean()
  aspectRatio: boolean;

  @IsBoolean()
  brandLogoEarly: boolean;

  @IsBoolean()
  humanized: boolean;

  @IsBoolean()
  optimalLength: boolean;

  @IsBoolean()
  optimisedForSoundOff: boolean;

  @IsBoolean()
  simpleMessage: boolean;

  @IsBoolean()
  soundOn: boolean;
}
