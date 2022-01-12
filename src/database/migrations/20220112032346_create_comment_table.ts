import { Knex } from 'knex';
import { DefinedTableNames, DefinedSchemaNames } from '../../app/utils/constants';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(DefinedTableNames.COMMENTS)) {
    return;
  }

  await knex.schema.raw(`CREATE SCHEMA IF NOT EXISTS ${DefinedSchemaNames.ASSESSMENT_SERVICE};`);

  return await knex.schema
    .withSchema(DefinedSchemaNames.ASSESSMENT_SERVICE)
    .createTable(DefinedTableNames.COMMENTS, (table) => {
      table.uuid('id').primary();
      table.integer('book_id').notNullable();
      table.string('comment');
      table.string('commenter');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<any> {
  return await knex.schema.withSchema(DefinedSchemaNames.ASSESSMENT_SERVICE).dropTable(DefinedTableNames.COMMENTS);
}
