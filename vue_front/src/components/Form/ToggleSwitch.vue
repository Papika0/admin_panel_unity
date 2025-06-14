<template>
  <label class="inline-flex items-center cursor-pointer group">
    <input
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      type="checkbox"
      class="sr-only"
    />
    <div class="relative">
      <div
        class="block w-14 h-8 rounded-full transition-colors duration-200"
        :class="{
          'bg-gray-300': !modelValue,
          [activeColor]: modelValue,
        }"
      />
      <div
        class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200"
        :class="{ 'transform translate-x-6': modelValue }"
      ></div>
    </div>
    <span
      class="ml-3 text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  activeColor: {
    type: String,
    default: "bg-green-500",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.dot {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}
</style>
