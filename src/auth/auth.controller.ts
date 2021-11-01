import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const resp = await this.authService.login(loginDTO);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData(
        resp,
      );
    } catch (error) {
      throw error;
    }
  }
}
