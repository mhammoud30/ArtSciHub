import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SocialMediaPostsService } from './providers/social-media-posts.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateSocialMediaPostDto } from './dtos/create-social-media-post.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { GetSocialMediaPostDto } from './dtos/get-social-media-posts.dto';
import { GetDashboardDataDto } from './dtos/get-dashboard-data.dto';

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
  public async findAll(@Query() postQuery: GetSocialMediaPostDto) {
    return this.socialMediaPostsService.findAll(postQuery);
  }

  @Post('dashboard')
  public async getDashboardData(@Body() query: GetDashboardDataDto) {
    console.log(query);
    return this.socialMediaPostsService.getDashboardData(query);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.socialMediaPostsService.findOneById(id);
  }
}
