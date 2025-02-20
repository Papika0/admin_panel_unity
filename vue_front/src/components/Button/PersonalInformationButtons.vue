<script setup lang="ts">
import { useNavigation } from "@/utils/navigate";
import { usePersonalInformationStore } from "@/stores/questionnaire/personalInformationStore";
import { useQuestionnaireStore } from "@/stores/questionnaire/questionnaireStore";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { computed } from "vue";
import { QuestionnaireAction } from "@/components/Button";
import Button from "@/components/Base/Button";
import { ref } from "vue";

const props = defineProps<{
  showAgricultureButton: boolean;
  questionnaireStatus: number | null;
  houseId: string;
}>();
const questionnaireStore = useQuestionnaireStore();
const { send_from } =
  storeToRefs(questionnaireStore);

const personalInformationStore = usePersonalInformationStore();

const { setActivePerson, updateView } = personalInformationStore;
const { persons, activePerson } = storeToRefs(
  personalInformationStore
);
const category_id = ref<number>(
  Number(localStorage.getItem("category_id") || 0)
);
const { navigateTo } = useNavigation();

const scrollable = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const lastPerson = computed(() => _.last(persons.value));
const showNextButton = computed(() => {
  return (
    activePerson.value && activePerson.value.id != _.last(persons.value)?.id
  );
});

const next = () => {
  if (activePerson.value !== null) {
    const index = _.findIndex(
      persons.value,
      (person) => person.id === activePerson.value?.id
    );
    if (index < persons.value.length - 1) {
      let id = persons.value[index + 1].id;
      // const timeSpent = logTimeSpentOnActivePerson();
      // if (timeSpent && timeSpent > 15000) {
      //   updateView(activePerson.value?.id);
      // }
      updateView(activePerson.value?.id);
      setActivePerson(id);
      scrollable();
    }
  }
};

const preview = () => {
  if (activePerson.value !== null) {
    const index = _.findIndex(
      persons.value,
      (person) => person.id === activePerson.value?.id
    );
    if (index > 0) {
      setActivePerson(persons.value[index - 1].id);
      scrollable();
    }
  }
};
</script>
<template>
  <div class="mt-4 flex justify-between" v-if="activePerson">
    <div>
      <Button
        variant="primary"
        elevated
        class="w-50 mb-2 mr-1"
        v-if="activePerson.id == persons[0].id"
        @click="navigateTo('dwelling-information')"
      >
        ინფორმაცია საცხოვრისზე
      </Button>
      <Button
        variant="primary"
        elevated
        class="w-24 mb-2 mr-1"
        v-if="activePerson.id != persons[0].id"
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
    <Button
      variant="success"
      elevated
      class="w-50 mb-2 mr-1"
      @click="navigateTo('agriculture')"
      v-if="!showNextButton && showAgricultureButton"
    >
      სოფლის მეურნეობა
    </Button>
    <div v-if="!showAgricultureButton && !showNextButton && category_id == 2">
      <QuestionnaireAction
        :house_id="houseId"
        :questionnaire_status="questionnaireStatus"
        :send_from="send_from"
      />
    </div>
  </div>
</template>
