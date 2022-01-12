"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../app/config/env");
const db_1 = require("../app/config/db");
const knexfile_1 = require("../knexfile");
const { environment } = env_1.envConfig;
const config = knexfile_1.knexFileConfiguration[environment];
function seedRun() {
    return new Promise((resolve, reject) => {
        if (config.seeds) {
            db_1.db.seed
                .run(config.seeds)
                .then((result) => {
                resolve();
            })
                .catch((e) => {
                console.log(e);
                reject(e);
            });
        }
        else {
            console.error('Could not Seed: Invalid config object');
            reject();
        }
    });
}
exports.default = seedRun;
//# sourceMappingURL=seed-runner.js.map