<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
import { MapModalButton } from "@/components/Button";

const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
</script>

<template>
  <div>
    <h2 class="mt-10 text-lg font-medium intro-y">Product List</h2>
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
      <!-- BEGIN: Data List -->
      <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
        <Table class="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead>
            <Table.Tr>
              <Table.Th class="border-b-0 whitespace-nowrap"> კოდი </Table.Th>
              <Table.Th class="text-center border-b-0 whitespace-nowrap">
                ტიპი
              </Table.Th>

              <Table.Th class="text-center border-b-0 whitespace-nowrap">
                სტატუსი
              </Table.Th>
              <Table.Th class="text-center border-b-0 whitespace-nowrap">
                ACTIONS
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr
              v-for="(faker, fakerKey) in _.take(fakerData, 9)"
              :key="fakerKey"
              class="intro-x"
            >
              <Table.Td
                class="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
              >
                <a href="" class="font-medium whitespace-nowrap">
                  {{ faker.products[0].name }}
                </a>
                <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                  {{ faker.products[0].category }}
                </div>
              </Table.Td>

              <Table.Td
                class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
              >
                ${{ faker.totals[0] }}
              </Table.Td>
              <Table.Td
                class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
              >
                <div
                  :class="[
                    'flex items-center justify-center',
                    { 'text-success': faker.trueFalse[0] },
                    { 'text-danger': !faker.trueFalse[0] },
                  ]"
                >
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                  {{ faker.trueFalse[0] ? "Active" : "Inactive" }}
                </div>
              </Table.Td>
              <Table.Td
                :class="[
                  'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                  'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
                ]"
              >
                <div class="flex items-center justify-center">
                  <MapModalButton />
                  <router-link :to="{ name: 'questionnaire-list' }">
                    <Button variant="outline-secondary" class="px-2 py-1">
                      კითხვარები
                    </Button>
                  </router-link>
                </div>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <!-- END: Data List -->
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
  </div>
</template>
