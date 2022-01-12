"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const comment_1 = require("../models/comment");
const baseRepository_1 = require("./baseRepository");
let CommentRepository = class CommentRepository extends baseRepository_1.BaseRepository {
    async getById(dataId) {
        this.validateRequiredNumber({ dataId });
        return await comment_1.CommentModel.query().findById(dataId);
    }
    async getAll() {
        return await comment_1.CommentModel.query();
    }
    async getByBookId(book_id) {
        return await comment_1.CommentModel.query().where('book_id', book_id);
    }
    async create(data) {
        const dataToDb = {
            comment: data.comment,
            book_id: data.book_id,
            commenter: data.commenter,
            created_at: new Date().toISOString()
        };
        const result = await comment_1.CommentModel.query().insertAndFetch(dataToDb);
        if (result?.id) {
            return result;
        }
        return dataToDb;
    }
};
CommentRepository = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], CommentRepository);
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.js.map