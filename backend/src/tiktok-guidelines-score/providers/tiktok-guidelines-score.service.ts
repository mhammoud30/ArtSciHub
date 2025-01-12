import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateTiktokGuidelinesScoreDto } from '../dtos/create-tiktok-guidelines-score.dto';
import { PatchTiktokGuidelinesScoreDto } from '../dtos/patch-tiktok-guidelines-score.dto';
import { TiktokGuidelinesScore } from '../tiktok-guidelines-score.entity';

@Injectable()
export class TiktokGuidelinesScoreService {
  constructor(
    /**
     * Inject the TiktokGuidelinesScore repository
     */
    @InjectRepository(TiktokGuidelinesScore)
    private readonly tiktokGuidelinesScoreRepository: Repository<TiktokGuidelinesScore>,

    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   *  Create a new TiktokGuidelinesScore
   */
  public async create(
    createDto: CreateTiktokGuidelinesScoreDto,
    user: ActiveUserData,
  ): Promise<TiktokGuidelinesScore> {
    let createdBy;
    try {
      // Attempt to find the user who is creating this record
      createdBy = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new NotFoundException(error, 'User not found');
    }

    // Destructure the boolean flags from the DTO
    const {
      aspectRatio, // 12.5%
      brandGoodbye, // 12.5%
      brandLink, // 12.5%
      breakThe4thWall, // 12.5%
      humanized, // 12.5%
      simpleMessage, // 12.5%
      soundOn, // 12.5%
      supersPresent, // 12.5%
    } = createDto;

    // Define the weights (each criterion is 12.5%)
    const CRITERIA_WEIGHTS = {
      aspectRatio: 12.5,
      brandGoodbye: 12.5,
      brandLink: 12.5,
      breakThe4thWall: 12.5,
      humanized: 12.5,
      simpleMessage: 12.5,
      soundOn: 12.5,
      supersPresent: 12.5,
    };

    // add all scores to get max score
    const maxScore = Object.values(CRITERIA_WEIGHTS).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    // Calculate the contentScore
    let contentScore = 0;

    if (aspectRatio) contentScore += CRITERIA_WEIGHTS.aspectRatio;
    if (brandGoodbye) contentScore += CRITERIA_WEIGHTS.brandGoodbye;
    if (brandLink) contentScore += CRITERIA_WEIGHTS.brandLink;
    if (breakThe4thWall) contentScore += CRITERIA_WEIGHTS.breakThe4thWall;
    if (humanized) contentScore += CRITERIA_WEIGHTS.humanized;
    if (simpleMessage) contentScore += CRITERIA_WEIGHTS.simpleMessage;
    if (soundOn) contentScore += CRITERIA_WEIGHTS.soundOn;
    if (supersPresent) contentScore += CRITERIA_WEIGHTS.supersPresent;

    // map content score to 100
    contentScore = (contentScore / maxScore) * 100;

    // Create a new TiktokGuidelinesScore entity
    const newScore = this.tiktokGuidelinesScoreRepository.create({
      ...createDto,
      contentScore,
      createdBy,
    });

    try {
      await this.tiktokGuidelinesScoreRepository.save(newScore);
      return newScore;
    } catch (error) {
      throw new ConflictException(
        error,
        'Error creating TiktokGuidelinesScore',
      );
    }
  }

  /**
   *  Find all TiktokGuidelinesScores
   */
  public async findAll(): Promise<any[]> {
    const scores = await this.tiktokGuidelinesScoreRepository.find({
      relations: ['createdBy'],
    });

    // Optionally shape the user data
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
   *  Find one TiktokGuidelinesScore
   */
  public async findOne(id: number): Promise<TiktokGuidelinesScore> {
    const score = await this.tiktokGuidelinesScoreRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!score) {
      throw new NotFoundException(
        `TiktokGuidelinesScore with ID ${id} not found`,
      );
    }
    return score;
  }

  /**
   *  Delete a TiktokGuidelinesScore
   */
  public async delete(id: number) {
    const existing = await this.tiktokGuidelinesScoreRepository.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `TiktokGuidelinesScore with ID ${id} not found`,
      );
    }
    await this.tiktokGuidelinesScoreRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   *  Update/Patch a TiktokGuidelinesScore
   */
  public async update(patchDto: PatchTiktokGuidelinesScoreDto) {
    const existing = await this.tiktokGuidelinesScoreRepository.findOne({
      where: { id: patchDto.id },
      relations: ['createdBy'],
    });

    if (!existing) {
      throw new NotFoundException('TiktokGuidelinesScore not found');
    }

    // Update fields from patchDto
    Object.assign(existing, patchDto);

    try {
      return await this.tiktokGuidelinesScoreRepository.save(existing);
    } catch (error) {
      throw new ConflictException(
        error,
        'Error updating TiktokGuidelinesScore',
      );
    }
  }
}
