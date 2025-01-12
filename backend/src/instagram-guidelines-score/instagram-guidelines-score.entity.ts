import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class InstagramGuidelinesScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['STORY', 'REEL'] })
  type: 'STORY' | 'REEL';

  // Shared columns
  @Column({ default: false })
  brandLogoEarly: boolean;

  @Column({ default: false })
  humanized: boolean;

  @Column({ default: false })
  optimisedForSoundOff: boolean;

  @Column({ default: false })
  simpleMessage: boolean;

  @Column({ default: false })
  soundOn: boolean;

  // Fields that have different criteria for Reels and Stories
  @Column({ default: false })
  aspectRatio: boolean;

  @Column({ default: false })
  optimalLength: boolean;

  @Column('float', { default: 0 })
  contentScore: number;

  @ManyToOne(() => User, (user) => user.createdInstagramGuidelinesScore, {
    eager: false,
  })
  createdBy: User;
}
