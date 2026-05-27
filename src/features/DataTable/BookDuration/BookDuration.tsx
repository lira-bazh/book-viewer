type BookDurationProps = {
  durationMinutes?: number;
};

function formatDuration(durationMinutes: number) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes} мин`;
  }

  if (minutes === 0) {
    return `${hours} ч`;
  }

  return `${hours} ч ${minutes.toString().padStart(2, "0")} мин`;
}

function BookDuration({ durationMinutes }: BookDurationProps) {
  if (durationMinutes === undefined) {
    return null;
  }

  return <span>{formatDuration(durationMinutes)}</span>;
}

export default BookDuration;
