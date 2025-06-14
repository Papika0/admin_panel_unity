<template>
  <div
    class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
  >
    <div class="px-8 py-6" :class="headerClass">
      <h2 class="text-2xl font-bold text-white flex items-center">
        <component :is="icon" class="w-6 h-6 mr-3" />
        {{ title }}
      </h2>
    </div>
    <div class="p-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  headerClass: {
    type: String,
    default: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
  icon: {
    type: String,
    default: "div",
  },
});
</script>
