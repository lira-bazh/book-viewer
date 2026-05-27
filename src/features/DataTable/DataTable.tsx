import { useMemo, useState } from "react";
import { Card } from "@/shared/ui/card";
import { useBooksStore } from "@/shared/store/booksStore";
import DataTableFilters, {
  type LinkAvailabilityFilter,
} from "@/features/DataTable/DataTableFilters/DataTableFilters";
import BookDuration from "@/features/DataTable/BookDuration/BookDuration";
import BookDescription from "@/features/DataTable/BookDescription/BookDescription";
import BookTitleCell from "@/features/DataTable/BookTitleCell/BookTitleCell";
import LitresLinks from "@/features/DataTable/LitresLinks/LitresLinks";
import YandexBooksLinks from "@/features/DataTable/YandexBooksLinks/YandexBooksLinks";

type DurationSortDirection = "asc" | "desc" | null;

function matchesLinkAvailabilityFilter(urls: string[], filter: LinkAvailabilityFilter) {
  if (filter === "all") {
    return true;
  }

  return filter === "present" ? urls.length > 0 : urls.length === 0;
}

function DataTable() {
  const books = useBooksStore((state) => state.books);
  const [durationSortDirection, setDurationSortDirection] = useState<DurationSortDirection>(null);
  const [yandexBooksFilter, setYandexBooksFilter] = useState<LinkAvailabilityFilter>("all");
  const [litresFilter, setLitresFilter] = useState<LinkAvailabilityFilter>("all");
  const visibleBooks = useMemo(() => {
    const filteredBooks = books.filter(
      (book) =>
        matchesLinkAvailabilityFilter(book.yandex_books_urls, yandexBooksFilter) &&
        matchesLinkAvailabilityFilter(book.litres_urls, litresFilter),
    );

    if (durationSortDirection === null) {
      return filteredBooks;
    }

    return [...filteredBooks].sort((firstBook, secondBook) => {
      const firstDuration = firstBook.audiobook_duration_minutes;
      const secondDuration = secondBook.audiobook_duration_minutes;

      if (firstDuration === undefined && secondDuration === undefined) {
        return 0;
      }

      if (firstDuration === undefined) {
        return 1;
      }

      if (secondDuration === undefined) {
        return -1;
      }

      return durationSortDirection === "asc"
        ? firstDuration - secondDuration
        : secondDuration - firstDuration;
    });
  }, [books, durationSortDirection, litresFilter, yandexBooksFilter]);
  const durationSortLabel = durationSortDirection === "asc" ? "по убыванию" : "по возрастанию";

  function handleDurationSortChange() {
    setDurationSortDirection((currentDirection) => (currentDirection === "asc" ? "desc" : "asc"));
  }

  if (books.length === 0) {
    return (
      <Card className="flex min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
        Данные появятся после загрузки файла
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <DataTableFilters
        litresFilter={litresFilter}
        onLitresFilterChange={setLitresFilter}
        onYandexBooksFilterChange={setYandexBooksFilter}
        yandexBooksFilter={yandexBooksFilter}
      />
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="w-[25%] border-b border-border px-4 py-3 font-medium">Книга</th>
              <th className="w-[39%] border-b border-border px-4 py-3 font-medium">Описание</th>
              <th className="w-[12%] border-b border-border px-4 py-3 text-center font-medium">
                <button
                  aria-label={`Сортировать длительность ${durationSortLabel}`}
                  className="mx-auto flex items-center justify-center gap-1 rounded-sm px-1 py-0.5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  onClick={handleDurationSortChange}
                  type="button"
                >
                  <span>Длительность</span>
                  {durationSortDirection !== null && (
                    <span aria-hidden="true">{durationSortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="w-[14%] border-b border-border px-4 py-3 text-center font-medium">
                Яндекс.Книги
              </th>
              <th className="w-[10%] border-b border-border px-4 py-3 text-center font-medium">
                Литрес
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleBooks.length === 0 && (
              <tr>
                <td
                  className="border-b border-border px-4 py-8 text-center text-muted-foreground"
                  colSpan={5}
                >
                  По выбранным фильтрам ничего не найдено
                </td>
              </tr>
            )}
            {visibleBooks.map((book) => (
              <tr className="odd:bg-background even:bg-muted/35" key={book.url}>
                <td className="border-b border-border px-4 py-3 align-middle font-medium break-words whitespace-normal">
                  <BookTitleCell authors={book.authors} image={book.image} title={book.title} />
                </td>
                <td className="border-b border-border px-4 py-3 align-middle text-center text-muted-foreground break-words">
                  <BookDescription description={book.description} />
                </td>
                <td className="border-b border-border px-4 py-3 text-center align-middle text-muted-foreground whitespace-nowrap">
                  <BookDuration durationMinutes={book.audiobook_duration_minutes} />
                </td>
                <td className="border-b border-border px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                  <YandexBooksLinks urls={book.yandex_books_urls} />
                </td>
                <td className="border-b border-border px-4 py-3 text-center align-middle text-sm whitespace-nowrap">
                  <LitresLinks urls={book.litres_urls} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default DataTable;
