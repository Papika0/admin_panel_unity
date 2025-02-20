<script setup lang="ts">
import { ref, computed, Ref, watch } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog, Popover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import { useMainMapStore } from "@/stores/map/mainMapStore";
import { ModalMap } from "@/components/LeafletMap";
import { buildingStatus } from "@/utils/localCla";
import _ from "lodash";

// import Loading from 'vue-loading-overlay';
import { storeToRefs } from "pinia";

const showBuildingStatus = computed(() => {
  return _.filter(buildingStatus, (item) => item.show);
});

const selectedItems: Ref<number[]> = ref([]);

// Define props with default values
const props = withDefaults(
  defineProps<{
    distr_code: string | null;
    showSearch?: boolean;
    housePoint?: any | null | undefined;
    disabled?: boolean;
    controlCoordinate?: any | null;
    searchLength?: number;
    showFilter?: boolean;
    getQuestionnaireAvgCoordinate?: boolean;
  }>(),
  {
    distr_code: null,
    showSearch: true,
    showFilter: false,
    disabled: false,
    housePoint: null,
    controlCoordinate: null,
    searchLength: 4,
    getQuestionnaireAvgCoordinate: false,
  }
);

const mainMapStore = useMainMapStore();
const { closeFilter, filterSettlement, filterPoints } = mainMapStore;
const { settlement, isLoading } = storeToRefs(mainMapStore);

// Set default value for distr_code
const distr_code = ref(props.distr_code ?? null);
const selectedSettlement: Ref<number[]> = ref([]);

const mapModalPreview = ref(false);
const setMapModalPreview = (value: boolean) => {
  mapModalPreview.value = value;
};

const isDisabled = computed(() => selectedSettlement.value.length === 10);

const placement = computed<
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom"
  | "left-start"
  | "left"
  | "left-end"
>(() => {
  return "bottom-start";
});

watch(selectedSettlement, (newVal) => {
  if (newVal.length > 10) {
    selectedSettlement.value = newVal.slice(0, 1);
  }
});
</script>
<template>
  <div class="">
    <!-- <loading v-model:active="isLoading"
                 :can-cancel="false"
                 loader="dots"
                 :is-full-page="true"/> -->
    <Button
      variant="primary"
      class="px-2 py-1 mr-2"
      :disabled="disabled"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setMapModalPreview(true);
            }"
    >
      რუკა
    </Button>

    <Dialog
      size="xl"
      :open="mapModalPreview"
      @close="
        () => {
          setMapModalPreview(false);
          closeFilter();
        }
      "
    >
      <Dialog.Panel class="p-2 text-center">
        <Dialog.Title class="z-10">
          <h2 class="mr-auto text-base font-medium">რუკა</h2>
          <div
            class="flex w-full mt-4 sm:w-auto sm:mt-0 mr-3"
            v-if="props.showFilter"
          >
            <Popover class="inline-block z-50 mr-2" v-slot="{ close }">
              <Popover.Button :as="Button" variant="primary">
                <Lucide icon="FilterIcon" class="w-4 h-4 ml-2" />
                <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
              </Popover.Button>
              <Popover.Panel placement="bottom-end" class="">
                <div class="p-2">
                  <div>
                    <div
                      class="text-s text-left mb-2 flex justify-between"
                      v-for="(item, index) in showBuildingStatus"
                      :key="index"
                    >
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="selectedItems"
                          :value="item.id"
                          class="mr-2"
                        />
                        {{ item.name }}
                      </label>
                      <Lucide
                        :icon="item.icon"
                        :class="['w-4 h-4 ml-2', item.iconColor]"
                      />
                    </div>
                  </div>
                  <div class="flex items-center mt-3">
                    <Button
                      variant="danger"
                      @click="
                        () => {
                          closeFilter();
                          close();
                        }
                      "
                      class="w-20 ml-auto"
                    >
                      X
                    </Button>
                    <Button
                      variant="success"
                      class="w-20 ml-2"
                      @click="
                        () => {
                          filterPoints(selectedItems);
                          close();
                        }
                      "
                    >
                      <Lucide icon="FilterIcon" class="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
            <Popover class="inline-block z-50" v-slot="{ close }">
              <Popover.Button :as="Button" variant="primary">
                <Lucide icon="MapPinIcon" class="w-4 h-4 ml-2" />
                <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
              </Popover.Button>
              <Popover.Panel
                :placement="placement"
                class="max-h-80 overflow-y-auto"
              >
                <div class="p-2">
                  <div class="content">
                    <div
                      class="text-s text-left mb-2"
                      v-for="(item, index) in settlement"
                      :key="index"
                    >
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="selectedSettlement"
                          :value="item.id"
                          class="mr-2"
                          :class="{
                            disabled:
                              isDisabled &&
                              !selectedSettlement.includes(item.id),
                          }"
                          :disabled="
                            isDisabled && !selectedSettlement.includes(item.id)
                          "
                        />
                        {{ item.name }}
                      </label>
                    </div>
                  </div>
                  <div class="footer flex items-center mt-3">
                    <Button
                      variant="danger"
                      @click="
                        () => {
                          closeFilter();
                          close();
                        }
                      "
                      class="w-20 ml-auto"
                    >
                      X
                    </Button>
                    <Button
                      variant="success"
                      class="w-20 ml-2"
                      @click="
                        () => {
                          filterSettlement(selectedSettlement);
                          close();
                        }
                      "
                    >
                      <Lucide icon="FilterIcon" class="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>

          <Button
            variant="outline-danger"
            class="hidden sm:flex"
            @click="(event: MouseEvent) => {
              event.preventDefault();
              setMapModalPreview(false);
            }"
          >
            <Lucide icon="X" class="w-3 h-3 text-slate-500" />
          </Button>
        </Dialog.Title>
        <div class="z-10 relative">
          <ModalMap
            class="h-[700px] rounded-md bg-slate-200"
            :distr_code="distr_code"
            :showSearch="showSearch"
            :point="housePoint"
            :controlCoordinate="controlCoordinate"
            :searchLength="searchLength"
            :getQuestionnaireAvgCoordinate="getQuestionnaireAvgCoordinate"
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
<style scoped>
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.footer {
  position: sticky;
  bottom: 0;
  background-color: white; /* Adjust as needed */
  padding: 1rem; /* Adjust as needed */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better visibility */
}
</style>
