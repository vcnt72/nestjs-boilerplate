import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseCode } from 'src/utils/response/response-code';
import { ResponseEnvelope } from 'src/utils/response/response-envelope';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const { name } = createRoleDto;

      const role = new Role();
      role.name = name;
      role.code = this.codifier(name);
      await this.roleRepository.persistAndFlush(role);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown Error',
        ).withErrMsg(error.message),
      );
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.findAll();
      return roles;
    } catch (error) {
      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown Error',
        ).withErrMsg(error.message),
      );
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne(id);

      if (!role) {
        throw new ConflictException(
          new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'Role not found'),
        );
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        new ResponseEnvelope(
          ResponseCode.UNKNOWN_ERROR,
          'Unknown error',
        ).withErrMsg(error.message),
      );
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findOne(id);

      if (!role) {
        throw new ConflictException(
          new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'Role not found'),
        );
      }

      role.name = updateRoleDto.name;

      role.code = this.codifier(role.name);

      await this.roleRepository.flush();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        new ResponseEnvelope(ResponseCode.UNKNOWN_ERROR, 'Unknown Error'),
      );
    }
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findOne(id);

      if (!role) {
        throw new ConflictException(
          new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'Role not found'),
        );
      }

      this.roleRepository.remove(role);

      await this.roleRepository.flush();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        new ResponseEnvelope(ResponseCode.UNKNOWN_ERROR, 'Unknown Error'),
      );
    }
  }

  // Change role name to code
  private codifier(name: string): string {
    return name.replace(' ', '_').toUpperCase();
  }
}
