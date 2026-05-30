import BookAudiobooks from "@/features/DataTable/BookCard/BookAudiobooks/BookAudiobooks";
import BookDescription from "@/features/DataTable/BookCard/BookDescription/BookDescription";
import BookTitleCell from "@/features/DataTable/BookCard/BookTitleCell/BookTitleCell";
import LitresLinks from "@/features/DataTable/BookCard/LitresLinks/LitresLinks";
import YandexBooksLinks from "@/features/DataTable/BookCard/YandexBooksLinks/YandexBooksLinks";
import type { Book } from "@/shared/types/book";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  const yandexBooksUrls = book.yandex_books_urls.filter((url) => !url.includes("audiobook"));
  const litresUrls = book.litres_urls.filter((url) => !url.includes("audiobook"));

  return (
    <article
      aria-label={`Книга ${book.title}`}
      className="grid gap-4 rounded-md border border-border bg-card p-4 text-sm shadow-xs md:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.4fr)]"
    >
      <div className="font-medium">
        <BookTitleCell
          authors={book.authors}
          genre={book.genre}
          image={book.image}
          title={book.title}
          url={book.url}
        />
      </div>
      <div className="grid min-w-0 gap-4">
        <div className="text-muted-foreground">
          <BookDescription description={book.description} />
        </div>
      </div>
      <aside className="grid gap-3 border-t border-border pt-4 text-muted-foreground md:col-span-2">
        <div className="grid gap-1">
          <dl className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,3fr)]">
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase text-foreground">Яндекс.Книги</dt>
              <dd>
                {yandexBooksUrls.length === 0 ? "Нет" : <YandexBooksLinks urls={yandexBooksUrls} />}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase text-foreground">Литрес</dt>
              <dd>{litresUrls.length === 0 ? "Нет" : <LitresLinks urls={litresUrls} />}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase text-foreground">Аудиокниги</dt>
              <dd>
                <BookAudiobooks
                  audiobooks={book.audiobooks_urls}
                  durationMinutes={book.audiobook_duration_minutes}
                />
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </article>
  );
}

export default BookCard;
