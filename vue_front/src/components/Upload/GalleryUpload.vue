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
  (e: "remove:existing", index: number): void; // New event for removing existing images
}>();

const fileInput = ref<HTMLInputElement>();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
  const newFiles = [...props.modelValue, ...files];

  let loadedCount = 0;
  const totalFiles = files.length;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      newPreviews.push(reader.result as string);
      loadedCount++;

      // Only emit when all files are loaded
      if (loadedCount === totalFiles) {
        emit("update:previews", newPreviews);
        emit("update:modelValue", newFiles);
      }
    };
    reader.readAsDataURL(file);
  });
}

function remove(idx: number) {
  const preview = props.previews[idx];

  // Check if this is an existing image (not a data URL) or a new file
  if (!preview.startsWith("data:")) {
    // This is an existing image, emit event to parent to handle removal
    emit("remove:existing", idx);
  }

  const newPreviews = props.previews.slice();
  const newFiles = props.modelValue.slice();

  // Calculate the index in the files array (existing images don't have corresponding files)
  let fileIndex = 0;
  for (let i = 0; i < idx; i++) {
    if (props.previews[i].startsWith("data:")) {
      fileIndex++;
    }
  }

  newPreviews.splice(idx, 1);

  // Only remove from files array if it's a new file (data URL preview)
  if (preview.startsWith("data:")) {
    newFiles.splice(fileIndex, 1);
  }

  emit("update:previews", newPreviews);
  emit("update:modelValue", newFiles);
}
</script>

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
        <img
          :src="img.startsWith('data:') ? img : backendUrl + img"
          class="object-cover w-full h-24 rounded shadow"
        />
        <button
          type="button"
          @click="remove(idx)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
