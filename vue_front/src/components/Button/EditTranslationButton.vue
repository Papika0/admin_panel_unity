<script setup lang="ts">
import { ref } from "vue";
import Lucide from "@/components/Base/Lucide";
import TranslationModal from "@/components/Translation/TranslationModal.vue";

interface Props {
  translation: any;
  currentPage: number;
}

const props = defineProps<Props>();

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div>
    <button
      @click="openModal"
      class="group flex items-center px-3 py-2 text-sm font-medium text-violet-700 bg-violet-50 rounded-lg hover:bg-violet-100 hover:text-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 border border-violet-200 hover:border-violet-300"
    >
      <Lucide
        icon="Edit3"
        class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12"
      />
      რედაქტირება
    </button>

    <TranslationModal
      :open="showModal"
      mode="edit"
      :translation="translation"
      :current-page="currentPage"
      @close="closeModal"
    />
  </div>
</template>
