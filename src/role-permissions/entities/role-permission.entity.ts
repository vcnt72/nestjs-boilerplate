import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class RolePermission {
  @ManyToOne({
    primary: true,
    entity: () => Role,
  })
  role: Role;

  @Property()
  roleId: number;

  @ManyToOne({
    primary: true,
    entity: () => Permission,
  })
  permission: Permission;

  @Property()
  permissionId: number;

  // Does permission being actived from the users
  @Property()
  actived = false;

  // Hidden from actual user. Only being seen by SUPERUSER who manage all permissions
  @Property()
  hidden = true;

  [PrimaryKeyType]: [number, number];
}
