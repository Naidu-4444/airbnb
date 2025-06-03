import useCountries from "@/hooks/useCountries";
import Select from "react-select";
import Flag from "react-world-flags";

const Countryselect = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Select a country"
        isClearable
        options={getAll()}
        value={value}
        onChange={onChange}
        formatOptionLabel={(option) => (
          <div className="flex gap-1">
            <Flag code={option.value} className="w-5" />
            {option.label}
          </div>
        )}
      />
    </div>
  );
};

export default Countryselect;
