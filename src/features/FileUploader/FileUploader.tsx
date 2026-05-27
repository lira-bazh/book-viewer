import { type ChangeEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";

import { parseBooksFile } from "@/features/FileUploader/parseBooksFile";
import { useBooksStore } from "@/shared/store/books-store";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

function FileUploader() {
  const [error, setError] = useState<string | null>(null);
  const setBooks = useBooksStore((state) => state.setBooks);
  const loadIdRef = useRef(0);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const loadId = loadIdRef.current + 1;
    loadIdRef.current = loadId;
    setError(null);

    if (file.type !== "application/json" && !file.name.toLowerCase().endsWith(".json")) {
      setError("Можно загрузить только JSON-файл");
      event.target.value = "";
      return;
    }

    try {
      const content = await file.text();

      if (loadIdRef.current !== loadId) {
        return;
      }

      setBooks(parseBooksFile(content));
    } catch {
      if (loadIdRef.current === loadId) {
        setError("JSON не соответствует структуре списка книг");
      }
    }
  }

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Upload className="size-4" aria-hidden="true" />
        </div>
        <label className="text-sm font-medium" htmlFor="file-upload">
          Загрузить файл
        </label>
      </div>
      <Input
        id="file-upload"
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </Card>
  );
}

export default FileUploader;
