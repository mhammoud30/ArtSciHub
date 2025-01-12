import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from './common/pagination/pagination.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import environmentValidation from './config/environment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { BrandsModule } from './brands/brands.module';
import { SocialMediaPostsModule } from './social-media-posts/social-media-posts.module';
import { YoutubeGuidelinesScoreModule } from './youtube-guidelines-score/youtube-guidelines-score.module';
import { FacebookGuidelinesScoreModule } from './facebook-guidelines-score/facebook-guidelines-score.module';
import { InstagramGuidelinesScoreModule } from './instagram-guidelines-score/instagram-guidelines-score.module';
import { TiktokGuidelinesScoreModule } from './tiktok-guidelines-score/tiktok-guidelines-score.module';

// Get the current NODE_ENV environment variable
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get<boolean>('database.synchronize'),
        autoLoadEntities: configService.get<boolean>(
          'database.autoLoadEntities',
        ),
        port: configService.get<number>('database.port'),
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    AuthModule,
    PaginationModule,
    BrandsModule,
    SocialMediaPostsModule,
    YoutubeGuidelinesScoreModule,
    FacebookGuidelinesScoreModule,
    InstagramGuidelinesScoreModule,
    TiktokGuidelinesScoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
