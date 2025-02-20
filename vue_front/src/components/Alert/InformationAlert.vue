<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import _ from "lodash";
import type { Variant } from "@/components/Base/Alert";

const props = withDefaults(
  defineProps<{
    message: string;
    variant?: Variant;
  }>(),
  {
    variant: 'danger', // Set your default value here
  }
);
</script>

<template>
  <Alert :variant="variant" class="flex items-center mt-2">
    <Lucide icon="AlertOctagon" class="w-6 h-6 mr-2" />
    {{ message }}
  </Alert>
</template>
