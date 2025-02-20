<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import { useAdminInformationStore } from "@/stores/dashboard/adminInformationStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, onBeforeUnmount, watch } from "vue";
import { Menu, Popover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import _ from "lodash";

const adminInformationStore = useAdminInformationStore();

const { fetchInfoBox, closeFilter, filterInfo } = adminInformationStore;
const { infoBox, region, municipal, staticCla, infoItems } = storeToRefs(
  adminInformationStore
);
const selectedRegion = ref<string[]>([]);
const selectedMunicipal = ref<string[]>([]);
const screenWidth = ref(window.innerWidth);

const isSmallScreen = computed(() => screenWidth.value < 640);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

watch(selectedRegion, (newVal, oldVal) => {
  if (newVal.length) {
    municipal.value = _.filter(staticCla.value, (item) => {
      return (
        item.level === 3 &&
        newVal.some((code) => item.location_code.startsWith(code))
      );
    });
    selectedMunicipal.value = _.map(municipal.value, "location_code");
  } else {
    municipal.value = [];
  }
});

// Computed property to check if all municipal items are selected
const isAllSelected = computed(() => {
  return (
    selectedMunicipal.value.length === municipal.value.length &&
    municipal.value.length > 0
  );
});

// Method to toggle select all / deselect all functionality
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    // Deselect all
    selectedMunicipal.value = [];
  } else {
    // Select all
    selectedMunicipal.value = _.map(municipal.value, "location_code");
  }
};

onMounted(async () => {
  await fetchInfoBox();
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
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
      <div class="col-span-12 sm:col-span-6 xl:col-span-6 sm:text-end">
        <div class="grid grid-cols-12 gap-4">
          <div
            class="col-span-12 sm:col-span-12 xl:col-span-4 flex justify-center"
          >
            <Popover class="inline-block z-50" v-slot="{ close }">
              <Popover.Button :as="Button" variant="primary">
                <Lucide icon="MapPinIcon" class="w-4 h-4 ml-2 me-2" />
                რეგიონი
                <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
              </Popover.Button>
              <Popover.Panel
                :placement="isSmallScreen ? 'bottom-start' : 'bottom-end'"
                :class="['overflow-y-auto max-h-80']"
              >
                <div class="p-2">
                  <div class="content">
                    <div
                      class="text-s text-left mb-2 w-60"
                      v-for="(item, index) in region"
                      :key="index"
                    >
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="selectedRegion"
                          :value="item.location_code"
                          class="mr-2"
                        />
                        {{ item.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          <div
            class="col-span-12 sm:col-span-12 xl:col-span-4 flex justify-center"
          >
            <Popover class="inline-block z-40" v-slot="{ close }">
              <Popover.Button :as="Button" variant="primary">
                <Lucide icon="MapPinIcon" class="w-4 h-4 ml-2 me-2" />
                მუნიციპალიტეტი
                <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
              </Popover.Button>
              <Popover.Panel
                :placement="isSmallScreen ? 'bottom-start' : 'bottom-end'"
                :class="['overflow-y-auto max-h-80']"
              >
                <div class="p-2" v-if="selectedRegion.length">
                  <div class="content">
                    <div class="text-s text-left mb-2 w-60">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isAllSelected"
                          @change="toggleSelectAll"
                          class="mr-2"
                        />
                        ყველას მონიშვნა/განიშვნა
                      </label>
                    </div>
                    <div
                      class="text-s text-left mb-2 w-60"
                      v-for="(item, index) in municipal"
                      :key="index"
                    >
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="selectedMunicipal"
                          :value="item.location_code"
                          class="mr-2"
                        />
                        {{ item.name }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="p-5" v-else>
                  <p class="text-danger">აირჩიე რეგიონი!!!</p>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          <div
            class="col-span-12 sm:col-span-12 xl:col-span-4 flex items-center justify-center"
          >
            <Button
              variant="danger"
              @click="
                () => {
                  closeFilter();
                  selectedRegion = [];
                  selectedMunicipal = [];
                  //   close();
                }
              "
              class="w-20"
            >
              X
            </Button>
            <Button
              variant="success"
              class="w-20 ml-2"
              @click="filterInfo(selectedMunicipal)"
            >
              <Lucide icon="FilterIcon" class="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
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
<style scoped>
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
