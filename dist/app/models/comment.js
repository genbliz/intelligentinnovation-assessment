"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const db_1 = require("../config/db");
const constants_1 = require("../utils/constants");
class CommentModel extends db_1.ObjectionModel {
}
exports.CommentModel = CommentModel;
Object.defineProperty(CommentModel, "tableName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: constants_1.DefinedTableNamesPath.COMMENTS
});
Object.defineProperty(CommentModel, "jsonSchema", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        type: 'object',
        required: ['id', 'book_id', 'comment'],
        properties: {
            id: { type: 'string' },
            book_id: { type: 'integer' },
            comment: { type: 'string' },
            commenter: { type: ['string', 'null'] },
            created_at: { type: 'string' },
            updated_at: { type: ['string', 'null'] }
        }
    }
});
//# sourceMappingURL=comment.js.map