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
import { Format } from './enums/format.enum';
import { Concept } from './enums/concept.enum';
import { CreativeType } from './enums/creative-type.enum';
import { Sound } from './enums/sound.enum';
import { TargetAudience } from './enums/target-audience.enum';
import { Duration } from './enums/duration.enum';
import { Language } from './enums/language.enum';
import { ContentTone } from './enums/content-tone.enum';
import { CampaignObjective } from './enums/campaign-objective.enum';

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
    enum: Format,
    nullable: false,
  })
  format: string;

  @Column('enum', {
    enum: Concept,
    nullable: false,
  })
  concept: string;

  @Column('enum', {
    enum: CreativeType,
    nullable: false,
  })
  creativeType: string;

  @Column('enum', {
    enum: Sound,
    nullable: false,
  })
  sound: string;

  @Column('enum', {
    enum: TargetAudience,
    nullable: false,
  })
  targetAudience: string;

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

  @Column({ type: 'varchar', nullable: false })
  callToAction: string;

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
