<script setup lang="ts">
import _ from "lodash";
import Table from "@/components/Base/Table";
import { ref } from "vue";
import { FormSwitch } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

interface SupervisorInformation {
  distr_code: string[];
  name: string[];
  location_name_ka: string[];
  Progress: number[];
  house_point_statuses_0: number[];
  house_point_statuses_1: number[];
  house_point_statuses_2: number[];
  house_point_statuses_3: number[];
  house_point_statuses_4: number[];
  house_point_statuses_5: number[];
  house_point_statuses_7: number[];
  house_point_statuses_all: number[];
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
  living_category_1: number[];
  living_category_2: number[];
  household_avg_size: number[];
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
  agriculture_persent: number[];
  agriculture_field_persent: number[];
  agriculture_animal_persent: number[];
  number_of_agriculture_field_household: number[];
  cl_field_type_id_2: number[];
  cl_field_type_id_2_persent: number[];
  cl_field_type_id_16: number[];
  cl_field_type_id_16_persent: number[];
  cl_field_type_id_29: number[];
  cl_field_type_id_29_persent: number[];
  has_individual_fruit: number[];
  has_individual_fruit_persent: number[];
  has_individual_vine: number[];
  has_individual_vine_persent: number[];
  has_fruit_trees: number[];
  has_fruit_trees_persent: number[];
  number_of_persons_dwelling_status_id_2: number[];
  number_of_agriculture_household: number[];
  number_of_agriculture_animal_household: number[];
  cl_animal_id_1: number[];
  cl_animal_id_1_persent: number[];
  cl_animal_id_13: number[];
  cl_animal_id_13_persent: number[];
  cl_animal_id_14: number[];
  cl_animal_id_14_persent: number[];
  cl_field_type_id_3: number[];
  cl_field_type_id_3_persent: number[];
  cl_field_type_id_4: number[];
  cl_field_type_id_4_persent: number[];
  cl_field_type_id_12: number[];
  cl_field_type_id_12_persent: number[];
  cl_field_type_id_17: number[];
  cl_field_type_id_17_persent: number[];
  cl_field_type_id_19: number[];
  cl_field_type_id_19_persent: number[];
  cl_field_type_id_21: number[];
  cl_field_type_id_21_persent: number[];
  dwelling_status_id_1_1: number[];
  dwelling_status_id_2_1: number[];
  dwelling_status_id_3_1: number[];
  living_category_1_1: number[];
  living_category_2_1: number[];
  number_of_persons_dwelling_status_id_2_1: number[];
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
  number_of_agriculture_household_1: number[];
  agriculture_persent_1: number[];
  number_of_agriculture_animal_household_1: number[];
  agriculture_animal_persent_1: number[];
  cl_animal_id_1_1: number[];
  cl_animal_id_1_persent_1: number[];
  cl_animal_id_13_1: number[];
  cl_animal_id_13_persent_1: number[];
  cl_animal_id_14_1: number[];
  cl_animal_id_14_persent_1: number[];
  number_of_agriculture_field_household_1: number[];
  agriculture_field_persent_1: number[];
  cl_field_type_id_2_1: number[];
  cl_field_type_id_2_persent_1: number[];
  cl_field_type_id_3_1: number[];
  cl_field_type_id_3_persent_1: number[];
  cl_field_type_id_4_1: number[];
  cl_field_type_id_4_persent_1: number[];
  cl_field_type_id_12_1: number[];
  cl_field_type_id_12_persent_1: number[];
  cl_field_type_id_16_1: number[];
  cl_field_type_id_16_persent_1: number[];
  cl_field_type_id_17_1: number[];
  cl_field_type_id_17_persent_1: number[];
  cl_field_type_id_19_1: number[];
  cl_field_type_id_19_persent_1: number[];
  cl_field_type_id_21_1: number[];
  cl_field_type_id_21_persent_1: number[];
  cl_field_type_id_29_1: number[];
  cl_field_type_id_29_persent_1: number[];
  has_individual_fruit_1: number[];
  has_individual_fruit_persent_1: number[];
  has_individual_vine_1: number[];
  has_individual_vine_persent_1: number[];
  has_fruit_trees_1: number[];
  has_fruit_trees_persent_1: number[];
  number_of_persons_1: number[];
  number_of_persons_2: number[];
  number_of_persons_3: number[];
  number_of_persons_4: number[];
  number_of_persons_1_1: number[];
  number_of_persons_2_1: number[];
  number_of_persons_3_1: number[];
  number_of_persons_4_1: number[];
  permanent_population: number[];
  permanent_population_1: number[];
  temporary_population: number[];
  temporary_population_1: number[];
  total_population: number[];
  total_population_1: number[];
  household_avg_size_1: number[];
}
const props = defineProps<{
  state: SupervisorInformation;
}>();
const onlyConfirmed = ref(false);

const handleSwitchChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  onlyConfirmed.value = target.checked;
  // Add your logic here to handle the change
};
</script>
<template>
  <div class="overflow-x-auto">
    <div class="mb-2 p-2">
      <FormSwitch>
        <FormSwitch.Input
          id="checkbox-switch-7"
          type="checkbox"
          @change="handleSwitchChange"
        />
        <FormSwitch.Label htmlFor="checkbox-switch-7">
          მხოლოდ დადასტურებული კითხვარებიდან
        </FormSwitch.Label>
      </FormSwitch>
    </div>
    <Table sm bordered striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th class="text-wrap font-bold text-base">დასახელება</Table.Th>
          <Table.Th
            class="text-wrap"
            v-for="(item, index) in state.distr_code"
            :key="index"
          >
            <p>
              {{ state.name[index] != "" ? state.name[index] : "ვაკანტური" }}
            </p>
            <p>{{ item }}</p>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td class="text-wrap">პროგრესი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.Progress"
            :key="index"
            >{{ item }} %</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >შენობების რაოდენობა</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">სულ</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_all"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">საწყისი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_0"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">დაწყებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">დასრულებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_2"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">უკანდაბრუნებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_3"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">წასაშლელი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_4"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">წაშლილი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_5"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">არასაცხოვრებელი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.house_point_statuses_7"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <!--  -->
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >კითხვარების რაოდენობა</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">სულ</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_all"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">დაუსრულებელი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_0"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">დასრულებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">უკან დაბრუნებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_3"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">დადასტურებული</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_4"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">წასაშლელი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_5"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">წაშლილი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_6"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap">განმეორებითი ვიზიტი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.inquire_status_7"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <!--  -->
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >საცხოვრისების რაოდენობა</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap">ძირითადი საცხოვრისი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap">ძირითადი საცხოვრისი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_1_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap">არაძირითადი საცხოვრისი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_2"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap">არაძირითადი საცხოვრისი</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_2_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap">არ ცხოვრობს მოსახლეობა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_3"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap">არ ცხოვრობს მოსახლეობა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.dwelling_status_id_3_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <!--  -->
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >აღწერილი მოსახლეობა
          </Table.Td>
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap font-black">სულ</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.total_population"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap font-black">სულ</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.total_population_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap font-black">მუდმივი მოსახლეობა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.permanent_population"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap font-black">მუდმივი მოსახლეობა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.permanent_population_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            <span>კერძო შინამეურნეობებში </span>
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            <span>კერძო შინამეურნეობებში </span>
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_1_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            კოლექტიურ შინამეურნეობებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_4"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            კოლექტიურ შინამეურნეობებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_4_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap font-black"
            >დროებით მყოფი მოსახლეობა</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.temporary_population"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap font-black"
            >დროებით მყოფი მოსახლეობა</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.temporary_population_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            ძირითად საცხოვრისებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_2"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            ძირითად საცხოვრისებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_2_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            არაძირითად საცხოვრისებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_3"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap flex items-center">
            <Lucide icon="CheckIcon" class="w-5 h-5 me-2" />
            არაძირითად საცხოვრისებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_persons_3_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >შინამეურნეობები
          </Table.Td>
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap">შინამეურნობის საშუალო ზომა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.household_avg_size"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap">შინამეურნობის საშუალო ზომა</Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.household_avg_size_1"
            :key="index"
            >{{ item }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >1 წევრიანი შინამეურნეობების რაოდენობა და წილი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.houshold_member_1"
            :key="index"
            >{{
              `${item} / ${state.houshold_member_1_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >2 წევრიანი შინამეურნეობების რაოდენობა და წილი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.houshold_member_2"
            :key="index"
            >{{
              `${item} / ${state.houshold_member_2_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >3 წევრიანი შინამეურნეობების რაოდენობა და წილი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.houshold_member_3"
            :key="index"
            >{{
              `${item} / ${state.houshold_member_3_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >4 წევრიანი შინამეურნეობების რაოდენობა და წილი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.houshold_member_4"
            :key="index"
            >{{
              `${item} / ${state.houshold_member_4_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >5 და მეტ წევრიანი შინამეურნეობების რაოდენობა და წილი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.houshold_member_5"
            :key="index"
            >{{
              `${item} / ${state.houshold_member_5_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td
            class="text-wrap font-bold"
            :colspan="state.distr_code.length + 1"
            >სოფლის მეურნეობა</Table.Td
          >
        </Table.Tr>
        <Table.Tr v-if="!onlyConfirmed">
          <Table.Td class="text-wrap"
            >სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_agriculture_household"
            :key="index"
            >{{ `${item} / ${state.agriculture_persent[index]} %` }}
          </Table.Td>
        </Table.Tr>
        <Table.Tr v-else>
          <Table.Td class="text-wrap"
            >სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_agriculture_household_1"
            :key="index"
            >{{ `${item} / ${state.agriculture_persent_1[index]} %` }}
          </Table.Td>
        </Table.Tr>
        <!-- <Table.Tr>
          <Table.Td class="text-wrap"
            >სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც
            ჰყავს პირუტყვი/ფრინველი
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(
              item, index
            ) in state.number_of_agriculture_animal_household"
            :key="index"
            >{{ `${item} / ${state.agriculture_animal_persent[index]} %` }}
          </Table.Td>
        </Table.Tr> -->
        <!-- <Table.Tr>
          <Table.Td class="text-wrap"
            >სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც აქვს
            სას.სამ. მიწა
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.number_of_agriculture_field_household"
            :key="index"
            >{{ `${item} / ${state.agriculture_field_persent[index]} %` }}
          </Table.Td>
        </Table.Tr> -->
        <Table.Tr>
          <Table.Td class="text-wrap"
            >მათ შორის, ვისაც აქვს ერთწლიანი კულტურების ნათესი
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.cl_field_type_id_2"
            :key="index"
            >{{
              `${item} / ${state.cl_field_type_id_2_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >მათ შორის, ვისაც აქვს მრავალწლოვანი ნარგავები
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.cl_field_type_id_16"
            :key="index"
            >{{
              `${item} / ${state.cl_field_type_id_16_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <Table.Tr>
          <Table.Td class="text-wrap"
            >მათ შორის, ვისაც აქვს ეზოები და შენობა-ნაგებობები
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.cl_field_type_id_29"
            :key="index"
            >{{
              `${item} / ${state.cl_field_type_id_29_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
        <!-- <Table.Tr>
          <Table.Td class="text-wrap"
            >მათ შორის, ვისაც აქვს ცალკე მდგომი ხეხილი
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.has_individual_fruit"
            :key="index"
            >{{
              `${item} / ${state.has_individual_fruit_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr> -->
        <!-- <Table.Tr>
          <Table.Td class="text-wrap"
            >მათ შორის, ვისაც აქვს ცალკე მდგომი ვაზი
          </Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.has_individual_vine"
            :key="index"
            >{{
              `${item} / ${state.has_individual_vine_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr> -->
        <Table.Tr>
          <Table.Td class="text-wrap"
            >სასოფლო მეურნეობების რაოდენობა და წილი შინამეურნეობებში, ვისაც აქვს
            ცალკე მდგომი ხეხილის, ციტრუსის და ვაზის ძირი</Table.Td
          >
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.has_fruit_trees"
            :key="index"
            >{{
              `${item} / ${state.has_fruit_trees_persent[index]} %`
            }}</Table.Td
          >
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </div>
</template>
