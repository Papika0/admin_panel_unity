import _ from "lodash";

interface Age {
  name: string; // 'month' or 'year'
  age: number;
}

interface Persons {
  age: Age;
  cl_relation_type_id: number;
  cl_gender_id: number;
  parent_id: number | null;
  spouse_id: number | null;
  id: number;
  children?: Persons[];
  spouse?: Persons;
  mother?: Persons;
  father?: Persons;
}

interface Household {
  persons: Persons[];
}
interface Link {
  source: number;
  target: number;
  type: "parent" | "child" | "spouse";
}

const convertAgeToMonths = (age: Age): number => {
  if (age.name === "year") {
    return age.age * 12;
  } else if (age.name === "month") {
    return age.age;
  }
  return 0;
};

const findPersonById = (
  persons: Persons[],
  id: number | null
): Persons | undefined => {
  return _.find(persons, (person) => person.id === id);
};


const makeTree = (households: Household[]) => {
  let result = null;
  _.forEach(households, (household) => {
    let persons = household.persons;
    let newPersons = [];
    // Convert ages to months and order persons by age in months
    persons = _.orderBy(
      persons,
      [(person) => convertAgeToMonths(person.age)],
      ["desc"]
    );

    // Create a map to store persons by their ID for quick lookup
    const personsMap = _.keyBy(persons, "id");

    // Traverse each person and build the tree
    _.forEach(persons, (person) => {});

    result = persons;
  });
  return result;
};
export default makeTree;
