import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('api/hello')
  @Auth(AuthType.None)
  getHello() {
    console.log(this.configService.get('appConfig.environment'));
    return {
      environment: this.configService.get('appConfig.environment'),
      message: 'Hello World',
    };
  }
}
