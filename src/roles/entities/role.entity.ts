import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Permission } from '../../permissions/entities/permission.entity';
import { BaseEntity } from '../../utils/base-entity/base-entity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property()
  code: string;

  @ManyToMany(() => Permission, 'roles', {
    owner: true,
  })
  permissions = new Collection<Permission>(this);
}
