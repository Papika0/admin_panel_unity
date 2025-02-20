<script setup lang="ts">
import _ from "lodash";
import { ref, onBeforeUnmount, computed, watch } from "vue";
import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import { findUser, deleteCompletionCode } from "@/http/callcenter";
import { toastify } from "@/utils/toast";
import Loading from "vue-loading-overlay";
import { useRouter } from "vue-router";
import { Dialog } from "@/components/Base/Headless";
interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  number: string;
  verify_code: number;
  email: string;
  address_id: number;
  completion_code?: number | null;
  house_id?: number | null;
  user_percentage: number;
  created_at: string;
  verify: boolean;
}

const router = useRouter();

const search = ref<string>("");

const user = ref<any>(null);
const startSearch = ref(false);
const isLoading = ref(false);
const deleteCodeModal = ref(false);

const getUser = async (number: string) => {
  isLoading.value = true;
  try {
    console.log("number", number);

    const response = await findUser(number);
    console.log(response);

    user.value = response.data.data;
    // has_right.value = user.value.sync_permission ? false : true;
  } catch (error) {
    toastify.error("მონაცემების წამოღების შეცდომა");
  } finally {
    isLoading.value = false;
  }
};

const getStatus = (user: User) => {
  if(!user.verify) {
    return "არავერიფიცირებული";
  }
  return user.completion_code ? "დასრულებული" : "დაუსრულებული";
};

const navigateToQuestionnaire = (user: User) => {
  localStorage.setItem("house_id", String(user.house_id));
  localStorage.setItem("address_id", String(user.address_id));
  window.open(router.resolve({ name: "questionnaire" }).href, "_blank");
};

const setDeleteCodeModal = (value: boolean) => {
  deleteCodeModal.value = value;
};

const deleteCode = async () => {
  try {
    const response = await deleteCompletionCode(user.value.id);
    if (response.status === 200) {
      toastify.success("კოდი წაშლილია");
      user.value.completion_code = null;
      // user.value = null;
      // startSearch.value = false;
      // deleteCodeModal.value = false;
    }
  } catch (error) {
    toastify.error("კოდის წაშლის შეცდომა");
  }
};

watch(search, async (value) => {
  if (value?.length == 1 && !_.startsWith(value, "5")) {
    toastify.error("გთხოვთ აკრიფეთ სწორი კოდი");
    return;
  } else if (value?.length == 9) {
    if (!_.startsWith(value, "5")) {
      toastify.error("გთხოვთ აკრიფეთ სწორი კოდი");
      return;
    }
    console.log("value", value);

    await getUser(value);
    startSearch.value = true;
  } else {
    startSearch.value = false;
    user.value = null;
  }
});

onBeforeUnmount(() => {
  user.value = null;
});
</script>

<template>
  <div class="mt-10 intro-y flex justify-between items-center">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      loader="dots"
      :is-full-page="true"
    />
    <!-- <div> -->
    <div class="intro-y flex justify-center gap-3">
      <h2 class="text-lg font-medium my-auto">მომხმარებლის მოძებნა</h2>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            v-model:model-value="search"
            onkeypress="return /[0-9]/i.test(event.key)"
            length="9"
            placeholder="მოძებნე ნომრით..."
          />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-5 mt-5" v-if="user && startSearch">
    <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="border-b-0 whitespace-nowrap font-black">
              სახელი გვარი
            </Table.Th>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              email
            </Table.Th>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              რეგისტრაციის თარიღი
            </Table.Th>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              სტატუსი
            </Table.Th>
            <Table.Th
              v-if="!user.completion_code"
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              პროცენტი
            </Table.Th>
            <Table.Th
              v-else
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              კოდი
            </Table.Th>
            <Table.Th
              class="text-center border-b-0 whitespace-nowrap font-black"
            >
              მოქმედება
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr class="intro-x">
            <Table.Td
              class="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              <p class="whitespace-nowrap font-black">
                {{ user.full_name }}
              </p>
            </Table.Td>
            <Table.Td
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              {{ user.email ?? "-" }}
            </Table.Td>
            <Table.Td
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              {{ user.created_at ?? "-" }}
            </Table.Td>
            <Table.Td
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              <span
                :class="[
                  'p-2 mr-1 text-xs rounded-full font-bold',
                  user.completion_code ? 'bg-success' : 'bg-danger',
                  user.completion_code == 1 ? 'text-dark' : 'text-white',
                ]"
              >
                {{ getStatus(user) }}
              </span>
            </Table.Td>
            <Table.Td
              v-if="!user.completion_code"
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              {{ user.user_percentage }} %
            </Table.Td>
            <Table.Td
              v-else
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              {{ user.completion_code }}
            </Table.Td>
            <Table.Td
              class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black"
            >
              <Button
                variant="secondary"
                class="ml-2 shadow-md"
                @click="navigateToQuestionnaire(user)"
                :disabled="!user.verify || user.user_percentage === 0"
              >
                ნახვა
              </Button>
              <Button
                v-if="user.completion_code"
                variant="danger"
                class="ml-2 shadow-md"
                @click="setDeleteCodeModal(true)"
              >
                კოდის წაშლა
              </Button>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  </div>
  <div v-if="user === null && startSearch" class="mt-5 text-center">
    <p>აღმწერი ვერ მოიძებნა</p>
  </div>
  <Dialog
    :open="deleteCodeModal"
    @close="
      () => {
        setDeleteCodeModal(false);
      }
    "
  >
    <Dialog.Panel>
      <div class="p-5 text-center">
        <p class="mt-5 text-2xl">
          ნამდვილად გსურთ დასრულების კოდის წაშლა?
        </p>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button
          variant="outline-secondary"
          type="button"
          @click="
            () => {
              setDeleteCodeModal(false);
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
              await deleteCode();
            }
          "
        >
          დიახ
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
</template>
