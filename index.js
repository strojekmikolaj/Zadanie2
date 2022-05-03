"use strict";
// Z Tablicy Państw z zadania 1 przefiltruj wszystkie należące do Unii Europejskiej.
// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów
exports.__esModule = true;
exports.sumTopFive = exports.sortCountries = exports.filterCountriesWithoutLetter = exports.filterByRegion = void 0;
var givenPopulation = 500000000;
var main = function () {
    fetch('https://restcountries.com/v2/all')
        .then(function (response) { return response.json(); })
        .then(function (response) {
        var countriesInEU = (0, exports.filterByRegion)(response, 'EU');
        var countriesWithoutA = (0, exports.filterCountriesWithoutLetter)(countriesInEU, 'a');
        var mostPopulatedCountries = (0, exports.sortCountries)(countriesWithoutA);
        var topFiveCountries = (0, exports.sumTopFive)(mostPopulatedCountries);
        console.log("EU countries: ", countriesInEU);
        console.log("Countries without letter \"A\": ", countriesWithoutA);
        console.log("Countries sorted according to population: ", mostPopulatedCountries);
        console.log("Suma 5 najwi\u0119kszych populacji: ", topFiveCountries);
        console.log("Is sum of these 5 countries bigger than 5 milion? ".concat(topFiveCountries > givenPopulation));
    });
};
var filterByRegion = function (fetchResponse, region) {
    //return fetchResponse.filter((country: CountryValues) => country.regionalBlocs && country.regionalBlocs[0].acronym === 'EU');
    return fetchResponse.filter(function (country) { return country.regionalBlocs && country.regionalBlocs[0].acronym === region; });
};
exports.filterByRegion = filterByRegion;
var filterCountriesWithoutLetter = function (returnedArray, excludingLetter) {
    return returnedArray.filter(function (country) { return !country.name.includes(excludingLetter); });
};
exports.filterCountriesWithoutLetter = filterCountriesWithoutLetter;
var sortCountries = function (returnedArray) {
    return returnedArray.sort(function (a, b) { return b.population / b.area - a.population / a.area; });
};
exports.sortCountries = sortCountries;
var sumTopFive = function (returnedArray) {
    return returnedArray.slice(0, 5).reduce(function (total, accumulator) { return total + accumulator.population; }, 0);
};
exports.sumTopFive = sumTopFive;
main();
