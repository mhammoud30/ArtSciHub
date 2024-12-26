import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsDate,
  Min,
  IsBoolean,
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
import { CallToAction } from '../enums/call-to-action.enum';

export class CreateSocialMediaPostDto {
  @IsString()
  @IsNotEmpty()
  link: string;

  @IsEnum(Platform, { message: 'Platform must be a valid enum value' })
  @IsNotEmpty()
  platform: Platform;

  @IsEnum(Thumbnail, { message: 'Thumbnail must be a valid enum value' })
  @IsNotEmpty()
  thumbnail: Thumbnail;

  @IsEnum(Format, { message: 'Format must be a valid enum value' })
  @IsNotEmpty()
  format: Format;

  @IsEnum(Concept, { message: 'Concept must be a valid enum value' })
  @IsNotEmpty()
  concept: Concept;

  @IsEnum(CreativeType, { message: 'Creative type must be a valid enum value' })
  @IsNotEmpty()
  creativeType: CreativeType;

  @IsEnum(Sound, { message: 'Sound must be a valid enum value', each: true })
  @IsNotEmpty()
  sound: Sound[];

  @IsEnum(TargetAudience, {
    message: 'Target audience must be a valid enum value',
  })
  @IsNotEmpty()
  targetAudience: TargetAudience;

  @IsEnum(Duration, { message: 'Duration must be a valid enum value' })
  @IsNotEmpty()
  duration: Duration;

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
  language: Language;

  @IsEnum(CallToAction, {
    message: 'Call to action must be a valid enum value',
  })
  @IsNotEmpty()
  callToAction: CallToAction;

  @IsBoolean()
  @IsNotEmpty()
  promoCode: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hook: boolean;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  publishedAt: Date;

  @IsEnum(ContentTone, { message: 'Content tone must be a valid enum value' })
  @IsNotEmpty()
  contentTone: ContentTone;

  @IsEnum(CampaignObjective, {
    message: 'Campaign objective must be a valid enum value',
  })
  @IsNotEmpty()
  campaignObjective: CampaignObjective;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
