import SearchInput from "../SearchInput";
import Select from "../Select";

interface Props {
  search: string;
  status: string;
  subscription: string;

  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSubscriptionChange: (value: string) => void;
}

export default function TenantFilters({
  search,
  status,
  subscription,
  onSearch,
  onStatusChange,
  onSubscriptionChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-3">
      <SearchInput value={search} onChange={onSearch} />

      <Select
        value={status}
        options={["Active", "Inactive"]}
        onChange={onStatusChange}
      />

      <Select
        value={subscription}
        options={["Basic", "Pro", "Enterprise"]}
        onChange={onSubscriptionChange}
      />
    </div>
  );
}
