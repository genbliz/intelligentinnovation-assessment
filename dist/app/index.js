"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const env_1 = require("./config/env");
const inversify_express_utils_1 = require("inversify-express-utils");
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const compression_1 = (0, tslib_1.__importDefault)(require("compression"));
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const method_override_1 = (0, tslib_1.__importDefault)(require("method-override"));
const inversify_config_1 = (0, tslib_1.__importDefault)(require("./config/inversify.config"));
const app = (0, express_1.default)();
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, null, app);
server.setConfig((app01) => {
    app01.use(express_1.default.json());
    app01.use((0, cors_1.default)());
    app01.use((0, compression_1.default)());
    app01.use((0, helmet_1.default)());
    app01.use(express_1.default.json({ limit: '20mb' }));
    app01.use(express_1.default.urlencoded({
        extended: true,
        limit: '10mb'
    }));
    app01.use(express_1.default.json({
        type: 'application/vnd.api+json',
        limit: '10mb'
    }));
    app01.use((0, method_override_1.default)());
    app01.disable('x-powered-by');
});
const serverInstance = server.build();
const PORT = process.env.PORT || env_1.envConfig.port || 5000;
serverInstance.use((req, res, next) => {
    res.status(404).send({
        message: `Route '${req.path}', NOT found...`,
        status: 'error'
    });
});
if (process.env.NODE_ENV !== 'test') {
    serverInstance.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map