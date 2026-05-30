import BookDuration from "@/features/DataTable/BookCard/BookDuration/BookDuration";
import type { Audiobook } from "@/shared/types/book";

type BookAudiobooksProps = {
  audiobooks: Audiobook[];
  durationMinutes?: number;
};

function getAudiobookSource(url: string) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (hostname === "books.yandex.ru") {
      return "Яндекс.Книги";
    }

    if (hostname === "www.litres.ru" || hostname === "litres.ru") {
      return "Литрес";
    }

    if (hostname === "rutracker.org" || hostname.endsWith(".rutracker.org")) {
      return "Rutracker";
    }
  } catch {
    return "Источник неизвестен";
  }

  return "Источник неизвестен";
}

function getAudiobookTitle(audiobook: Audiobook, index: number, audiobooksCount: number) {
  if (audiobook.title !== null && audiobook.title.trim().length > 0) {
    return audiobook.title;
  }

  return audiobooksCount > 1 ? `Аудиокнига ${index + 1}` : "Аудиокнига";
}

function BookAudiobooks({ audiobooks, durationMinutes }: BookAudiobooksProps) {
  return (
    <div className="grid gap-2">
      <div>
        <span className="text-foreground">Длительность: </span>
        {durationMinutes === undefined ? (
          "Не указана"
        ) : (
          <BookDuration durationMinutes={durationMinutes} />
        )}
      </div>
      {audiobooks.length === 0 ? (
        <div>Ссылок нет</div>
      ) : (
        <div className="grid gap-1">
          {audiobooks.map((audiobook, index) => {
            const source = getAudiobookSource(audiobook.url);

            return (
              <a
                className="group grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-2 text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                href={audiobook.url}
                key={audiobook.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="w-full rounded-sm border border-border bg-muted px-1.5 py-0.5 text-center text-xs font-medium text-muted-foreground no-underline">
                  {source}
                </span>
                <span className="min-w-0 underline-offset-4 group-hover:underline">
                  {getAudiobookTitle(audiobook, index, audiobooks.length)}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookAudiobooks;
