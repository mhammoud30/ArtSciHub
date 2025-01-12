import { Module } from '@nestjs/common';
import { FacebookGuidelinesScoreController } from './facebook-guidelines-score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacebookGuidelinesScore } from './facebook-guidelines-score.entity';
import { FacebookGuidelinesScoreService } from './providers/facebook-guidelines-score.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FacebookGuidelinesScoreController],
  providers: [FacebookGuidelinesScoreService],
  imports: [TypeOrmModule.forFeature([FacebookGuidelinesScore]), UsersModule],
})
export class FacebookGuidelinesScoreModule {}
