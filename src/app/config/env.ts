import 'reflect-metadata';
import dotenv from 'dotenv';
import variableExpansion from 'dotenv-expand';
const myEnv = dotenv.config();
variableExpansion(myEnv);

const envGlobCache: { [x: string]: string } = {};

/**
 * cache value, its faster!
 *
 */
function getEnv(envKey: string) {
  if (envGlobCache[envKey] !== undefined) {
    return envGlobCache[envKey];
  }
  const newEnv = process.env[envKey];
  if (newEnv !== undefined) {
    envGlobCache[envKey] = newEnv;
    return newEnv;
  }
  return undefined;
}

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return '';
}

//@ts-ignore
function getEnvBool(envKey: string) {
  const val = getEnv(envKey);
  if (val !== undefined && String(val) === 'true') {
    return true;
  }
  return false;
}

function getEnvNumber(envKey: string, defaultVal?: number) {
  const val = getEnv(envKey);
  if (val !== undefined && !isNaN(Number(val))) {
    return Number(val);
  }
  return defaultVal as number;
}

type IEnvironment = 'production' | 'staging' | 'development' | 'test';

export const envConfig = {
  port: getEnvNumber('PORT'),
  environment: getEnvString('NODE_ENV') as IEnvironment,
  POSTGRES_PORT: getEnvNumber('POSTGRES_PORT'),
  POSTGRES_PASSWORD: getEnvString('POSTGRES_PASSWORD'),
  POSTGRES_HOST: getEnvString('POSTGRES_HOST'),
  POSTGRES_DBNAME: getEnvString('POSTGRES_DBNAME'),
  POSTGRES_USER: getEnvString('POSTGRES_USER'),
  //
  POSTGRES_TEST_PORT: getEnvNumber('POSTGRES_TEST_PORT'),
  POSTGRES_TEST_PASSWORD: getEnvString('POSTGRES_TEST_PASSWORD'),
  POSTGRES_TEST_HOST: getEnvString('POSTGRES_TEST_HOST'),
  POSTGRES_TEST_DBNAME: getEnvString('POSTGRES_TEST_DBNAME'),
  POSTGRES_TEST_USER: getEnvString('POSTGRES_TEST_USER')
  //
} as const;
