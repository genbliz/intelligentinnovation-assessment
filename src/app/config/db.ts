import knex from 'knex';
import { envConfig } from './env';
import { injectable } from 'inversify';
import { Model } from 'objection';
import { knexFileConfiguration } from '../../knexfile';

const config = knexFileConfiguration[envConfig.environment];

const db01 = knex(config);

@injectable()
export class PostgresConnection {
  getDb() {
    return db01;
  }
}

Model.knex(db01);

export class ObjectionModel extends Model {}
export const db = db01;
export const KnexInstance = knex;
