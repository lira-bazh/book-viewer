import { describe, expect, it } from "vitest";

import { parseBooksFile } from "@/features/FileUploader/parseBooksFile";

const validBook = {
  title: "Clean Architecture",
  authors: ["Robert C. Martin"],
  url: "https://example.com/clean-architecture",
  yandex_books_urls: ["https://books.yandex.ru/book/clean-architecture"],
  litres_urls: ["https://www.litres.ru/book/clean-architecture"],
};

describe("parseBooksFile", () => {
  it("parses a valid books list", () => {
    expect(parseBooksFile(JSON.stringify([validBook]))).toEqual([validBook]);
  });

  it("allows supported optional book fields", () => {
    const bookWithOptionalFields = {
      ...validBook,
      description: "A practical guide to software architecture.",
      genre: "Software development",
      image: "https://example.com/cover.jpg",
      audiobook_duration_minutes: 1024,
    };

    expect(parseBooksFile(JSON.stringify([bookWithOptionalFields]))).toEqual([
      bookWithOptionalFields,
    ]);
  });

  it("allows null genre", () => {
    const bookWithNullGenre = {
      ...validBook,
      genre: null,
    };

    expect(parseBooksFile(JSON.stringify([bookWithNullGenre]))).toEqual([bookWithNullGenre]);
  });

  it("throws when content is not valid JSON", () => {
    expect(() => parseBooksFile("{not json")).toThrow();
  });

  it("throws when the parsed value is not an array", () => {
    expect(() => parseBooksFile(JSON.stringify(validBook))).toThrow("Invalid books file structure");
  });

  it("throws when a book is missing required fields", () => {
    expect(() => parseBooksFile(JSON.stringify([{ title: "Missing fields" }]))).toThrow(
      "Invalid books file structure",
    );
  });

  it("throws when required array fields contain non-string values", () => {
    expect(() =>
      parseBooksFile(
        JSON.stringify([
          {
            ...validBook,
            authors: ["Robert C. Martin", 42],
          },
        ]),
      ),
    ).toThrow("Invalid books file structure");
  });

  it("throws when optional fields have invalid types", () => {
    expect(() =>
      parseBooksFile(
        JSON.stringify([
          {
            ...validBook,
            audiobook_duration_minutes: "1024",
          },
        ]),
      ),
    ).toThrow("Invalid books file structure");
  });
});
