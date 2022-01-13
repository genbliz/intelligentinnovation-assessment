import { IComment } from '../types/comment';
import { JSONSchemaExtra } from '../types/common';
import { ObjectionModel } from '../config/db';
import { DefinedTableNamesPath } from '../utils/constants';

export interface CommentModel extends IComment {}

export class CommentModel extends ObjectionModel {
  static readonly tableName = DefinedTableNamesPath.COMMENTS;

  static readonly jsonSchema: JSONSchemaExtra<IComment> = {
    type: 'object',
    required: ['id', 'book_id', 'comment'],
    properties: {
      id: { type: 'string' },
      book_id: { type: 'integer' },
      comment: { type: 'string' },
      ip_address: { type: ['string', 'null'] },
      created_at: { type: 'string' },
      updated_at: { type: ['string', 'null'] }
    }
  };
}
