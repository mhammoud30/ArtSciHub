import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMediaPost } from '../social-media-post.entity';
import { Repository } from 'typeorm';
import { CreateSocialMediaPostDto } from '../dtos/create-social-media-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateSocialMediaPostProvider } from './create-social-media-post.provider';

@Injectable()
export class SocialMediaPostsService {
  constructor(
    /**
     * Inject the social media post repository
     */
    @InjectRepository(SocialMediaPost)
    private readonly socialMediaPostRepository: Repository<SocialMediaPost>,
    /**
     * Inject create post provider
     */
    private readonly createSocialMediaPostProvider: CreateSocialMediaPostProvider,
  ) {}

  public async create(
    createSocialMediaPostDto: CreateSocialMediaPostDto,
    user: ActiveUserData,
  ) {
    return this.createSocialMediaPostProvider.create(
      createSocialMediaPostDto,
      user,
    );
  }
  /**
   * Find all social media posts
   */
  public async findAll() {
    const posts = await this.socialMediaPostRepository.find({
      relations: ['brand', 'createdBy'],
    });
    return posts.map((post) => ({
      ...post,
      brand: {
        name: post.brand.name,
        vertical: post.brand.vertical,
      },
      createdBy: {
        name: `${post.createdBy.firstName} ${post.createdBy.lastName}`,
      },
    }));
  }

  /**
   * Find social media post by id
   */
  public async findOneById(id: number) {
    try {
      const post = await this.socialMediaPostRepository.findOne({
        where: { id },
        relations: ['brand', 'createdBy', 'updatedBy'],
      });

      if (!post) {
        throw new Error('Post not found');
      }

      // Return the transformed post
      return {
        ...post,
        brand: {
          name: post.brand.name,
          vertical: post.brand.vertical,
        },
        createdBy: {
          name: `${post.createdBy.firstName} ${post.createdBy.lastName}`,
        },
        updatedBy: {
          name: `${post.updatedBy?.firstName} ${post.updatedBy?.lastName}`,
        },
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new Error('Post not found');
    }
  }

  /**
   * Delete social media post by id
   */
  /* public async delete(id: number) {
    const post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.socialMediaPostRepository.delete(post);

    return { message: 'Post deleted', id };
  } */

  /**
   * Update a social media post
   */
}
