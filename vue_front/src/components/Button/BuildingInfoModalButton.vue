<script setup lang="ts">
import { ref, computed } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import { useBuildingStore } from "@/stores/buildingStore";
import { storeToRefs } from "pinia";

// Define props with default values
const props = defineProps<{
  distr_code: string;
}>();

// Set default value for distr_code
const distr_code = ref(props.distr_code ?? null);

const buildingStore = useBuildingStore();
const { buildingInformation } = buildingStore;
const { buildingInfo } = storeToRefs(buildingStore);
const buildingInfoModalPreview = ref(false);

const nameObject = ref<any>({
  workToBeDone: {
    name: "საწყისი შენობები",
  },
  currentHouses: {
    name: "მიმდინარე შენობები",
  },
  deleteBuilding: {
    name: "წაშლილი შენობები",
  },
  finishBuilding: {
    name: "დასრულებული შენობები",
  },
  nonResidential: {
    name: "არასაცხოვრებელი შენობები",
  },
  quantity: {
    name: "შენობების რაოდენობა (სულ)",
  },
  requestDeletion: {
    name: "წაშლის მოთხოვნა",
  },
  returnBackHouses: {
    name: "უკან დაბრუნებული",
  },
  work: {
    name: "შესრულებული სამუშაო",
  },
  confirmQuestionnaire: {
    name: "დადასტურებული კითხვარი",
  },
  countQuestionnaireDelete: {
    name: "წაშლილი კითხვარი",
  },
  currentQuestionnaire: {
    name: "მიმდინარე კითხვარი",
  },
  nonPrimaryResidence: {
    name: "არაძირითადი საცხოვრებელი",
  },
  populationDoesNotLive: {
    name: "არ ცხოვრობს მოსახლეობა",
  },
  repeatVisitQuestionnaire: {
    name: "განმეორებითი ვიზიტი",
  },
  requestDeletionQuestionnaire: {
    name: "მოთხოვნა წაშლაზე",
  },
  residentsLivePermanently: {
    name: "მუდმივად ცხოვრობს მოსახლეობა",
  },
  returnBackQuestionnaire: {
    name: "უკან დაბრუნებული კითხვარი",
  },
  totalQuestionnaire: {
    name: "კითხვარების რაოდენობა (სულ)",
  },
  // unidentified: {
  //   name: "დაუდგენელი",
  // },
  countHolder: {
    name: "შინამეურნეობის რაოდენობა",
  },
  population: {
    name: "მოსახლეობის რაოდენობა",
  },
});

const nameObjectKeys = Object.keys(nameObject);
const setBuildingInfoModalPreview = async (value: boolean) => {
  if(value){
    await buildingInformation(distr_code.value);
  }
  
  buildingInfoModalPreview.value = value;
};
</script>
<template>
  <div>
    <Button
      variant="secondary"
      class="px-2 py-1 mr-2"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setBuildingInfoModalPreview(true);
            }"
    >
      ინფორმაცია
    </Button>
    <Dialog
      size="xl"
      :open="buildingInfoModalPreview"
      @close="
        () => {
          setBuildingInfoModalPreview(false);
        }
      "
    >
      <Dialog.Panel class="p-2 text-center">
        <Dialog.Title>
          <h2 class="mr-auto text-base font-medium">ინფორმაცია</h2>
          <Button
            variant="outline-secondary"
            class="hidden sm:flex"
            @click="(event: MouseEvent) => {
              event.preventDefault();
              setBuildingInfoModalPreview(false);
            }"
          >
            <Lucide icon="X" class="w-3 h-3 text-slate-500" />
          </Button>
        </Dialog.Title>
        <div class="dialog-body">
          <div class="p-2">
            <h2 class="text-lg font-bold">ინფორმაცია შენობაზე</h2>
            <div class="grid grid-cols-12 gap-5 mt-5 intro-y">
              <div
                class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
                v-for="(item, index) in buildingInfo.building"
                :key="index"
              >
                <div class="text-base font-medium">
                   {{ nameObject[index].name }}
                </div>
                <div class="text-slate-500">{{ `${item} ${nameObject[index].name === 'შესრულებული სამუშაო'? '%': ''}` }}</div>
              </div>
            </div>
          </div>
          <div class="p-2">
            <h2 class="text-lg font-bold">ინფორმაცია კითხვარებზე</h2>
            <div class="grid grid-cols-12 gap-5 mt-5 intro-y">
              <div
                class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
                v-for="(item, index) in buildingInfo.questionnaire"
                :key="index"
              >
                <div class="text-base font-medium">
                  {{ nameObject[index].name }}
                </div>
                <div class="text-slate-500">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
<style scoped>
.dialog-body {
  max-height: 70vh; /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
