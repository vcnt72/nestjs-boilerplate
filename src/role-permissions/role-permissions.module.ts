import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  imports: [MikroOrmModule.forFeature([Role])],
})
export class RolePermissionsModule {}
