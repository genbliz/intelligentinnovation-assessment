import { IComment } from './comment';

export interface IBook {
  id?: number;
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
  //
  commentCount: number;
}

export interface ICharacter {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: [];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
  metadata?: {
    totalCharacters?: number;
    totalAgeInYears?: number;
    totalAgeInMonths?: number;
  };
}

export interface IBookComment extends IBook {
  comments?: IComment[];
}
