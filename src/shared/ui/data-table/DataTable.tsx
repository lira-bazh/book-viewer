import type { TableData } from "@/shared/types/table-data";

type DataTableProps = {
  data: TableData | null;
};

function DataTable({ data }: DataTableProps) {
  if (!data) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-md border border-border text-sm text-muted-foreground">
        Данные появятся после загрузки файла
      </div>
    );
  }

  if (data.columns.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-md border border-border text-sm text-muted-foreground">
        Файл пустой
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="border-b border-border px-4 py-3 text-sm text-muted-foreground">
        {data.fileName}
      </div>
      <div className="overflow-auto">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {data.columns.map((column, index) => (
                <th
                  className="border-b border-border px-4 py-3 font-medium"
                  key={`${column}-${index}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr className="odd:bg-background even:bg-muted/35" key={rowIndex}>
                {data.columns.map((_, cellIndex) => (
                  <td className="border-b border-border px-4 py-3" key={cellIndex}>
                    {row[cellIndex] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
