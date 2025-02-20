<script setup lang="ts">
import _ from "lodash";
import { onMounted, ref } from "vue";
import Table from "@/components/Base/Table";
import { useRouter } from "vue-router";
import { FormSwitch } from "@/components/Base/Form";
import { useInformationTabStore } from "@/stores/information/informationTabStore";
import { InfoTableTr } from "../Table";
import {
  // Information,
  // transformArray,
  makeRows,
} from "@/utils/informationTable";

const props = withDefaults(
  defineProps<{
    state: any;
    nextLevel?: boolean;
    initial?: number;
    maxLength?: number;
  }>(),
  {
    state: () => ({}),
    nextLevel: false,
    initial: 0,
    maxLength: 0,
  }
);

const router = useRouter();
const informationTabStore = useInformationTabStore();
const { fetchInformation } = informationTabStore;

const getCategoryId = (distr_code: string) => {
  const obj: { [key: number]: number } = {
    8: 2,
    6: 3,
    4: 4,
    2: 5,
    0: 6,
  };

  const categoryId = obj[distr_code.length];
  return categoryId;
};

const onlyConfirmed = ref(false);

const handleSwitchChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  onlyConfirmed.value = target.checked;
  console.log(onlyConfirmed.value);
  informationRows.value = makeRows(props.state, onlyConfirmed.value);
};
const informationRows = ref<any[]>([]);
onMounted(async () => {
  informationRows.value = makeRows(props.state, onlyConfirmed.value);
});
</script>
<template>
  <div class="p-5 mt-12 intro-y box sm:mt-5">
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
      <Table sm bordered>
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-wrap font-bold text-base"
              >დასახელება</Table.Th
            >
            <Table.Th
              class="text-wrap"
              v-for="(item, index) in state.distr_code"
              :key="index"
            >
              <p :class="index == 0 ? 'font-bold' : ''">
                {{ state.name[index] != "" ? state.name[index] : "ვაკანტური" }}
              </p>
              <p
                :class="
                  nextLevel && initial != maxLength && index != 0
                    ? 'text-primary cursor-pointer'
                    : ''
                "
              >
                <!--  -->
                <u
                  v-if="nextLevel && initial != maxLength && index != 0"
                  @click="fetchInformation(item, getCategoryId(item))"
                >
                  {{ item }}</u
                >
                <span v-else>{{ item }}</span>
              </p>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <InfoTableTr
            v-for="(row, index) in informationRows"
            :key="index"
            v-bind="row"
          />
        </Table.Tbody>
      </Table>
    </div>
  </div>
  <!-- </div> -->
</template>
