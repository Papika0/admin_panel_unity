<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Menu, Popover } from "@/components/Base/Headless";
import _ from "lodash";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
const props = defineProps<{
  layout?: "side-menu" | "simple-menu" | "top-menu";
}>();
interface RouteMeta {
  breadcrumb?: string[];
}

interface RouteRecord {
  path: string;
  meta: RouteMeta;
}

interface BreadcrumbItem {
  label: string;
  to: {
    path: string;
  };
}

const route = useRoute();
const authStore = useAuthStore();
const { logoutUser, deleteCache } = authStore;
const { user, category_id } = storeToRefs(authStore);

const userFullName = computed(() =>
  user.value && (user.value.first_name || user.value.last_name)
    ? `${user.value?.first_name} ${user.value?.last_name}`
    : "ვაკანტური"
);

const userName = computed(() => user.value?.distr_code);

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return _.flatMap(route.matched as RouteRecord[], (record: RouteRecord) => {
    if (!record.meta.breadcrumb) {
      return [];
    }
    record.meta.breadcrumb.forEach((item: any) => {
      if (item.path === 'users-layout' && category_id.value && category_id.value > 2) {
        item.label = 'ზედამხედველები';
      }
    });
    
    return record.meta.breadcrumb.map((item: any, index: number) => ({
      label: item.label,
      to: {
        path: item.path,
      },
    }));
  });
});

const cacheClearModal = ref(false);
const setCacheClearModal = (value: boolean, id: number = 0) => {
//   if (value) {
//     getUsers(search.value);
//   }
  cacheClearModal.value = value;
};
</script>

