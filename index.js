"use strict";
// Z Tablicy Państw z zadania 1 przefiltruj wszystkie należące do Unii Europejskiej.
// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów
exports.__esModule = true;
exports.isGreaterThanNum = exports.sumTopFive = exports.sortMostPopulated = exports.filterCountriesWithoutA = exports.filterUE = void 0;
var givenPopulation = 500000000;
var main = function () {
    fetch('https://restcountries.com/v2/all')
        .then(function (response) { return response.json(); })
        .then(function (response) {
        var countriesInEU = (0, exports.filterUE)(response);
        var countriesWithoutA = (0, exports.filterCountriesWithoutA)(countriesInEU);
        var mostPopulatedCountries = (0, exports.sortMostPopulated)(countriesWithoutA);
        var topFiveCountries = (0, exports.sumTopFive)(mostPopulatedCountries);
        console.log("EU countries: ", countriesInEU);
        console.log("Countries without letter \"A\": ", countriesWithoutA);
        console.log("Countries sorted according to population: ", mostPopulatedCountries);
        console.log("Suma 5 najwi\u0119kszych populacji: ", topFiveCountries);
        console.log("Is sum of these 5 countries bigger than 5 milion? ", (0, exports.isGreaterThanNum)(topFiveCountries, givenPopulation));
    });
};
var filterUE = function (fetchResponse) {
    var filteredCountries = fetchResponse.filter(function (country) { return country.regionalBlocs && country.regionalBlocs[0].acronym === 'EU'; });
    return filteredCountries;
};
exports.filterUE = filterUE;
var filterCountriesWithoutA = function (returnedArray) {
    var filteredCountries = returnedArray.filter(function (country) { return !country.name.includes('a'); });
    return filteredCountries;
};
exports.filterCountriesWithoutA = filterCountriesWithoutA;
var sortMostPopulated = function (returnedArray) {
    var filteredCountries = returnedArray.sort(function (a, b) { return b.population / b.area - a.population / a.area; });
    return filteredCountries;
};
exports.sortMostPopulated = sortMostPopulated;
var sumTopFive = function (returnedArray) {
    var sumOfPopulation = returnedArray.slice(0, 5).reduce(function (total, accumulator) { return total + +accumulator.population; }, 0);
    return sumOfPopulation;
};
exports.sumTopFive = sumTopFive;
var isGreaterThanNum = function (returnedSum, population) {
    return returnedSum > population;
};
exports.isGreaterThanNum = isGreaterThanNum;
main();
