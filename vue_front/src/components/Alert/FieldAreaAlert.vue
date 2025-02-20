<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import { Field } from "@/stores/questionnaire/fieldStore";
import _ from "lodash";

const defaultField: Field = {
  id: 0,
  area: 0,
  cl_field_owning_category_id: 0,
  owning_category: "",
  has_arable_fields: false,
  has_other_fields: false,
  has_perennial_plants: false,
  irrigated_area: 0,
  is_by_living_place: false,
  name: "",
  full_name: "",
  agriculture_id: 0,
  has_individual_fruit: false,
  has_individual_vine: false,
  address: "",
  arable_fields: [],
  perennial_plants: [],
  other_fields: [],
  garden_fruits: [],
  individual_fruits: [],
  household_id: 0,
  household_name: "",
  view: false,
  percentage: 0,
};

const props = withDefaults(
  defineProps<{
    field?: any;
  }>(),
  {
    field: {},
  }
);

const otherFieldsSum = computed(() => {
  const field = props.field;
  let sum = 0;
  field.other_fields.forEach((item: any) => {
    if (item.value > 0 && item.id !== 33 && item.id !== 34) {
      sum += item.value;
    }
  });
  return sum;
});

const arableFieldsSum = computed(() => {
  const field = props.field;

  return field.arable_fields[0].value > 0 ? field.arable_fields[0].value : 0;
});

const perennialPlantsSum = computed(() => {
  const field = props.field;

  return field.perennial_plants[0].value > 0
    ? field.perennial_plants[0].value
    : 0;
});
const fieldAreaSum = computed(() => {
  const field = props.field;
  let sum =
    arableFieldsSum.value + perennialPlantsSum.value + otherFieldsSum.value;
  return _.round(sum, 4);
});

interface AreaAlert {
  variant: "success" | "danger";
  icon: "AlertOctagon" | "AlertTriangle";
  message: string;
}
const areaAlert = computed<AreaAlert>(() => {
  const field = props.field;
  if (field.area < fieldAreaSum.value) {
    return {
      variant: "danger",
      message: "ნაკვეთის ფართობი ნაკლებია მიწათსარგებლობის ფართობების ჯამზე",
      icon: "AlertOctagon",
    };
  } else if (field.area > fieldAreaSum.value) {
    return {
      variant: "danger",
      message: "ნაკვეთის ფართობი მეტია მიწათსარგებლობის ფართობების ჯამზე",
      icon: "AlertOctagon",
    };
  } else {
    return {
      variant: "success",
      message: "ნაკვეთის ფართობი ტოლია მიწათსარგებლობის ფართობების ჯამის",
      icon: "AlertTriangle",
    };
  }
});
</script>

<template>
  <div>
    <Alert :variant="areaAlert.variant" class="flex items-center mb-2">
      <Lucide :icon="areaAlert.icon" class="w-6 h-6 mr-2" />
      {{ areaAlert.message }}
    </Alert>
  </div>
</template>
