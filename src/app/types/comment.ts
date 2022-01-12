import { ICoreModel } from './core';

export interface IComment extends ICoreModel {
  book_id: number;
  comment: string;
  commenter: string;
}
