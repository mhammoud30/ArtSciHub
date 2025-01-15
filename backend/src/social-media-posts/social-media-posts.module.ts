import { Module } from '@nestjs/common';
import { SocialMediaPostsController } from './social-media-posts.controller';
import { SocialMediaPostsService } from './providers/social-media-posts.service';
import { BrandsModule } from 'src/brands/brands.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaPost } from './social-media-post.entity';
import { CreateSocialMediaPostProvider } from './providers/create-social-media-post.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { GetDashboardDataProvider } from './providers/get-dashboard-data.provider';

@Module({
  controllers: [SocialMediaPostsController],
  providers: [
    SocialMediaPostsService,
    CreateSocialMediaPostProvider,
    GetDashboardDataProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([SocialMediaPost]),
    BrandsModule,
    UsersModule,
    PaginationModule,
  ],
})
export class SocialMediaPostsModule {}
