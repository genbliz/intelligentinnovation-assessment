import { Container } from 'inversify';
import { HealthController } from '../controllers/health';
import TYPES from './types';
import { PostgresConnection } from './db';

const container = new Container();

// controllers
container.bind<HealthController>(TYPES.HealthController).to(HealthController).inSingletonScope();

// services

// repositories

// database
container.bind<PostgresConnection>(TYPES.DatabaseConnection).to(PostgresConnection).inSingletonScope();

export default container;
