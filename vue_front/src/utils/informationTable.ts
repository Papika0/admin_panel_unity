import _ from "lodash";
import { s } from "node_modules/@fullcalendar/core/internal-common";

export interface Information {
  distr_code: string[];
  name: string[];
  location_name_ka: string[];
  Progress: number[];
  number_of_household: number[];
  agriculture_persent: number[];
  number_of_household_1: number[];
  agriculture_persent_1: number[];
  house_point_statuses_all: number[];
  house_point_statuses_0: number[];
  house_point_statuses_1: number[];
  house_point_statuses_2: number[];
  house_point_statuses_3: number[];
  house_point_statuses_4: number[];
  house_point_statuses_5: number[];
  house_point_statuses_7: number[];
  inquire_status_0: number[];
  inquire_status_1: number[];
  inquire_status_3: number[];
  inquire_status_4: number[];
  inquire_status_5: number[];
  inquire_status_6: number[];
  inquire_status_7: number[];
  inquire_status_all: number[];
  dwelling_status_id_1: number[];
  dwelling_status_id_2: number[];
  dwelling_status_id_3: number[];
  number_of_persons_1: number[];
  number_of_persons_2: number[];
  number_of_persons_3: number[];
  number_of_persons_4: number[];
  permanent_population: number[];
  permanent_population_1: number[];
  temporary_population: number[];
  temporary_population_1: number[];
  total_population: number[];
  total_population_1: number[];
  household_avg_size: number[];
  number_of_agriculture_household: number[];
  has_fruit_trees: number[];
  dwelling_status_id_1_1: number[];
  dwelling_status_id_2_1: number[];
  dwelling_status_id_3_1: number[];
  number_of_persons_1_1: number[];
  number_of_persons_2_1: number[];
  number_of_persons_3_1: number[];
  number_of_persons_4_1: number[];
  household_avg_size_1: number[];
  number_of_agriculture_household_1: number[];
  has_fruit_trees_1: number[];

