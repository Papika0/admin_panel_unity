<script setup lang="ts">
import { ref, computed } from "vue";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { FormInput } from "@/components/Base/Form";
import { Menu, Popover } from "@/components/Base/Headless";
import fakerData from "@/utils/faker";
import _ from "lodash";
import { TransitionRoot } from "@headlessui/vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const props = defineProps<{
  layout?: "side-menu" | "simple-menu" | "top-menu";
}>();

const { logoutUser } = useAuthStore();
const { user } = storeToRefs(useAuthStore());
// const userFullName = computed(() => `${user.value!.first_name} ${user.value!.last_name}`);
// const userName = computed(() => user.value!.user_name);
</script>

<template>
  <div :class="[
    'h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700',
    props.layout == 'top-menu' && 'dark:md:from-darkmode-800',
    'before:content-[\'\'] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30',
    'after:content-[\'\'] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600',
  ]">
    <div class="flex items-center h-full">
      <!-- BEGIN: Logo -->
      <RouterLink :to="{ name: 'dashboard-overview-1' }" :class="[
        '-intro-x hidden mr-auto -intro-x md:flex',
        props.layout == 'side-menu' && 'xl:w-[180px]',
        props.layout == 'simple-menu' && 'xl:w-auto',
        props.layout == 'top-menu' && 'w-auto',
      ]">
        <img alt="Enigma Tailwind HTML Admin Template" class="w-6" :src="logoUrl" />
        <span :class="[
          'ml-3 text-lg text-white ',
          props.layout == 'side-menu' && 'hidden xl:block',
          props.layout == 'simple-menu' && 'hidden',
        ]">
          ზედამხედველი
        </span>
      </RouterLink>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <!-- <div :class="[
          ' mr-auto -intro-x',
          props.layout != 'top-menu' && 'md:pl-6',
          props.layout == 'top-menu' && 'md:pl-10',
        ]"></div> -->
      <!-- <Breadcrumb
        light
        :class="[
          'h-[45px] md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x',
          props.layout != 'top-menu' && 'md:pl-6',
          props.layout == 'top-menu' && 'md:pl-10',
        ]"
      >
        <Breadcrumb.Link to="/">Application</Breadcrumb.Link>
        <Breadcrumb.Link to="/" :active="true"> Dashboard </Breadcrumb.Link>
      </Breadcrumb> -->
      <!-- END: Breadcrumb -->

      <!-- BEGIN: Account Menu -->
      <Menu>
        <Menu.Button class="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
          <img alt="Midone Tailwind HTML Admin Template" :src="fakerData[9].photos[0]" />
        </Menu.Button>
        <Menu.Items
          class="w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
          <Menu.Header class="font-normal">
            <!-- <div class="font-medium">{{ userFullName }}</div> -->
            <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              <!-- {{ userName }} -->
            </div>
          </Menu.Header>
          <Menu.Divider class="bg-white/[0.08]" />
          <Menu.Item class="hover:bg-white/5" @click="logoutUser">
            <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> გასვლა
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <!-- END: Account Menu -->
    </div>
  </div>
</template>
