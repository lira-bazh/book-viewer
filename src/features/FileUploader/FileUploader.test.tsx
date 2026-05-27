import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FileUploader from "@/features/FileUploader/FileUploader";
import { useBooksStore } from "@/shared/store/booksStore";

const validBooks = [
  {
    title: "Clean Architecture",
    authors: ["Robert C. Martin"],
    url: "https://example.com/clean-architecture",
    yandex_books_urls: ["https://books.yandex.ru/book/clean-architecture"],
    litres_urls: ["https://www.litres.ru/book/clean-architecture"],
  },
];

function getFileInput() {
  return screen.getByLabelText("Загрузить файл") as HTMLInputElement;
}

function uploadFile(file: File) {
  fireEvent.change(getFileInput(), {
    target: {
      files: [file],
    },
  });
}

function createJsonFile(content: string, name = "books.json") {
  return new File([content], name, { type: "application/json" });
}

beforeEach(() => {
  useBooksStore.setState({ books: [] });
});

describe("FileUploader", () => {
  it("loads books from a valid JSON file", async () => {
    render(<FileUploader />);

    uploadFile(createJsonFile(JSON.stringify(validBooks)));

    await waitFor(() => {
      expect(useBooksStore.getState().books).toEqual(validBooks);
    });
    expect(
      screen.queryByText("JSON не соответствует структуре списка книг"),
    ).not.toBeInTheDocument();
  });

  it("shows an error and keeps books unchanged for a non-JSON file", () => {
    useBooksStore.setState({ books: validBooks });
    render(<FileUploader />);

    uploadFile(new File(["plain text"], "books.txt", { type: "text/plain" }));

    expect(screen.getByText("Можно загрузить только JSON-файл")).toBeInTheDocument();
    expect(useBooksStore.getState().books).toEqual(validBooks);
  });

  it("shows an error for JSON with an invalid books structure", async () => {
    render(<FileUploader />);

    uploadFile(createJsonFile(JSON.stringify([{ title: "Missing fields" }])));

    expect(
      await screen.findByText("JSON не соответствует структуре списка книг"),
    ).toBeInTheDocument();
    expect(useBooksStore.getState().books).toEqual([]);
  });

  it("ignores stale file reads when a newer file is selected", async () => {
    let resolveStaleRead: (content: string) => void = () => {};
    const staleContent = new Promise<string>((resolve) => {
      resolveStaleRead = resolve;
    });
    const staleFile = createJsonFile("{}", "stale.json");
    const latestFile = createJsonFile(JSON.stringify(validBooks), "latest.json");

    vi.spyOn(staleFile, "text").mockReturnValue(staleContent);

    render(<FileUploader />);

    uploadFile(staleFile);
    uploadFile(latestFile);
    resolveStaleRead(JSON.stringify([{ title: "Invalid stale file" }]));

    await waitFor(() => {
      expect(useBooksStore.getState().books).toEqual(validBooks);
    });
    expect(
      screen.queryByText("JSON не соответствует структуре списка книг"),
    ).not.toBeInTheDocument();
  });
});
