import { HttpService } from '../services/http-service';
import { IBook, ICharacter } from '../types/book';
import lodash from 'lodash';

const CHARACTER_SORT_FIELD = ['gender', 'name', 'age'] as const;
const CHARACTER_SORT_ORDER = ['descending', 'ascending', 'desc', 'asc'] as const;

export type ICharacterSortField = typeof CHARACTER_SORT_FIELD[number];
export type ICharacterSortOrder = typeof CHARACTER_SORT_ORDER[number];

class BookServiceBase {
  private BOOK_BASE_URL = 'https://www.anapioficeandfire.com/api';

  async getAllBooks({ page, pageSize }: { page?: number; pageSize?: number }) {
    const books = await HttpService.get<IBook[]>({
      url: `${this.BOOK_BASE_URL}/books`,
      params: { page, pageSize }
    });
    if (books?.length) {
      const books01 = books.map((f) => {
        return {
          id: parseInt(f.url.split('/').slice(-1)[0]),
          released: f.released,
          authors: f.authors,
          name: f.name
        };
      });
      return lodash.orderBy(books01, (f) => f.released, 'desc');
    }
    return books;
  }

  async getBookById(id: number) {
    const book = await HttpService.get<IBook>({ url: `${this.BOOK_BASE_URL}/books/${id}` });
    if (book?.url) {
      book.id = parseInt(book.url.split('/').slice(-1)[0]);
    }
    return book;
  }

  // async getCharactersInABook({
  //   sort_field,
  //   sort_order,
  //   gender,
  //   book_id
  // }: {
  //   book_id?: number;
  //   sort_field?: string;
  //   sort_order?: string;
  //   gender?: string;
  // }) {
  //   const book = await this.getBookById(book_id);
  //   if (book?.id) {
  //     const charactersUrls = book.characters;
  //     const characters = await HttpService.get<ICharacter[]>({
  //       url: `${this.BOOK_BASE_URL}/characters`,
  //       params: { gender }
  //     });
  //   }
  // }

  async getCharacters({
    sort_field,
    sort_order,
    gender
  }: {
    sort_field?: ICharacterSortField;
    sort_order?: ICharacterSortOrder;
    gender?: string;
  }) {
    let characters = await HttpService.get<ICharacter[]>({
      url: `${this.BOOK_BASE_URL}/characters`,
      params: { gender }
    });

    if (characters?.length) {
      if (sort_field && sort_order) {
        if (CHARACTER_SORT_ORDER.includes(sort_order) && CHARACTER_SORT_FIELD.includes(sort_field)) {
          const sortOrder = sort_order.startsWith('d') ? 'desc' : 'asc';
          characters = lodash.orderBy(characters, (f) => f[sort_field], sortOrder);
        }
      }
    }
    return { characters };
  }
}

export const BookService = new BookServiceBase();
