<script lang="ts">
type LitepickerConfig = Partial<ILPConfiguration>;
</script>

<script setup lang="ts">
import "@/assets/css/vendors/litepicker.css";
import { type InputHTMLAttributes, onMounted, ref, inject, watch } from "vue";
import LitepickerJs from "litepicker";
import { FormInput } from "@/components/Base/Form";
import { type ILPConfiguration } from "litepicker/dist/types/interfaces.d";

export interface LitepickerElement extends HTMLInputElement {
  litePickerInstance: LitepickerJs;
}

export interface LitepickerEmit {
  (e: "update:modelValue", value: string): void;
}

export interface LitepickerProps extends /* @vue-ignore */ InputHTMLAttributes {
  options: {
    format?: string | undefined;
  } & LitepickerConfig;
  modelValue: string | null;
  refKey?: string;
}

export type ProvideLitepicker = (el: LitepickerElement) => void;

const props = defineProps<LitepickerProps>();
const litepickerRef = ref<LitepickerElement | null>(null);
const emit = defineEmits<LitepickerEmit>();

const initLitepicker = (el: LitepickerElement) => {
  el.litePickerInstance = new LitepickerJs({
    ...props.options,
    lang: "ka-GE", // Set the language to Georgian
    element: el,
    setup: (picker) => {
      picker.on("selected", (date1) => {
        if (date1) {
          emit(
            "update:modelValue",
            date1.format(props.options.format || "YYYY-MM-DD")
          );
        }
      });
    },
  });
};

const vLitepickerDirective = {
  mounted(el: LitepickerElement) {
    if (el !== null) {
      initLitepicker(el);
    }
  },
  updated(el: LitepickerElement) {
    if (el !== null && el.litePickerInstance) {
      el.litePickerInstance.setDate(props.modelValue);
    }
  },
};

const bindInstance = (el: LitepickerElement) => {
  if (props.refKey) {
    const bind = inject<ProvideLitepicker>(`bind[${props.refKey}]`);
    if (bind) {
      bind(el);
    }
  }
};

onMounted(() => {
  if (litepickerRef.value) {
    initLitepicker(litepickerRef.value);
    bindInstance(litepickerRef.value);
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (litepickerRef.value && litepickerRef.value.litePickerInstance) {
      litepickerRef.value.litePickerInstance.setDate(newValue);
    }
  }
);
</script>

<template>
  <FormInput
    ref="litepickerRef"
    type="text"
    :value="props.modelValue || ''"
    @input="(event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    }"
    v-litepicker-directive
  />
</template>
