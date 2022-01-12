"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const constants_1 = require("../../app/utils/constants");
async function up(knex) {
    if (await knex.schema.hasTable(constants_1.DefinedTableNames.COMMENTS)) {
        return;
    }
    await knex.schema.raw(`CREATE SCHEMA IF NOT EXISTS ${constants_1.DefinedSchemaNames.ASSESSMENT_SERVICE};`);
    return await knex.schema
        .withSchema(constants_1.DefinedSchemaNames.ASSESSMENT_SERVICE)
        .createTable(constants_1.DefinedTableNames.COMMENTS, (table) => {
        table.uuid('id').primary();
        table.integer('book_id').notNullable();
        table.string('comment');
        table.string('commenter');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(null);
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.withSchema(constants_1.DefinedSchemaNames.ASSESSMENT_SERVICE).dropTable(constants_1.DefinedTableNames.COMMENTS);
}
exports.down = down;
//# sourceMappingURL=20220112032346_create_comment_table.js.map