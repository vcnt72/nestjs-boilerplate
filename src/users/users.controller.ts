import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        user,
      });
    } catch (error) {
      throw error;
    }
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
