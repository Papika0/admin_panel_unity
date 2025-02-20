<script setup lang="ts">
import { computed } from "vue";
import _ from "lodash";

const props = withDefaults(
  defineProps<{
    field: string;
    value: string | number | null | undefined;
    checked?: any;
    showDash?: boolean;
  }>(),
  {
    showDash: false,
  }
);

const returnData = (
  item: string | number | null | undefined
): string | number => {
  if (props.showDash) return item ?? "--";
  if (item === -1) return "არა";
  if (item === -2) return "არ აქვს";
  return item ?? "არ შეივსო";
};

const formattedValue = computed(() => returnData(props.value));
</script>

<template>
  <div class="flex items-center py-1 border-dashed border-b-2">
    {{ props.field }}
    <div
      v-if="checked == 1 && props.value == null"
      class="ml-auto text-right text-wrap"
    >
      <span class="text-danger">არ შეივსო</span>
    </div>

    <div v-else-if="checked == 0" class="ml-auto text-right text-wrap">
      <span>არა</span>
    </div>

    <div
      v-else
      class="ml-auto text-right text-wrap"
      :class="
      _.includes(String(formattedValue), 'არ შეივსო') ? 'text-danger' : 'text-dark'
      "
    >
      {{ formattedValue }}
    </div>
  </div>
</template>
