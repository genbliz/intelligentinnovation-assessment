"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const tslib_1 = require("tslib");
const bunyan_1 = (0, tslib_1.__importDefault)(require("bunyan"));
const env_1 = require("../config/env");
const streams = [];
const name = `ASSESSMENT-SERVICE-${env_1.envConfig.environment || ''}`.toUpperCase();
if (env_1.envConfig.environment === 'production') {
    streams.push({
        stream: process.stdout,
        level: 'debug'
    });
}
else {
    streams.push({
        stream: process.stdout,
        level: 'debug'
    });
}
exports.LoggingService = bunyan_1.default.createLogger({
    name,
    streams,
    serializers: bunyan_1.default.stdSerializers
});
//# sourceMappingURL=logging-service.js.map