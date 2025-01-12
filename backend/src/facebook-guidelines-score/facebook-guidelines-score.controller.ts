// src/facebook-guidelines-scores/facebook-guidelines-scores.controller.ts

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
import { FacebookGuidelinesScore } from './facebook-guidelines-score.entity';
import { CreateFacebookGuidelinesScoreDto } from './dtos/create-facebook-guidelines-score.dto';
import { PatchFacebookGuidelinesScoreDto } from './dtos/patch-facebook-guidelines-score.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FacebookGuidelinesScoreService } from './providers/facebook-guidelines-score.service';

@Controller('api/facebook-guidelines-scores')
export class FacebookGuidelinesScoreController {
  constructor(
    private readonly facebookGuidelinesScoresService: FacebookGuidelinesScoreService,
  ) {}

  @Get()
  public async findAll() {
    return this.facebookGuidelinesScoresService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FacebookGuidelinesScore> {
    return this.facebookGuidelinesScoresService.findOne(id);
  }

  @Post()
  public async create(
    @Body() createDto: CreateFacebookGuidelinesScoreDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<FacebookGuidelinesScore> {
    return this.facebookGuidelinesScoresService.create(createDto, user);
  }

  @Patch()
  public async update(
    @Body() patchDto: PatchFacebookGuidelinesScoreDto,
  ): Promise<FacebookGuidelinesScore> {
    return this.facebookGuidelinesScoresService.update(patchDto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.facebookGuidelinesScoresService.delete(id);
  }
}
