import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject UsersService since it is a circular dependency
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the hashing provider
     */
    private readonly hashingProvider: HashingProvider,
    /**
     * Inject the jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * Inject the jwtConfig
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    //find user using email ID
    // throw an exception if user does not exist
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // compare the password
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(error, {
        description: 'Error comparing the password',
      });
    }
    // if password is correct, return the user
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // return a jwt token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return {
      accessToken,
    };
  }
}
