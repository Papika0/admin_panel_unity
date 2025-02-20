<script setup lang="ts">
import { ref, onMounted } from "vue";
import Table from "@/components/Base/Table";
import _ from "lodash";
import { useQuestionnaireControlTabStore } from "@/stores/questionnaire/questionnaireControlTabStore";
import { makeRows } from "@/utils/QuestionnaireControl";
import { LevelControlTableTr } from "./Tr";

const questionnaireControlTabStore = useQuestionnaireControlTabStore();
const { fetchQuestionnaireControlInfNextLevel } = questionnaireControlTabStore;

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
const informationRows = ref<any[]>([]);

onMounted(() => {

  informationRows.value = makeRows(props.state);
});
</script>
<template>
  <div class="overflow-x-auto">
    <Table sm bordered striped v-if="_.has(state, 'distr_code')">
      <Table.Thead>
        <Table.Tr>
          <Table.Th class="text-wrap font-bold text-base">დასახელება</Table.Th>
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
              <u
                v-if="nextLevel && initial != maxLength && index != 0"
                @click="
                  fetchQuestionnaireControlInfNextLevel(
                    item,
                    state.level.length == 1 ? state.level[0] : state.level[1]
                  )
                "
                >
                {{ item }}</u
              >
              <span v-else>{{ item }}</span>
            </p>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td class="text-wrap"></Table.Td>
          <Table.Td
            class="text-wrap"
            v-for="(item, index) in state.distr_code"
            :key="index"
            >რაოდენობა / პროცენტი</Table.Td
          >
        </Table.Tr>

        <LevelControlTableTr
          v-for="(item, index) in informationRows"
          :key="index"
          :state="item"
          :initial="index"
        />
      </Table.Tbody>
    </Table>

    <div v-else>
      <p class="text-center">ინფორმაცია არ არის</p>
    </div>
  </div>
</template>
