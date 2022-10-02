const findTheOldest = function(people) {
    return people.reduce((oldest, person) => {

      const oldestAge = (oldest.yearOfDeath || new Date().getFullYear())
      - (oldest.yearOfBirth || new Date().getFullYear());

      const currentAge = (person.yearOfDeath || new Date().getFullYear())
      - person.yearOfBirth;

      // console.log(currentAge);
      
      if(currentAge - oldestAge > 0) oldest = person;
      return oldest;
    },
    {});
};

const test = [
  {
    name: "Carly",
    yearOfBirth: 2018,
  },
  {
    name: "Ray",
    yearOfBirth: 1962,
    yearOfDeath: 2011,
  },
  {
    name: "Jane",
    yearOfBirth: 1912,
    yearOfDeath: 1941,
  },
]

findTheOldest(test);
// Do not edit below this line
module.exports = findTheOldest;
