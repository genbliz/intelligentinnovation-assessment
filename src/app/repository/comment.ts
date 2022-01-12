import { IComment } from './../types/comment';
import { injectable } from 'inversify';
import { CommentModel } from '../models/comment';
import { BaseRepository } from './baseRepository';

@injectable()
export class CommentRepository extends BaseRepository {
  async getById(dataId: number): Promise<IComment | undefined> {
    this.validateRequiredNumber({ dataId });
    return await CommentModel.query().findById(dataId);
  }

  async getAll(): Promise<IComment[]> {
    return await CommentModel.query();
  }

  async getByBookId(book_id: number): Promise<IComment[]> {
    return await CommentModel.query().where('book_id', book_id);
  }

  async create(data: IComment) {
    const dataToDb = {
      comment: data.comment,
      book_id: data.book_id,
      commenter: data.commenter,
      created_at: new Date().toISOString()
    } as IComment;
    const result = await CommentModel.query().insertAndFetch(dataToDb);
    if (result?.id) {
      return result;
    }
    return dataToDb;
  }
}
