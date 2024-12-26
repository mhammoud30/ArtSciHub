import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Vertical } from './enums/vertical.enum';
import { User } from 'src/users/user.entity';
import { SocialMediaPost } from 'src/social-media-posts/social-media-post.entity';
import { Market } from './enums/market.enum';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('enum', {
    enum: Vertical,
    nullable: false,
  })
  vertical: Vertical;

  @Column({ nullable: true })
  socialMediaLink: string;

  @Column('enum', {
    enum: Market,
    nullable: false,
    default: Market.AE,
  })
  market: Market;

  @OneToMany(() => SocialMediaPost, (post) => post.brand)
  posts: SocialMediaPost[];

  @ManyToOne(() => User, (user) => user.createdBrands, { eager: false })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedBrands, { eager: false })
  updatedBy: User;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
