import { useState } from "react";

import FileUploader from "@/features/file-upload/FileUploader";
import DataTable from "@/shared/ui/data-table/DataTable";
import type { TableData } from "@/shared/types/table-data";

function Content() {
  const [tableData, setTableData] = useState<TableData | null>(null);

  return (
    <section className="flex flex-1 flex-col gap-6 py-8">
      <FileUploader onLoad={setTableData} />
      <DataTable data={tableData} />
    </section>
  );
}

export default Content;
