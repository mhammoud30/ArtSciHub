import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Brand } from 'src/brands/brand.entity';
import { Thumbnail } from './enums/thumbnail.enum';
import { Platform } from './enums/platform.enum';
import { Dimensions } from './enums/dimensions.enum';
import { Concept } from './enums/concept.enum';
import { CreativeType } from './enums/creative-type.enum';
import { Sound } from './enums/sound.enum';
import { TargetAudienceAge } from './enums/target-audience-age.enum';
import { Duration } from './enums/duration.enum';
import { Language } from './enums/language.enum';
import { ContentTone } from './enums/content-tone.enum';
import { CampaignObjective } from './enums/campaign-objective.enum';
import { CallToAction } from './enums/call-to-action.enum';
import { TargetAudienceGender } from './enums/target-audience-gender.enum';
import { TargetAudienceIncome } from './enums/target-audience-income.enum';

@Entity()
export class SocialMediaPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  link: string;

  @Column('enum', {
    enum: Platform,
    nullable: false,
  })
  platform: string;

  @Column('enum', {
    enum: Thumbnail,
    nullable: false,
  })
  thumbnail: string;

  @Column('enum', {
    enum: Dimensions,
    nullable: false,
    default: Dimensions.HORIZONTAL_1920_1080,
  })
  dimensions: string;

  @Column('enum', {
    enum: Concept,
    array: true,
    nullable: false,
    default: [Concept.CELEBRITY_CONTENT],
  })
  concept: string[];

  @Column('enum', {
    enum: CreativeType,
    nullable: false,
  })
  creativeType: string;

  @Column('enum', {
    enum: Sound,
    array: true,
    nullable: false,
    default: [Sound.NO_SOUND],
  })
  sound: string[];

  @Column('enum', {
    enum: TargetAudienceAge,
    nullable: false,
    default: TargetAudienceAge.EIGHTEEN_TO_THIRTY_FOUR,
  })
  targetAudienceAge: string;

  @Column('enum', {
    enum: TargetAudienceGender,
    nullable: false,
    default: TargetAudienceGender.ALL_GENDERS,
  })
  targetAudienceGender: string;

  @Column('enum', {
    enum: TargetAudienceIncome,
    nullable: false,
    default: TargetAudienceIncome.LOWER_CLASS,
  })
  targetAudienceIncome: string;

  @Column('enum', {
    enum: Duration,
    nullable: false,
  })
  duration: string;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'integer', default: 0 })
  comments: number;

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @Column({ type: 'integer', default: 0 })
  shares: number;

  @Column({ type: 'integer', default: 0 })
  saves: number;

  @Column('enum', {
    enum: Language,
    nullable: false,
  })
  language: string;

  @Column('enum', {
    enum: CallToAction,
    nullable: false,
    default: CallToAction.LEARN_MORE,
  })
  callToAction: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  promoCode: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  hook: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  publishedAt: Date;

  @Column('enum', {
    enum: ContentTone,
    nullable: false,
  })
  contentTone: string;

  @Column('enum', {
    enum: CampaignObjective,
    nullable: false,
  })
  campaignObjective: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.socialMediaPosts, { eager: false })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedSocialMediaPosts, {
    eager: false,
  })
  updatedBy: User;

  @ManyToOne(() => Brand, { eager: false, nullable: false })
  brand: Brand;
}
