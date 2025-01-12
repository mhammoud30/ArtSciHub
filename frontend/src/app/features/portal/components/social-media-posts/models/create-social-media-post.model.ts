import { Platform } from '../enums/platform.enum';
import { Thumbnail } from '../enums/thumbnail.enum';
import { Dimensions } from '../enums/dimensions.enum';
import { Concept } from '../enums/concept.enum';
import { CreativeType } from '../enums/creative-type.enum';
import { Sound } from '../enums/sound.enum';
import { TargetAudienceAge } from '../enums/target-audience-age.enum';
import { Duration } from '../enums/duration.enum';
import { Language } from '../enums/language.enum';
import { ContentTone } from '../enums/content-tone.enum';
import { CampaignObjective } from '../enums/campaign-objective.enum';
import { CallToAction } from '../enums/call-to-action.enum';
import { TargetAudienceGender } from '../enums/target-audience-gender.enum';
import { TargetAudienceIncome } from '../enums/target-audience-income.enum';

export interface CreateSocialMediaPost {
  link: string;
  platform: Platform;
  thumbnail: Thumbnail;
  dimensions: Dimensions;
  concept: Concept[];
  creativeType: CreativeType;
  sound: Sound[];
  targetAudienceAge: TargetAudienceAge;
  targetAudienceGender: TargetAudienceGender;
  targetAudienceIncome: TargetAudienceIncome;
  duration: Duration;
  views: number;
  comments: number;
  likes: number;
  shares: number;
  saves: number;
  language: Language;
  callToAction: CallToAction;
  promoCode: boolean;
  hook: boolean;
  publishedAt: Date;
  contentTone: ContentTone;
  campaignObjective: CampaignObjective;
  brandId: number;
}
//Userid is added by interceptor as active user
