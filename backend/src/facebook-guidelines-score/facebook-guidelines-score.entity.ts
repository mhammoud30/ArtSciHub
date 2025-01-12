import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class FacebookGuidelinesScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  aspectRatio: boolean;

  @Column({ default: false })
  brandLogoEarly: boolean;

  @Column({ default: false })
  humanized: boolean;

  @Column({ default: false })
  optimalLength: boolean;

  @Column({ default: false })
  optimisedForSoundOff: boolean;

  @Column({ default: false })
  simpleMessage: boolean;

  @Column({ default: false })
  soundOn: boolean;

  @Column('float', { default: 0 })
  contentScore: number;

  @ManyToOne(() => User, (user) => user.createdFacebookGuidelinesScore, {
    eager: false,
  })
  createdBy: User;
}
