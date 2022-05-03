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
      let countriesInEU: Array<CountryValues> = filterByRegion(response, 'EU');
      let countriesWithoutA: Array<CountryValues> = filterCountriesWithoutLetter(countriesInEU, 'a');
      let mostPopulatedCountries: Array<CountryValues> = sortCountries(countriesWithoutA);
      let topFiveCountries: number = sumTopFive(mostPopulatedCountries);

      console.log(`EU countries: `, countriesInEU);
      console.log(`Countries without letter "A": `, countriesWithoutA);
      console.log(`Countries sorted according to population: `, mostPopulatedCountries);
      console.log(`Suma 5 największych populacji: `, topFiveCountries);
      console.log(`Is sum of these 5 countries bigger than 5 milion? ${topFiveCountries > givenPopulation}`);
    });
};

export const filterByRegion = (fetchResponse: Array<CountryValues>, region: string): Array<CountryValues> => {
  //return fetchResponse.filter((country: CountryValues) => country.regionalBlocs && country.regionalBlocs[0].acronym === 'EU');
  return fetchResponse.filter((country: CountryValues) => country.regionalBlocs && country.regionalBlocs[0].acronym === region);
};

export const filterCountriesWithoutLetter = (returnedArray: Array<CountryValues>, excludingLetter: string): Array<CountryValues> => {
  return returnedArray.filter((country: CountryValues) => !country.name.includes(excludingLetter));
};

export const sortCountries = (returnedArray: Array<CountryValues>): Array<CountryValues> => {
  return returnedArray.sort((a, b) => b.population / b.area - a.population / a.area);
};

export const sumTopFive = (returnedArray: Array<CountryValues>): number => {
  return returnedArray.slice(0, 5).reduce((total: number, accumulator: CountryValues) => total + accumulator.population, 0);
};

main();
