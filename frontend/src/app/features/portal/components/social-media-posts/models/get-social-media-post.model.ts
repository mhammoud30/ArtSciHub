import { CampaignObjective } from "../enums/campaign-objective.enum";
import { Concept } from "../enums/concept.enum";
import { ContentTone } from "../enums/content-tone.enum";
import { CreativeType } from "../enums/creative-type.enum";
import { Duration } from "../enums/duration.enum";
import { Format } from "../enums/format.enum";
import { Language } from "../enums/language.enum";
import { Platform } from "../enums/platform.enum";
import { Sound } from "../enums/sound.enum";
import { TargetAudience } from "../enums/target-audience.enum";
import { Thumbnail } from "../enums/thumbnail.enum";

export interface GetSocialMediaPostModel {
  id: number;
  link: string;
  platform: Platform;
  thumbnail: Thumbnail;
  format: Format;
  concept: Concept;
  creativeType: CreativeType;
  sound: Sound;
  targetAudience: TargetAudience;
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
  campaignObjective: CampaignObjective;
  brand : {
    name: string;
    vertical: string;
  },
  createdBy: {
    name: string;
  }
}
