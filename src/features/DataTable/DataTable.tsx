import { Card } from "@/shared/ui/card";
import type { TableData } from "@/shared/types/table-data";

type DataTableProps = {
  data: TableData | null;
};

function DataTable({ data }: DataTableProps) {
  if (!data) {
    return (
      <Card className="flex min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
        Данные появятся после загрузки файла
      </Card>
    );
  }

  if (data.columns.length === 0) {
    return (
      <Card className="flex min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
        Файл пустой
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border px-6 py-4 text-sm font-medium">{data.fileName}</div>
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
    </Card>
  );
}

export default DataTable;
