"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexInstance = exports.db = exports.ObjectionModel = exports.PostgresConnection = void 0;
const tslib_1 = require("tslib");
const knex_1 = (0, tslib_1.__importDefault)(require("knex"));
const env_1 = require("./env");
const inversify_1 = require("inversify");
const objection_1 = require("objection");
const knexfile_1 = require("../../knexfile");
const config = knexfile_1.knexFileConfiguration[env_1.envConfig.environment];
console.log({ config });
const db01 = (0, knex_1.default)(config);
objection_1.Model.knex(db01);
let PostgresConnection = class PostgresConnection {
    getDb() {
        return db01;
    }
};
PostgresConnection = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], PostgresConnection);
exports.PostgresConnection = PostgresConnection;
class ObjectionModel extends objection_1.Model {
}
exports.ObjectionModel = ObjectionModel;
exports.db = db01;
exports.KnexInstance = knex_1.default;
let isTested = false;
if (!isTested) {
    isTested = true;
    exports.db.raw('SELECT 1')
        .then((message) => {
        console.log('postgres connected');
    })
        .catch((err) => {
        console.log(err);
        throw err;
    });
}
//# sourceMappingURL=db.js.map