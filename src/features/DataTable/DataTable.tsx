import { useEffect, useMemo, useState } from "react";

import { Card } from "@/shared/ui/card";
import { useBooksStore } from "@/shared/store/booksStore";
import type { Book } from "@/shared/types/book";
import BookCard from "@/features/DataTable/BookCard/BookCard";
import DataTableHeader from "@/features/DataTable/DataTableHeader/DataTableHeader";

type SourceFilter = "all" | "yandex" | "litres" | "rutracker";

function matchesSource(url: string, sourceFilter: SourceFilter) {
  if (sourceFilter === "all") {
    return true;
  }

  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (sourceFilter === "yandex") {
      return hostname === "books.yandex.ru";
    }

    if (sourceFilter === "litres") {
      return hostname === "www.litres.ru" || hostname === "litres.ru";
    }

    return hostname === "rutracker.org" || hostname.endsWith(".rutracker.org");
  } catch {
    return false;
  }
}

function bookMatchesSource(book: Book, sourceFilter: SourceFilter) {
  if (sourceFilter === "all") {
    return true;
  }

  return [
    ...book.yandex_books_urls,
    ...book.litres_urls,
    ...book.audiobooks_urls.map((audiobook) => audiobook.url),
  ].some((url) => matchesSource(url, sourceFilter));
}

function bookMatchesSearchQuery(book: Book, searchQuery: string) {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (normalizedSearchQuery.length === 0) {
    return true;
  }

  return [book.title, ...book.authors].some((value) =>
    value.toLowerCase().includes(normalizedSearchQuery),
  );
}

function DataTable() {
  const books = useBooksStore((state) => state.books);
  const [genreFilter, setGenreFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const genreOptions = useMemo(
    () =>
      [
        ...new Set(
          books.map((book) => book.genre).filter((genre): genre is string => Boolean(genre)),
        ),
      ].sort((firstGenre, secondGenre) => firstGenre.localeCompare(secondGenre)),
    [books],
  );
  const visibleBooks = useMemo(
    () =>
      books.filter(
        (book) =>
          (genreFilter === "all" || book.genre === genreFilter) &&
          bookMatchesSearchQuery(book, searchQuery) &&
          bookMatchesSource(book, sourceFilter),
      ),
    [books, genreFilter, searchQuery, sourceFilter],
  );

  useEffect(() => {
    if (genreFilter !== "all" && !genreOptions.includes(genreFilter)) {
      setGenreFilter("all");
    }
  }, [genreFilter, genreOptions]);

  if (books.length === 0) {
    return (
      <Card className="flex min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
        Данные появятся после загрузки файла
      </Card>
    );
  }

  return (
    <section aria-label="Список книг" className="grid gap-4">
      <DataTableHeader
        booksCount={books.length}
        genreFilter={genreFilter}
        genreOptions={genreOptions}
        onGenreFilterChange={setGenreFilter}
        onSearchQueryChange={setSearchQuery}
        onSourceFilterChange={(filter) => setSourceFilter(filter as SourceFilter)}
        searchQuery={searchQuery}
        sourceFilter={sourceFilter}
      />
      {visibleBooks.length === 0 ? (
        <Card className="flex min-h-32 items-center justify-center p-6 text-sm text-muted-foreground">
          По выбранным фильтрам ничего не найдено
        </Card>
      ) : (
        visibleBooks.map((book) => <BookCard book={book} key={book.url} />)
      )}
    </section>
  );
}

export default DataTable;
