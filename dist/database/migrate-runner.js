"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../app/config/env");
const db_1 = require("../app/config/db");
const knexfile_1 = require("../knexfile");
const config = knexfile_1.knexFileConfiguration[env_1.envConfig.environment];
function migrateLatest() {
    return new Promise((resolve, reject) => {
        if (config.migrations) {
            db_1.db.migrate
                .latest(config.migrations)
                .then((result) => {
                const batchNo = result[0];
                const log = result[1];
                if (log?.length === 0) {
                    console.log('Already up to date');
                }
                console.log(`Batch ${batchNo} run: ${log?.length} migrations`);
                console.log(`${log.join('\n')}`);
                resolve();
            })
                .catch((e) => {
                console.log(e);
                reject(e);
            });
        }
        else {
            console.error('Could not Migrate: Invalid config object');
            reject();
        }
    });
}
exports.default = migrateLatest;
//# sourceMappingURL=migrate-runner.js.map