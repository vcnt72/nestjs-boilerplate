import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { ResponseCode } from 'src/utils/response/response-code';
import { RequirePermissions } from 'src/auth/utils/decorator/require-permissions.decorator';
import { Permissions } from './permissions.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @RequirePermissions(Permissions.CREATE_PERMISSION)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      const permission = this.permissionsService.create(createPermissionDto);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        permission,
      });
    } catch (error) {
      throw error;
    }
  }

  @RequirePermissions(Permissions.GET_PERMISSION)
  @Get()
  findAll() {
    try {
      const permissions = this.permissionsService.findAll();

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        permissions,
      });
    } catch (error) {
      throw error;
    }
  }

  @RequirePermissions(Permissions.UPDATE_PERMISSION)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      await this.permissionsService.update(+id, updatePermissionDto);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success');
    } catch (error) {
      throw error;
    }
  }
}
