import type { Book } from "@/shared/types/book";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
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
    isStringArray(value.litres_urls);

  const hasValidOptionalFields =
    (value.description === undefined || typeof value.description === "string") &&
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
