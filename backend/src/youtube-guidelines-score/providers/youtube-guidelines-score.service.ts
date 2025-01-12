import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YoutubeGuidelinesScore } from '../youtube-guidelines-score.entity';
import { Repository } from 'typeorm';
import { CreateYoutubeGuidelinesScoreDto } from '../dtos/create-youtube-guidelines-score.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UpdateYoutubeGuidelinesScoreDto } from '../dtos/update-youtube-guidelines-score.dto';

@Injectable()
export class YoutubeGuidelinesScoreService {
  constructor(
    /**
     * Inject the repository
     */
    @InjectRepository(YoutubeGuidelinesScore)
    private readonly youtubeGuidelinesScoreRepository: Repository<YoutubeGuidelinesScore>,

    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create a new YoutubeGuidelinesScore
   */
  public async create(
    createYoutubeGuidelinesScoreDto: CreateYoutubeGuidelinesScoreDto,
    user: ActiveUserData,
  ): Promise<YoutubeGuidelinesScore> {
    let createdBy;
    try {
      // Attempt to find the user who is creating this record
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    // Destructure the boolean flags from DTO (assuming these fields exist)
    const {
      aspectRatio,
      brandAudioMention,
      frame,
      introduce,
      pacing,
      reinforce,
      soundOn,
    } = createYoutubeGuidelinesScoreDto;

    /**
     * Define the weights (as percentages or numeric points).
     * You can store them in a constant or retrieve from config.
     * The sum of these should be ~100 (slight rounding differences possible).
     */
    const CRITERIA_WEIGHTS = {
      aspectRatio: 16.67,
      brandAudioMention: 16.67,
      frame: 16.67,
      introduce: 8.33,
      pacing: 16.67,
      reinforce: 8.33,
      soundOn: 16.67,
    };

    // add all scores to get max score
    const maxScore = Object.values(CRITERIA_WEIGHTS).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    // Calculate the contentScore
    let contentScore = 0;
    if (aspectRatio) contentScore += CRITERIA_WEIGHTS.aspectRatio;
    if (brandAudioMention) contentScore += CRITERIA_WEIGHTS.brandAudioMention;
    if (frame) contentScore += CRITERIA_WEIGHTS.frame;
    if (introduce) contentScore += CRITERIA_WEIGHTS.introduce;
    if (pacing) contentScore += CRITERIA_WEIGHTS.pacing;
    if (reinforce) contentScore += CRITERIA_WEIGHTS.reinforce;
    if (soundOn) contentScore += CRITERIA_WEIGHTS.soundOn;

    // map content score to 100
    contentScore = (contentScore / maxScore) * 100;

    // Create a new guidelines score entity
    const newScore = this.youtubeGuidelinesScoreRepository.create({
      ...createYoutubeGuidelinesScoreDto,
      contentScore, // Attach the computed score to the entity
      createdBy,
    });

    try {
      await this.youtubeGuidelinesScoreRepository.save(newScore);
      return newScore;
    } catch (error) {
      throw new ConflictException(
        error,
        'Error creating YoutubeGuidelinesScore',
      );
    }
  }

  /**
   * Find all YoutubeGuidelinesScores
   */
  public async findAll(): Promise<any[]> {
    // If you want the related user data, load the 'createdBy' relation
    const records = await this.youtubeGuidelinesScoreRepository.find({
      relations: ['createdBy'],
    });

    // Optionally transform the response to mask or shape user data
    return records.map((record) => ({
      ...record,
      createdBy: {
        id: record.createdBy?.id,
        firstName: record.createdBy?.firstName,
        lastName: record.createdBy?.lastName,
      },
    }));
  }

  /**
   * Find one YoutubeGuidelinesScore by ID
   */
  public async findOne(id: number): Promise<YoutubeGuidelinesScore> {
    const score = await this.youtubeGuidelinesScoreRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!score) {
      throw new NotFoundException(
        `YoutubeGuidelinesScore with ID ${id} not found`,
      );
    }
    return score;
  }

  /**
   * Delete a YoutubeGuidelinesScore by ID
   */
  public async delete(id: number): Promise<{ deleted: boolean; id: number }> {
    const existing = await this.youtubeGuidelinesScoreRepository.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `YoutubeGuidelinesScore with ID ${id} not found`,
      );
    }

    await this.youtubeGuidelinesScoreRepository.delete(id);
    return { deleted: true, id };
  }

  /**
   * Update/Patch a YoutubeGuidelinesScore
   */
  public async update(
    patchDto: UpdateYoutubeGuidelinesScoreDto,
  ): Promise<YoutubeGuidelinesScore> {
    const existing = await this.youtubeGuidelinesScoreRepository.findOne({
      where: { id: patchDto.id },
      relations: ['createdBy'],
    });
    if (!existing) {
      throw new NotFoundException('YoutubeGuidelinesScore not found');
    }

    // Update fields from the DTO
    // (You can do this individually or via a spread)
    Object.assign(existing, patchDto);

    // Attempt to save the updated record
    try {
      return await this.youtubeGuidelinesScoreRepository.save(existing);
    } catch (error) {
      throw new ConflictException(
        error,
        'Error updating YoutubeGuidelinesScore',
      );
    }
  }
}
