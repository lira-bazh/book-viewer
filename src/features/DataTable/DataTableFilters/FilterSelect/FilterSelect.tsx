import { Select, type SelectOption } from "@/shared/ui/Select/Select";

type FilterSelectProps = {
  label: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
};

function FilterSelect({ label, onChange, options, value }: FilterSelectProps) {
  return (
    <label className="grid min-w-40 gap-1.5 text-sm">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Select aria-label={label} onValueChange={onChange} options={options} value={value} />
    </label>
  );
}

export default FilterSelect;
