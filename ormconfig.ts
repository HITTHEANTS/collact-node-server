import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const defaultConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_DB_HOST,
  port: +process.env.TYPEORM_DB_PORT,
  username: process.env.TYPEORM_DB_USER,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  migrationsRun: false,
  logging: 'all',
  logger: 'advanced-console',
  namingStrategy: new SnakeNamingStrategy(),
};

const config: TypeOrmModuleOptions[] = [
  {
    ...defaultConfig,
  },
  {
    ...defaultConfig,
    name: 'seeds',
    migrations: [__dirname + '/**/seeds/*.ts'],
    cli: {
      migrationsDir: 'src/seeds',
    },
  },
];

export default config;
