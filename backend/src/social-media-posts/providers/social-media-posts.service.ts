import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMediaPost } from '../social-media-post.entity';
import { Repository } from 'typeorm';
import { CreateSocialMediaPostDto } from '../dtos/create-social-media-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateSocialMediaPostProvider } from './create-social-media-post.provider';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetSocialMediaPostDto } from '../dtos/get-social-media-posts.dto';
import { GetDashboardDataDto } from '../dtos/get-dashboard-data.dto';
import { GetDashboardDataProvider } from './get-dashboard-data.provider';

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
    /**
     * Injecting Pagination Provider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject the get dashboard data provider
     */
    private readonly dashboardDataProvider: GetDashboardDataProvider,
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
  public async findAll(socialMediaPostQuery: GetSocialMediaPostDto) {
    const paginatedResult = await this.paginationProvider.paginateQuery(
      {
        limit: socialMediaPostQuery.limit,
        page: socialMediaPostQuery.page,
      },
      this.socialMediaPostRepository,
      ['brand', 'createdBy'],
    );

    const { data, meta, links } = paginatedResult;

    const transformedData = data.map((post) => ({
      ...post,
      brand: {
        name: post.brand.name,
        vertical: post.brand.vertical,
      },
      createdBy: {
        name: `${post.createdBy.firstName} ${post.createdBy.lastName}`,
      },
    }));

    return {
      data: transformedData,
      meta,
      links,
    };
  }

  /**
   * Get dashboard data
   */
  public async getDashboardData(query: GetDashboardDataDto) {
    return this.dashboardDataProvider.getDashboardData(query);
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
