import { beforeEach, describe, expect, it } from "vitest";

import { useBooksStore } from "@/shared/store/booksStore";
import type { Book } from "@/shared/types/book";

const books: Book[] = [
  {
    title: "Clean Architecture",
    authors: ["Robert C. Martin"],
    url: "https://example.com/clean-architecture",
    yandex_books_urls: ["https://books.yandex.ru/book/clean-architecture"],
    litres_urls: ["https://www.litres.ru/book/clean-architecture"],
    audiobooks_urls: [],
  },
  {
    title: "Domain-Driven Design",
    authors: ["Eric Evans"],
    url: "https://example.com/domain-driven-design",
    yandex_books_urls: [],
    litres_urls: [],
    audiobooks_urls: [],
  },
];

beforeEach(() => {
  useBooksStore.setState({ books: [] });
});

describe("booksStore", () => {
  it("uses an empty books list by default", () => {
    expect(useBooksStore.getState().books).toEqual([]);
  });

  it("sets books", () => {
    useBooksStore.getState().setBooks(books);

    expect(useBooksStore.getState().books).toEqual(books);
  });

  it("clears books", () => {
    useBooksStore.setState({ books });

    useBooksStore.getState().clearBooks();

    expect(useBooksStore.getState().books).toEqual([]);
  });
});
