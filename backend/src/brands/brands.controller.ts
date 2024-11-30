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
import { BrandsService } from './providers/brands.service';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { PatchBrandDto } from './dtos/patch-brand.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('brands')
export class BrandsController {
  constructor(
    /**
     * Inject the BrandsService
     */
    private readonly brandsService: BrandsService,
  ) {}

  @Get()
  public async findAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Post()
  public async create(
    @Body() createBrandDto: CreateBrandDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<Brand> {
    return this.brandsService.create(createBrandDto, user);
  }

  @Patch()
  public async update(@Body() patchBrandDto: PatchBrandDto) {
    return this.brandsService.update(patchBrandDto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandsService.findOne(id);
  }
}
