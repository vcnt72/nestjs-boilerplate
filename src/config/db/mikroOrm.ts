import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';

export const mikroOrmConfig: MikroOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    entities: ['./dist/**/entities/*.entity.js'],
    entitiesTs: ['./src/**/entities/*.entity.ts'],
    type: configService.get('DATABASE_TYPE'),
    dbName: configService.get('DATABASE_NAME'),
    port: configService.get('DATABASE_PORT'),
    user: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
  }),
  inject: [ConfigService],
};
