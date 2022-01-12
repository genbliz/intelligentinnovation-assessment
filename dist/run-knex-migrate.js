"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const migrate_runner_1 = (0, tslib_1.__importDefault)(require("./database/migrate-runner"));
(0, migrate_runner_1.default)()
    .then(() => {
    process.exit(0);
})
    .catch(() => {
    process.exit(0);
});
//# sourceMappingURL=run-knex-migrate.js.map