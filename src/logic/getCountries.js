import _ from 'lodash';

const formatCountries = (data) => {
  const date = data.dates;

  const filteringArr = [];
  _.forEach(date, (value) => filteringArr.push(value));

  const [{ countries }] = filteringArr;

  return countries;
};

export const countriesList = (countries) => _.map(countries, (country) => country.name);

export default formatCountries;
