import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class YoutubeGuidelinesScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  aspectRatio: boolean;

  @Column({ default: false })
  brandAudioMention: boolean;

  @Column({ default: false })
  frame: boolean;

  @Column({ default: false })
  introduce: boolean;

  @Column({ default: false })
  pacing: boolean;

  @Column({ default: false })
  reinforce: boolean;

  @Column({ default: false })
  soundOn: boolean;

  @Column('float', { default: 0 })
  contentScore: number;

  @ManyToOne(() => User, (user) => user.createdYoutubeGuidelinesScore, {
    eager: false,
  })
  createdBy: User;
}
