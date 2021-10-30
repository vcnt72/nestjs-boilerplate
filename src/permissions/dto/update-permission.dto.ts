import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends OmitType(CreatePermissionDto, [
  'activated',
] as const) {}
