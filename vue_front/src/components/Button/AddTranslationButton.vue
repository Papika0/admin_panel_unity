<script setup lang="ts">
import { ref, reactive } from "vue";
import Lucide from "@/components/Base/Lucide";
import TranslationModal from "@/components/Translation/TranslationModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { toastify } from "@/utils/toast";
import { addTranslation } from "@/http/translations";
import { useTranslationsStore } from "@/stores/tranlations";

const translationsStore = useTranslationsStore();

const addPersonModalPreview = ref(false);
const setAddPersonModalPreview = (value: boolean) => {
  addPersonModalPreview.value = value;
};

const georgianChars = (value: any) => /^[ა-ჰ\s_-]+$/.test(value);

const text = reactive({
  key: "" as any,
  text: {
    ka: "" as any,
    en: "" as any,
    ru: "" as any,
  },
  group: "" as any,
  active: null as boolean | null,
});

const rules = {
  key: { required },
  text: {
    ka: { required, georgianChars, minLength: minLength(2) },
    en: { required, minLength: minLength(2) },
    ru: { required, minLength: minLength(2) },
  },
  group: { required },
  active: { required },
};

const v$ = useVuelidate(rules, text);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    toastify.error("შევსებული მონაცემები არა ვალიდურია");
    return;
  }
  try {
    await addTranslation(text).then(() => {
      translationsStore.fetchTranslations(1);
    });
    setAddPersonModalPreview(false);
    clickToNull();
    toastify.success("ტექსტი წარმატებით შეიცვალა");
  } catch (error) {
    toastify.error("ტექსტის რედაქტირებისას მოხდა შეცდომა");
    console.error("Error saving data:", error);
  }
};

const clickToNull = () => {
  Object.keys(text).forEach((key) => {
    if (typeof text[key as keyof typeof text] === "string") {
      text[key as keyof typeof text] = "" as string;
    } else if (
      typeof text[key as keyof typeof text] === "number" ||
      text[key as keyof typeof text] === null
    ) {
      text[key as keyof typeof text] = null as any;
    } else if (typeof text[key as keyof typeof text] === "object") {
      Object.keys(text[key as keyof typeof text]).forEach((subKey) => {
        text[key as keyof typeof text][subKey] = "" as string;
      });
    }
  });

  v$.value.$reset();
};
</script>

<template>
  <div>
    <button
      @click="setAddPersonModalPreview(true)"
      class="group flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <Lucide
        icon="PlusCircle"
        class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90"
      />
      ტექსტის დამატება
    </button>

    <TranslationModal
      :open="addPersonModalPreview"
      mode="add"
      :current-page="1"
      @close="
        () => {
          setAddPersonModalPreview(false);
          clickToNull();
        }
      "
    />
  </div>
</template>

<style scoped>
.dialog-body {
  max-height: 70vh;
  /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
