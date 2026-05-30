import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import DataTable from "@/features/DataTable/DataTable";
import { useBooksStore } from "@/shared/store/booksStore";
import type { Book } from "@/shared/types/book";

const books: Book[] = [
  {
    title: "Short Audio",
    authors: ["First Author"],
    url: "https://example.com/short-audio",
    description: "Short description",
    genre: "Programming",
    audiobook_duration_minutes: 90,
    yandex_books_urls: [
      "https://books.yandex.ru/books/short-audio",
      "https://books.yandex.ru/audiobooks/short-audio",
    ],
    litres_urls: [],
    audiobooks_urls: [
      {
        url: "https://books.yandex.ru/audiobooks/short-audio",
        title: "Short Audio в Яндексе",
        narrator: null,
        duration: 90,
      },
      {
        url: "https://www.litres.ru/audiobook/short-audio",
        title: "Short Audio в Литресе",
        narrator: null,
        duration: 90,
      },
      {
        url: "https://rutracker.org/forum/viewtopic.php?t=123456",
        title: "Short Audio на Rutracker",
        narrator: null,
        duration: null,
      },
    ],
  },
  {
    title: "Long Audio",
    authors: ["Second Author", "Third Author"],
    url: "https://example.com/long-audio",
    description: "Long description",
    genre: null,
    audiobook_duration_minutes: 150,
    yandex_books_urls: [],
    litres_urls: [
      "https://www.litres.ru/book/long-audio",
      "https://www.litres.ru/audiobook/long-audio",
    ],
    audiobooks_urls: [],
  },
  {
    title: "No Duration",
    authors: ["Fourth Author"],
    url: "https://example.com/no-duration",
    yandex_books_urls: [],
    litres_urls: [],
    audiobooks_urls: [],
  },
];

beforeEach(() => {
  useBooksStore.setState({ books: [] });
});

function selectFilter(label: "Жанр" | "Источник", value: string) {
  fireEvent.pointerDown(screen.getByRole("combobox", { name: label }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });
  fireEvent.click(screen.getByRole("option", { name: value }));
}

afterEach(() => {
  cleanup();
});

describe("DataTable", () => {
  it("shows an empty state when books are not loaded", () => {
    render(<DataTable />);

    expect(screen.getByText("Данные появятся после загрузки файла")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Список книг" })).not.toBeInTheDocument();
  });

  it("renders loaded books with details and links", () => {
    useBooksStore.setState({ books });

    render(<DataTable />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Список книг" })).toBeInTheDocument();
    expect(screen.getByText("Всего книг: 3")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("Short Audio")).toBeInTheDocument();
    expect(screen.getByText("First Author")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Ссылка на книгу" })[0]).toHaveAttribute(
      "href",
      "https://example.com/short-audio",
    );
    expect(screen.getByText("Short description")).toBeInTheDocument();
    expect(screen.getByText("Жанр")).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.queryByText("null")).not.toBeInTheDocument();
    expect(screen.getByText("1 ч 30 мин")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Яндекс" })).toHaveAttribute(
      "href",
      "https://books.yandex.ru/books/short-audio",
    );
    expect(screen.getByRole("link", { name: "Литрес" })).toHaveAttribute(
      "href",
      "https://www.litres.ru/book/long-audio",
    );
    expect(
      screen.getByRole("link", { name: "Яндекс.Книги Short Audio в Яндексе" }),
    ).toHaveAttribute("href", "https://books.yandex.ru/audiobooks/short-audio");
    expect(screen.getByRole("link", { name: "Литрес Short Audio в Литресе" })).toHaveAttribute(
      "href",
      "https://www.litres.ru/audiobook/short-audio",
    );
    expect(
      screen.getByRole("link", { name: "Rutracker Short Audio на Rutracker" }),
    ).toHaveAttribute("href", "https://rutracker.org/forum/viewtopic.php?t=123456");
    expect(screen.getByText("Нет описания")).toBeInTheDocument();
  });

  it("filters book cards by genre", () => {
    useBooksStore.setState({ books });

    render(<DataTable />);

    selectFilter("Жанр", "Programming");

    expect(screen.getByText("Short Audio")).toBeInTheDocument();
    expect(screen.queryByText("Long Audio")).not.toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();
  });

  it("filters book cards by source including audiobook links", () => {
    useBooksStore.setState({ books });

    render(<DataTable />);

    selectFilter("Источник", "Rutracker");

    expect(screen.getByText("Short Audio")).toBeInTheDocument();
    expect(screen.queryByText("Long Audio")).not.toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();
  });

  it("searches book cards by title and author", () => {
    useBooksStore.setState({ books });

    render(<DataTable />);

    fireEvent.change(screen.getByRole("textbox", { name: "Поиск" }), {
      target: { value: "Second Author" },
    });

    expect(screen.queryByText("Short Audio")).not.toBeInTheDocument();
    expect(screen.getByText("Long Audio")).toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();
  });
});
