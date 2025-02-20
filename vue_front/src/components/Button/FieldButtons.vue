<script setup lang="ts">
import { useNavigation } from "@/utils/navigate";
import { useFieldStore } from "@/stores/questionnaire/fieldStore";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { computed } from "vue";
import { QuestionnaireAction } from "@/components/Button";
import Button from "@/components/Base/Button";
import { ref } from "vue";

const props = defineProps<{
  questionnaireStatus: number | null;
  send_from: number | null;
  houseId: string;
}>();

const fieldStore = useFieldStore();

const { setActiveField, updateView } = fieldStore;
const { fields, activeField } = storeToRefs(
    fieldStore
);

const { navigateTo } = useNavigation();

const scrollable = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const category_id = ref<number>(
  Number(localStorage.getItem("category_id") || 0)
);
const lastFiled = computed(() => _.last(fields.value));
const showNextButton = computed(() => {
  return (
    activeField.value && activeField.value.id != _.last(fields.value)?.id
  );
});

const next = () => {
  if (activeField.value !== null) {
    const index = _.findIndex(
      fields.value,
      (person) => person.id === activeField.value?.id
    );
    if (index < fields.value.length - 1) {
      let id = fields.value[index + 1].id;
      // const timeSpent = logTimeSpentOnActivePerson();
      // if (timeSpent && timeSpent > 15000) {
      //   updateView(activeField.value?.id);
      // }
      updateView(activeField.value?.id);
      setActiveField(id);
      scrollable();
    }
  }
};

const preview = () => {
  if (activeField.value !== null) {
    const index = _.findIndex(
      fields.value,
      (person) => person.id === activeField.value?.id
    );
    if (index > 0) {
        setActiveField(fields.value[index - 1].id);
      scrollable();
    }
  }
};
</script>
<template>
  <div class="mt-4 flex justify-between" v-if="activeField">
    <div>
      <Button
        variant="primary"
        elevated
        class="w-50 mb-2 mr-1"
        v-if="activeField.id == fields[0].id"
        @click="navigateTo('agriculture')"
      >
        სოფლის მეურნეობა
      </Button>
      <Button
        variant="primary"
        elevated
        class="w-24 mb-2 mr-1"
        v-if="activeField.id != fields[0].id"
        @click="preview"
      >
        უკან
      </Button>
    </div>
<div>

</div>
    <Button
      variant="success"
      elevated
      class="w-24 mb-2 mr-1"
      @click="next"
      v-if="showNextButton"
    >
      წინ
    </Button>
   
    <div v-if=" !showNextButton && category_id == 2">
      <QuestionnaireAction
        :house_id="houseId"
        :questionnaire_status="questionnaireStatus"
        :send_from="send_from"
      />
    </div>
  </div>
</template>
