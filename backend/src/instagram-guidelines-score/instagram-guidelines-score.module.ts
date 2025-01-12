import { Module } from '@nestjs/common';
import { InstagramGuidelinesScoreController } from './instagram-guidelines-score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramGuidelinesScore } from './instagram-guidelines-score.entity';
import { InstagramGuidelinesScoreService } from './providers/instagram-guidelines-score.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [InstagramGuidelinesScoreController],
  providers: [InstagramGuidelinesScoreService],
  imports: [TypeOrmModule.forFeature([InstagramGuidelinesScore]), UsersModule],
})
export class InstagramGuidelinesScoreModule {}
