import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Permission } from './entities/permission.entity';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [MikroOrmModule.forFeature([Permission])],
})
export class PermissionsModule {}
