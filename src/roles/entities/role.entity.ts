import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/utils/base-entity/base-entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property()
  code: string;

  @OneToMany(() => RolePermission, (permission) => permission.role, {
    cascade: [Cascade.REMOVE],
  })
  permissions = new Collection<RolePermission>(this);
}
