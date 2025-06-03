import countries from "world-countries";

const formatCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlag,
  region: country.region,
}));

console.log(formatCountries);

const useCountries = () => {
  const getAll = () => formatCountries;
  const getbyValue = (value) => {
    return formatCountries.find((item) => item.value == value);
  };
  return { getAll, getbyValue };
};

export default useCountries;
