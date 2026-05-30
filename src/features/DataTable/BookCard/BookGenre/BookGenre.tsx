type BookGenreProps = {
  genre?: string | null;
};

function BookGenre({ genre }: BookGenreProps) {
  if (!genre) {
    return null;
  }

  return (
    <span className="inline-flex max-w-full items-center rounded-sm border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
      {genre}
    </span>
  );
}

export default BookGenre;
