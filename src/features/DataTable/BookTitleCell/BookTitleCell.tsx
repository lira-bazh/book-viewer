type BookTitleCellProps = {
  authors: string[];
  image?: string;
  title: string;
};

function BookTitleCell({ authors, image, title }: BookTitleCellProps) {
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
      </div>
    </div>
  );
}

export default BookTitleCell;
