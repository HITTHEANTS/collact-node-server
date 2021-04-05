import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_DB_HOST,
  port: +process.env.TYPEORM_DB_PORT,
  username: process.env.TYPEORM_DB_USER,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,

  logging: 'all',
  logger: 'advanced-console',
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
