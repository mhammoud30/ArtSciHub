import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { SocialMediaPost } from '../social-media-post.entity';
import { Repository } from 'typeorm';
import { CreateSocialMediaPostDto } from '../dtos/create-social-media-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { BrandsService } from 'src/brands/providers/brands.service';

@Injectable()
export class CreateSocialMediaPostProvider {
  constructor(
    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Inject the social media post repository
     */
    @InjectRepository(SocialMediaPost)
    private readonly socialMediaPostRepository: Repository<SocialMediaPost>,
    /**
     * Inject brand service
     */
    private readonly brandsService: BrandsService,
  ) {}

  public async create(
    createSocialMediaPostDto: CreateSocialMediaPostDto,
    user: ActiveUserData,
  ) {
    let createdBy = undefined;
    let brand = undefined;
    try {
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    try {
      brand = await this.brandsService.findOne(
        createSocialMediaPostDto.brandId,
      );
    } catch (error) {
      throw new NotFoundException(error, 'Brand not found');
    }
    // create a new social media post
    const socialMediaPost = this.socialMediaPostRepository.create({
      ...createSocialMediaPostDto,
      createdBy: createdBy,
      brand: brand,
    });
    try {
      await this.socialMediaPostRepository.save(socialMediaPost);
      return socialMediaPost;
    } catch (error) {
      throw new ConflictException(error, 'Error creating social media');
    }
  }
}
