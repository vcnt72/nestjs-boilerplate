import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.fullname = createUserDto.fullname;

      user.password = await bcrypt.hash(createUserDto.password, 10);

      await this.userRepository.persistAndFlush(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown Error',
        ).withErrMsg(error.message),
      );
    }
  }

  async findOne(id: number): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown Error',
        ).withErrMsg(error.message),
      );
    }

    if (!user) {
      throw new ConflictException(
        new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'User not found'),
      );
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    wrap(user).assign(updateUserDto);

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await this.userRepository.flush();
  }
}
