<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { toastify } from "@/utils/toast";
import { addTranslation, updateTranslation } from "@/http/translations";
import { useTranslationsStore } from "@/stores/tranlations";
import TranslationForm from "./TranslationForm.vue";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  translation?: any;
  currentPage: number;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "add",
  currentPage: 1,
});

const emit = defineEmits<{
  close: [];
}>();

const translationsStore = useTranslationsStore();

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
    if (props.mode === "add") {
      await addTranslation(text);
      await translationsStore.fetchTranslations(1);
      toastify.success("ტექსტი წარმატებით დაემატა");
    } else {
      await updateTranslation(props.translation.id, text);
      await translationsStore.fetchTranslations(props.currentPage);
      toastify.success("ტექსტი წარმატებით შეიცვალა");
    }

    handleClose();
  } catch (error) {
    toastify.error(
      props.mode === "add"
        ? "ტექსტის დამატებისას მოხდა შეცდომა"
        : "ტექსტის რედაქტირებისას მოხდა შეცდომა"
    );
    console.error("Error saving data:", error);
  }
};

const resetForm = () => {
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

const populateForm = () => {
  if (props.translation && props.mode === "edit") {
    text.key = props.translation.key || "";
    text.group = props.translation.group || "";
    // Fix: Handle boolean conversion properly
    text.active =
      props.translation.active === 1 || props.translation.active === true
        ? true
        : false;
    text.text.ka = props.translation.text_ka || "";
    text.text.en = props.translation.text_en || "";
    text.text.ru = props.translation.text_ru || "";
  }
};

const handleClose = () => {
  resetForm();
  emit("close");
};

watch(
  () => props.open,
  (newVal) => {
    if (newVal && props.mode === "edit") {
      populateForm();
    }
  }
);

const modalTitle = computed(() =>
  props.mode === "add" ? "ტექსტის დამატება" : "ტექსტის რედაქტირება"
);
</script>

<template>
  <Dialog size="xl" :open="open" @close="handleClose">
    <Dialog.Panel class="p-0 overflow-hidden bg-white rounded-lg shadow-xl">
      <div
        class="gradient-header p-6 bg-gradient-to-r from-violet-600 to-purple-600"
      >
        <Dialog.Title class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-white">{{ modalTitle }}</h2>
          <Button
            variant="outline-secondary"
            class="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
            @click="handleClose"
          >
            <Lucide icon="X" class="w-4 h-4" />
          </Button>
        </Dialog.Title>
      </div>

      <Dialog.Description class="p-6">
        <TranslationForm v-model="text" :validation="v$" class="space-y-6" />
      </Dialog.Description>

      <Dialog.Footer class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline-secondary"
            @click="handleClose"
            class="px-6 py-2 transition-colors duration-200 hover:bg-gray-100"
          >
            გათიშვა
          </Button>
          <Button
            variant="primary"
            type="button"
            @click="handleSubmit"
            class="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            {{ mode === "add" ? "დამატება" : "შენახვა" }}
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog.Panel>
  </Dialog>
</template>

<style scoped>
.gradient-header {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}
</style>
