<template>
  <div
    class="border-2 border-dashed rounded p-4 text-center cursor-pointer relative"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="fileInput?.click()"
  >
    <input
      type="file"
      accept="image/*"
      class="hidden"
      ref="fileInput"
      @change="onFileChange"
    />
    <template v-if="preview">
      <img :src="preview" class="mx-auto max-h-40 object-cover rounded" />
    </template>
    <template v-else>
      <p class="text-gray-500">Drag & drop or click to upload</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";

const props = defineProps<{
  modelValue: File | null;
  preview: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", v: File): void;
  (e: "update:preview", v: string): void;
}>();

const fileInput = ref<HTMLInputElement>();

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) handleFile(file);
}

function onDrop(e: DragEvent) {
  const file = e.dataTransfer?.files[0];
  if (file) handleFile(file);
}

function handleFile(file: File) {
  emit("update:modelValue", file); // Emit the file object
  const reader = new FileReader();
  reader.onload = () => emit("update:preview", reader.result as string); // Emit the preview URL
  reader.readAsDataURL(file);
}
</script>
