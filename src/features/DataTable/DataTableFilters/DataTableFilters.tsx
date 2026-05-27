import FilterSelect from "@/features/DataTable/DataTableFilters/FilterSelect/FilterSelect";

export type LinkAvailabilityFilter = "all" | "present" | "missing";
export type GenreFilter = "all" | string;

type DataTableFiltersProps = {
  genreFilter: GenreFilter;
  genreOptions: string[];
  litresFilter: LinkAvailabilityFilter;
  onGenreFilterChange: (filter: GenreFilter) => void;
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
  genreFilter,
  genreOptions,
  litresFilter,
  onGenreFilterChange,
  onLitresFilterChange,
  onYandexBooksFilterChange,
  yandexBooksFilter,
}: DataTableFiltersProps) {
  const genreSelectOptions = [
    { label: "Все", value: "all" },
    ...genreOptions.map((genre) => ({ label: genre, value: genre })),
  ];

  return (
    <div className="grid gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:flex sm:flex-wrap sm:items-end">
      <FilterSelect
        label="Жанр"
        onChange={onGenreFilterChange}
        options={genreSelectOptions}
        value={genreFilter}
      />
      <FilterSelect
        label="Яндекс.Книги"
        onChange={(filter) => onYandexBooksFilterChange(filter as LinkAvailabilityFilter)}
        options={filterOptions}
        value={yandexBooksFilter}
      />
      <FilterSelect
        label="Литрес"
        onChange={(filter) => onLitresFilterChange(filter as LinkAvailabilityFilter)}
        options={filterOptions}
        value={litresFilter}
      />
    </div>
  );
}

export default DataTableFilters;
