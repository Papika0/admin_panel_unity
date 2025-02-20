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
  let find_1 = _.find(field, { id: 1 })?.value;
  return find_1 > 0 ? find_1 : 0;
});

const id_2 = computed(() => {
  const field = props.field;
  let find_2 = _.find(field, { id: 2 })?.value;
  return find_2 > 0 ? find_2 : 0;
});
const arableFieldsSum = computed(() => {
  const field = props.field;
  let find_2 = id_2.value;
  let find_13 = _.find(field, { id: 13 })?.value;
  let el_1 = find_2 > 0 ? find_2 : 0;
  let el_2 = find_13 > 0 ? find_13 : 0;
  let sum = el_1 + el_2;

  return _.round(sum, 4);
});

const annualSum = computed(() => {
  const field = props.field;
  let sum = 0;
  for (let index = 2; index < 12; index++) {
    const element = field[index];
    if (element.value > 0 && element.id !== 11) {
      sum += element.value;
    }
  }
  return _.round(sum, 4);
});

interface AreaAlert {
  variant: "success" | "danger" | "secondary";
  icon: "AlertOctagon" | "AlertTriangle";
  message: string;
}
const areaAlert = computed<AreaAlert>(() => {
  const field = props.field;
  if (id_1.value > 0 || arableFieldsSum.value > 0 || annualSum.value) {
    if (id_1.value < arableFieldsSum.value) {
      return {
        variant: "danger",
        message:
          "სახნავის ფართობი ნაკლებია ერთწლიანი კულტურებით ნათესი მიწის და  დაუმუშავებელი მიწის ფართობების ჯამზე",
        icon: "AlertOctagon",
      };
    } else if (id_1.value > arableFieldsSum.value) {
      return {
        variant: "danger",
        message:
          "სახნავის ფართობი მეტია ერთწლიანი კულტურებით ნათესი მიწის და  დაუმუშავებელი მიწის ფართობების ჯამზე",
        icon: "AlertOctagon",
      };
    } else if ( annualSum.value < id_2.value) {
      console.log(id_2.value, annualSum.value);
      
      return {
        variant: "danger",
        message:
          "ერთწლიანი კულტურებით ნათესი მიწის ფართობი მეტია ქვეკატეგორიის კულტურების ნათესი მიწის ფართობების ჯამზე",
        icon: "AlertOctagon",
      };
    } else {
      return {
        variant: "success",
        message:
          "სახნავის ფართობი ტოლია ერთწლიანი კულტურებით ნათესი მიწის და  დაუმუშავებელი მიწის ფართობების ჯამის",
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
    class="pb-2 mb-1 border-b border-slate-200/60 dark:border-darkmode-400"
    v-if="areaAlert.variant != 'secondary'"
  >
    <Alert :variant="areaAlert.variant" class="flex items-center mb-2">
      <Lucide :icon="areaAlert.icon" class="w-6 h-6 mr-2" />
      {{ areaAlert.message }}
    </Alert>
  </div>
</template>
