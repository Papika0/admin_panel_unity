<script setup lang="ts">
import { computed, reactive } from "vue";
import { FormLabel, FormInput, FormCheck } from "@/components/Base/Form";
import { Translator } from "@/utils/translator";

interface Props {
  modelValue: {
    key: string;
    text: {
      ka: string;
      en: string;
      ru: string;
    };
    group: string;
    active: boolean | null;
  };
  validation: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: Props["modelValue"]];
}>();

const translating = reactive({
  en: false,
  ru: false,
});

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const updateField = (field: string, value: any) => {
  const updated = { ...localValue.value };
  if (field.includes(".")) {
    const [parent, child] = field.split(".");
    if (
      parent &&
      child &&
      updated[parent as keyof typeof updated] &&
      typeof updated[parent as keyof typeof updated] === "object"
    ) {
      (updated[parent as keyof typeof updated] as any)[child] = value;
    }
  } else {
    (updated as any)[field] = value;
  }
  localValue.value = updated;
};

const updateTextValue = (lang: string, value: string) => {
  const updated = { ...localValue.value };
  updated.text[lang as keyof typeof updated.text] = value;
  localValue.value = updated;
};

const translateText = async (targetLang: string) => {
  if (
    !props.modelValue.text.ka ||
    translating[targetLang as keyof typeof translating]
  )
    return;

  translating[targetLang as keyof typeof translating] = true;

  try {
    const translatedText = await Translator.translate(
      props.modelValue.text.ka,
      "ka",
      targetLang
    );

    updateTextValue(targetLang, translatedText);
  } catch (error) {
    console.error("Translation error:", error);
    alert("Translation failed. Please enter text manually.");
  } finally {
    translating[targetLang as keyof typeof translating] = false;
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Key Field -->
      <div class="form-group">
        <FormLabel
          htmlFor="translation-key"
          :class="validation.key.$error ? 'text-red-600' : 'text-gray-700'"
          class="block text-sm font-medium mb-2"
        >
          სახელი
        </FormLabel>
        <FormInput
          id="translation-key"
          type="text"
          :class="[
            'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent',
            validation.key.$error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 focus:border-violet-500',
          ]"
          :value="modelValue.key"
          @input="
            updateField('key', ($event.target as HTMLInputElement)?.value)
          "
          placeholder="ტრანსლაციის სახელი"
        />
      </div>

      <!-- Group Field -->
      <div class="form-group">
        <FormLabel
          htmlFor="translation-group"
          :class="validation.group.$error ? 'text-red-600' : 'text-gray-700'"
          class="block text-sm font-medium mb-2"
        >
          ჯგუფი
        </FormLabel>
        <FormInput
          id="translation-group"
          type="text"
          :class="[
            'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent',
            validation.group.$error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 focus:border-violet-500',
          ]"
          :value="modelValue.group"
          @input="
            updateField('group', ($event.target as HTMLInputElement)?.value)
          "
          placeholder="ჯგუფის სახელი"
        />
      </div>
    </div>

    <!-- Text Fields -->
    <div class="space-y-4">
      <h3
        class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
      >
        ტექსტები
      </h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Georgian Text -->
        <div class="form-group">
          <div class="flex items-center justify-between min-h-[28px] mb-2">
            <FormLabel
              htmlFor="translation-ka"
              :class="
                validation.text.ka.$error ? 'text-red-600' : 'text-gray-700'
              "
              class="block text-sm font-medium"
            >
              ტექსტი ქართულად
            </FormLabel>
            <div class="w-[84px] h-[28px]"></div>
          </div>
          <textarea
            id="translation-ka"
            :class="[
              'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y min-h-[120px]',
              validation.text.ka.$error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400 focus:border-violet-500',
            ]"
            :value="modelValue.text.ka"
            @input="
              updateTextValue(
                'ka',
                ($event.target as HTMLTextAreaElement)?.value || ''
              )
            "
            placeholder="ქართული ტექსტი"
            rows="4"
          />
        </div>

        <!-- English Text -->
        <div class="form-group">
          <div class="flex items-center justify-between min-h-[28px] mb-2">
            <FormLabel
              htmlFor="translation-en"
              :class="
                validation.text.en.$error ? 'text-red-600' : 'text-gray-700'
              "
              class="block text-sm font-medium"
            >
              ტექსტი ინგლისურად
            </FormLabel>
            <button
              v-if="modelValue.text.ka"
              @click="translateText('en')"
              :disabled="translating.en"
              type="button"
              class="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg
                v-if="translating.en"
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
              {{ translating.en ? "Translating..." : "Translate" }}
            </button>
            <div v-else class="w-[84px] h-[28px]"></div>
          </div>
          <textarea
            id="translation-en"
            :class="[
              'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y min-h-[120px]',
              validation.text.en.$error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400 focus:border-violet-500',
            ]"
            :value="modelValue.text.en"
            @input="
              updateTextValue(
                'en',
                ($event.target as HTMLTextAreaElement)?.value || ''
              )
            "
            placeholder="English text"
            rows="4"
          />
        </div>

        <!-- Russian Text -->
        <div class="form-group lg:col-span-2">
          <div class="flex items-center justify-between min-h-[28px] mb-2">
            <FormLabel
              htmlFor="translation-ru"
              :class="
                validation.text.ru.$error ? 'text-red-600' : 'text-gray-700'
              "
              class="block text-sm font-medium"
            >
              ტექსტი რუსულად
            </FormLabel>
            <button
              v-if="modelValue.text.ka"
              @click="translateText('ru')"
              :disabled="translating.ru"
              type="button"
              class="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg
                v-if="translating.ru"
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
              {{ translating.ru ? "Translating..." : "Translate" }}
            </button>
            <div v-else class="w-[84px] h-[28px]"></div>
          </div>
          <textarea
            id="translation-ru"
            :class="[
              'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y min-h-[120px]',
              validation.text.ru.$error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400 focus:border-violet-500',
            ]"
            :value="modelValue.text.ru"
            @input="
              updateTextValue(
                'ru',
                ($event.target as HTMLTextAreaElement)?.value || ''
              )
            "
            placeholder="Русский текст"
            rows="4"
          />
        </div>
      </div>
    </div>

    <!-- Active Status -->
    <div class="form-group">
      <FormLabel
        :class="validation.active.$error ? 'text-red-600' : 'text-gray-700'"
        class="block text-sm font-medium mb-3"
      >
        სტატუსი
      </FormLabel>
      <div class="flex items-center space-x-6">
        <FormCheck class="flex items-center">
          <FormCheck.Input
            id="active-yes"
            type="radio"
            :checked="modelValue.active === true"
            @change="updateField('active', true)"
            name="active_status"
            class="w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
          />
          <FormCheck.Label
            htmlFor="active-yes"
            class="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
          >
            აქტიური
          </FormCheck.Label>
        </FormCheck>
        <FormCheck class="flex items-center">
          <FormCheck.Input
            id="active-no"
            type="radio"
            :checked="modelValue.active === false"
            @change="updateField('active', false)"
            name="active_status"
            class="w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
          />
          <FormCheck.Label
            htmlFor="active-no"
            class="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
          >
            არააქტიური
          </FormCheck.Label>
        </FormCheck>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  @apply transition-all duration-200;
}

.form-group:hover {
  @apply transform translate-y-[-1px];
}
</style>
