import { HttpService } from '../services/http-service';
import { IBook } from '../types/book';

class BookServiceBase {
  private BOOK_BASE_URL = 'https://www.anapioficeandfire.com/api/books';

  async getAllBooks({ page, pageSize }: { page?: number; pageSize?: number }) {
    return await HttpService.get<IBook[]>({
      url: `${this.BOOK_BASE_URL}`,
      params: { page, pageSize }
    });
  }

  async getBookById(id: number) {
    return await HttpService.get<IBook>({ url: `${this.BOOK_BASE_URL}/${id}` });
  }
}

export const BookService = new BookServiceBase();