<template>
  <div
    :class="[
      'h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700',
      props.layout == 'top-menu' && 'dark:md:from-darkmode-800',
      'before:content-[\'\'] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30',
      'after:content-[\'\'] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600',
    ]"
  >
    <div class="flex items-center h-full">
      <!-- BEGIN: Logo -->
      <RouterLink
        :to="{ name: 'dashboard-overview-1' }"
        :class="[
          '-intro-x hidden mr-auto -intro-x md:flex',
          props.layout == 'side-menu' && 'xl:w-[180px]',
          props.layout == 'simple-menu' && 'xl:w-auto',
          props.layout == 'top-menu' && 'w-auto',
        ]"
        v-if="user"
      >
        <img
          alt="Enigma Tailwind HTML Admin Template"
          class="w-6"
          :src="logoUrl"
        />
        <span :class="['ml-3 text-lg text-white']">
          {{ user.category_name }}
        </span>
      </RouterLink>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <!-- <div :class="[
          ' mr-auto -intro-x',
          props.layout != 'top-menu' && 'md:pl-6',
          props.layout == 'top-menu' && 'md:pl-10',
        ]"></div> -->
      <Breadcrumb
        light
        :class="[
          'h-[45px] md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x',
          props.layout != 'top-menu' && 'md:pl-6',
          props.layout == 'top-menu' && 'md:pl-10',
        ]"
      >
        <Breadcrumb.Link
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :to="breadcrumb.to"
          :active="index === breadcrumbs.length - 1"
        >
          <div class="flex items-center">
            <span>{{ breadcrumb.label }}</span>
            <Lucide
              icon="ChevronRightIcon"
              class="w-4 h-4"
              v-if="index + 1 != breadcrumbs.length"
            />
          </div>
        </Breadcrumb.Link>
      </Breadcrumb>
      <!-- END: Breadcrumb -->

      <!-- BEGIN: Account Menu -->
      <Menu>
        <Menu.Button
          class="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x"
        >
          <!-- <img
            alt="Midone Tailwind HTML Admin Template"
            :src="fakerData[9].photos[0]"
          /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="26"
            viewBox="0 0 22 28"
            fill="none"
          >
            <path
              d="M18.2487 6.74345C18.2487 8.59663 17.5841 10.2007 16.2731 11.512C14.9621 12.823 13.3578 13.4875 11.5046 13.4875H11.5014C9.65058 13.4869 8.04734 12.8223 6.73633 11.512C5.42511 10.2007 4.76074 8.59663 4.76074 6.74345C4.76074 4.89091 5.42511 3.2866 6.73633 1.97559C8.0467 0.66501 9.64994 0.000640873 11.5014 0H11.5046C13.3572 0 14.9615 0.664582 16.2731 1.97559C17.5841 3.2866 18.2487 4.89091 18.2487 6.74345Z"
              fill="#F5A86C"
            />
            <path
              d="M23.3608 23.1846C23.3608 24.6466 22.8957 25.8303 21.9797 26.7021C21.0744 27.5637 19.877 28.0001 18.4212 28.0001H4.93897C3.48313 28.0001 2.28577 27.5637 1.38108 26.7021C0.464417 25.8297 0 24.6462 0 23.1846C0 22.6223 0.0185853 22.0661 0.0557557 21.5311C0.0935671 20.9843 0.170044 20.3891 0.282837 19.7613C0.396485 19.1283 0.542603 18.5299 0.717561 17.9831C0.899141 17.417 1.14481 16.8586 1.44879 16.3236C1.76453 15.7684 2.13538 15.2848 2.55109 14.8866C2.98688 14.4698 3.51966 14.1351 4.13554 13.8911C4.74928 13.6484 5.42967 13.5254 6.15769 13.5254C6.44331 13.5254 6.71995 13.6422 7.25316 13.9896C7.58684 14.2073 7.97136 14.4551 8.39583 14.7264C8.76241 14.9601 9.25887 15.1793 9.87261 15.3773C10.412 15.5518 10.9595 15.6492 11.5004 15.6661C11.56 15.6682 11.6196 15.6693 11.6792 15.6693C12.2799 15.6693 12.8875 15.5708 13.4865 15.3773C14.1002 15.1793 14.5973 14.9601 14.9637 14.7264C15.3926 14.4523 15.7772 14.2047 16.1059 13.9902C16.6396 13.6422 16.9158 13.5254 17.202 13.5254C17.9294 13.5254 18.6098 13.6484 19.224 13.8911C19.8398 14.1351 20.3726 14.4705 20.808 14.8866C21.2243 15.2848 21.5952 15.7684 21.9107 16.3236C22.2149 16.859 22.461 17.417 22.6419 17.9824C22.8171 18.5299 22.9637 19.1283 23.0773 19.7617C23.1895 20.3902 23.2662 20.9853 23.3038 21.5307C23.3416 22.0639 23.3601 22.6202 23.3608 23.1846Z"
              fill="#2682FF"
            />
          </svg>
        </Menu.Button>
        <Menu.Items
          class="w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
        >
          <Menu.Header class="font-normal">
            <div class="font-medium">{{ userFullName }}</div>
            <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              {{ userName }}
            </div>
          </Menu.Header>
          <Menu.Item class="hover:bg-white/5" @click="setCacheClearModal(true)">
            <Lucide icon="Trash2Icon" class="w-4 h-4 mr-2" /> ქეშის გასუფთავება
          </Menu.Item>
          <Menu.Divider class="bg-white/[0.08]" />
          <Menu.Item class="hover:bg-white/5" @click="logoutUser">
            <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> გასვლა
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <!-- END: Account Menu -->
    </div>
    <Dialog
    :open="cacheClearModal"
    @close="
      () => {
        setCacheClearModal(false);
      }
    "
  >
    <Dialog.Panel>
      <div class="p-5 text-center">
        <p class="mt-5 text-2xl">
          ნამდვილად გსურთ ქეშის გასუფთავება ?
        </p>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button
          variant="outline-secondary"
          type="button"
          @click="
            () => {
                setCacheClearModal(false);
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
              await deleteCache();
              setCacheClearModal(false);
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
