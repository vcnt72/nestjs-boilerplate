import { Controller, Get, Param } from '@nestjs/common';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { RolePermissionService } from './role-permission.service';

@Controller()
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}
  @Get('role-with-permissions/:roleId')
  async findByRoleId(@Param('roleId') id: number) {
    try {
      const role = await this.rolePermissionService.findByRoleId(id);

      return new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
        role,
      });
    } catch (error) {
      throw error;
    }
  }
}
