"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const tslib_1 = require("tslib");
const inversify_express_utils_1 = require("inversify-express-utils");
const baseController_1 = require("./baseController");
const book_service_1 = require("../remote/book-service");
const inversify_1 = require("inversify");
const types_1 = (0, tslib_1.__importDefault)(require("../config/types"));
const comment_1 = require("../repository/comment");
let BookController = class BookController extends baseController_1.BaseController {
    constructor(_CommentRepository) {
        super();
        Object.defineProperty(this, "_CommentRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _CommentRepository
        });
    }
    async getAll(def, page, pageSize, req, res) {
        const books = await book_service_1.BookService.getAllBooks({ pageSize, page });
        return this.success({ res, data: books });
    }
    async getOne(def, req, res) {
        const book_id = Number(req.params.id);
        const book = await book_service_1.BookService.getBookById(book_id);
        const comment = await this._CommentRepository.getByBookId(book_id);
        book.comments = [...comment];
        return this.success({ res, data: book });
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__Get_all_books')),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.queryParam)('page')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.queryParam)('pageSize')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Number, Number, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookController.prototype, "getAll", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/:id'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__Get_by_id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookController.prototype, "getOne", null);
BookController = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/books'),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(types_1.default.CommentRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [comment_1.CommentRepository])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=books.js.map