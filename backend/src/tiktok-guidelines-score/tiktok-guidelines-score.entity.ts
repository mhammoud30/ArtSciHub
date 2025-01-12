// tiktok-guidelines.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TiktokGuidelinesScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  aspectRatio: boolean;

  @Column({ default: false })
  brandGoodbye: boolean;

  @Column({ default: false })
  brandLink: boolean;

  @Column({ default: false })
  breakThe4thWall: boolean;

  @Column({ default: false })
  humanized: boolean;

  @Column({ default: false })
  simpleMessage: boolean;

  @Column({ default: false })
  soundOn: boolean;

  @Column({ default: false })
  supersPresent: boolean;

  @Column('float', { default: 0 })
  contentScore: number;

  @ManyToOne(() => User, (user) => user.createdTiktokGuidelinesScore, {
    eager: false,
  })
  createdBy: User;
}
