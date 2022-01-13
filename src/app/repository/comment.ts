import { UtilService } from './../services/util-services';
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
    return await CommentModel.query().orderBy('created_at', 'DESC');
  }

  async getByBookIds(book_ids: number[]): Promise<IComment[]> {
    return await CommentModel.query().whereIn('book_id', book_ids).orderBy('created_at', 'DESC');
  }

  async getByBookId(book_id: number): Promise<IComment[]> {
    return await CommentModel.query().where('book_id', book_id).orderBy('created_at', 'DESC');
  }

  async create({ comment, ip_address, book_id }: IComment) {
    const dataToDb = {
      id: UtilService.getUUID(),
      comment,
      book_id,
      ip_address,
      created_at: new Date().toISOString()
    } as IComment;
    const result = await CommentModel.query().insertAndFetch(dataToDb);
    if (result?.id) {
      return result;
    }
    return dataToDb;
  }
}
