import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../utils/base-entity/base-entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  fullname!: string;

  @Property()
  email!: string;

  @Property({
    hidden: true,
  })
  password!: string;

  @ManyToOne()
  role!: Role;

  @Property({ hidden: true })
  tokenId: string;
}
