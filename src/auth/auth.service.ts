import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { LoginDTO } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;

    const user = await this.userRepository.findOne(
      {
        email,
      },
      ['role.permissions'],
    );

    if (!user) {
      throw new ConflictException(
        new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'User not found'),
      );
    }

    const authorized = await bcrypt.compare(password, user.password);

    if (!authorized) {
      throw new UnauthorizedException(
        new ResponseEnvelope(ResponseCode.BAD_CREDENTIALS, 'Bad Credentials'),
      );
    }

    const jti = v4();

    user.tokenId = jti;

    const token = this.generateJWTToken(jti, user);

    await this.userRepository.flush();
    return { user, token };
  }

  private generateJWTToken(jti: string, user: User): string {
    const secret = this.configService.get('JWT_SECRET');
    const permissions = user.role.permissions
      .getItems()
      .map((val) => val.permission.code);
    return jwt.sign(
      {
        user: {
          id: user.id,
          role: user.role.code,
          permissions,
        },
      },
      secret,
      {
        expiresIn: dayjs().add(1, 'day').toString(),
        jwtid: jti,
      },
    );
  }
}
