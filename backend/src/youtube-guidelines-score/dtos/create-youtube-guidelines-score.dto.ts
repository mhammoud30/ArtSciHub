// src/youtube-guidelines-scores/dto/create-youtube-guidelines-score.dto.ts

import { IsBoolean } from 'class-validator';

export class CreateYoutubeGuidelinesScoreDto {
  @IsBoolean()
  aspectRatio: boolean;

  @IsBoolean()
  brandAudioMention: boolean;

  @IsBoolean()
  frame: boolean;

  @IsBoolean()
  introduce: boolean;

  @IsBoolean()
  pacing: boolean;

  @IsBoolean()
  reinforce: boolean;

  @IsBoolean()
  soundOn: boolean;
}
