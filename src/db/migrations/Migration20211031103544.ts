import { Migration } from '@mikro-orm/migrations';
import { Permission } from 'src/permissions/entities/permission.entity';

// Permission Migrator
export class Migration20211031103544 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    await knex<Permission>('permissions').insert({
      code: 'CREATE_ROLE',
      name: 'Create Role',
      type: 'Role',
    });

    await knex<Permission>('permissions').insert({
      code: 'UPDATE_ROLE',
      name: 'Update Role',
      type: 'Role',
    });

    await knex<Permission>('permissions').insert({
      code: 'DELETE_ROLE',
      name: 'Delete Role',
      type: 'Role',
    });

    await knex<Permission>('permissions').insert({
      code: 'GET_PERMISSION',
      name: 'Get Permission',
      type: 'Permission',
    });

    await knex<Permission>('permissions').insert({
      code: 'CREATE_PERMISSION',
      name: 'Create Permission',
      type: 'Permission',
    });

    await knex<Permission>('permissions').insert({
      code: 'UPDATE_PERMISSION',
      name: 'Update Permission',
      type: 'Permission',
    });
  }
}
