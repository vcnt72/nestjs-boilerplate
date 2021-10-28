import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  fullname!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;
}
