<script setup lang="ts">
import Button from "@/components/Base/Button";
import {
  questionnaireConfirm,
  questionnaireRefuse,
  questionnaireDelete,
} from "@/http/questionnaire";
import { toastify } from "@/utils/toast";
import { useRouter } from "vue-router";
import { defineProps, ref } from "vue";
import _ from "lodash";
import { Dialog } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import { FormTextarea } from "@/components/Base/Form";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useQuestionnaireListStore } from "@/stores/questionnaireListStore";

const props = defineProps<{
  house_id: string;
  questionnaire_status: number | null;
  send_from: number | null;
}>();
console.log("props", props);

const authStore = useAuthStore();
const { category_id } = storeToRefs(authStore);

const router = useRouter();
const buttonActive = ref(true);
const comment = ref("");
const commentValidate = ref(true);
const questionnaireListStore = useQuestionnaireListStore();
const { changeStatus } = questionnaireListStore;

const confirm = async () => {
  buttonActive.value = false;
  try {
    const response = await questionnaireConfirm(Number(props.house_id));
    if (response.status === 200) {
      toastify.success("კითხვარი დადასტურდა!");
      changeStatus(Number(props.house_id), 4);
      setTimeout(() => {
        buttonActive.value = true;
        router.push({ name: "questionnaire-list" });
      }, 1500);
    }
  } catch (error) {
    console.error("Error confirming questionnaire:", error);
    toastify.error("დაფიქსირდა შეცდომა.");
    buttonActive.value = true;
  }
};

const refuse = async () => {
  if (comment.value === "") {
    commentValidate.value = false;
    buttonActive.value = true;
    return;
  }
  buttonActive.value = false;
  try {
    const response = await questionnaireRefuse(
      Number(props.house_id),
      comment.value
    );
    if (response.status === 200) {
      setRefuseModal(false);
      changeStatus(Number(props.house_id), 2);
      toastify.success("კითხვარი უარყოფილია!");
      setTimeout(() => {
        buttonActive.value = true;
        router.push({ name: "questionnaire-list" });
      }, 1500);
    }
  } catch (error) {
    console.error("Error refusing questionnaire:", error);
    toastify.error("დაფიქსირდა შეცდომა.");
    buttonActive.value = true;
  }
};

const confirmDelete = async () => {
  buttonActive.value = false;
  try {
    const response = await questionnaireDelete(Number(props.house_id));
    if (response.status === 200) {
      toastify.success("კითხვარი წაიშალა!");
      setTimeout(() => {
        buttonActive.value = true;
        router.push({ name: "questionnaire-list" });
      }, 1500);
    }
  } catch (error) {
    console.error("Error confirming questionnaire:", error);
    toastify.error("დაფიქსირდა შეცდომა.");
    buttonActive.value = true;
  }
};
const confirmationModal = ref(false);
// const deleteButtonRef = ref(null);
const setConfirmationModal = (value: boolean) => {
  confirmationModal.value = value;
};

const refuseModal = ref(false);
const deleteButtonRef = ref(null);
const setRefuseModal = (value: boolean) => {
  refuseModal.value = value;
};

const deleteModal = ref(false);
const setDeleteModal = (value: any) => {
  deleteModal.value = value;
};
</script>
<template>
  <div>
    <div>
      <Button
        variant="soft-danger"
        elevated
        class="w-24 mb-2 mr-5"
        @click="
          (event: Event)=> {
            event.preventDefault();
            setRefuseModal(true);
          }
        "
        :disabled="
          _.includes([0, 2, 3, 7], questionnaire_status) || category_id !== 2 || send_from === 0
        "
      >
        უარყოფა
      </Button>
      <Button
        variant="danger"
        elevated
        class="w-30 mb-2 ml-5"
        @click="
          (event: Event)=> {
            event.preventDefault();
            setDeleteModal(true);
          }
        "
        :disabled="
          _.includes([0, 6], questionnaire_status) ||
          !buttonActive ||
          category_id !== 2
        "
        v-if="questionnaire_status == 5"
      >
        წაშლა
      </Button>
      <Button
        variant="success"
        elevated
        class="w-30 mb-2 ml-5"
        @click="
          (event: Event)=> {
            event.preventDefault();
            setConfirmationModal(true);
          }
        "
        :disabled="
          _.includes([0, 2, 3, 4, 6, 7], questionnaire_status) ||
          !buttonActive ||
          category_id != 2
        "
        v-else
      >
        დადასტურება
      </Button>
    </div>

    <Dialog
      :open="confirmationModal"
      @close="
        () => {
          setConfirmationModal(false);
        }
      "
      :initialFocus="deleteButtonRef"
    >
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide
            icon="CheckCircleIcon"
            class="w-16 h-16 mx-auto mt-3 text-success"
          />
          <div class="mt-5 text-xl">ნამდვილად გსურთ კითხვარის დადასტურება?</div>
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
                setConfirmationModal(false);
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
                await confirm();
                setConfirmationModal(false);
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
      :initialFocus="deleteButtonRef"
    >
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
          <div class="mt-5 text-xl">
            {{
              `ნამდვილად გსურთ კითხვარის ${
                questionnaire_status == 5 ? "წაშლის" : ""
              } უარყოფა?`
            }}
          </div>
          <div class="mt-2 text-slate-500">
            <FormTextarea
              id="validation-form-6"
              v-model="comment"
              name="comment"
              :class="{ 'border-danger': !commentValidate }"
              placeholder="ჩაწერეთ უარყოფის მიზეზი..."
            ></FormTextarea>
            <span class="text-danger" v-if="!commentValidate"
              >კომენტარის შევსება სავალდებულოა</span
            >
          </div>
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
                await refuse();
              }
            "
          >
            დიახ
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
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
            icon="CheckCircleIcon"
            class="w-16 h-16 mx-auto mt-3 text-danger"
          />
          <div class="mt-5 text-xl">ნამდვილად გსურთ კითხვარის წაშლა?</div>
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
                await confirmDelete();
                setDeleteModal(false);
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
