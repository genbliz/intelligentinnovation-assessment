import { IComment } from './../types/comment';
import { Request, Response } from 'express';
import { controller, httpGet, httpPost, queryParam } from 'inversify-express-utils';
import { BaseController } from './baseController';
import { BookService } from '../remote/book-service';
import { inject } from 'inversify';
import TYPES from '../config/types';
import { CommentRepository } from '../repository/comment';
import requestIp from 'request-ip';
// import lodash from 'lodash';
import { IBookComment } from '../types/book';

@controller('/api/books')
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
    // const bookIds = books.map((f) => f.id);
    // if (bookIds?.length) {
    //   const comments = await this._CommentRepository.getByBookIds(bookIds);

    //   if (comments?.length) {
    //     const commentsGrouped = lodash.groupBy(comments, (f) => f.book_id);
    //     return books.map((f) => {
    //       f.commentCount = commentsGrouped?.[f.id]?.length || 0;
    //       return f;
    //     });
    //   }
    // }
    return this.success({ res, data: books });
  }

  @httpGet('/:id')
  async getOne(@queryParam('def__Get_by_id') def: string, req: Request, res: Response) {
    const book_id = Number(req.params.id);
    const book: IBookComment = await BookService.getBookById(book_id);
    if (book?.isbn) {
      const comments = await this._CommentRepository.getByBookId(book_id);
      book.comments = [...comments];
    }
    console.log({ book });
    return this.success({ res, data: book });
  }

  @httpGet('/:id/comments')
  async getComments(@queryParam('def__Get_Book_comments') def: string, req: Request, res: Response) {
    const book_id = Number(req.params.id);
    const comments = await this._CommentRepository.getByBookId(book_id);
    return this.success({ res, data: comments });
  }

  @httpPost('/:id/comment')
  async comment(@queryParam('def__Add_book_comment') def: string, req: Request, res: Response) {
    const { comment } = req.body as IComment;

    this.validateRequiredString({ comment });

    const book_id = Number(req.params.id);
    const book = await BookService.getBookById(book_id);

    if (!book?.isbn) {
      return this.error({
        res,
        message: 'Book does not exists'
      });
    }

    const clientIp = requestIp.getClientIp(req);

    const commentData = await this._CommentRepository.create({
      comment: comment.slice(0, 500),
      ip_address: clientIp,
      book_id
    } as IComment);

    return this.success({ res, data: commentData });
  }
}
