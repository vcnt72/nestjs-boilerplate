import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { IPermissionRO, IRoleRO } from './role-permission.model';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  // Find all role with permissions no matter whether it's linked or not
  async findByRoleId(roleId: number): Promise<IRoleRO> {
    try {
      const role = await this.roleRepository.findOne(roleId, ['permissions']);

      if (!role) {
        throw new ConflictException(
          new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'Role not found'),
        );
      }

      return this.responseBuilder(role);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        new ResponseEnvelope(ResponseCode.UNKNOWN_ERROR, 'Unknown Error'),
      );
    }
  }

  private responseBuilder(role: Role): IRoleRO {
    const resp: IRoleRO = {
      id: role.id,
      code: role.code,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      permissions: role.permissions.getItems().map((val) => {
        const permissionResp: IPermissionRO = {
          id: val.permission.id,
          actived: val.actived,
          hidden: val.hidden,
          code: val.permission.code,
          name: val.permission.name,
          createdAt: val.permission.updatedAt,
          updatedAt: val.permission.createdAt,
        };

        return permissionResp;
      }),
    };
    return resp;
  }
}
