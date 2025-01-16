// src/social-media-posts/dto/get-dashboard-data.dto.ts
import {
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Platform } from '../enums/platform.enum';
import { Thumbnail } from '../enums/thumbnail.enum';
import { Dimensions } from '../enums/dimensions.enum';
import { Concept } from '../enums/concept.enum';
import { CreativeType } from '../enums/creative-type.enum';
import { Sound } from '../enums/sound.enum';
import { TargetAudienceAge } from '../enums/target-audience-age.enum';
import { TargetAudienceGender } from '../enums/target-audience-gender.enum';
import { TargetAudienceIncome } from '../enums/target-audience-income.enum';
import { Duration } from '../enums/duration.enum';
import { Language } from '../enums/language.enum';
import { ContentTone } from '../enums/content-tone.enum';
import { CampaignObjective } from '../enums/campaign-objective.enum';
import { CallToAction } from '../enums/call-to-action.enum';

export class GetDashboardDataDto {
  /**
   * Date filters
   */
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  /**
   * Brand filter
   *
   * Use whichever fits your data model best: brandName, brandId, etc.
   */
  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsNumber()
  brandId?: number;

  /**
   * Platform filter
   */
  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  /**
   * Thumbnail filter
   */
  @IsOptional()
  @IsEnum(Thumbnail)
  thumbnail?: Thumbnail;

  /**
   * Dimensions filter
   */
  @IsOptional()
  @IsEnum(Dimensions)
  dimensions?: Dimensions;

  /**
   * Concept filter (array-based in your entity)
   */
  @IsOptional()
  @IsArray()
  @IsEnum(Concept, { each: true })
  concept?: Concept[];

  /**
   * Creative type filter
   */
  @IsOptional()
  @IsEnum(CreativeType)
  creativeType?: CreativeType;

  /**
   * Sound filter (array-based in your entity)
   */
  @IsOptional()
  @IsArray()
  @IsEnum(Sound, { each: true })
  sound?: Sound[];

  /**
   * Target Audience Age
   */
  @IsOptional()
  @IsEnum(TargetAudienceAge)
  targetAudienceAge?: TargetAudienceAge;

  /**
   * Target Audience Gender
   */
  @IsOptional()
  @IsEnum(TargetAudienceGender)
  targetAudienceGender?: TargetAudienceGender;

  /**
   * Target Audience Income
   */
  @IsOptional()
  @IsEnum(TargetAudienceIncome)
  targetAudienceIncome?: TargetAudienceIncome;

  /**
   * Duration
   */
  @IsOptional()
  @IsEnum(Duration)
  duration?: Duration;

  /**
   * Language
   */
  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  /**
   * Call to Action
   */
  @IsOptional()
  @IsEnum(CallToAction)
  callToAction?: CallToAction;

  /**
   * Whether a promo code is used
   */
  @IsOptional()
  @IsBoolean()
  promoCode?: boolean;

  /**
   * Whether a hook is used
   */
  @IsOptional()
  @IsBoolean()
  hook?: boolean;

  /**
   * Content Tone
   */
  @IsOptional()
  @IsEnum(ContentTone)
  contentTone?: ContentTone;

  /**
   * Campaign Objective
   */
  @IsOptional()
  @IsEnum(CampaignObjective)
  campaignObjective?: CampaignObjective;

  /**
   * Optional grouping parameters for aggregated data
   *
   * Example: group by brand, platform, date, etc.
   */
  @IsOptional()
  @IsBoolean()
  groupByBrand?: boolean;

  @IsOptional()
  @IsBoolean()
  groupByPlatform?: boolean;

  /**
   * For grouping by date, you might specify "day", "week", or "month" (or even "year")
   */
  @IsOptional()
  @IsString() // Could be an enum as well
  groupByDate?: '' | 'day' | 'week' | 'month' | 'year';

  /**
   * If you want to combine multiple group-bys in one array,
   * you could do something like this instead:
   *
   * @IsOptional()
   * @IsArray()
   * @IsString({ each: true })
   * groupByFields?: string[]; // e.g. ['brand', 'platform', 'date']
   */
}
