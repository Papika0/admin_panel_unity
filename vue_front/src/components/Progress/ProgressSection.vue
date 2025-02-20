<script setup lang="ts">
import { defineProps } from 'vue';
import Progress from "@/components/Base/Progress";

// Define the props
const props = withDefaults(
  defineProps<{
    percent?: number;
    title?: string;
    lgClass?: boolean;
  }>(),
  {
    percent: 0,
    title: 'პროგრესი',
    lgClass: false
  }
);

</script>

<template>
  <div class="w-full mb-4 mr-auto " :class=" lgClass ? 'lg:w-1/2 lg:mb-0':''">
    <div class="flex text-xs text-slate-500">
      <div class="mr-auto">{{ title }}</div>
      <div>{{ percent }} %</div>
    </div>
    <Progress class="h-1 mt-2">
      <Progress.Bar
        class="bg-primary"
        role="progressbar"
        :aria-valuenow="percent"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :style="{ width: percent + '%' }"
      ></Progress.Bar>
    </Progress>
  </div>
</template>
