import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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
    audiobook_duration_minutes: 90,
    yandex_books_urls: ["https://books.yandex.ru/books/short-audio"],
    litres_urls: [],
  },
  {
    title: "Long Audio",
    authors: ["Second Author", "Third Author"],
    url: "https://example.com/long-audio",
    description: "Long description",
    audiobook_duration_minutes: 150,
    yandex_books_urls: [],
    litres_urls: ["https://www.litres.ru/book/long-audio"],
  },
  {
    title: "No Duration",
    authors: ["Fourth Author"],
    url: "https://example.com/no-duration",
    yandex_books_urls: [],
    litres_urls: [],
  },
];

function getBodyRows() {
  return within(screen.getAllByRole("rowgroup")[1]).getAllByRole("row");
}

function getRowTexts() {
  return getBodyRows().map((row) => row.textContent ?? "");
}

function getFilterSelect(label: "Яндекс.Книги" | "Литрес") {
  const [yandexBooksFilter, litresFilter] = screen.getAllByRole("combobox");

  return label === "Яндекс.Книги" ? yandexBooksFilter : litresFilter;
}

function selectOption(label: "Яндекс.Книги" | "Литрес", value: string) {
  fireEvent.change(getFilterSelect(label), {
    target: { value },
  });
}

beforeEach(() => {
  useBooksStore.setState({ books: [] });
});

afterEach(() => {
  cleanup();
});

describe("DataTable", () => {
  it("shows an empty state when books are not loaded", () => {
    render(<DataTable />);

    expect(screen.getByText("Данные появятся после загрузки файла")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders loaded books with details and links", () => {
    useBooksStore.setState({ books });

    render(<DataTable />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Short Audio")).toBeInTheDocument();
    expect(screen.getByText("First Author")).toBeInTheDocument();
    expect(screen.getByText("Short description")).toBeInTheDocument();
    expect(screen.getByText("1 ч 30 мин")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Яндекс" })).toHaveAttribute(
      "href",
      "https://books.yandex.ru/books/short-audio",
    );
    expect(screen.getByRole("link", { name: "Литрес" })).toHaveAttribute(
      "href",
      "https://www.litres.ru/book/long-audio",
    );
    expect(screen.getByText("Нет описания")).toBeInTheDocument();
  });

  it("sorts books by duration and keeps books without duration last", () => {
    useBooksStore.setState({ books });
    render(<DataTable />);

    fireEvent.click(
      screen.getByRole("button", { name: "Сортировать длительность по возрастанию" }),
    );

    expect(getRowTexts()).toEqual([
      expect.stringContaining("Short Audio"),
      expect.stringContaining("Long Audio"),
      expect.stringContaining("No Duration"),
    ]);
    expect(
      screen.getByRole("button", { name: "Сортировать длительность по убыванию" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Сортировать длительность по убыванию" }));

    expect(getRowTexts()).toEqual([
      expect.stringContaining("Long Audio"),
      expect.stringContaining("Short Audio"),
      expect.stringContaining("No Duration"),
    ]);
  });

  it("filters books by Yandex Books link availability", () => {
    useBooksStore.setState({ books });
    render(<DataTable />);

    selectOption("Яндекс.Книги", "present");

    expect(screen.getByText("Short Audio")).toBeInTheDocument();
    expect(screen.queryByText("Long Audio")).not.toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();

    selectOption("Яндекс.Книги", "missing");

    expect(screen.queryByText("Short Audio")).not.toBeInTheDocument();
    expect(screen.getByText("Long Audio")).toBeInTheDocument();
    expect(screen.getByText("No Duration")).toBeInTheDocument();
  });

  it("filters books by Litres link availability", () => {
    useBooksStore.setState({ books });
    render(<DataTable />);

    selectOption("Литрес", "present");

    expect(screen.queryByText("Short Audio")).not.toBeInTheDocument();
    expect(screen.getByText("Long Audio")).toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();
  });

  it("shows a message when filters hide all books", () => {
    useBooksStore.setState({ books });
    render(<DataTable />);

    selectOption("Яндекс.Книги", "present");
    selectOption("Литрес", "present");

    expect(screen.getByText("По выбранным фильтрам ничего не найдено")).toBeInTheDocument();
    expect(screen.queryByText("Short Audio")).not.toBeInTheDocument();
    expect(screen.queryByText("Long Audio")).not.toBeInTheDocument();
    expect(screen.queryByText("No Duration")).not.toBeInTheDocument();
  });
});
