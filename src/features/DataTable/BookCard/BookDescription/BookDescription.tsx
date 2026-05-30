import { useState } from "react";

const DESCRIPTION_PREVIEW_LENGTH = 600;

type BookDescriptionProps = {
  description?: string;
};

function BookDescription({ description }: BookDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return <span className="text-muted-foreground/70">Нет описания</span>;
  }

  if (description.length <= DESCRIPTION_PREVIEW_LENGTH) {
    return <p className="whitespace-pre-wrap text-justify">{description}</p>;
  }

  const preview = `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`;

  return (
    <div className="text-justify">
      {isExpanded ? (
        <>
          <p className="whitespace-pre-wrap">{description}</p>
          <button
            className="mt-2 text-primary underline"
            onClick={() => setIsExpanded(false)}
            type="button"
          >
            Свернуть
          </button>
        </>
      ) : (
        <p className="whitespace-pre-wrap">
          {preview}
          <button
            className="ml-2 text-primary underline"
            onClick={() => setIsExpanded(true)}
            type="button"
          >
            Показать полностью
          </button>
        </p>
      )}
    </div>
  );
}

export default BookDescription;
