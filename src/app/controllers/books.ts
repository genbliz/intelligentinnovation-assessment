import { IComment } from './../types/comment';
import { Request, Response } from 'express';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import { IBook } from '../types/book';
import { BaseController } from './baseController';
import { BookService } from '../remote/book-service';
import { inject } from 'inversify';
import TYPES from '../config/types';
import { CommentRepository } from '../repository/comment';

interface IBookComment extends IBook {
  comments?: IComment[];
}

@controller('/books')
export class BookController extends BaseController {
  constructor(
    @inject(TYPES.CommentRepository)
    private readonly _CommentRepository: CommentRepository
  ) {
    super();
  }

  @httpGet('/')
  async getAll(
    @queryParam('def__Get_all_books') def: string,
    @queryParam('page') page: number,
    @queryParam('pageSize') pageSize: number,
    req: Request,
    res: Response
  ) {
    const books = await BookService.getAllBooks({ pageSize, page });
    return this.success({ res, data: books });
  }

  @httpGet('/:id')
  async getOne(@queryParam('def__Get_by_id') def: string, req: Request, res: Response) {
    const book_id = Number(req.params.id);
    const book: IBookComment = await BookService.getBookById(book_id);
    const comment = await this._CommentRepository.getByBookId(book_id);
    book.comments = [...comment];
    return this.success({ res, data: book });
  }
}
