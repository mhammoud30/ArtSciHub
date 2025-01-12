import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateTiktokGuidelinesScoreDto } from './dtos/create-tiktok-guidelines-score.dto';
import { PatchTiktokGuidelinesScoreDto } from './dtos/patch-tiktok-guidelines-score.dto';
import { TiktokGuidelinesScore } from './tiktok-guidelines-score.entity';
import { TiktokGuidelinesScoreService } from './providers/tiktok-guidelines-score.service';

@Controller('api/tiktok-guidelines-scores')
export class TiktokGuidelinesScoreController {
  constructor(
    /**
     * Inject the TiktokGuidelinesScoresService
     */
    private readonly tiktokGuidelinesScoresService: TiktokGuidelinesScoreService,
  ) {}

  @Get()
  public async findAll() {
    return this.tiktokGuidelinesScoresService.findAll();
  }

  @Post()
  public async create(
    @Body() createDto: CreateTiktokGuidelinesScoreDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<TiktokGuidelinesScore> {
    return this.tiktokGuidelinesScoresService.create(createDto, user);
  }

  @Patch()
  public async update(
    @Body() patchDto: PatchTiktokGuidelinesScoreDto,
  ): Promise<TiktokGuidelinesScore> {
    return this.tiktokGuidelinesScoresService.update(patchDto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tiktokGuidelinesScoresService.delete(id);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TiktokGuidelinesScore> {
    return this.tiktokGuidelinesScoresService.findOne(id);
  }
}
