import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateFacebookGuidelinesScoreDto } from '../dtos/create-facebook-guidelines-score.dto';
import { PatchFacebookGuidelinesScoreDto } from '../dtos/patch-facebook-guidelines-score.dto';
import { FacebookGuidelinesScore } from '../facebook-guidelines-score.entity';

@Injectable()
export class FacebookGuidelinesScoreService {
  constructor(
    /**
     * Inject the FacebookGuidelinesScore repository
     */
    @InjectRepository(FacebookGuidelinesScore)
    private readonly facebookGuidelinesScoreRepository: Repository<FacebookGuidelinesScore>,

    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create a new FacebookGuidelinesScore
   */
  /*******************************************
   * Create a new FacebookGuidelinesScore
   *******************************************/
  public async create(
    createDto: CreateFacebookGuidelinesScoreDto,
    user: ActiveUserData,
  ): Promise<FacebookGuidelinesScore> {
    let createdBy;
    try {
      // Attempt to find the user who is creating this record
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    // Destructure the boolean flags (assuming these fields exist in CreateFacebookGuidelinesScoreDto)
    const {
      aspectRatio, // e.g. boolean to indicate 9:16 or 1:1
      brandLogoEarly,
      humanized,
      optimalLength,
      optimisedForSoundOff,
      simpleMessage,
      soundOn,
    } = createDto;

    // Define the weights for each criterion (all are 14.29% here)
    const CRITERIA_WEIGHTS = {
      aspectRatio: 14.29,
      brandLogoEarly: 14.29,
      humanized: 14.29,
      optimalLength: 14.29,
      optimisedForSoundOff: 14.29,
      simpleMessage: 14.29,
      soundOn: 14.29,
    };

    // add all scores to get max score
    const maxScore = Object.values(CRITERIA_WEIGHTS).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    // Calculate the content score based on which criteria are met
    let contentScore = 0;
    if (aspectRatio) contentScore += CRITERIA_WEIGHTS.aspectRatio;
    if (brandLogoEarly) contentScore += CRITERIA_WEIGHTS.brandLogoEarly;
    if (humanized) contentScore += CRITERIA_WEIGHTS.humanized;
    if (optimalLength) contentScore += CRITERIA_WEIGHTS.optimalLength;
    if (optimisedForSoundOff)
      contentScore += CRITERIA_WEIGHTS.optimisedForSoundOff;
    if (simpleMessage) contentScore += CRITERIA_WEIGHTS.simpleMessage;
    if (soundOn) contentScore += CRITERIA_WEIGHTS.soundOn;

    // map content score to 100
    contentScore = (contentScore / maxScore) * 100;

    // Create a new FacebookGuidelinesScore entity
    const newScore = this.facebookGuidelinesScoreRepository.create({
      ...createDto,
      contentScore, // Attach the computed score
      createdBy,
    });
    console.log('newScore', newScore);

    try {
      await this.facebookGuidelinesScoreRepository.save(newScore);
      return newScore;
    } catch (error) {
      throw new ConflictException(
        error,
        'Error creating FacebookGuidelinesScore',
      );
    }
  }

  /**
   * Find all FacebookGuidelinesScores
   */
  public async findAll(): Promise<any[]> {
    const scores = await this.facebookGuidelinesScoreRepository.find({
      relations: ['createdBy'],
    });

    // Optionally transform or mask user data
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
   * Find one FacebookGuidelinesScore by ID
   */
  public async findOne(id: number): Promise<FacebookGuidelinesScore> {
    const score = await this.facebookGuidelinesScoreRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!score) {
      throw new NotFoundException(
        `FacebookGuidelinesScore with ID ${id} not found`,
      );
    }
    return score;
  }

  /**
   * Delete a FacebookGuidelinesScore
   */
  public async delete(id: number) {
    const existing = await this.facebookGuidelinesScoreRepository.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `FacebookGuidelinesScore with ID ${id} not found`,
      );
    }
    await this.facebookGuidelinesScoreRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   * Update/Patch a FacebookGuidelinesScore
   */
  public async update(patchDto: PatchFacebookGuidelinesScoreDto) {
    const existing = await this.facebookGuidelinesScoreRepository.findOne({
      where: { id: patchDto.id },
      relations: ['createdBy'],
    });

    if (!existing) {
      throw new NotFoundException('FacebookGuidelinesScore not found');
    }

    // Update fields from patchDto
    Object.assign(existing, patchDto);

    try {
      return await this.facebookGuidelinesScoreRepository.save(existing);
    } catch (error) {
      throw new ConflictException(
        error,
        'Error updating FacebookGuidelinesScore',
      );
    }
  }
}
