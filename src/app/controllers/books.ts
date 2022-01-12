import { IComment } from './../types/comment';
import { Request, Response } from 'express';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import { IBook } from '../types/book';
import { BaseController } from './baseController';
import { BookService } from '../remote/book-service';

interface IBookComment extends IBook {
  comments?: IComment[];
}

@controller('/books')
export class BookController extends BaseController {
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
    const book: IBookComment = await BookService.getBookById(Number(req.params.id));
    book.comments = [];
    return this.success({ res, data: book });
  }
}
