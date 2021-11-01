import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';
import { RequirePermissions } from 'src/auth/utils/decorator/require-permissions.decorator';
import { Permissions } from 'src/permissions/permissions.enum';
import { JwtAuthGuard } from 'src/auth/utils/guard/jwt-auth.guard';

@Controller('roles')
@UseGuards(new JwtAuthGuard())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions(Permissions.CREATE_ROLE)
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
  @RequirePermissions(Permissions.GET_PERMISSION)
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
  @RequirePermissions(Permissions.GET_PERMISSION)
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
  @RequirePermissions(Permissions.UPDATE_PERMISSION)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      await this.rolesService.update(+id, updateRoleDto);
      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @RequirePermissions(Permissions.DELETE_PERMISSION)
  async remove(@Param('id') id: string) {
    try {
      await this.rolesService.remove(+id);
      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success');
    } catch (error) {
      throw error;
    }
  }
}
