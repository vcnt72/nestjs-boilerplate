import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    let user: User[];
    try {
      user = await this.usersService.findAll();
    } catch (error) {
      throw error;
    }

    return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
      user,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const user = this.usersService.findOne(+id);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        user,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
      user,
    });
  }
}
