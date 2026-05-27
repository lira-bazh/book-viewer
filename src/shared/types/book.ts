export type Book = {
  title: string;
  authors: string[];
  url: string;
  yandex_books_urls: string[];
  litres_urls: string[];
  description?: string;
  image?: string;
  audiobook_duration_minutes?: number;
};
