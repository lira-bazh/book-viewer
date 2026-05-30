import FilterSelect from "@/features/DataTable/DataTableFilters/FilterSelect/FilterSelect";
import { Input } from "@/shared/ui/input";

type DataTableHeaderProps = {
  booksCount: number;
  genreFilter: string;
  genreOptions: string[];
  onGenreFilterChange: (filter: string) => void;
  onSearchQueryChange: (query: string) => void;
  onSourceFilterChange: (filter: string) => void;
  searchQuery: string;
  sourceFilter: string;
};

function DataTableHeader({
  booksCount,
  genreFilter,
  genreOptions,
  onGenreFilterChange,
  onSearchQueryChange,
  onSourceFilterChange,
  searchQuery,
  sourceFilter,
}: DataTableHeaderProps) {
  const genreSelectOptions = [
    { label: "Все", value: "all" },
    ...genreOptions.map((genre) => ({ label: genre, value: genre })),
  ];
  const sourceSelectOptions = [
    { label: "Все", value: "all" },
    { label: "Яндекс.Книги", value: "yandex" },
    { label: "Литрес", value: "litres" },
    { label: "Rutracker", value: "rutracker" },
  ];

  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="grid gap-1">
        <h2 className="text-lg font-semibold text-foreground">Список книг</h2>
        <span className="text-sm text-muted-foreground">Всего книг: {booksCount}</span>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid min-w-56 gap-1.5 text-sm">
          <span className="text-xs font-medium text-muted-foreground">Поиск</span>
          <Input
            aria-label="Поиск"
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Название или автор"
            value={searchQuery}
          />
        </label>
        <FilterSelect
          label="Жанр"
          onChange={onGenreFilterChange}
          options={genreSelectOptions}
          value={genreFilter}
        />
        <FilterSelect
          label="Источник"
          onChange={onSourceFilterChange}
          options={sourceSelectOptions}
          value={sourceFilter}
        />
      </div>
    </header>
  );
}

export default DataTableHeader;
