<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div
      v-for="lang in languages || ['ka', 'en', 'ru']"
      :key="`${fieldName}-${lang}`"
      class="space-y-2"
    >
      <div class="flex items-center justify-between min-h-[28px]">
        <label
          class="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
        >
          {{ fieldLabel }} ({{ lang }})
        </label>
        <button
          v-if="lang !== 'ka' && modelValue['ka']"
          @click="translateText(lang)"
          :disabled="translating[lang]"
          type="button"
          class="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg
            v-if="translating[lang]"
            class="animate-spin -ml-1 mr-1 h-3 w-3 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <svg
            v-else
            class="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            ></path>
          </svg>
          {{ translating[lang] ? "Translating..." : "Translate" }}
        </button>
        <!-- Invisible placeholder for Georgian to maintain alignment -->
        <div v-else class="w-[84px] h-[28px]"></div>
      </div>

      <!-- Fix: Use proper input type for each language with better textarea sizing -->
      <textarea
        v-if="inputType === 'textarea'"
        :value="modelValue[lang] || ''"
        @input="
          updateValue(lang, ($event.target as HTMLTextAreaElement)?.value || '')
        "
        :required="required"
        :rows="rows || 6"
        :class="textareaClasses"
        :placeholder="`Enter ${fieldLabel.toLowerCase()} in ${lang}`"
      />
      <input
        v-else
        :value="modelValue[lang] || ''"
        @input="
          updateValue(lang, ($event.target as HTMLInputElement)?.value || '')
        "
        :required="required"
        :class="inputClasses"
        :placeholder="`Enter ${fieldLabel.toLowerCase()} in ${lang}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Translator } from "@/utils/translator";
interface ModelValue {
  [key: string]: string;
}

interface TranslatingState {
  [key: string]: boolean;
}

const props = defineProps<{
  modelValue: ModelValue;
  fieldName: string;
  fieldLabel: string;
  inputType?: string;
  languages?: string[];
  required?: boolean;
  rows?: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: ModelValue];
}>();

const translating = reactive<TranslatingState>({
  en: false,
  ru: false,
});

// Set default values
const languages = props.languages || ["ka", "en", "ru"];

const inputClasses =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white";

const textareaClasses =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-y min-h-[120px]";

function updateValue(lang: string, value: string) {
  console.log(`Updating ${props.fieldName} for ${lang}:`, value); // Debug log
  const updated = { ...props.modelValue };
  updated[lang] = value;
  emit("update:modelValue", updated);
}

async function translateText(targetLang: string): Promise<void> {
  if (!props.modelValue["ka"] || translating[targetLang]) return;

  translating[targetLang] = true;

  try {
    const translatedText = await Translator.translate(
      props.modelValue["ka"],
      "ka",
      targetLang
    );

    const updated = { ...props.modelValue };
    updated[targetLang] = translatedText;
    emit("update:modelValue", updated);
  } catch (error) {
    console.error("Translation error:", error);
    alert("Translation failed. Please enter text manually.");
  } finally {
    translating[targetLang] = false;
  }
}
</script>
