import { type ChangeEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";

import { Input } from "@/shared/ui/input";

import type { TableData } from "@/shared/types/table-data";

type FileUploaderProps = {
  onLoad: (data: TableData) => void;
};

function parseDelimitedText(content: string, fileName: string): TableData {
  const lines = content
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return { columns: [], rows: [], fileName };
  }

  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const [header, ...body] = lines.map((line) => line.split(delimiter).map((cell) => cell.trim()));

  return {
    columns: header.map((column, index) => column || `Колонка ${index + 1}`),
    rows: body,
    fileName,
  };
}

function FileUploader({ onLoad }: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const loadIdRef = useRef(0);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const loadId = loadIdRef.current + 1;
    loadIdRef.current = loadId;
    setError(null);

    try {
      const content = await file.text();

      if (loadIdRef.current !== loadId) {
        return;
      }

      onLoad(parseDelimitedText(content, file.name));
    } catch {
      if (loadIdRef.current === loadId) {
        setError("Не удалось прочитать файл");
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-dashed border-border p-4">
      <label className="flex items-center gap-2 text-sm font-medium" htmlFor="file-upload">
        <Upload className="size-4" aria-hidden="true" />
        Загрузить файл
      </label>
      <Input id="file-upload" type="file" accept=".csv,.tsv,.txt" onChange={handleFileChange} />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

export default FileUploader;
