<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import _ from "lodash";

const props = withDefaults(
  defineProps<{
    field?: any;
    hasFields?: boolean;
  }>(),
  {
    field: [],
    hasFields: false,
  }
);

const id_1 = computed(() => {
  const field = props.field;
  let find_1 = _.find(field, { id: 16 })?.value;
  return find_1 > 0 ? find_1 : 0;
});

const perennialSum = computed(() => {
  const field = props.field; 
  
  let sum = 0;
  for (let index = 1; index < 10; index++) {
    const element = field[index];
    if (element.value > 0 && element.id !== 20 && element.id !== 23) {
      sum += element.value;
    }
  }
  return _.round(sum, 4);
});


interface AreaAlert {
  variant: "success" | "danger" | "secondary";
  icon: "AlertOctagon" | "AlertTriangle" ;
  message: string;
}
const areaAlert = computed<AreaAlert>(() => {
  const field = props.field;
  
  if (id_1.value > 0 || perennialSum.value > 0) {
    if (id_1.value < perennialSum.value) {
      return {
        variant: "danger",
        message:
          "მრავალწლოვანი ნარგავებით დაკავებული მიწის ფართობი ნაკლებია ქვეკატეგორიების მიწის ფართობების ჯამზე",
        icon: "AlertOctagon",
      };
    } else if (id_1.value > perennialSum.value) {
      return {
        variant: "danger",
        message:
          "მრავალწლოვანი ნარგავებით დაკავებული მიწის ფართობი მეტია ქვეკატეგორიების მიწის ფართობების ჯამზე",
        icon: "AlertOctagon",
      };
    } else {
      return {
        variant: "success",
        message:
          "მრავალწლოვანი ნარგავებით დაკავებული მიწის ფართობი ტოლია ქვეკატეგორიების მიწის ფართობების ჯამის",
        icon: "AlertTriangle",
      };
    }
  } else if (props.hasFields || props.hasFields === null) {
    return {
      variant: "danger",
      message: "არ შეივსო",
      icon: "AlertOctagon",
    };
  } else {
    return {
      variant: "secondary",
      message: "",
      icon: "AlertTriangle",
    };
  }
});
</script>
<template>
 <div
    class=" pb-2 mb-1 border-b border-slate-200/60 dark:border-darkmode-400"
    v-if="areaAlert.variant != 'secondary'"
  >
    <Alert :variant="areaAlert.variant" class="flex items-center mb-2">
      <Lucide :icon="areaAlert.icon" class="w-6 h-6 mr-2" />
      {{ areaAlert.message }}
    </Alert>
  </div>
</template>
