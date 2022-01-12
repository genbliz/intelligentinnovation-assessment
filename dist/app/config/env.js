"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const dotenv_expand_1 = (0, tslib_1.__importDefault)(require("dotenv-expand"));
const myEnv = dotenv_1.default.config();
(0, dotenv_expand_1.default)(myEnv);
const envGlobCache = {};
function getEnv(envKey) {
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
function getEnvString(envKey) {
    const val = getEnv(envKey);
    if (val) {
        return val;
    }
    return '';
}
function getEnvBool(envKey) {
    const val = getEnv(envKey);
    if (val !== undefined && String(val) === 'true') {
        return true;
    }
    return false;
}
function getEnvNumber(envKey, defaultVal) {
    const val = getEnv(envKey);
    if (val !== undefined && !isNaN(Number(val))) {
        return Number(val);
    }
    return defaultVal;
}
exports.envConfig = {
    port: getEnvNumber('PORT') || 5000,
    environment: getEnvString('NODE_ENV'),
    POSTGRES_PORT: getEnvNumber('POSTGRES_PORT'),
    POSTGRES_PASSWORD: getEnvString('POSTGRES_PASSWORD'),
    POSTGRES_HOST: getEnvString('POSTGRES_HOST'),
    POSTGRES_DBNAME: getEnvString('POSTGRES_DBNAME'),
    POSTGRES_USER: getEnvString('POSTGRES_USER'),
    POSTGRES_TEST_PORT: getEnvNumber('POSTGRES_TEST_PORT'),
    POSTGRES_TEST_PASSWORD: getEnvString('POSTGRES_TEST_PASSWORD'),
    POSTGRES_TEST_HOST: getEnvString('POSTGRES_TEST_HOST'),
    POSTGRES_TEST_DBNAME: getEnvString('POSTGRES_TEST_DBNAME'),
    POSTGRES_TEST_USER: getEnvString('POSTGRES_TEST_USER')
};
//# sourceMappingURL=env.js.map