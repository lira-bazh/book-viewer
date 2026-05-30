import BookGenre from "@/features/DataTable/BookCard/BookGenre/BookGenre";

type BookTitleCellProps = {
  authors: string[];
  genre?: string | null;
  image?: string;
  title: string;
  url: string;
};

function BookTitleCell({ authors, genre, image, title, url }: BookTitleCellProps) {
  return (
    <div className="flex items-center gap-3">
      {image ? (
        <img
          className="h-40 w-28 shrink-0 rounded-sm object-cover"
          src={image}
          alt={`Обложка книги «${title}»`}
          loading="lazy"
        />
      ) : (
        <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-sm bg-muted text-xs text-muted-foreground">
          Нет
        </div>
      )}
      <div className="min-w-0 flex-1 space-y-1 text-center">
        <div className="break-words">{title}</div>
        <div className="break-words text-xs font-normal text-muted-foreground">
          {authors.join(", ")}
        </div>
        {genre ? (
          <div className="break-words text-xs font-normal text-muted-foreground">
            <BookGenre genre={genre} />
          </div>
        ) : null}
        <a
          className="inline-block break-all text-xs font-normal text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          href={url}
          rel="noreferrer"
          target="_blank"
        >
          Ссылка на книгу
        </a>
      </div>
    </div>
  );
}

export default BookTitleCell;
