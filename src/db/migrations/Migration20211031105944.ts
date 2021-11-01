import { Migration } from '@mikro-orm/migrations';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';

// Role Migrator
export class Migration20211031102944 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const role = (
      await knex<Role>('roles').insert(
        {
          name: 'Super User',
          code: 'SUPERUSER',
        },
        '*',
      )
    )[0];

    const permissions = await knex<Permission>('permissions').select('*');

    for (const permission of permissions) {
      await knex('role_permissions').insert({
        roleId: role.id,
        permissionId: permission.id,
      });
    }
  }
}
