type BookGenreProps = {
  genre?: string | null;
};

function BookGenre({ genre }: BookGenreProps) {
  if (!genre) {
    return null;
  }

  return <span>{genre}</span>;
}

export default BookGenre;
