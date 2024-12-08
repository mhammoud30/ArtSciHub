import { Body, Controller, Get, Post } from '@nestjs/common';
import { SocialMediaPostsService } from './providers/social-media-posts.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateSocialMediaPostDto } from './dtos/create-social-media-post.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@Controller('api/social-media-posts')
export class SocialMediaPostsController {
  constructor(
    /**
     * Inject the social media posts service
     */
    private readonly socialMediaPostsService: SocialMediaPostsService,
  ) {}

  @Post()
  public async create(
    @Body() createSocialMediaPostDto: CreateSocialMediaPostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.socialMediaPostsService.create(createSocialMediaPostDto, user);
  }

  @Get()
  public async findAll() {
    return this.socialMediaPostsService.findAll();
  }
}
