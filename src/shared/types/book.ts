export type Audiobook = {
  url: string;
  title: string | null;
  narrator: string | null;
  duration: number | null;
};

export type Book = {
  title: string;
  authors: string[];
  url: string;
  yandex_books_urls: string[];
  litres_urls: string[];
  description?: string;
  genre?: string | null;
  image?: string;
  audiobook_duration_minutes?: number;
  audiobooks_urls: Audiobook[];
};
