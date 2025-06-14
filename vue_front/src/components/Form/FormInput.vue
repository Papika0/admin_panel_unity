<template>
  <div class="space-y-2">
    <label
      class="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
    >
      {{ label }}
    </label>
    <component
      :is="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :required="required"
      :min="min"
      :max="max"
      :rows="rows"
      :class="inputClasses"
      :placeholder="placeholder"
    >
      <slot />
    </component>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: "input",
  },
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
  min: [String, Number],
  max: [String, Number],
  rows: Number,
  placeholder: String,
  focusColor: {
    type: String,
    default: "focus:ring-green-500",
  },
});

defineEmits(["update:modelValue"]);

const inputClasses = computed(
  () =>
    `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${
      props.focusColor
    } focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
      props.inputType === "select" ? "appearance-none cursor-pointer" : ""
    } ${props.inputType === "textarea" ? "resize-none" : ""}`
);
</script>

<script>
import { computed } from "vue";
</script>
