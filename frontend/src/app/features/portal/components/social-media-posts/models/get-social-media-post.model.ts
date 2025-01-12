import { CampaignObjective } from "../enums/campaign-objective.enum";
import { Concept } from "../enums/concept.enum";
import { ContentTone } from "../enums/content-tone.enum";
import { CreativeType } from "../enums/creative-type.enum";
import { Duration } from "../enums/duration.enum";
import { Dimensions } from '../enums/dimensions.enum';
import { Language } from "../enums/language.enum";
import { Platform } from "../enums/platform.enum";
import { Sound } from "../enums/sound.enum";
import { TargetAudienceAge } from "../enums/target-audience-age.enum";
import { TargetAudienceGender } from "../enums/target-audience-gender.enum";
import { TargetAudienceIncome } from "../enums/target-audience-income.enum";
import { Thumbnail } from "../enums/thumbnail.enum";

export interface GetSocialMediaPostModel {
  id: number;
  link: string;
  platform: Platform;
  thumbnail: Thumbnail;
  dimensions: Dimensions;
  concept: Concept;
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
  callToAction: string;
  publishedAt: Date;
  contentTone: ContentTone;
  promoCode: boolean;
  hook: boolean;
  campaignObjective: CampaignObjective;
  brand : {
    name: string;
    vertical: string;
  },
  createdBy: {
    name: string;
  }
  updatedBy: {
    name: string;
  }
}
