import { Container } from 'inversify';
import { HealthController } from '../controllers/health';
import TYPES from './types';
import { PostgresConnection } from './db';
import { CommentRepository } from '../repository/comment';
import { BookController } from '../controllers/books';
import { CharacterController } from '../controllers/character';
import { DocsController } from '../controllers/docs';

const container = new Container();

// controllers
container.bind<HealthController>(TYPES.HealthController).to(HealthController).inSingletonScope();
container.bind<BookController>(TYPES.BookController).to(BookController).inSingletonScope();
container.bind<CharacterController>(TYPES.CharacterController).to(CharacterController).inSingletonScope();
container.bind<DocsController>(TYPES.DocsController).to(DocsController).inSingletonScope();

// services

// repositories
container.bind<CommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope();

// database
container.bind<PostgresConnection>(TYPES.DatabaseConnection).to(PostgresConnection).inSingletonScope();

export default container;
