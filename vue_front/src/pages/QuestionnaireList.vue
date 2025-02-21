<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Dialog, Menu } from "@/components/Base/Headless";
import { MapModalButton } from "@/components/Button";


const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">კითხვარები</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap"
    >
      <div class="hidden mx-auto md:block text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            placeholder="Search..."
          />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
    </div>
    <!-- BEGIN: Users Layout -->
    <div
      v-for="(faker, fakerKey) in _.take(fakerData, 12)"
      :key="fakerKey"
      class="col-span-12 intro-y md:col-span-12 lg:col-span-6 xl:col-span-6"
    >
      <div class="box">
        <div class="p-4">
          <div class="mt-2 text-slate-600 dark:text-slate-500">
            <div class="flex items-center">
              <Lucide icon="Link" class="w-4 h-4 mr-2" /> შენობის ტიპი:
              {{ faker.totals[0] }}
            </div>
            <div class="flex items-center mt-2">
              <Lucide icon="Layers" class="w-4 h-4 mr-2" /> საცხოვრისის სტატუსი:
              {{ faker.stocks[0] }}
            </div>
            <div class="flex items-center mt-2">
              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> სტატუსი:
              {{ faker.trueFalse[0] ? "Active" : "Inactive" }}
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400"
        >
         
          <Button variant="success" class="flex items-center mr-auto px-2 py-1"> დრო </Button>
          <MapModalButton />
            <router-link :to="{ name: 'questionnaire' }">
                <Button variant="outline-secondary" class="px-2 py-1">
                დეტალურად
                </Button>
            </router-link>
          <!-- <a
            class="flex items-center text-danger"
            href="#"
            @click="
              (event) => {
                event.preventDefault();
                setDeleteConfirmationModal(true);
              }
            "
          >
            <Lucide icon="Trash2" class="w-4 h-4 mr-1" /> რუკა
          </a>
          <a class="flex items-center mr-3" href="#">
            <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" /> დეტალურად
          </a> -->
        </div>
      </div>
    </div>
    <!-- END: Users Layout -->
    <!-- BEGIN: Pagination -->
    <div
      class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap"
    >
      <Pagination class="w-full sm:w-auto sm:mr-auto">
        <Pagination.Link>
          <Lucide icon="ChevronsLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>1</Pagination.Link>
        <Pagination.Link active>2</Pagination.Link>
        <Pagination.Link>3</Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronRight" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronsRight" class="w-4 h-4" />
        </Pagination.Link>
      </Pagination>
      <FormSelect class="w-20 mt-3 !box sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </FormSelect>
    </div>
    <!-- END: Pagination -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Dialog
    :open="deleteConfirmationModal"
    @close="
      () => {
        setDeleteConfirmationModal(false);
      }
    "
    :initialFocus="deleteButtonRef"
  >
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
        <div class="mt-5 text-3xl">Are you sure?</div>
        <div class="mt-2 text-slate-500">
          Do you really want to delete these records? <br />
          This process cannot be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button
          variant="outline-secondary"
          type="button"
          @click="
            () => {
              setDeleteConfirmationModal(false);
            }
          "
          class="w-24 mr-1"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          type="button"
          class="w-24"
          ref="deleteButtonRef"
        >
          Delete
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Delete Confirmation Modal -->
</template>
