import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialMediaPost } from '../social-media-post.entity';
import { GetDashboardDataDto } from '../dtos/get-dashboard-data.dto';

@Injectable()
export class GetDashboardDataProvider {
  constructor(
    /**
     * Inject the social media post repository
     */
    @InjectRepository(SocialMediaPost)
    private readonly socialMediaPostRepository: Repository<SocialMediaPost>,
  ) {}

  public async getDashboardData(query: GetDashboardDataDto) {
    const {
      startDate,
      endDate,
      brandName,
      brandId,
      platform,
      thumbnail,
      dimensions,
      concept,
      creativeType,
      sound,
      targetAudienceAge,
      targetAudienceGender,
      targetAudienceIncome,
      duration,
      language,
      callToAction,
      promoCode,
      hook,
      contentTone,
      campaignObjective,
      groupByBrand,
      groupByPlatform,
      groupByDate,
    } = query;

    let qb = this.socialMediaPostRepository
      .createQueryBuilder('post')
      .leftJoin('post.brand', 'brand')
      // Example aggregator fields
      .select('SUM(post.views)', 'totalViews')
      .addSelect('SUM(post.likes)', 'totalLikes')
      .addSelect('SUM(post.comments)', 'totalComments')
      .addSelect('SUM(post.shares)', 'totalShares')
      .addSelect('SUM(post.saves)', 'totalSaves')
      // If you still want a post count
      .addSelect('COUNT(post.id)', 'postCount');
    // ======= FILTERS =======
    if (startDate) {
      qb = qb.andWhere('post.publishedAt >= :startDate', { startDate });
    }
    if (endDate) {
      qb = qb.andWhere('post.publishedAt <= :endDate', { endDate });
    }
    if (brandName) {
      qb = qb.andWhere('brand.name = :brandName', { brandName });
    }
    if (brandId) {
      qb = qb.andWhere('brand.id = :brandId', { brandId });
    }
    if (platform) {
      qb = qb.andWhere('post.platform = :platform', { platform });
    }
    if (thumbnail) {
      qb = qb.andWhere('post.thumbnail = :thumbnail', { thumbnail });
    }
    if (dimensions) {
      qb = qb.andWhere('post.dimensions = :dimensions', { dimensions });
    }
    if (concept?.length) {
      qb = qb.andWhere('post.concept && :concept', { concept }); // Postgres array operator
    }
    if (creativeType) {
      qb = qb.andWhere('post.creativeType = :creativeType', { creativeType });
    }
    if (sound?.length) {
      qb = qb.andWhere('post.sound && :sound', { sound });
    }
    if (targetAudienceAge) {
      qb = qb.andWhere('post.targetAudienceAge = :targetAudienceAge', {
        targetAudienceAge,
      });
    }
    if (targetAudienceGender) {
      qb = qb.andWhere('post.targetAudienceGender = :targetAudienceGender', {
        targetAudienceGender,
      });
    }
    if (targetAudienceIncome) {
      qb = qb.andWhere('post.targetAudienceIncome = :targetAudienceIncome', {
        targetAudienceIncome,
      });
    }
    if (duration) {
      qb = qb.andWhere('post.duration = :duration', { duration });
    }
    if (language) {
      qb = qb.andWhere('post.language = :language', { language });
    }
    if (callToAction) {
      qb = qb.andWhere('post.callToAction = :callToAction', { callToAction });
    }
    if (promoCode !== undefined) {
      qb = qb.andWhere('post.promoCode = :promoCode', { promoCode });
    }
    if (hook !== undefined) {
      qb = qb.andWhere('post.hook = :hook', { hook });
    }
    if (contentTone) {
      qb = qb.andWhere('post.contentTone = :contentTone', { contentTone });
    }
    if (campaignObjective) {
      qb = qb.andWhere('post.campaignObjective = :campaignObjective', {
        campaignObjective,
      });
    }

    // ======= GROUPING =======
    // Example grouping logic based on request flags
    if (groupByBrand) {
      qb = qb.addSelect('brand.name', 'brandName').addGroupBy('brand.name');
    }
    if (groupByPlatform) {
      qb = qb
        .addSelect('post.platform', 'platform')
        .addGroupBy('post.platform');
    }
    if (groupByDate) {
      // Example for Postgres grouping by day, week, month, etc.
      if (groupByDate === 'day') {
        qb = qb
          .addSelect("DATE_TRUNC('day', post.publishedAt)", 'groupDate')
          .addGroupBy("DATE_TRUNC('day', post.publishedAt)");
      } else if (groupByDate === 'week') {
        qb = qb
          .addSelect("DATE_TRUNC('week', post.publishedAt)", 'groupDate')
          .addGroupBy("DATE_TRUNC('week', post.publishedAt)");
      } else if (groupByDate === 'month') {
        qb = qb
          .addSelect("DATE_TRUNC('month', post.publishedAt)", 'groupDate')
          .addGroupBy("DATE_TRUNC('month', post.publishedAt)");
      } else if (groupByDate === 'year') {
        qb = qb
          .addSelect("DATE_TRUNC('year', post.publishedAt)", 'groupDate')
          .addGroupBy("DATE_TRUNC('year', post.publishedAt)");
      }
    }

    const results = await qb.getRawMany();
    return results;
  }
}
