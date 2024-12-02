import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsDate,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Platform } from '../enums/platform.enum';
import { Thumbnail } from '../enums/thumbnail.enum';
import { Format } from '../enums/format.enum';
import { Concept } from '../enums/concept.enum';
import { CreativeType } from '../enums/creative-type.enum';
import { Sound } from '../enums/sound.enum';
import { TargetAudience } from '../enums/target-audience.enum';
import { Duration } from '../enums/duration.enum';
import { Language } from '../enums/language.enum';
import { ContentTone } from '../enums/content-tone.enum';
import { CampaignObjective } from '../enums/campaign-objective.enum';

export class CreateSocialMediaPostDto {
  @IsString()
  @IsNotEmpty()
  link: string;

  @IsEnum(Platform, { message: 'Platform must be a valid enum value' })
  @IsNotEmpty()
  platform: string;

  @IsEnum(Thumbnail, { message: 'Thumbnail must be a valid enum value' })
  @IsNotEmpty()
  thumbnail: string;

  @IsEnum(Format, { message: 'Format must be a valid enum value' })
  @IsNotEmpty()
  format: string;

  @IsEnum(Concept, { message: 'Concept must be a valid enum value' })
  @IsNotEmpty()
  concept: string;

  @IsEnum(CreativeType, { message: 'Creative type must be a valid enum value' })
  @IsNotEmpty()
  creativeType: string;

  @IsEnum(Sound, { message: 'Sound must be a valid enum value' })
  @IsNotEmpty()
  sound: string;

  @IsEnum(TargetAudience, {
    message: 'Target audience must be a valid enum value',
  })
  @IsNotEmpty()
  targetAudience: string;

  @IsEnum(Duration, { message: 'Duration must be a valid enum value' })
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  views: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  comments: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  likes: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  shares: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  saves: number;

  @IsEnum(Language, { message: 'Language must be a valid enum value' })
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  callToAction: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  publishedAt: Date;

  @IsEnum(ContentTone, { message: 'Content tone must be a valid enum value' })
  @IsNotEmpty()
  contentTone: string;

  @IsEnum(CampaignObjective, {
    message: 'Campaign objective must be a valid enum value',
  })
  @IsNotEmpty()
  campaignObjective: string;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
