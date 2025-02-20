export interface QuestionnaireControlInfo {
  distr_code: string[];
  name: string[];
  level: number[];
  person_total: number[];
  no_personal_number: number[];
  no_personal_number_total: number[];
  no_personal_number_persent: number[];
  no_gender: number[];
  no_gender_total: number[];
  no_gender_persent: number[];
  no_birth_date: number[];
  no_birth_date_total: number[];
  no_birth_date_persent: number[];
  no_birth_place: number[];
  no_birth_place_total: number[];
  no_birth_place_persent: number[];
  no_cl_country_id: number[];
  no_cl_country_id_total: number[];
  no_cl_country_id_persent: number[];
  no_cl_nationality_id: number[];
  no_cl_nationality_id_total: number[];
  no_cl_nationality_id_persent: number[];
  no_inner_migrated: number[];
  no_inner_migrated_total: number[];
  no_inner_migrated_persent: number[];
  no_immigration: number[];
  no_immigration_total: number[];
  no_immigration_persent: number[];
  no_force_migration: number[];
  no_force_migration_total: number[];
  no_force_migration_persent: number[];
  no_mother_language: number[];
  no_mother_language_total: number[];
  no_mother_language_persent: number[];
  no_preschool: number[];
  no_preschool_total: number[];
  no_preschool_persent: number[];
  no_marriage_status: number[];
  no_marriage_status_total: number[];
  no_marriage_status_persent: number[];
  no_alive_children_born: number[];
  no_alive_children_born_total: number[];
  no_alive_children_born_persent: number[];
  no_health: number[];
  no_health_total: number[];
  no_health_persent: number[];
  declined: number[];
  declined_total: number[];
  declined_persent: number[];
  nationality_declined: number[];
  nationality_declined_total: number[];
  nationality_declined_persent: number[];
  religion_declined: number[];
  religion_declined_total: number[];
  religion_declined_persent: number[];
  no_work: number[];
  no_work_total: number[];
  no_work_persent: number[];
  // agriculture
  no_ident?: number[];
  no_ident_persent?: number[];
  no_animal?: number[];
  no_animal_persent?: number[];
  no_total_area?: number[];
  no_total_area_persent?: number[];
  no_field?: number[];
  no_field_persent?: number[];
  is_by_living_place?: number[];
  is_by_living_place_persent?: number[];
  has_arable_fields?: number[];
  has_arable_fields_persent?: number[];
  has_perennial_plants?: number[];
  has_perennial_plants_persent?: number[];
  has_individual_fruit?: number[];
  has_individual_fruit_persent?: number[];
  has_individual_vine?: number[];
  has_individual_vine_persent?: number[];
  cl_field_type_id_29?: number[];
  cl_field_type_id_29_persent?: number[];
  no_ident_total?: number[];
  animal_area_field_total?: number[];
  other_total?: number[];
}

export const transformArray = (array: any[]): QuestionnaireControlInfo => {
  return array.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item[key]);
    });
    return acc;
  }, {} as QuestionnaireControlInfo);
};

export const makeRows = (state: QuestionnaireControlInfo) => {
    return [
      {
        name: "არ შეივსო პირადი ნომერი",
        data: state.no_personal_number,
        total: state.no_personal_number_total,
        percent: state.no_personal_number_persent,
      },
      {
        name: "არ შეივსო სქესი",
        data: state.no_gender,
        total: state.no_gender_total,
        percent: state.no_gender_persent,
      },
      {
        name: "არ შეივსო დაბადების თარიღი",
        data: state.no_birth_date,
        total: state.no_birth_date_total,
        percent: state.no_birth_date_persent,
      },
      {
        name: "არ შეივსო დაბადების ადგილი",
        data: state.no_birth_place,
        total: state.no_birth_place_total,
        percent: state.no_birth_place_persent,
      },
      {
        name: "არ შეივსო მოქალაქეობა",
        data: state.no_cl_country_id,
        total: state.no_cl_country_id_total,
        percent: state.no_cl_country_id_persent,
      },
      {
        name: "არ შეივსო ეროვნება",
        data: state.no_cl_nationality_id,
        total: state.no_cl_nationality_id_total,
        percent: state.no_cl_nationality_id_persent,
      },
      {
        name: "არ შეივსო შიდა მიგრაცია",
        data: state.no_inner_migrated,
        total: state.no_inner_migrated_total,
        percent: state.no_inner_migrated_persent,
      },
      {
        name: "არ შეივსო იმიგრაცია",
        data: state.no_immigration,
        total: state.no_immigration_total,
        percent: state.no_immigration_persent,
      },
      {
        name: "არ შეივსო იძულებითი მიგრაცია",
        data: state.no_force_migration,
        total: state.no_force_migration_total,
        percent: state.no_force_migration_persent,
      },
      {
        name: "არ შეივსო ენის ფლობა",
        data: state.no_mother_language,
        total: state.no_mother_language_total,
        percent: state.no_mother_language_persent,
      },
      {
        name: "არ შეივსო ქორწინება",
        data: state.no_marriage_status,
        total: state.no_marriage_status_total,
        percent: state.no_marriage_status_persent,
      },
      {
        name: "არ შეივსო შვილიანობა",
        data: state.no_alive_children_born,
        total: state.no_alive_children_born_total,
        percent: state.no_alive_children_born_persent,
      },
      {
        name: "არ შეივსო ჯანმრთელობის მდგომარეობა",
        data: state.no_health,
        total: state.no_health_total,
        percent: state.no_health_persent,
      },
      {
        name: "არ შეივსო იდენტიფიკაციის გვერდი",
        data: state.no_ident,
        total: state.no_ident_total,
        percent: state.no_ident_persent,
      },
      {
        name: "არ შეივსო მეცხოველეობის გვერდი",
        data: state.no_animal,
        total: state.animal_area_field_total,
        percent: state.no_animal_persent,
      },
      {
        name: "არ შეივსო მიწის ნაკვეთების გვერდი",
        data: state.no_total_area,
        total: state.animal_area_field_total,
        percent: state.no_total_area_persent,
      },
      {
        name: "არ დაამატა ნაკვეთები (გვერდზე მიწა)",
        data: state.no_field,
        total: state.animal_area_field_total,
        percent: state.no_field_persent,
      },
      {
        name: "არ შეივსო ნაკვეთის მდებარეობა",
        data: state.is_by_living_place,
        total: state.other_total,
        percent: state.is_by_living_place_persent,
      },
      {
        name: "არ შეივსო სახნავი მიწის ფართობი",
        data: state.has_arable_fields,
        total: state.other_total,
        percent: state.has_arable_fields_persent,
      },
      {
        name: "არ შეივსო მრავაწლოვანი ნარგავებით დაკავებული მიწის ფართობი",
        data: state.has_perennial_plants,
        total: state.other_total,
        percent: state.has_perennial_plants_persent,
      },
      {
        name: "არ შეივსო ცალკე მდგომი მრავალწლოვანი ნარგავები",
        data: state.has_individual_fruit,
        total: state.other_total,
        percent: state.has_individual_fruit_persent,
      },
      {
        name: "არ შეივსო ცალკე მდგომი ვაზის ძირები",
        data: state.has_individual_vine,
        total: state.other_total,
        percent: state.has_individual_vine_persent,
      },
      {
        name: "შეივსო მხოლოდ ეზოები და შენობა-ნაგებობები",
        data: state.cl_field_type_id_29,
        total: state.other_total,
        percent: state.cl_field_type_id_29_persent,
      },
    ];
  };
