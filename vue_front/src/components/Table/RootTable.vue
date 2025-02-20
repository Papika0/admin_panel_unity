<script setup lang="ts">
import _ from "lodash";
import Table from "@/components/Base/Table";
const props = defineProps<{
  state: any[];
  showAdditionalInfoModal: (item: any, value: boolean) => void;
  header: string[];
}>();
</script>
<template>
  <div class="overflow-x-auto">
    <Table sm>
      <Table.Thead>
        <Table.Tr>
          <Table.Th class="text-wrap" v-for="(item, index) in header" :key="index">{{ item }}</Table.Th>
         
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr v-for="(item, index) in state" :key="index">
          <Table.Td class="text-wrap">{{ index + 1 }}</Table.Td>
          <Table.Td class="text-wrap">
            <span
              class="text-primary cursor-pointer"
              @click="
                    (event: Event) => {
                        event.preventDefault();
                        showAdditionalInfoModal(item, true);
                    }
                    "
              ><u>{{ `${item.name?item.name:'ვაკანტური'}-(${item.distr_code})` }}</u></span
            >
          </Table.Td>
          <Table.Td class="text-wrap"> {{ item.Progress }} %</Table.Td>
          <Table.Td class="text-wrap"> {{ item.number_of_household }}</Table.Td>
          <Table.Td class="text-wrap">
            {{ item.number_of_persons }}
          </Table.Td>
          <Table.Td class="text-wrap">
            {{
              `${item.number_of_agriculture_household} / ${item.agriculture_persent} %`
            }}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </div>
</template>
