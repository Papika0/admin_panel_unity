<script setup lang="ts">
import Table from "@/components/Base/Table";
import { defineProps, withDefaults } from "vue";
import Lucide from "@/components/Base/Lucide";
type IconType = "CheckIcon"
interface Props {
  name: string;
  data: (string | number)[];
  percent?: boolean;
  colspan?: boolean;
  colspanLength?: number;
  icon?: IconType;
  fontBold?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  percent: false,
  colspan: false,
  colspanLength: 1,
  icon: undefined,
  fontBold: false,
});
</script>

<template>
  <Table.Tr v-if="!props.colspan">
    <Table.Td class="text-wrap flex items-center"
      ><Lucide v-if="icon" :icon="icon" class="w-5 h-5 me-2" />
      <span :class="fontBold? 'font-bold':''">
        {{ props.name }}
      </span></Table.Td
    >
    <Table.Td
      class="text-wrap"
      v-for="(item, index) in props.data"
      :key="index"
    >
      {{ item }} <span v-if="props.percent">%</span>
    </Table.Td>
  </Table.Tr>
  <Table.Tr v-else>
    <Table.Td class="text-wrap font-bold" :colspan="props.colspanLength">
      {{ props.name }}
    </Table.Td>
  </Table.Tr>
</template>
