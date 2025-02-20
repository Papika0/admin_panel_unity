<script setup lang="ts">
import _ from "lodash";
import { computed } from "vue";

import { AdminInfoBox, UserInfoBox } from "@/components/InfoBox";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Loading from "vue-loading-overlay";
import { useAdminInformationStore } from "@/stores/dashboard/adminInformationStore";
import CallCenter from "@/components/CallCenter/CallCenter.vue";
import SelfRegistration from "./SelfRegistration.vue";

const adminInformationStore = useAdminInformationStore();
const { isLoading } = storeToRefs(adminInformationStore);

const authStore = useAuthStore();
const { user, category_id } = storeToRefs(authStore);
const distr_code = computed(() => (user.value ? user.value.distr_code : ""));
</script>

<template>
  <div :class="category_id != 7 ? 'grid grid-cols-12 gap-6' : ''">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      loader="dots"
      :is-full-page="true"
    />
    <div class="col-span-12 2xl:col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <AdminInfoBox v-if="category_id == 6" />
        <UserInfoBox v-if="_.includes([2, 3, 4, 5], category_id)" />

        <!-- END: General Report -->
        <!-- BEGIN: Sales Report -->

        <!-- END: Sales Report -->
      </div>
    </div>
    <CallCenter v-if="category_id == 7" />
    
  </div>
  <SelfRegistration v-if="category_id == 8" />

</template>
