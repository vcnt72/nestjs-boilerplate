import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = this.rolesService.create(createRoleDto);
      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        role,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const roles = await this.rolesService.findAll();

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        roles,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const role = await this.rolesService.findOne(+id);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        role,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      await this.rolesService.update(+id, updateRoleDto);
      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.rolesService.remove(+id);
    return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success');
  }
}
