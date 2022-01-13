import { Request, Response } from 'express';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import { BaseController } from './baseController';
import { BookService, ICharacterSortField, ICharacterSortOrder } from '../remote/book-service';

@controller('/api/characters')
export class CharacterController extends BaseController {
  @httpGet('/')
  async getCharacters(
    @queryParam('def__Get_All_Characters') def: string,
    @queryParam('sort_field') sort_field: ICharacterSortField,
    @queryParam('sort_order') sort_order: ICharacterSortOrder,
    @queryParam('gender') gender: string,
    @queryParam('page') page: number,
    @queryParam('pageSize') pageSize: number,
    req: Request,
    res: Response
  ) {
    const characters = await BookService.getCharacters({
      sort_field,
      sort_order,
      gender,
      pageSize,
      page
    });
    return this.success({ res, data: characters });
  }
}
