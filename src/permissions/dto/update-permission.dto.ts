import { OmitType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends OmitType(CreatePermissionDto, [
  'activated',
] as const) {}
