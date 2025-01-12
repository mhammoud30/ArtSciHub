// src/tiktok-guidelines-scores/dtos/create-tiktok-guidelines-score.dto.ts

import { IsBoolean } from 'class-validator';

export class CreateTiktokGuidelinesScoreDto {
  @IsBoolean()
  aspectRatio: boolean;

  @IsBoolean()
  brandGoodbye: boolean;

  @IsBoolean()
  brandLink: boolean;

  @IsBoolean()
  breakThe4thWall: boolean;

  @IsBoolean()
  humanized: boolean;

  @IsBoolean()
  simpleMessage: boolean;

  @IsBoolean()
  soundOn: boolean;

  @IsBoolean()
  supersPresent: boolean;
}
