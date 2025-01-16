import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SocialMediaPost } from '../social-media-post.entity';
import { GetDashboardDataDto } from '../dtos/get-dashboard-data.dto';

@Injectable()
export class GetDashboardDataProvider {
  constructor(
    @InjectRepository(SocialMediaPost)
    private readonly socialMediaPostRepository: Repository<SocialMediaPost>,
  ) {}

  /**
   * Enhanced dashboard method that returns multiple grouped
   * & aggregated data sets in a single response.
   */
  public async getDashboardData(query: GetDashboardDataDto) {
    // ---------------------------
    // 1) Overall Summary
    // ---------------------------
    let qbSummary = this.socialMediaPostRepository
      .createQueryBuilder('post')
      .leftJoin('post.brand', 'brand')
      // Summation of main metrics
      .select('SUM(post.views)', 'totalViews')
      .addSelect('SUM(post.likes)', 'totalLikes')
      .addSelect('SUM(post.comments)', 'totalComments')
      .addSelect('SUM(post.shares)', 'totalShares')
      .addSelect('SUM(post.saves)', 'totalSaves')
      // Example: also compute average, max, min for deeper insights
      .addSelect('AVG(post.views)', 'avgViews')
      .addSelect('MAX(post.views)', 'maxViews')
      .addSelect('MIN(post.views)', 'minViews');

    qbSummary = this.applyFilters(qbSummary, query);
    const summary = await qbSummary.getRawOne();

    // ---------------------------
    // 2) Group By Brand
    // ---------------------------
    let qbBrand = this.socialMediaPostRepository
      .createQueryBuilder('post')
      .leftJoin('post.brand', 'brand')
      .select('brand.name', 'brandName')
      .addSelect('SUM(post.views)', 'totalViews')
      .addSelect('SUM(post.likes)', 'totalLikes')
      .addSelect('SUM(post.comments)', 'totalComments')
      .addSelect('SUM(post.shares)', 'totalShares')
      .addSelect('SUM(post.saves)', 'totalSaves')
      .groupBy('brand.name');

    qbBrand = this.applyFilters(qbBrand, query);
    const groupByBrand = await qbBrand.getRawMany();

    // ---------------------------
    // 3) Group By Platform
    // ---------------------------
    let qbPlatform = this.socialMediaPostRepository
      .createQueryBuilder('post')
      .leftJoin('post.brand', 'brand')
      .select('post.platform', 'platform')
      .addSelect('SUM(post.views)', 'totalViews')
      .addSelect('SUM(post.likes)', 'totalLikes')
      .addSelect('SUM(post.comments)', 'totalComments')
      .addSelect('SUM(post.shares)', 'totalShares')
      .addSelect('SUM(post.saves)', 'totalSaves')
      .groupBy('post.platform');

    qbPlatform = this.applyFilters(qbPlatform, query);
    const groupByPlatform = await qbPlatform.getRawMany();

    // ---------------------------
    // 4) Group By Date (day/week/month/year)
    //    - Only if groupByDate is provided
    // ---------------------------
    const { groupByDate } = query;
    let groupByDateResults = [];
    if (groupByDate) {
      let qbDate = this.socialMediaPostRepository
        .createQueryBuilder('post')
        .leftJoin('post.brand', 'brand')
        .select('SUM(post.views)', 'totalViews')
        .addSelect('SUM(post.likes)', 'totalLikes')
        .addSelect('SUM(post.comments)', 'totalComments')
        .addSelect('SUM(post.shares)', 'totalShares')
        .addSelect('SUM(post.saves)', 'totalSaves');

      // Apply date grouping based on the request
      if (groupByDate === 'day') {
        qbDate = qbDate
          .addSelect("DATE_TRUNC('day', post.publishedAt)", 'groupDate')
          .groupBy("DATE_TRUNC('day', post.publishedAt)");
      } else if (groupByDate === 'week') {
        qbDate = qbDate
          .addSelect("DATE_TRUNC('week', post.publishedAt)", 'groupDate')
          .groupBy("DATE_TRUNC('week', post.publishedAt)");
      } else if (groupByDate === 'month') {
        qbDate = qbDate
          .addSelect("DATE_TRUNC('month', post.publishedAt)", 'groupDate')
          .groupBy("DATE_TRUNC('month', post.publishedAt)");
      } else if (groupByDate === 'year') {
        qbDate = qbDate
          .addSelect("DATE_TRUNC('year', post.publishedAt)", 'groupDate')
          .groupBy("DATE_TRUNC('year', post.publishedAt)");
      }

      qbDate = this.applyFilters(qbDate, query);
      groupByDateResults = await qbDate.getRawMany();
    }

    // ---------------------------
    // 5) Top 5 Posts by Views
    // ---------------------------
    let qbTopPosts = this.socialMediaPostRepository
      .createQueryBuilder('post')
      .leftJoin('post.brand', 'brand')
      .select('post.id', 'id')
      .addSelect('brand.name', 'brandName')
      .addSelect('post.platform', 'platform')
      .addSelect('post.views', 'views')
      .addSelect('post.likes', 'likes')
      .addSelect('post.comments', 'comments')
      .addSelect('post.shares', 'shares')
      .addSelect('post.saves', 'saves')
      .orderBy('post.views', 'DESC')
      .take(5); // Limit to top 5

    qbTopPosts = this.applyFilters(qbTopPosts, query);
    const topPostsByViews = await qbTopPosts.getRawMany();

    // ---------------------------
    // 6) Group by Concept (array-based)
    //    * Using a raw query that un-nests concept[] in PostgreSQL
    // ---------------------------
    // Adjust table name or columns as needed
    const { startDate, endDate } = query;
    const params = [];
    let conceptWhere = '';

    if (startDate) {
      conceptWhere += ` AND "publishedAt" >= $${params.length + 1}`;
      params.push(startDate);
    }
    if (endDate) {
      conceptWhere += ` AND "publishedAt" <= $${params.length + 1}`;
      params.push(endDate);
    }
    // Extend with brandId, brandName, etc. if needed

    const groupByConcept = await this.socialMediaPostRepository.query(
      `
      SELECT c.concept AS "conceptItem",
             SUM(smp.views) AS "totalViews",
             SUM(smp.likes) AS "totalLikes",
             SUM(smp.comments) AS "totalComments",
             SUM(smp.shares) AS "totalShares",
             SUM(smp.saves) AS "totalSaves"
        FROM (
          SELECT "id", UNNEST("concept") AS concept
          FROM "social_media_post"
          WHERE 1=1
          ${conceptWhere}
        ) c
        JOIN "social_media_post" smp
          ON smp.id = c.id
       GROUP BY c.concept
       ORDER BY SUM(smp.views) DESC
      `,
      params,
    );

    // Return everything in a single response
    return {
      summary,
      groupByBrand,
      groupByPlatform,
      groupByDate: groupByDateResults,
      topPostsByViews,
      groupByConcept,
    };
  }

