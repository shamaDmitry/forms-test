import { compareName } from './helpers';

const getAllCountries = async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const json = await res.json();

    const result = json.map(country => ({
      id: country.name.common,
      name: country.name.common,
      isSelected: false,
      isDisabled: false,
    }));

    return result.sort(compareName);
  } catch (e) {
    console.log(e);
  }
}

export {
  getAllCountries
};