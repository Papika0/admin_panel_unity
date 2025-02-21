<script setup lang="ts">
import _ from "lodash";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Progress from "@/components/Base/Progress";
import Lucide from "@/components/Base/Lucide";
import { MapModalButton } from "@/components/Button";
import { useSupervisorStaffStore } from "@/stores/supervisor/staff";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const supervisorStaffStore = useSupervisorStaffStore();
const { staff } = storeToRefs(supervisorStaffStore);
const { fetchStaff } = supervisorStaffStore;

onMounted(async () => {
  await fetchStaff();
});
</script>

<template>
  <div>
    <h2 class="mt-10 text-lg font-medium intro-y">აღმწერები</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap"
      >
        <div class="hidden mx-auto md:block text-slate-500"></div>
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
        v-for="(item, index) in staff"
        :key="index"
        class="col-span-12 intro-y"
      >
        <div class="box">
          <div class="flex flex-col items-center p-3 lg:flex-row">
            <!-- <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="faker.photos[0]"
              />
            </div> -->
            <div
              class="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0"
            >
              <span class="font-medium">
                {{ `${item.first_name} ${item.last_name}` }}
              </span>
              <div class="text-slate-500 text-xs mt-0.5">
                {{ item.user_name }}
              </div>
            </div>
            <div class="w-full mb-4 mr-auto lg:w-1/2 lg:mb-0">
              <div class="flex text-xs text-slate-500">
                <div class="mr-auto">Progress</div>
                <div>20%</div>
              </div>
              <Progress class="h-1 mt-2">
                <Progress.Bar
                  class="w-1/4 bg-primary"
                  role="progressbar"
                  :aria-valuenow="0"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                ></Progress.Bar>
              </Progress>
            </div>
            <div class="flex mt-4 lg:mt-0">
              <MapModalButton />
              <router-link :to="{ name: 'building-list' }">
                <Button variant="outline-secondary" class="px-2 py-1">
                  შენობები
                </Button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Users Layout -->
      <!-- BEGIN: Pagination -->
      <!-- <div
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
      </div> -->
      <!-- END: Pagination -->
    </div>
  </div>
</template>
