import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';
import { JwtAuthGuard } from 'src/auth/utils/guard/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
      user,
    });
  }
}
