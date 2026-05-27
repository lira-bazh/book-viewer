import DataTable from "@/features/DataTable/DataTable";
import FileUploader from "@/features/FileUploader/FileUploader";

function Content() {
  return (
    <section className="flex flex-1 flex-col gap-6 py-8">
      <FileUploader />
      <DataTable data={null} />
    </section>
  );
}

export default Content;
