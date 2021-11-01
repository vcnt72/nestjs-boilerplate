import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../utils/base-entity/base-entity';

@Entity()
export class Permission extends BaseEntity {
  @Property()
  name: string;

  @Property()
  code: string;
  @Property()
  type: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles = new Collection<Role>(this);

  // Does permission being actived from the users
  @Property()
  actived = false;

  // Hidden from actual user. Only being seen by SUPERUSER who manage all permissions
  @Property()
  hidden = true;
}
