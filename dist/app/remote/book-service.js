"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_service_1 = require("../services/http-service");
class BookServiceBase {
    constructor() {
        Object.defineProperty(this, "BOOK_BASE_URL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'https://www.anapioficeandfire.com/api/books'
        });
    }
    async getAllBooks({ page, pageSize }) {
        return await http_service_1.HttpService.get({
            url: `${this.BOOK_BASE_URL}`,
            params: { page, pageSize }
        });
    }
    async getBookById(id) {
        return await http_service_1.HttpService.get({ url: `${this.BOOK_BASE_URL}/${id}` });
    }
}
exports.BookService = new BookServiceBase();
//# sourceMappingURL=book-service.js.map