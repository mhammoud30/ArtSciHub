import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Brand } from '../brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { PatchBrandDto } from '../dtos/patch-brand.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class BrandsService {
  constructor(
    /**
     * Inject the brandrespository
     */
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   *  Create a new brand
   */
  public async create(
    createBrandDto: CreateBrandDto,
    user: ActiveUserData,
  ): Promise<Brand> {
    let createdBy = undefined;
    try {
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    // create a new brand
    const brand = this.brandRepository.create({
      ...createBrandDto,
      createdBy,
    });
    try {
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      throw new ConflictException(error, 'Error creating brand');
    }
  }

  /**
   *  Find all brands
   */
  public async findAll(): Promise<Brand[]> {
    return this.brandRepository.find({
      relations: ['createdBy'],
    });
  }

  /**
   *  Find one brand
   */
  public async findOne(id: number): Promise<Brand> {
    return this.brandRepository.findOneBy({ id });
  }

  /**
   *  Delete a brand
   */
  public async delete(id: number) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await this.brandRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   *  Update a brand
   */
  public async update(patchBrandDto: PatchBrandDto) {
    const brand = await this.brandRepository.findOneBy({
      id: patchBrandDto.id,
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    // update all the fields from the patchBrandDto
    // complete method later
  }
}
