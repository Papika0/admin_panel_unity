<script setup lang="ts">
import { useInfoBoxStore } from "@/stores/dashboard/infoBoxStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import Lucide from "@/components/Base/Lucide";

const infoBoxStore = useInfoBoxStore();
const { fetchInfoBox } = infoBoxStore;
const { infoItems } = storeToRefs(infoBoxStore);

const storedDistrCode = localStorage.getItem("auth_distr_code") || "";
const distr_code = ref<string>(storedDistrCode);

onMounted(async () => {
  await fetchInfoBox(distr_code.value);
});
</script>
<template>
  <div class="col-span-12 mt-8">
    <div class="grid grid-cols-12 gap-6">
      <div
        class="col-span-12 sm:col-span-6 xl:col-span-6 flex sm:justify-start justify-center"
      >
        <h2 class="mr-5 text-lg font-medium truncate">ძირითადი ინფორმაცია</h2>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        v-for="(item, index) in infoItems"
        :key="index"
        class="col-span-12 sm:col-span-6 xl:col-span-4"
      >
        <div
          :class="[
            'relative zoom-in',
            'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
          ]"
        >
          <div class="p-5 box">
            <div class="flex justify-between">
              <Lucide
                :icon="item.icon"
                :class="['w-[28px] h-[28px]', item.color]"
              />
              <p
                v-if="item.percentageDifference"
                class="text-xl font-medium leading-8 text-green-600"
              >
                {{ item.year }}: {{ item.value ?? "-" }} კაცი
              </p>
              <!-- <div class="ml-auto"></div> -->
            </div>
            <div
              class="mt-6 text-3xl font-medium leading-8 flex justify-between"
            >
              <p v-if="!item.percentageDifference">{{ item.value ?? "-" }}</p>

              <p v-if="item.percentageDifference">
                {{ item.percentageDifference ?? "-" }} %
              </p>
            </div>
            <div class="mt-1 text-base text-slate-500">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
