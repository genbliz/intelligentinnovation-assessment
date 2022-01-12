import knex from 'knex';
import { envConfig } from './env';
import { injectable } from 'inversify';
import { Model } from 'objection';
import { knexFileConfiguration } from '../../knexfile';

const config = knexFileConfiguration[envConfig.environment];

console.log({ config });

const db01 = knex(config);
Model.knex(db01);

@injectable()
export class PostgresConnection {
  getDb() {
    return db01;
  }
}

export class ObjectionModel extends Model {}
export const db = db01;
export const KnexInstance = knex;

let isTested = false;

if (!isTested) {
  isTested = true;
  db.raw('SELECT 1')
    .then((message) => {
      console.log('postgres connected');
    })
    .catch((err) => {
      // Failure / timeout
      console.log(err);
      throw err;
    });
}
