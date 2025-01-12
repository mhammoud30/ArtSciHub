// src/instagram-guidelines-scores/instagram-guidelines-scores.controller.ts

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
import { InstagramGuidelinesScore } from './instagram-guidelines-score.entity';
import { CreateInstagramGuidelinesScoreDto } from './dtos/create-instagram-guidelines-score.dto';
import { PatchInstagramGuidelinesScoreDto } from './dtos/patch-instagram-guidelines-score.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { InstagramGuidelinesScoreService } from './providers/instagram-guidelines-score.service';

@Controller('api/instagram-guidelines-scores')
export class InstagramGuidelinesScoreController {
  constructor(
    /**
     * Inject the InstagramGuidelinesScoresService
     */
    private readonly instagramGuidelinesScoresService: InstagramGuidelinesScoreService,
  ) {}

  @Get()
  public async findAll() {
    return this.instagramGuidelinesScoresService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstagramGuidelinesScore> {
    return this.instagramGuidelinesScoresService.findOne(id);
  }

  @Post()
  public async create(
    @Body() createDto: CreateInstagramGuidelinesScoreDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<InstagramGuidelinesScore> {
    return this.instagramGuidelinesScoresService.create(createDto, user);
  }

  @Patch()
  public async update(
    @Body() patchDto: PatchInstagramGuidelinesScoreDto,
  ): Promise<InstagramGuidelinesScore> {
    return this.instagramGuidelinesScoresService.update(patchDto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.instagramGuidelinesScoresService.delete(id);
  }
}
