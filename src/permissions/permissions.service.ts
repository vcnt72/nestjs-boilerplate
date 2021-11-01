import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: EntityRepository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  async findAll() {
    try {
      const permissions = await this.permissionRepository.findAll();
      return permissions;
    } catch (error) {
      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown Error',
        ).withErrMsg(error.message),
      );
    }
  }

  async create(createDTO: CreatePermissionDto): Promise<Permission> {
    const { name, type } = createDTO;

    const roles = await this.roleRepository.findAll();
    const permission = new Permission();
    permission.name = name;
    permission.type = type;

    permission.roles.add(...roles);
    await this.permissionRepository.persistAndFlush(permission);
    return permission;
  }

  async update(
    id: number,
    updateDTO: UpdatePermissionDto,
  ): Promise<Permission> {
    const { name, type } = updateDTO;

    const permission = await this.permissionRepository.findOne(id);

    permission.name = name;
    permission.type = type;

    await this.permissionRepository.flush();

    return permission;
  }
}
