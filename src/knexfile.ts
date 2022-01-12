// Update with your config settings.
import { Knex } from 'knex';
import { envConfig } from './app/config/env';
import { UtilService } from './app/services/util-services';
import { MIGRATION_TABLE_NAME } from './app/utils/constants';

interface IKnexConfig {
  development: Knex.Config<unknown[]>;
  staging: Knex.Config<unknown[]>;
  production: Knex.Config<unknown[]>;
  test: Knex.Config<unknown[]>;
}

const MIGRATION_DIRECTORY = UtilService.getFullPathFromRoot('src/database/migrations');
const SEED_DIRECTORY = UtilService.getFullPathFromRoot('src/app/tests/seeds');

// const pool: Knex.PoolConfig = {
//   min: 0,
//   max: 10,
//   acquireTimeoutMillis: 30000,
//   createTimeoutMillis: 1500,
//   createRetryIntervalMillis: 500,
//   propagateCreateError: false
// };

const pool: Knex.PoolConfig = {
  min: 2,
  max: 10
};

const knexConfiguration: IKnexConfig = {
  test: {
    client: 'postgresql',
    connection: {
      host: envConfig.POSTGRES_TEST_HOST,
      user: envConfig.POSTGRES_TEST_USER,
      password: envConfig.POSTGRES_TEST_PASSWORD,
      database: envConfig.POSTGRES_TEST_DBNAME,
      port: envConfig.POSTGRES_TEST_PORT
    },
    pool: {
      ...pool
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'ts'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'ts'
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      host: envConfig.POSTGRES_HOST,
      user: envConfig.POSTGRES_USER,
      password: envConfig.POSTGRES_PASSWORD,
      database: envConfig.POSTGRES_DBNAME,
      port: envConfig.POSTGRES_PORT
    },
    pool: {
      ...pool
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'ts'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'ts'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: envConfig.POSTGRES_HOST,
      user: envConfig.POSTGRES_USER,
      password: envConfig.POSTGRES_PASSWORD,
      database: envConfig.POSTGRES_DBNAME,
      port: envConfig.POSTGRES_PORT
    },
    pool: {
      ...pool
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'ts'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'ts'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: envConfig.POSTGRES_HOST,
      user: envConfig.POSTGRES_USER,
      password: envConfig.POSTGRES_PASSWORD,
      database: envConfig.POSTGRES_DBNAME,
      port: envConfig.POSTGRES_PORT
    },
    pool: {
      ...pool
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'ts'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'ts'
    }
  }
};

// module.exports = { ...knexConfiguration };
// module.exports.knexFileConfiguration = { ...knexConfiguration };
export const knexFileConfiguration = { ...knexConfiguration };