  education_stage_now_1: number[];
  education_stage_now_2: number[];
  education_stage_now_3: number[];
  education_stage_now_1_1: number[];
  education_stage_now_2_1: number[];
  education_stage_now_3_1: number[];
  cl_education_achieved_stage_id_total: number[];
  cl_education_achieved_stage_id_1: number[];
  cl_education_achieved_stage_id_2: number[];
  cl_education_achieved_stage_id_3: number[];
  cl_education_achieved_stage_id_4: number[];
  cl_education_achieved_stage_id_5: number[];
  cl_education_achieved_stage_id_6: number[];
  cl_education_achieved_stage_id_7: number[];
  cl_education_achieved_stage_id_8: number[];
  cl_education_achieved_stage_id_1_persent: number[];
  cl_education_achieved_stage_id_2_persent: number[];
  cl_education_achieved_stage_id_3_persent: number[];
  cl_education_achieved_stage_id_4_persent: number[];
  cl_education_achieved_stage_id_5_persent: number[];
  cl_education_achieved_stage_id_6_persent: number[];
  cl_education_achieved_stage_id_7_persent: number[];
  cl_education_achieved_stage_id_8_persent: number[];
  cl_education_achieved_stage_id_total_1: number[];
  cl_education_achieved_stage_id_1_1: number[];
  cl_education_achieved_stage_id_2_1: number[];
  cl_education_achieved_stage_id_3_1: number[];
  cl_education_achieved_stage_id_4_1: number[];
  cl_education_achieved_stage_id_5_1: number[];
  cl_education_achieved_stage_id_6_1: number[];
  cl_education_achieved_stage_id_7_1: number[];
  cl_education_achieved_stage_id_8_1: number[];
  cl_education_achieved_stage_id_1_persent_1: number[];
  cl_education_achieved_stage_id_2_persent_1: number[];
  cl_education_achieved_stage_id_3_persent_1: number[];
  cl_education_achieved_stage_id_4_persent_1: number[];
  cl_education_achieved_stage_id_5_persent_1: number[];
  cl_education_achieved_stage_id_6_persent_1: number[];
  cl_education_achieved_stage_id_7_persent_1: number[];
  cl_education_achieved_stage_id_8_persent_1: number[];
  work: number[];
  unemployed: number[];
  notActive: number[];
  unemployed_persent: number[];
  work_persent: number[];
  labaur_force_persent: number[];
  work_1: number[];
  unemployed_1: number[];
  notActive_1: number[];
  unemployed_persent_1: number[];
  work_persent_1: number[];
  labaur_force_persent_1: number[];
  cl_nationality_id_total: number[];
  cl_nationality_id_1: number[];
  cl_nationality_id_2: number[];
  cl_nationality_id_3: number[];
  cl_nationality_id_4: number[];
  cl_nationality_id_5: number[];
  cl_nationality_id_6: number[];
  cl_nationality_id_7: number[];
  cl_nationality_id_8: number[];
  cl_nationality_id_188: number[];
  cl_nationality_id_189: number[];
  cl_nationality_id_total_1: number[];
  cl_nationality_id_1_1: number[];
  cl_nationality_id_2_1: number[];
  cl_nationality_id_3_1: number[];
  cl_nationality_id_4_1: number[];
  cl_nationality_id_5_1: number[];
  cl_nationality_id_6_1: number[];
  cl_nationality_id_7_1: number[];
  cl_nationality_id_8_1: number[];
  cl_nationality_id_188_1: number[];
  cl_nationality_id_189_1: number[];
  cl_nationality_id_1_persent: number[];
  cl_nationality_id_2_persent: number[];
  cl_nationality_id_3_persent: number[];
  cl_nationality_id_4_persent: number[];
  cl_nationality_id_5_persent: number[];
  cl_nationality_id_6_persent: number[];
  cl_nationality_id_7_persent: number[];
  cl_nationality_id_8_persent: number[];
  cl_nationality_id_188_persent: number[];
  cl_nationality_id_189_persent: number[];
  cl_nationality_id_1_persent_1: number[];
  cl_nationality_id_2_persent_1: number[];
  cl_nationality_id_3_persent_1: number[];
  cl_nationality_id_4_persent_1: number[];
  cl_nationality_id_5_persent_1: number[];
  cl_nationality_id_6_persent_1: number[];
  cl_nationality_id_7_persent_1: number[];
  cl_nationality_id_8_persent_1: number[];
  cl_nationality_id_188_persent_1: number[];
  cl_nationality_id_189_persent_1: number[];
  cl_religion_id_total: number[];
  cl_religion_id_1: number[];
  cl_religion_id_2: number[];
  cl_religion_id_3: number[];
  cl_religion_id_4: number[];
  cl_religion_id_5: number[];
  cl_religion_id_6: number[];
  cl_religion_id_7: number[];
  cl_religion_id_8: number[];
  cl_religion_id_9: number[];
  cl_religion_id_10: number[];
  cl_religion_id_11: number[];
  cl_religion_id_total_1: number[];
  cl_religion_id_1_1: number[];
  cl_religion_id_2_1: number[];
  cl_religion_id_3_1: number[];
  cl_religion_id_4_1: number[];
  cl_religion_id_5_1: number[];
  cl_religion_id_6_1: number[];
  cl_religion_id_7_1: number[];
  cl_religion_id_8_1: number[];
  cl_religion_id_9_1: number[];
  cl_religion_id_10_1: number[];
  cl_religion_id_11_1: number[];
  cl_religion_id_1_persent: number[];
  cl_religion_id_2_persent: number[];
  cl_religion_id_3_persent: number[];
  cl_religion_id_4_persent: number[];
  cl_religion_id_5_persent: number[];
  cl_religion_id_6_persent: number[];
  cl_religion_id_7_persent: number[];
  cl_religion_id_8_persent: number[];
  cl_religion_id_9_persent: number[];
  cl_religion_id_10_persent: number[];
  cl_religion_id_11_persent: number[];
  cl_religion_id_1_persent_1: number[];
  cl_religion_id_2_persent_1: number[];
  cl_religion_id_3_persent_1: number[];
  cl_religion_id_4_persent_1: number[];
  cl_religion_id_5_persent_1: number[];
  cl_religion_id_6_persent_1: number[];
  cl_religion_id_7_persent_1: number[];
  cl_religion_id_8_persent_1: number[];
  cl_religion_id_9_persent_1: number[];
  cl_religion_id_10_persent_1: number[];
  cl_religion_id_11_persent_1: number[];

