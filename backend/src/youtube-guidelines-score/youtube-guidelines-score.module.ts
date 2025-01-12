import { Module } from '@nestjs/common';
import { YoutubeGuidelinesScoreController } from './youtube-guidelines-score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeGuidelinesScore } from './youtube-guidelines-score.entity';
import { YoutubeGuidelinesScoreService } from './providers/youtube-guidelines-score.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [YoutubeGuidelinesScoreController],
  providers: [YoutubeGuidelinesScoreService],
  imports: [TypeOrmModule.forFeature([YoutubeGuidelinesScore]), UsersModule],
})
export class YoutubeGuidelinesScoreModule {}
