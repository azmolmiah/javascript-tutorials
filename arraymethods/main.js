const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

/* forEach */
// companies.forEach((company, index) => console.log(company, index));

// Filter
//console.log(ages.filter(age => age >= 21));

// Filter retail companies
//console.log(companies.filter(company => company.end - company.start >= 10));

// Map
//console.log(companies.map(company => company.name));

// Sort does not have any mathematical effects on the digits itself but helps sort the position of the values by sorting into the indexes available depending on the length og the arrays
//console.log(ages.sort((a, b) => a - b));

//reduce the first arguemnt in the function is where the total amount is kept or where everythign is appended to then the second argument is the data which you will use to append and the third parameter is the value which is started at.
// console.log(
//   companies.reduce((total, company) => total + company.end - company.start, 0)
// );

console.log(
  ages
    .map(age => age * 2)
    .filter(age => age >= 40)
    .sort((a, b) => a - b)
    .reduce((total, age) => total + age, 0)
);
