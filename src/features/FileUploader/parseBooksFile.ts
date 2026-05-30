import type { Book } from "@/shared/types/book";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isAudiobook(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.url === "string" &&
    (value.title === null || typeof value.title === "string") &&
    (value.narrator === null || typeof value.narrator === "string") &&
    (value.duration === null || typeof value.duration === "number")
  );
}

function isAudiobookArray(value: unknown) {
  return Array.isArray(value) && value.every(isAudiobook);
}

function isBook(value: unknown): value is Book {
  if (!isRecord(value)) {
    return false;
  }

  const hasRequiredFields =
    typeof value.title === "string" &&
    isStringArray(value.authors) &&
    typeof value.url === "string" &&
    isStringArray(value.yandex_books_urls) &&
    isStringArray(value.litres_urls) &&
    isAudiobookArray(value.audiobooks_urls);

  const hasValidOptionalFields =
    (value.description === undefined || typeof value.description === "string") &&
    (value.genre === undefined || value.genre === null || typeof value.genre === "string") &&
    (value.image === undefined || typeof value.image === "string") &&
    (value.audiobook_duration_minutes === undefined ||
      typeof value.audiobook_duration_minutes === "number");

  return hasRequiredFields && hasValidOptionalFields;
}

export function parseBooksFile(content: string): Book[] {
  const parsed: unknown = JSON.parse(content);

  if (!Array.isArray(parsed) || !parsed.every(isBook)) {
    throw new Error("Invalid books file structure");
  }

  return parsed;
}
