import _ from 'lodash';

const desiredCountries = [
  { name: 'US', path: '/src/assets/us.svg' },
  { name: 'Spain', path: '/src/assets/spain.svg' },
  { name: 'United Kingdom', path: '/src/assets/uk.svg' },
  { name: 'Germany', path: '/src/assets/germany.svg' },
  { name: 'China', path: '/src/assets/china.svg' },
  { name: 'France', path: '/src/assets/france.svg' },
];

const filterCountries = (data) => {
  const date = data.dates;

  const filteringArr = [];
  _.forEach(date, (value) => filteringArr.push(value));

  const [{ countries }] = filteringArr;

  _.forEach(desiredCountries, (country) => {
    countries[country.name].imagePath = country.path;
    if (country.name === 'US') countries[country.name].name = 'United States';
  });

  return countries;
};

export default filterCountries;
