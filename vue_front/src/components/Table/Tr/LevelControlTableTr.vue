<script setup lang="ts">
import Table from "@/components/Base/Table";
interface State {
  name: string;
  data: number[];
  total: number[];
  percent: number[];
}
const props = withDefaults(
  defineProps<{
    state: State;
    initial: number;
  }>(),
  {
    state: () => ({
      name: "",
      data: [],
      total: [],
      percent: [],
    }),
    initial: 0,
  }
);
</script>
<template>
  <Table.Tr>
    <Table.Td class="text-wrap">{{ state.name }}</Table.Td>
    <Table.Td
      class="text-wrap"
      v-for="(item, index) in state.data"
      :key="index"
    >
      <b>{{item}}</b>
      / {{`${state.total[index]} (${state.percent[index]} %)`}} 
    </Table.Td>
  </Table.Tr>
</template>
