"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const health_1 = require("../controllers/health");
const types_1 = (0, tslib_1.__importDefault)(require("./types"));
const db_1 = require("./db");
const comment_1 = require("../repository/comment");
const container = new inversify_1.Container();
container.bind(types_1.default.HealthController).to(health_1.HealthController).inSingletonScope();
container.bind(types_1.default.CommentRepository).to(comment_1.CommentRepository).inSingletonScope();
container.bind(types_1.default.DatabaseConnection).to(db_1.PostgresConnection).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map