import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Permission } from './entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [MikroOrmModule.forFeature([Permission, Role])],
})
export class PermissionsModule {}
