// Z Tablicy Państw z zadania 1 przefiltruj wszystkie należące do Unii Europejskiej.
// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów

const givenPopulation: number = 500_000_000;

type CountryValues = {
  population: number;
  name: string;
  regionalBlocs?: { acronym: string }[];
  area: number;
};

const main = (): void => {
  fetch('https://restcountries.com/v2/all')
    .then((response: Response) => response.json())
    .then((response: Array<CountryValues>) => {
      let countriesInEU: Array<CountryValues> = filterUE(response);
      let countriesWithoutA: Array<CountryValues> = filterCountriesWithoutA(countriesInEU);
      let mostPopulatedCountries: Array<CountryValues> = sortMostPopulated(countriesWithoutA);
      let topFiveCountries: number = sumTopFive(mostPopulatedCountries);

      console.log(`EU countries: `, countriesInEU);
      console.log(`Countries without letter "A": `, countriesWithoutA);
      console.log(`Countries sorted according to population: `, mostPopulatedCountries);
      console.log(`Suma 5 największych populacji: `, topFiveCountries);
      console.log(`Is sum of these 5 countries bigger than 5 milion? `, isGreaterThanNum(topFiveCountries, givenPopulation));
    });
};

export const filterUE = (fetchResponse: Array<CountryValues>): Array<CountryValues> => {
  let filteredCountries: Array<CountryValues> = fetchResponse.filter((country: CountryValues) => country.regionalBlocs && country.regionalBlocs[0].acronym === 'EU');
  return filteredCountries;
};

export const filterCountriesWithoutA = (returnedArray: Array<CountryValues>): Array<CountryValues> => {
  let filteredCountries: Array<CountryValues> = returnedArray.filter((country: CountryValues) => !country.name.includes('a'));
  return filteredCountries;
};

export const sortMostPopulated = (returnedArray: Array<CountryValues>): Array<CountryValues> => {
  let filteredCountries: Array<CountryValues> = returnedArray.sort((a, b) => b.population / b.area - a.population / a.area);
  return filteredCountries;
};

export const sumTopFive = (returnedArray: Array<CountryValues>): number => {
  let sumOfPopulation: number = returnedArray.slice(0, 5).reduce((total: number, accumulator: CountryValues) => total + +accumulator.population, 0);
  return sumOfPopulation;
};

export const isGreaterThanNum = (returnedSum: number, population: number): boolean => {
  return returnedSum > population;
};

main();