  // sector
  number_of_agriculture_animal_household: number[];
  agriculture_animal_persent: number[];
  cl_animal_id_1: number[];
  cl_animal_id_1_persent: number[];
  cl_animal_id_13: number[];
  cl_animal_id_13_persent: number[];
  cl_animal_id_14: number[];
  cl_animal_id_14_persent: number[];
  number_of_agriculture_field_household: number[];
  agriculture_field_persent: number[];
  cl_field_type_id_2: number[];
  cl_field_type_id_2_persent: number[];
  cl_field_type_id_3: number[];
  cl_field_type_id_3_persent: number[];
  cl_field_type_id_4: number[];
  cl_field_type_id_4_persent: number[];
  cl_field_type_id_12: number[];
  cl_field_type_id_12_persent: number[];
  cl_field_type_id_16: number[];
  cl_field_type_id_16_persent: number[];
  cl_field_type_id_17: number[];
  cl_field_type_id_17_persent: number[];
  cl_field_type_id_19: number[];
  cl_field_type_id_19_persent: number[];
  cl_field_type_id_21: number[];
  cl_field_type_id_21_persent: number[];
  cl_field_type_id_29: number[];
  cl_field_type_id_29_persent: number[];
  has_individual_fruit: number[];
  has_individual_fruit_persent: number[];
  has_individual_vine: number[];
  has_individual_vine_persent: number[];
  has_fruit_trees_persent: number[];
  //
  houshold_member_1: number[];
  houshold_member_2: number[];
  houshold_member_3: number[];
  houshold_member_4: number[];
  houshold_member_5: number[];
  houshold_member_1_persent: number[];
  houshold_member_2_persent: number[];
  houshold_member_3_persent: number[];
  houshold_member_4_persent: number[];
  houshold_member_5_persent: number[];
  houshold_member_1_1: number[];
  houshold_member_2_1: number[];
  houshold_member_3_1: number[];
  houshold_member_4_1: number[];
  houshold_member_5_1: number[];
  houshold_member_1_persent_1: number[];
  houshold_member_2_persent_1: number[];
  houshold_member_3_persent_1: number[];
  houshold_member_4_persent_1: number[];
  houshold_member_5_persent_1: number[];
}

export const transformArray = (array: any[]): Information => {
  return array.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item[key]);
    });
    return acc;
  }, {} as Information);
};

