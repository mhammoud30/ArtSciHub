import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { role } from './enums/role.enum';
import { Brand } from 'src/brands/brand.entity';
import { SocialMediaPost } from 'src/social-media-posts/social-media-post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: role,
    nullable: false,
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  division: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatarUrl: string;

  @OneToMany(() => Brand, (brand) => brand.createdBy)
  createdBrands: Brand[];

  @OneToMany(() => Brand, (brand) => brand.updatedBy)
  updatedBrands: Brand[];

  @OneToMany(() => SocialMediaPost, (post) => post.createdBy)
  socialMediaPosts: SocialMediaPost[];

  @OneToMany(() => SocialMediaPost, (post) => post.updatedBy)
  updatedSocialMediaPosts: SocialMediaPost[];

  /**
   * use later
   *   @Column({
    type: 'varchar',
    nullable: true,
  })
  resetToken: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  resetTokenExpiry: Date;
   */
}
