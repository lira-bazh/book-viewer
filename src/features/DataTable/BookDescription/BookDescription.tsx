const DESCRIPTION_PREVIEW_LENGTH = 280;

type BookDescriptionProps = {
  description?: string;
};

function BookDescription({ description }: BookDescriptionProps) {
  if (!description) {
    return <span className="text-muted-foreground/70">Нет описания</span>;
  }

  if (description.length <= DESCRIPTION_PREVIEW_LENGTH) {
    return <p className="whitespace-pre-wrap text-center">{description}</p>;
  }

  const preview = `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`;

  return (
    <details className="group text-justify">
      <summary className="cursor-pointer list-none">
        <span className="whitespace-pre-wrap group-open:hidden">{preview}</span>
        <span className="ml-2 text-primary underline group-open:hidden">Показать полностью</span>
        <span className="hidden text-primary underline group-open:inline">Свернуть</span>
      </summary>
      <p className="mt-2 whitespace-pre-wrap">{description}</p>
    </details>
  );
}

export default BookDescription;
