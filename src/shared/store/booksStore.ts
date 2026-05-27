import { create } from "zustand";

import type { Book } from "@/shared/types/book";

type BooksState = {
  books: Book[];
  setBooks: (books: Book[]) => void;
  clearBooks: () => void;
};

export const useBooksStore = create<BooksState>((set) => ({
  books: [],
  setBooks: (books) => {
    set({ books });
  },
  clearBooks: () => {
    set({ books: [] });
  },
}));
