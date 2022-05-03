const { filterByRegion, filterCountriesWithoutLetter, sortCountries, sumTopFive } = require('./index');

test('should return array containing countries in European Union', () => {
  const inputArray = [
    { name: 'Poland', population: 900, regionalBlocs: [{ acronym: 'EU' }] },
    { name: 'Afghanistan', population: 1000, regionalBlocs: [{ acronym: 'SAARC' }] },
    { name: 'Cuba', population: 500 },
  ];

  expect(filterByRegion(inputArray).length).toBe(1);
});

test('should return array containing countries whithout letter A in name', () => {
  const inputArray = [
    { name: 'Poland', population: 1200 },
    { name: 'Afghanistan', population: 2000 },
    { name: 'Kongo', population: 1500 },
    { name: 'Sweden', population: 3500 },
  ];

  const outputArray = [
    { name: 'Kongo', population: 1500 },
    { name: 'Sweden', population: 3500 },
  ];

  expect(filterCountriesWithoutLetter(inputArray)).toStrictEqual(outputArray);
});

test('should return sorted array with biggest population first, dependent of country area', () => {
  const inputArray = [
    { name: 'Poland', population: 10_000, area: 100 }, // population / area = 100
    { name: 'Sweden', population: 35_000, area: 50 }, // population / area = 700
    { name: 'Afghanistan', population: 20_000, area: 50 }, // population / area = 400
    { name: 'Kongo', population: 15_000, area: 100 }, // population / area = 150
  ];

  expect(sortCountries(inputArray)[0].name).toBe('Sweden');
  expect(sortCountries(inputArray)[inputArray.length - 1].name).toBe('Poland');
});

test('should return a summed population of first 5 countries from previously sorted array', () => {
  const inputArray = [
    { name: 'Poland', population: 10_000, area: 100 }, // population / area = 100
    { name: 'Sweden', population: 35_000, area: 50 }, // population / area = 700
    { name: 'Afghanistan', population: 20_000, area: 50 }, // population / area = 400
    { name: 'Kongo', population: 15_000, area: 100 }, // population / area = 150
    { name: 'Cuba', population: 500, area: 50 }, // population / area = 10
    { name: 'Germany', population: 25_000, area: 25 }, // population / area = 100
  ];

  const sortedArray = sortCountries(inputArray);

  expect(sumTopFive(sortedArray)).toBe(105000);
});
