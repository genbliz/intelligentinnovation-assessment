"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexFileConfiguration = void 0;
const env_1 = require("./app/config/env");
const util_services_1 = require("./app/services/util-services");
const constants_1 = require("./app/utils/constants");
const MIGRATION_DIRECTORY = util_services_1.UtilService.getFullPathFromRoot('src/database/migrations');
const SEED_DIRECTORY = util_services_1.UtilService.getFullPathFromRoot('src/app/tests/seeds');
const pool = {
    min: 2,
    max: 10
};
const knexConfiguration = {
    test: {
        client: 'postgresql',
        connection: {
            host: env_1.envConfig.POSTGRES_TEST_HOST,
            user: env_1.envConfig.POSTGRES_TEST_USER,
            password: env_1.envConfig.POSTGRES_TEST_PASSWORD,
            database: env_1.envConfig.POSTGRES_TEST_DBNAME,
            port: env_1.envConfig.POSTGRES_TEST_PORT
        },
        pool: {
            ...pool
        },
        migrations: {
            directory: MIGRATION_DIRECTORY,
            tableName: constants_1.MIGRATION_TABLE_NAME,
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
            host: env_1.envConfig.POSTGRES_HOST,
            user: env_1.envConfig.POSTGRES_USER,
            password: env_1.envConfig.POSTGRES_PASSWORD,
            database: env_1.envConfig.POSTGRES_DBNAME,
            port: env_1.envConfig.POSTGRES_PORT
        },
        pool: {
            ...pool
        },
        migrations: {
            directory: MIGRATION_DIRECTORY,
            tableName: constants_1.MIGRATION_TABLE_NAME,
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
            host: env_1.envConfig.POSTGRES_HOST,
            user: env_1.envConfig.POSTGRES_USER,
            password: env_1.envConfig.POSTGRES_PASSWORD,
            database: env_1.envConfig.POSTGRES_DBNAME,
            port: env_1.envConfig.POSTGRES_PORT
        },
        pool: {
            ...pool
        },
        migrations: {
            directory: MIGRATION_DIRECTORY,
            tableName: constants_1.MIGRATION_TABLE_NAME,
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
            host: env_1.envConfig.POSTGRES_HOST,
            user: env_1.envConfig.POSTGRES_USER,
            password: env_1.envConfig.POSTGRES_PASSWORD,
            database: env_1.envConfig.POSTGRES_DBNAME,
            port: env_1.envConfig.POSTGRES_PORT
        },
        pool: {
            ...pool
        },
        migrations: {
            directory: MIGRATION_DIRECTORY,
            tableName: constants_1.MIGRATION_TABLE_NAME,
            extension: 'ts'
        },
        seeds: {
            directory: SEED_DIRECTORY,
            extension: 'ts'
        }
    }
};
exports.knexFileConfiguration = { ...knexConfiguration };
//# sourceMappingURL=knexfile.js.map