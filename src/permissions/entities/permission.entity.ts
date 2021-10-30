import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { BaseEntity } from '../../utils/base-entity/base-entity';

@Entity()
export class Permission extends BaseEntity {
  @Property()
  name: string;

  @Property()
  code: string;
  @Property()
  type: string;

  @OneToMany(() => RolePermission, (role) => role.permission, {
    cascade: [Cascade.REMOVE],
  })
  roles = new Collection<RolePermission>(this);
}
