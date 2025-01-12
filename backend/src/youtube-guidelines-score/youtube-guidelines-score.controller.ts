import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { YoutubeGuidelinesScore } from './youtube-guidelines-score.entity';
import { CreateYoutubeGuidelinesScoreDto } from './dtos/create-youtube-guidelines-score.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { YoutubeGuidelinesScoreService } from './providers/youtube-guidelines-score.service';
import { UpdateYoutubeGuidelinesScoreDto } from './dtos/update-youtube-guidelines-score.dto';

@Controller('api/youtube-guidelines-scores')
export class YoutubeGuidelinesScoreController {
  constructor(
    /**
     * Inject the YoutubeGuidelinesScoresService
     */
    private readonly youtubeGuidelinesScoresService: YoutubeGuidelinesScoreService,
  ) {}

  @Get()
  public async findAll() {
    return this.youtubeGuidelinesScoresService.findAll();
  }

  @Post()
  public async create(
    @Body() createDto: CreateYoutubeGuidelinesScoreDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<YoutubeGuidelinesScore> {
    return this.youtubeGuidelinesScoresService.create(createDto, user);
  }

  @Patch()
  public async update(
    @Body() patchDto: UpdateYoutubeGuidelinesScoreDto,
  ): Promise<YoutubeGuidelinesScore> {
    return this.youtubeGuidelinesScoresService.update(patchDto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.youtubeGuidelinesScoresService.delete(id);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<YoutubeGuidelinesScore> {
    return this.youtubeGuidelinesScoresService.findOne(id);
  }
}