  /**
   * Helper method to DRY (Don't Repeat Yourself):
   * Applies all relevant filters to the QueryBuilder
   */
  private applyFilters(
    qb: SelectQueryBuilder<SocialMediaPost>,
    query: GetDashboardDataDto,
  ): SelectQueryBuilder<SocialMediaPost> {
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
    } = query;

    if (startDate) {
      qb.andWhere('post.publishedAt >= :startDate', { startDate });
    }
    if (endDate) {
      qb.andWhere('post.publishedAt <= :endDate', { endDate });
    }
    if (brandName) {
      qb.andWhere('brand.name = :brandName', { brandName });
    }
    if (brandId) {
      qb.andWhere('brand.id = :brandId', { brandId });
    }
    if (platform) {
      qb.andWhere('post.platform = :platform', { platform });
    }
    if (thumbnail) {
      qb.andWhere('post.thumbnail = :thumbnail', { thumbnail });
    }
    if (dimensions) {
      qb.andWhere('post.dimensions = :dimensions', { dimensions });
    }
    if (concept?.length) {
      // For array-based filters, use Postgres '&&' operator (array overlap)
      qb.andWhere('post.concept && :concept', { concept });
    }
    if (creativeType) {
      qb.andWhere('post.creativeType = :creativeType', { creativeType });
    }
    if (sound?.length) {
      qb.andWhere('post.sound && :sound', { sound });
    }
    if (targetAudienceAge) {
      qb.andWhere('post.targetAudienceAge = :targetAudienceAge', {
        targetAudienceAge,
      });
    }
    if (targetAudienceGender) {
      qb.andWhere('post.targetAudienceGender = :targetAudienceGender', {
        targetAudienceGender,
      });
    }
    if (targetAudienceIncome) {
      qb.andWhere('post.targetAudienceIncome = :targetAudienceIncome', {
        targetAudienceIncome,
      });
    }
    if (duration) {
      qb.andWhere('post.duration = :duration', { duration });
    }
    if (language) {
      qb.andWhere('post.language = :language', { language });
    }
    if (callToAction) {
      qb.andWhere('post.callToAction = :callToAction', { callToAction });
    }
    if (promoCode !== undefined) {
      qb.andWhere('post.promoCode = :promoCode', { promoCode });
    }
    if (hook !== undefined) {
      qb.andWhere('post.hook = :hook', { hook });
    }
    if (contentTone) {
      qb.andWhere('post.contentTone = :contentTone', { contentTone });
    }
    if (campaignObjective) {
      qb.andWhere('post.campaignObjective = :campaignObjective', {
        campaignObjective,
      });
    }
    return qb;
  }
}
