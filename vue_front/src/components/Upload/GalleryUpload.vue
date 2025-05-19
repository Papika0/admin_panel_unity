<template>
  <div class="space-y-2">
    <div
      class="border-2 border-dashed rounded p-4 text-center cursor-pointer"
      @dragover.prevent
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <input
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        ref="fileInput"
        @change="onFileChange"
      />
      <p class="text-gray-500">Drag & drop or click to add gallery images</p>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(img, idx) in previews" :key="idx" class="relative group">
        <img :src="img" class="object-cover w-full h-24 rounded shadow" />
        <button
          @click="remove(idx)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

type Props = {
  modelValue: File[];
  previews: string[];
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", v: File[]): void;
  (e: "update:previews", v: string[]): void;
}>();

const fileInput = ref<HTMLInputElement>();

function onFileChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  addFiles(files);
}

function onDrop(e: DragEvent) {
  const files = Array.from(e.dataTransfer?.files || []);
  addFiles(files);
}

function addFiles(files: File[]) {
  const newPreviews = [...props.previews];
  const newFiles = [...props.modelValue];
  files.forEach((file) => {
    newFiles.push(file);
    const reader = new FileReader();
    reader.onload = () => {
      newPreviews.push(reader.result as string);
      emit("update:previews", newPreviews);
      emit("update:modelValue", newFiles);
    };
    reader.readAsDataURL(file);
  });
}

function remove(idx: number) {
  const newPreviews = props.previews.slice();
  const newFiles = props.modelValue.slice();
  newPreviews.splice(idx, 1);
  newFiles.splice(idx, 1);
  emit("update:previews", newPreviews);
  emit("update:modelValue", newFiles);
}
</script>
