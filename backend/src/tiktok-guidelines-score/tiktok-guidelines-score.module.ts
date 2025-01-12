import { Module } from '@nestjs/common';
import { TiktokGuidelinesScoreController } from './tiktok-guidelines-score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiktokGuidelinesScore } from './tiktok-guidelines-score.entity';
import { UsersModule } from 'src/users/users.module';
import { TiktokGuidelinesScoreService } from './providers/tiktok-guidelines-score.service';

@Module({
  controllers: [TiktokGuidelinesScoreController],
  providers: [TiktokGuidelinesScoreService],
  imports: [TypeOrmModule.forFeature([TiktokGuidelinesScore]), UsersModule],
})
export class TiktokGuidelinesScoreModule {}
