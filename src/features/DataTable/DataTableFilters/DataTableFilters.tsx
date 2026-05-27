export type LinkAvailabilityFilter = "all" | "present" | "missing";

type DataTableFiltersProps = {
  litresFilter: LinkAvailabilityFilter;
  onLitresFilterChange: (filter: LinkAvailabilityFilter) => void;
  onYandexBooksFilterChange: (filter: LinkAvailabilityFilter) => void;
  yandexBooksFilter: LinkAvailabilityFilter;
};

const filterOptions: Array<{ label: string; value: LinkAvailabilityFilter }> = [
  { label: "Все", value: "all" },
  { label: "Есть", value: "present" },
  { label: "Нет", value: "missing" },
];

function DataTableFilters({
  litresFilter,
  onLitresFilterChange,
  onYandexBooksFilterChange,
  yandexBooksFilter,
}: DataTableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 text-sm">
      <label className="flex items-center gap-2">
        <span className="text-muted-foreground">Яндекс.Книги</span>
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          onChange={(event) =>
            onYandexBooksFilterChange(event.target.value as LinkAvailabilityFilter)
          }
          value={yandexBooksFilter}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="text-muted-foreground">Литрес</span>
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          onChange={(event) => onLitresFilterChange(event.target.value as LinkAvailabilityFilter)}
          value={litresFilter}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default DataTableFilters;
