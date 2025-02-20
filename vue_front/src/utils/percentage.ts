import _ from "lodash";
const getPersonsPercentage = (persons: any) => {
  console.log("persons", persons);
  if (persons) {
    if (
      persons.length === 0 ||
      !_.some(persons, (person) => person.percentage > 0)
    ) {
      return 0;
    }
    return _.meanBy(persons, "percentage");
  }
  return 0;
};

const getFieldPercentage = (fields: any) => {
  if (fields) {
    if (
      fields.length === 0 ||
      !_.some(fields, (field) => field.percentage > 0)
    ) {
      return 0;
    }
    return _.meanBy(fields, "percentage");
  }
  return 0;
};
export const getPercentage = (
  dwelling: any,
  persons: any,
  agriculture: any,
  fields: any
) => {
  let dwelling_percentage = dwelling.percentage;
  let person_percentage = getPersonsPercentage(persons);
  let agriculture_percentage =
    agriculture && agriculture.length > 0 ? agriculture[0].percentage : 0;
  let field_percentage = getFieldPercentage(fields);

  return {
    dwelling_percentage,
    person_percentage,
    agriculture_percentage,
    field_percentage,
  };
};
