import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './providers/brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
  imports: [TypeOrmModule.forFeature([Brand]), UsersModule],
})
export class BrandsModule {}
