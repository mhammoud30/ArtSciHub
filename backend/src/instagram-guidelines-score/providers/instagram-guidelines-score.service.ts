import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateInstagramGuidelinesScoreDto } from '../dtos/create-instagram-guidelines-score.dto';
import { PatchInstagramGuidelinesScoreDto } from '../dtos/patch-instagram-guidelines-score.dto';
import { InstagramGuidelinesScore } from '../instagram-guidelines-score.entity';

@Injectable()
export class InstagramGuidelinesScoreService {
  constructor(
    /**
     * Inject the InstagramGuidelinesScore repository
     */
    @InjectRepository(InstagramGuidelinesScore)
    private readonly instagramGuidelinesScoreRepository: Repository<InstagramGuidelinesScore>,

    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   *  Create a new InstagramGuidelinesScore
   */
  public async create(
    createDto: CreateInstagramGuidelinesScoreDto,
    user: ActiveUserData,
  ): Promise<InstagramGuidelinesScore> {
    let createdBy;
    try {
      // Attempt to find the user who is creating this record
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    // Destructure the boolean flags from the DTO
    const {
      brandLogoEarly, // 14.29%
      humanized, // 14.29%
      optimisedForSoundOff, // 14.29%
      simpleMessage, // 14.29%
      soundOn, // 14.29%
      aspectRatio, // 7.14%  (Stories -> 9:16, Reels -> 9:16 or 1:1)
      optimalLength, // 7.14%  (Stories -> < 13.1s, Reels -> ≤ 15.1s)
    } = createDto;

    /**
     * Define the fixed weights for the shared criteria.
     * These remain the same for both STORY and REEL.
     */
    const SHARED_CRITERIA_WEIGHTS = {
      brandLogoEarly: 14.29,
      humanized: 14.29,
      optimisedForSoundOff: 14.29,
      simpleMessage: 14.29,
      soundOn: 14.29,
    };

    // Additional or type-specific weights
    // (In this case, aspectRatio and optimalLength each contribute 7.14%,
    //  but you've already handled the logic in the booleans to see if they pass)
    const ASPECT_RATIO_WEIGHT = 7.14;
    const OPTIMAL_LENGTH_WEIGHT = 7.14;

    // Calculate the contentScore
    let contentScore = 0;

    // Sum up shared-criteria weights based on the boolean flags
    if (brandLogoEarly) contentScore += SHARED_CRITERIA_WEIGHTS.brandLogoEarly;
    if (humanized) contentScore += SHARED_CRITERIA_WEIGHTS.humanized;
    if (optimisedForSoundOff)
      contentScore += SHARED_CRITERIA_WEIGHTS.optimisedForSoundOff;
    if (simpleMessage) contentScore += SHARED_CRITERIA_WEIGHTS.simpleMessage;
    if (soundOn) contentScore += SHARED_CRITERIA_WEIGHTS.soundOn;

    // Type-based criteria (already set in the booleans)
    if (aspectRatio) contentScore += ASPECT_RATIO_WEIGHT;
    if (optimalLength) contentScore += OPTIMAL_LENGTH_WEIGHT;

    // Create a new InstagramGuidelinesScore entity
    const newScore = this.instagramGuidelinesScoreRepository.create({
      ...createDto,
      contentScore,
      createdBy,
    });

    try {
      await this.instagramGuidelinesScoreRepository.save(newScore);
      return newScore;
    } catch (error) {
      throw new ConflictException(
        error,
        'Error creating InstagramGuidelinesScore',
      );
    }
  }

  /**
   *  Find all InstagramGuidelinesScores
   */
  public async findAll(): Promise<any[]> {
    const scores = await this.instagramGuidelinesScoreRepository.find({
      relations: ['createdBy'],
    });
    // Optionally transform user data or remove sensitive info
    return scores.map((score) => ({
      ...score,
      createdBy: {
        id: score.createdBy?.id,
        firstName: score.createdBy?.firstName,
        lastName: score.createdBy?.lastName,
      },
    }));
  }

  /**
   *  Find one InstagramGuidelinesScore
   */
  public async findOne(id: number): Promise<InstagramGuidelinesScore> {
    const score = await this.instagramGuidelinesScoreRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!score) {
      throw new NotFoundException(
        `InstagramGuidelinesScore with ID ${id} not found`,
      );
    }
    return score;
  }

  /**
   *  Delete an InstagramGuidelinesScore
   */
  public async delete(id: number) {
    const existing = await this.instagramGuidelinesScoreRepository.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `InstagramGuidelinesScore with ID ${id} not found`,
      );
    }
    await this.instagramGuidelinesScoreRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   *  Update/Patch an InstagramGuidelinesScore
   */
  public async update(patchDto: PatchInstagramGuidelinesScoreDto) {
    const existing = await this.instagramGuidelinesScoreRepository.findOne({
      where: { id: patchDto.id },
      relations: ['createdBy'],
    });

    if (!existing) {
      throw new NotFoundException('InstagramGuidelinesScore not found');
    }

    // Update fields from patchDto
    Object.assign(existing, patchDto);

    try {
      return await this.instagramGuidelinesScoreRepository.save(existing);
    } catch (error) {
      throw new ConflictException(
        error,
        'Error updating InstagramGuidelinesScore',
      );
    }
  }
}
