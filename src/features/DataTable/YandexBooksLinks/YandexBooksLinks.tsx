type YandexBooksLinksProps = {
  urls: string[];
};

function YandexBooksLinks({ urls }: YandexBooksLinksProps) {
  if (urls.length === 0) {
    return null;
  }

  const sortedLinks = [...urls]
    .sort((firstUrl, secondUrl) => {
      const firstIsAudiobook = firstUrl.includes("audiobook");
      const secondIsAudiobook = secondUrl.includes("audiobook");

      if (firstIsAudiobook === secondIsAudiobook) {
        return 0;
      }

      return firstIsAudiobook ? 1 : -1;
    })
    .map((url, index, sortedUrls) => {
      const isAudiobook = url.includes("audiobook");
      const categoryIndex = sortedUrls
        .slice(0, index + 1)
        .filter((currentUrl) => currentUrl.includes("audiobook") === isAudiobook).length;

      return { categoryIndex, isAudiobook, url };
    });

  return (
    <div className="flex flex-col items-center gap-1">
      {sortedLinks.map(({ categoryIndex, isAudiobook, url }) => (
        <a
          className="text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          href={url}
          key={url}
          rel="noreferrer"
          target="_blank"
        >
          {isAudiobook ? "Аудиокнига" : "Яндекс"}
          {sortedLinks.length > 1 ? ` ${categoryIndex}` : ""}
        </a>
      ))}
    </div>
  );
}

export default YandexBooksLinks;