const AdditionalVillageInformation = (
  state: Information,
  onlyConfirmed: boolean,
  distr_code: string
) => {
  if (distr_code.length === 6 || distr_code.length === 8) {
    return [
      // {
      //   name: "სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც ჰყავს პირუტყვი/ფრინველი",
      //   data: _.map(
      //     state.number_of_agriculture_animal_household,
      //     (item, index) =>
      //       `${item} / ${state.agriculture_animal_persent[index]} %`
      //   ),
      //   icon: "",
      // },
      // {
      //   name: "სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც აქვს სას.სამ. მიწა",
      //   data: _.map(
      //     state.number_of_agriculture_field_household,
      //     (item, index) =>
      //       `${item} / ${state.agriculture_field_persent[index]} %`
      //   ),
      //   icon: "",
      // },
      {
        name: "მათ შორის, ვისაც აქვს ერთწლიანი კულტურების ნათესი",
        data: _.map(
          state.cl_field_type_id_2,
          (item, index) =>
            `${item} / ${state.cl_field_type_id_2_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "მათ შორის, ვისაც აქვს მრავალწლოვანი ნარგავები",
        data: _.map(
          state.cl_field_type_id_16,
          (item, index) =>
            `${item} / ${state.cl_field_type_id_16_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "მათ შორის, ვისაც აქვს ეზოები და შენობა-ნაგებობები",
        data: _.map(
          state.cl_field_type_id_29,
          (item, index) =>
            `${item} / ${state.cl_field_type_id_29_persent[index]} %`
        ),
        icon: "",
      },
      // {
      //   name: "მათ შორის, ვისაც აქვს ცალკე მდგომი ხეხილი",
      //   data: _.map(
      //     state.has_individual_fruit,
      //     (item, index) =>
      //       `${item} / ${state.has_individual_fruit_persent[index]} %`
      //   ),
      //   icon: "",
      // },
      // {
      //   name: "მათ შორის, ვისაც აქვს ცალკე მდგომი ვაზი",
      //   data: _.map(
      //     state.has_individual_vine,
      //     (item, index) =>
      //       `${item} / ${state.has_individual_vine_persent[index]} %`
      //   ),
      //   icon: "",
      // },
      {
        name: "სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც აქვს ცალკე მდგომი ხეხილის, ციტრუსის და ვაზის ძირი",
        data: _.map(
          state.has_fruit_trees,
          (item, index) => `${item} / ${state.has_fruit_trees_persent[index]} %`
        ),
        icon: "",
      },
    ];
  }

  return [];
};

const AdditionalSupervisorInformation = (
  state: Information,
  onlyConfirmed: boolean,
  distr_code: string
) => {
  if (distr_code.length === 8) {
    return [
      {
        name: "1 წევრიანი შინამეურნეობების რაოდენობა და წილი",
        data: _.map(
          state.houshold_member_1,
          (item, index) =>
            `${item} / ${state.houshold_member_1_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "2 წევრიანი შინამეურნეობების რაოდენობა და წილი",
        data: _.map(
          state.houshold_member_2,
          (item, index) =>
            `${item} / ${state.houshold_member_2_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "3 წევრიანი შინამეურნეობების რაოდენობა და წილი",
        data: _.map(
          state.houshold_member_3,
          (item, index) =>
            `${item} / ${state.houshold_member_3_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "4 წევრიანი შინამეურნეობების რაოდენობა და წილი",
        data: _.map(
          state.houshold_member_4,
          (item, index) =>
            `${item} / ${state.houshold_member_4_persent[index]} %`
        ),
        icon: "",
      },
      {
        name: "5 და მეტ წევრიანი შინამეურნეობების რაოდენობა და წილი",
        data: _.map(
          state.houshold_member_5,
          (item, index) =>
            `${item} / ${state.houshold_member_5_persent[index]} %`
        ),
        icon: "",
      },
    ];
  }

  return [];
};

const workInormation = (
  state: Information,
  onlyConfirmed: boolean,
  distr_code: string
) => {
  if (distr_code.length === 8) {
    return [
      {
        name: "ზოგადი განათლება",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "ზოგადი განათლების დაწყებითი საფეხური (1 - 6 კლასი)",
        data: !onlyConfirmed
          ? state.education_stage_now_1_1
          : state.education_stage_now_1,
        icon: "",
      },
      {
        name: "ზოგადი განათლების საბაზო საფეხური (7 - 9 კლასი)",
        data: !onlyConfirmed
          ? state.education_stage_now_2_1
          : state.education_stage_now_2,
        icon: "",
      },
      {
        name: "ზოგადი განათლების საშუალო საფეხური (10 - 12 კლასი)",
        data: !onlyConfirmed
          ? state.education_stage_now_3_1
          : state.education_stage_now_3,
        icon: "",
      },
    ];
  }
  return [];
};

const employmentInformation = (
  state: Information,
  onlyConfirmed: boolean,
  distr_code: string
) => {
  if (distr_code.length === 8) {
    return [
      {
        name: "დასაქმება",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      // {
      //   name: "სამუშაო ძალა",
      //   data: !onlyConfirmed
      //     ? state.labaur_force_persent_1
      //     : state.labaur_force_persent,
      //   icon: "",
      // },
      {
        name: "დასაქმებული",
        data: !onlyConfirmed ? state.work_1 : state.work,
        icon: "",
      },
      {
        name: "უმუშევარი",
        data: !onlyConfirmed ? state.unemployed_1 : state.unemployed,

        icon: "",
      },
      {
        name: "არააქტიური",
        data: !onlyConfirmed ? state.notActive_1 : state.notActive,
        icon: "",
      },
      {
        name: "დასაქმების დონე",
        data: !onlyConfirmed ? state.work_persent_1 : state.work_persent,
        percent: true,
        icon: "",
      },
      {
        name: "უმუშევრობის დონე",
        data: !onlyConfirmed
          ? state.unemployed_persent_1
          : state.unemployed_persent,
        percent: true,
        icon: "",
      },
    ];
  }
  return [];
};
const noAdminInformation = (
  state: Information,
  onlyConfirmed: boolean,
  distr_code: string
) => {
  console.log('distr_code',distr_code);
  
  if (distr_code.length > 0) {
    return [
      {
        name: "კითხვარების რაოდენობა",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "სულ",
        data: state.inquire_status_all,
        icon: "",
      },
      {
        name: "დაუსრულებელი",
        data: state.inquire_status_0,
        icon: "",
      },
      {
        name: "დასრულებული",
        data: state.inquire_status_1,
        icon: "",
      },
      {
        name: "უკან დაბრუნებული",
        data: state.inquire_status_3,
        icon: "",
      },
      {
        name: "დადასტურებული",
        data: state.inquire_status_4,
        icon: "",
      },
      {
        name: "წასაშლელი",
        data: state.inquire_status_5,
        icon: "",
      },
      {
        name: "წაშლილი",
        data: state.inquire_status_6,
        icon: "",
      },
      {
        name: "განმეორებითი ვიზიტი",
        data: state.inquire_status_7,
        icon: "",
      },
      {
        name: "საცხოვრისების რაოდენობა",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "ძირითადი საცხოვრისი",
        data: !onlyConfirmed
          ? state.dwelling_status_id_1_1
          : state.dwelling_status_id_1,
        icon: "",
      },
      {
        name: "არაძირითადი საცხოვრისი",
        data: !onlyConfirmed
          ? state.dwelling_status_id_2_1
          : state.dwelling_status_id_2,
        icon: "",
      },
      {
        name: "არ ცხოვრობს მოსახლეობა",
        data: !onlyConfirmed
          ? state.dwelling_status_id_3_1
          : state.dwelling_status_id_3,
        icon: "",
      },
      {
        name: "აღწერილი მოსახლეობა",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "სულ",
        data: !onlyConfirmed ? state.total_population_1 : state.total_population,
        icon: "",
        fontBold: true,
      },
      {
        name: "მუდმივი მოსახლეობა",
        data: !onlyConfirmed
          ? state.permanent_population_1
          : state.permanent_population,
        icon: "",
        fontBold: true,
      },
      {
        name: "კერძო შინამეურნეობებში",
        data: !onlyConfirmed
          ? state.number_of_persons_1_1
          : state.number_of_persons_1,
        icon: "CheckIcon",
      },
      {
        name: "კოლექტიურ შინამეურნეობებში",
        data: !onlyConfirmed
          ? state.number_of_persons_4_1
          : state.number_of_persons_4,
        icon: "CheckIcon",
      },
      {
        name: "დროებით მყოფი მოსახლეობა",
        data: !onlyConfirmed
          ? state.temporary_population_1
          : state.temporary_population,
        icon: "",
        fontBold: true,
      },
      {
        name: "ძირითად საცხოვრისებში",
        data: !onlyConfirmed
          ? state.number_of_persons_2_1
          : state.number_of_persons_2,
        icon: "CheckIcon",
      },
      {
        name: "არაძირითად საცხოვრისებში",
        data: !onlyConfirmed
          ? state.number_of_persons_3_1
          : state.number_of_persons_3,
        icon: "CheckIcon",
      },
      {
        name: "შინამეურნეობები",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "შინამეურნობის საშუალო ზომა",
        data: !onlyConfirmed
          ? state.household_avg_size_1
          : state.household_avg_size,
        icon: "",
      },
      ...AdditionalSupervisorInformation(
        state,
        !onlyConfirmed,
        state.distr_code[0]
      ),
      // {
      //   name: "ეროვნება",
      //   data: [],
      //   colspan: true,
      //   colspanLength: state.distr_code.length + 1,
      //   icon: "",
      // },
      // {
      //   name: "სულ",
      //   data: !onlyConfirmed
      //     ? state.cl_nationality_id_total_1
      //     : state.cl_nationality_id_total,
      //   icon: "",
      // },
      // {
      //   name: "ქართველი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_1_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_1_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_1_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "აფხაზი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_2_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_2_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_2,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_2_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "ოსი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_3_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_3_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_3,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_3_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "აზერბაიჯანელი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_4_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_4_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_4,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_4_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სომეხი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_5_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_5_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_5,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_5_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "რუსი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_6_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_6_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_6,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_6_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "უკრაინელი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_7_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_7_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_7,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_7_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "ბელარუსი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_8_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_8_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_8,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_8_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სხვა",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_188_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_188_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_188,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_188_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "უარი პასუხზე",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_nationality_id_189_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_189_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_nationality_id_189,
      //         (item, index) =>
      //           `${item} / ${state.cl_nationality_id_189_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "აღმსარებლობა",
      //   data: [],
      //   colspan: true,
      //   colspanLength: state.distr_code.length + 1,
      //   icon: "",
      // },
      // {
      //   name: "სულ",
      //   data: !onlyConfirmed
      //     ? state.cl_religion_id_total_1
      //     : state.cl_religion_id_total,
      //   icon: "",
      // },
      // {
      //   name: "მართლმადიდებლური",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_1_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_1_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_1_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "კათოლიკური",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_2_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_2_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_2,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_2_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სომხური-სამოციქულო",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_3_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_3_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_3,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_3_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "იუდეური",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_4_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_4_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_4,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_4_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "იეჰოვას მოწმეები",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_5_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_5_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_5,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_5_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "მუსლიმური სუნიტური",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_6_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_6_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_6,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_6_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "მუსლიმური შიიტური",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_7_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_7_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_7,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_7_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სხვა მუსლიმური მიმდინარეობა",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_8_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_8_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_8,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_8_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სხვა",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_9_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_9_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_9,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_9_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "არცერთი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_10_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_10_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_10,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_10_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "უარი პასუხზე",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_religion_id_11_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_11_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_religion_id_11,
      //         (item, index) =>
      //           `${item} / ${state.cl_religion_id_11_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      ...workInormation(state, !onlyConfirmed, state.distr_code[0]),
      // {
      //   name: "განათლების მიღწეული დონე",
      //   data: [],
      //   colspan: true,
      //   colspanLength: state.distr_code.length + 1,
      //   icon: "",
      // },
      // {
      //   name: "სულ",
      //   data: !onlyConfirmed
      //     ? state.cl_education_achieved_stage_id_total_1
      //     : state.cl_education_achieved_stage_id_total,
      //   icon: "",
      // },
      // {
      //   name: "დოქტორი ან მასთან გათანაბრებული ხარისხი",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_1_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_1_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_1_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "მაგისტრის/დიპლომირებული მედიკოსის/ვეტერინარის/სტომატოლოგის პროგრამა ან მასთან გათანაბრებული უმაღლესი საგანმანათლებლო პროგრამა",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_2_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_2_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_2,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_2_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "ბაკალავრის ან მასთან გათანაბრებული უმაღლესი საგანმანათლებლო პროგრამა",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_3_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_3_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_3,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_3_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "პროფესიული განათლება (ყველა ტიპის პროფესიული განათლება, გარდა მე-5 კოდისა)",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_4_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_4_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_4,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_4_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "საშუალოს შემდგომი, არაუმაღლესი განათლება",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_5_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_5_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_5,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_5_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "სრული ზოგადი განათლება (საშუალო განათლება)",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_6_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_6_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_6,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_6_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "საბაზო ზოგადი განათლება",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_7_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_7_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_7,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_7_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      // {
      //   name: "დაწყებითი ზოგადი განათლება",
      //   data: !onlyConfirmed
      //     ? _.map(
      //         state.cl_education_achieved_stage_id_8_1,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_8_persent_1[index]} %`
      //       )
      //     : _.map(
      //         state.cl_education_achieved_stage_id_8,
      //         (item, index) =>
      //           `${item} / ${state.cl_education_achieved_stage_id_8_persent[index]} %`
      //       ),
      //   icon: "",
      // },
      ...employmentInformation(state, !onlyConfirmed, state.distr_code[0]),
  
      {
        name: "სოფლის მეურნეობა",
        data: [],
        colspan: true,
        colspanLength: state.distr_code.length + 1,
        icon: "",
      },
      {
        name: "სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში",
        data: !onlyConfirmed
          ? state.number_of_agriculture_household_1.map(
              (item, index) => `${item} / ${state.agriculture_persent_1[index]} %`
            )
          : state.number_of_agriculture_household.map(
              (item, index) => `${item} / ${state.agriculture_persent[index]} %`
            ),
        icon: undefined,
      },
      // {
      //   name: "სასოფლო მეურნეობების რაოდენობა, ვისაც აქვს ცალკე მდგომი ხეხილის, ციტრუსის და ვაზის ძირი",
      //   data: !onlyConfirmed ? state.has_fruit_trees_1 : state.has_fruit_trees,
      //   icon: "",
      // },
      ...AdditionalVillageInformation(state, onlyConfirmed, state.distr_code[0]),
    ];
  }
  return [];
};
export const makeRows = (state: Information, onlyConfirmed: boolean) => {
  return [
    {
      name: "პროგრესი",
      data: state.Progress,
      percent: true,
      icon: "",
    },
    {
      name: "შენობების რაოდენობა",
      data: [],
      colspan: true,
      colspanLength: state.distr_code.length + 1,
      icon: "",
    },
    { name: "სულ", data: state.house_point_statuses_all, icon: "" },
    { name: "საწყისი", data: state.house_point_statuses_0, icon: "" },
    {
      name: "დაწყებული",
      data: state.house_point_statuses_1,
      icon: "",
    },
    {
      name: "დასრულებული",
      data: state.house_point_statuses_2,
      icon: "",
    },
    {
      name: "უკანდაბრუნებული",
      data: state.house_point_statuses_3,
      icon: "",
    },
    {
      name: "წასაშლელი",
      data: state.house_point_statuses_4,
      icon: "",
    },
    { name: "წაშლილი", data: state.house_point_statuses_5, icon: "" },
    {
      name: "არასაცხოვრებელი",
      data: state.house_point_statuses_7,
      icon: "",
    },
    ...noAdminInformation(state, onlyConfirmed, state.distr_code[0]),
    
  ];
};
