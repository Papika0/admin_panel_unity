<script setup lang="ts">
import { ref } from "vue";
import { Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { useBuildingStore } from "@/stores/buildingStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const props = defineProps<{
  house_point_id: number;
  status: number;
  total_questionnaires: number;
}>();

const buildingStore = useBuildingStore();
const { buttonActive } = storeToRefs(buildingStore);

const { confirmDeleteBuilding, buildingDeleteRefuse } = buildingStore;

const authStore = useAuthStore();
const { category_id } = storeToRefs(authStore);

const deleteModal = ref(false);
const setDeleteModal = (value: any) => {
  deleteModal.value = value;
};

const refuseModal = ref(false);
const setRefuseModal = (value: boolean) => {
  refuseModal.value = value;
};

const handleDeleteClick = (event: Event) => {
  event.preventDefault();
  setDeleteModal(true);
};

const handleDeleteRefuseClick = (event: Event) => {
  event.preventDefault();
  setRefuseModal(true);
};
</script>
<template>
  <div class="flex justify-between items-center">
    <Button
      variant="pending"
      @click="handleDeleteRefuseClick($event)"
      class="px-2 py-1 mr-3"
      :disabled="!buttonActive || category_id !== 2"
      v-if="status === 4"
    >
      {{ total_questionnaires > 0 ? "შენობის წაშლის უარყოფა" : "უარყოფა" }}
    </Button>
    <Button
      variant="danger"
      @click="handleDeleteClick($event)"
      class="px-2 py-1"
      :disabled="!buttonActive || status === 5 || category_id !== 2"
    >
      <Lucide icon="Trash2Icon" class="w-4 h-4 mr-2" />
      {{ total_questionnaires > 0 ? "შენობის წაშლა" : "წაშლა" }}
    </Button>

    <Dialog
      :open="deleteModal"
      @close="
        () => {
          setDeleteModal(false);
        }
      "
    >
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide
            icon="Trash2Icon"
            class="w-16 h-16 mx-auto mt-3 text-danger"
          />
          <div class="mt-5 text-danger text-xl" v-if="total_questionnaires > 0">
            აღნიშნულ შენობაზე ფიქსირდება კითხვარები.
          </div>
          <div class="mt-2 text-xl">ნამდვილად გსურთ შენობის წაშლა?</div>
        </div>
        <div class="px-5 pb-8 text-center">
          <Button
            variant="outline-secondary"
            type="button"
            @click="
              () => {
                setDeleteModal(false);
              }
            "
            class="w-24 mr-5"
          >
            არა
          </Button>
          <Button
            variant="success"
            type="button"
            class="w-24"
            ref="deleteButtonRef"
            @click="
              async () => {
                await confirmDeleteBuilding(
                  house_point_id,
                  total_questionnaires
                );
                setDeleteModal(false);
              }
            "
          >
            დიახ
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
    <Dialog
      :open="refuseModal"
      @close="
        () => {
          setRefuseModal(false);
        }
      "
    >
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide
            icon="XCircleIcon"
            class="w-16 h-16 mx-auto mt-3 text-danger"
          />
          <div class="mt-5 text-xl">
            ნამდვილად გსურთ შენობის წაშლის უარყოფა?
          </div>
          <!-- <div class="mt-2 text-slate-500">
            Do you really want to delete these records? <br />
            This process cannot be undone.
          </div> -->
        </div>
        <div class="px-5 pb-8 text-center">
          <Button
            variant="outline-secondary"
            type="button"
            @click="
              () => {
                setRefuseModal(false);
              }
            "
            class="w-24 mr-5"
          >
            არა
          </Button>
          <Button
            variant="success"
            type="button"
            class="w-24"
            ref="deleteButtonRef"
            @click="
              async () => {
                await buildingDeleteRefuse(
                  house_point_id,
                  total_questionnaires
                );
                setRefuseModal(false);
              }
            "
          >
            დიახ
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
