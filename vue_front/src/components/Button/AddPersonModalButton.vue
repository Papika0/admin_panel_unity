<script setup lang="ts">
import { ref, computed, watch, reactive, watchEffect, onUnmounted } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Dialog } from "@/components/Base/Headless";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormCheck,
  InputGroup,
} from "@/components/Base/Form";
import Litepicker from "@/components/Base/Litepicker";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/Base/Button";
import Multiselect from "@vueform/multiselect";

import { fetchStaffInfo, addStaff } from "@/http/persons";
import { usePersonnelStore } from "@/stores/personnelStore";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import Loading from "vue-loading-overlay";
import { required, minLength, numeric, maxLength } from "@vuelidate/validators";
import { toastify } from "@/utils/toast";

const authStore = useAuthStore();

const props = defineProps<{
  usersCodes: Array<any>;
  users: Array<any>;
  currentPage: number;
}>();

const addPersonModalPreview = ref(false);
const setAddPersonModalPreview = (value: boolean) => {
  addPersonModalPreview.value = value;
};
const { distr_code } = storeToRefs(authStore);
const { fetchStaff, fetchStaffCodes } = usePersonnelStore();

const sectorNumbers = ref<Array<any>>();
const supervisorNumbers = ref<Array<any>>();
const interviewerNumbers = ref<Array<any>>();

const sectorRef = ref(null);
const supervisorRef = ref(null);
const interviewerRef = ref(null);

const selectedCodeParts = ref([
  distr_code.value,
  sectorRef.value,
  supervisorRef.value,
  interviewerRef.value,
]);

watchEffect(() => {
  selectedCodeParts.value[1] = sectorRef.value ? sectorRef.value : "";
  selectedCodeParts.value[2] = supervisorRef.value ? supervisorRef.value : "";
  selectedCodeParts.value[3] = interviewerRef.value ? interviewerRef.value : "";
});

const selectedCode = computed(() => selectedCodeParts.value.join(""));

const filteredUserNames = ref(props.usersCodes);
const selectedUserName = ref("");
const isLoading = ref(false);
const georgianChars = (value: any) => /^[ა-ჰ\s_-]+$/.test(value);

const selectedRole = ref<number>(3);

const labelText = computed<string>(() => {
  switch (selectedRole.value) {
    case 1:
      return "სექტორის კოდი";
    case 2:
      return "ზედამხედველის კოდი";
    case 3:
      return "აღმწერის კოდი";
    default:
      return "";
  }
});

const { ImeiCodes } = storeToRefs(usePersonnelStore());

const person = reactive({
  first_name: "" as any,
  personalNumber: "" as any,
  last_name: "" as string | null,
  address: "" as string | null,
  mobile_number_personal: "" as string | null,
  gender: null as number | null,
  date: "" as string | null,
  mobile_number_geostat: "" as string | null,
  tablet_id: "" as string | null,
  has_smartphone: 0 as number,
  comment: "" as string | null,
  imei_id: null as number | null,
});

const rules = {
  first_name: { required, minLength: minLength(2), georgianChars },
  personalNumber: {
    required,
    numeric,
    minLength: minLength(11),
    maxLength: maxLength(11),
  },
  last_name: { required, minLength: minLength(3), georgianChars },
  address: { required },
  mobile_number_personal: {
    required,
    numeric,
    minLength: minLength(9),
    maxLength: maxLength(9),
  },
  gender: { required, numeric },
  date: { required },
  mobile_number_geostat: { numeric },
  tablet_id: { numeric },
};

const codeRules = {
  sector: { required: required },
  supervisor: { required: required },
  interviewer: { required: required },
  selectedUserName: { required: required },
};

const v$ = useVuelidate(rules, person);
const vc$ = useVuelidate(codeRules, {
  sector: sectorRef,
  supervisor: supervisorRef,
  interviewer: interviewerRef,
  selectedUserName: selectedUserName,
});

const handleSubmit = async () => {
  v$.value.$touch();
  vc$.value.$touch();
  if (v$.value.$invalid) {
    toastify.error("შევსებული მონაცემები არა ვალიდურია");
    return;
  }
  let code_to_send = selectedCode.value;
  if (showUserNames.value) {
    code_to_send = selectedUserName.value;
  }
  let user = props.usersCodes.find((user) => user.user_name == code_to_send);

  if (!user) {
    toastify.error("მომხმარებელი უკვე დამატებულია");
    return;
  }

  try {
    await addStaff(person, code_to_send);
    toastify.success("პიროვნება წარმატებით დაემატა");
  } catch (error) {
    if ((error as any).response.status === 400) {
      toastify.error(
        "პიროვნება უკვე დამატებულია, გთხოვთ დაარეფრეშოთ გვერდი, რათა განახლდეს აქტიური კოდები"
      );
    } else {
      toastify.error("პიროვნების დამატებისას მოხდა შეცდომა");
    }
  } finally {
    await fetchStaff(distr_code.value, props.currentPage);
    await fetchStaffCodes(distr_code.value);
    setAddPersonModalPreview(false);
    clickToNull();
  }
};

const emptyModel = () => {
  person.first_name = "";
  person.personalNumber = "";
  person.last_name = "";
  person.date = "";
  person.gender = null;
};
const handleButtonClick = async () => {
  v$.value.first_name.$touch();
  v$.value.personalNumber.$touch();

  if (v$.value.first_name.$invalid || v$.value.personalNumber.$invalid) {
    console.error("Validation failed for name or personalNumber");
    return;
  }

  isLoading.value = true;
  try {
    const response = fetchStaffInfo(person.first_name, person.personalNumber);
    let data = (await response).data.data;
    person.date = data.birthDate;
    person.first_name = data.firstName;
    person.last_name = data.lastName;
    person.gender = data.genderId;
  } catch (error) {
    toastify.error("გადაამოწმეთ შეყვანილი მონაცემები");
    emptyModel();
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

const clickToNull = () => {
  selectedRole.value = 3;

  sectorRef.value = null;
  supervisorRef.value = null;
  interviewerRef.value = null;

  Object.keys(person).forEach((key) => {
    if (typeof person[key as keyof typeof person] === "string") {
      person[key as keyof typeof person] = "" as any;
    } else if (
      typeof person[key as keyof typeof person] === "number" ||
      person[key as keyof typeof person] === null
    ) {
      person[key as keyof typeof person] = null as any;
    }
  });

  v$.value.$reset();
  vc$.value.$reset();
};

const showUserNames = computed(() => {
  return (
    (filteredUserNames.value.length === 1 &&
      filteredUserNames.value[0].distr_code !==
        filteredUserNames.value[0].user_name &&
      ((selectedRole.value == 3 && sectorRef.value != null) ||
        (selectedRole.value == 2 &&
          sectorRef.value != null &&
          supervisorRef.value != null) ||
        (selectedRole.value == 1 &&
          sectorRef.value != null &&
          supervisorRef.value != null &&
          interviewerRef.value != null))) ||
    (filteredUserNames.value.length > 1 &&
      ((selectedRole.value == 3 && sectorRef.value != null) ||
        (selectedRole.value == 2 &&
          sectorRef.value != null &&
          supervisorRef.value != null) ||
        (selectedRole.value == 1 &&
          sectorRef.value != null &&
          supervisorRef.value != null &&
          interviewerRef.value != null)))
  );
});

const filterCodes = async () => {
  let codeToFind = "";

  if (sectorRef.value == null) {
    codeToFind = selectedCode.value.substring(0, 4);
  } else if (supervisorRef.value == null) {
    codeToFind = selectedCode.value.substring(0, 6);
  } else if (interviewerRef.value == null) {
    codeToFind = selectedCode.value.substring(0, 8);
  }

  const filteredCodes = props.usersCodes
    .map((user) => user.distr_code)
    .filter((distr_code) => distr_code.startsWith(codeToFind));

  if (sectorRef.value == null) {
    sectorNumbers.value = Array.from(
      new Set(
        filteredCodes
          .map((code) => code.substring(4, 6))
          .filter((code) => code != "")
      )
    );
  }

  if (supervisorRef.value == null) {
    supervisorNumbers.value = Array.from(
      new Set(
        filteredCodes
          .map((code) => code.substring(6, 8))
          .filter((code) => code != "")
      )
    );
  }

  interviewerNumbers.value = Array.from(
    new Set(
      filteredCodes
        .map((code) => code.substring(8, 10))
        .filter((code) => code != "")
    )
  );
};

watch(
  () => selectedCode.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      filteredUserNames.value = props.usersCodes.filter((user) => {
        return (
          user.distr_code
            .toLowerCase()
            .includes(selectedCode.value.toLowerCase()) &&
          user.category_id === selectedRole.value
        );
      });
      person.tablet_id =
        props.usersCodes.find((user) => user.user_name === selectedCode.value)
          ?.tablet_id ?? "";

      person.mobile_number_geostat =
        props.usersCodes.find((user) => user.user_name === selectedCode.value)
          ?.g_mobile ?? "";
    }
  },
  { immediate: true }
);

watch(
  () => selectedRole.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      if (newVal == 3) {
        supervisorRef.value = null;
        interviewerRef.value = null;
      } else if (newVal == 2) {
        interviewerRef.value = null;
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.usersCodes,
  () => {
    filterCodes();
  },
  { immediate: true }
);

watch(
  () => sectorRef.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal && oldVal != "") {
      supervisorRef.value = null;
      interviewerRef.value = null;
      filterCodes();
    }
  },
  { immediate: true }
);

watch(
  () => supervisorRef.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal && oldVal != "") {
      interviewerRef.value = null;
      filterCodes();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  clickToNull();
});
</script>
<template>
  <div>
    <Button
      variant="primary"
      class="mr-2 shadow-md"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(true);
            }"
      :disabled="usersCodes.length < 1"
    >
      დაამატეთ ახალი პიროვნება
    </Button>
    <Dialog
      size="xl"
      :open="addPersonModalPreview"
      @close="
        () => {
          setAddPersonModalPreview(false);
          clickToNull();
        }
      "
    >
      <Dialog.Panel class="p-2 text-center">
        <loading
          v-model:active="isLoading"
          :can-cancel="false"
          loader="dots"
          :is-full-page="true"
        />
        <Dialog.Title>
          <h2 class="mr-auto text-base font-medium">დამატება</h2>
          <Button
            variant="outline-secondary"
            class="hidden sm:flex"
            @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(false);
              clickToNull();
            }"
          >
            <Lucide icon="X" class="w-3 h-3 text-slate-500" />
          </Button>
        </Dialog.Title>
        <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3 dialog-body">
          <div class="col-span-12">
            <FormLabel htmlFor="modal-form-1">პოზიცია</FormLabel>
            <div
              class="flex flex-col mt-2 sm:flex-row justify-center items-center"
            >
              <FormCheck class="mr-3">
                <FormCheck.Input
                  id="role-1"
                  type="radio"
                  name="role"
                  :value="3"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="role-1"> სექტორი </FormCheck.Label>
              </FormCheck>
              <FormCheck class="mt-2 mr-3 sm:mt-0">
                <FormCheck.Input
                  id="role-2"
                  type="radio"
                  name="role"
                  :value="2"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="role-2">
                  ზედამხედველი
                </FormCheck.Label>
              </FormCheck>
              <FormCheck class="mt-2 mr-3 sm:mt-0">
                <FormCheck.Input
                  id="role-3"
                  type="radio"
                  name="role"
                  :value="1"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="role-3"> აღმწერი </FormCheck.Label>
              </FormCheck>
            </div>
          </div>
          <div class="col-span-12 mt-3">
            <hr />
            <div class="grid grid-cols-12 gap-4 gap-y-3 mt-2">
              <div class="col-span-3">
                <FormLabel htmlFor="modal-form-6">სექტორის N</FormLabel>
                <FormSelect
                  id="modal-form-5"
                  :class="vc$.sector.$error ? 'border-danger' : ''"
                  v-model:model-value="sectorRef"
                >
                  <option
                    v-for="sector in sectorNumbers"
                    :key="sector"
                    :value="sector"
                  >
                    {{ sector }}
                  </option>
                </FormSelect>
              </div>
              <div
                class="col-span-3"
                v-if="selectedRole == 2 || selectedRole == 1"
              >
                <FormLabel htmlFor="modal-form-6">ზედამხედველის N</FormLabel>
                <FormSelect
                  id="modal-form-6"
                  :class="vc$.supervisor.$error ? 'border-danger' : ''"
                  v-model="supervisorRef"
                  :disabled="sectorRef == null"
                >
                  <option
                    v-for="supervisor in supervisorNumbers"
                    :key="supervisor"
                    :value="supervisor"
                  >
                    {{ supervisor }}
                  </option>
                </FormSelect>
              </div>
              <div class="col-span-3" v-if="selectedRole == 1">
                <FormLabel htmlFor="modal-form-6">აღმწერის N</FormLabel>
                <FormSelect
                  id="modal-form-7"
                  :class="vc$.interviewer.$error ? 'border-danger' : ''"
                  :disabled="sectorRef == null || supervisorRef == null"
                  v-model="interviewerRef"
                >
                  <option
                    v-for="interviewer in interviewerNumbers"
                    :key="interviewer"
                    :value="interviewer"
                  >
                    {{ interviewer }}
                  </option>
                </FormSelect>
              </div>
              <div class="col-span-3">
                <FormLabel htmlFor="modal-form-1">{{ labelText }}</FormLabel>
                <FormInput
                  id="modal-form-1"
                  type="text"
                  v-model="selectedCode"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="col-span-8" v-if="showUserNames">
            <FormLabel
              htmlFor="modal-form-6"
              :class="vc$.selectedUserName.$error ? 'text-danger' : ''"
              >UserName</FormLabel
            >
            <FormSelect
              id="modal-form-7"
              v-model:model-value="selectedUserName"
              :class="vc$.selectedUserName.$error ? 'border-danger' : ''"
            >
              <option
                v-for="(user, index) in filteredUserNames"
                :key="index"
                :value="user.user_name"
              >
                {{ user.user_name }}
              </option>
            </FormSelect>
          </div>
          <div class="col-span-12 mt-3">
            <hr />
            <div class="grid grid-cols-12 gap-4 gap-y-3 mt-2">
              <div class="col-span-5">
                <FormLabel
                  htmlFor="modal-form-1"
                  :class="v$.first_name.$error ? 'text-danger' : ''"
                  >სახელი</FormLabel
                >
                <FormInput
                  id="modal-form-1"
                  type="text"
                  :class="v$.first_name.$error ? 'border-danger' : ''"
                  v-model="person.first_name"
                  placeholder="სახელი"
                />
              </div>
              <div class="col-span-5">
                <FormLabel
                  htmlFor="modal-form-3"
                  :class="v$.personalNumber.$error ? 'text-danger' : ''"
                >
                  პირადი ნომერი</FormLabel
                >
                <FormInput
                  id="modal-form-3"
                  type="text"
                  v-model="person.personalNumber"
                  :class="v$.personalNumber.$error ? 'border-danger' : ''"
                  placeholder="პირადი ნომერი"
                />
              </div>
              <div class="col-span-2 my-auto mt-7">
                <Button
                  variant="primary"
                  type="button"
                  class="w-20"
                  ref="{sendButtonRef}"
                  @click="handleButtonClick"
                >
                  შევსება
                </Button>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel
                  htmlFor="modal-form-2"
                  :class="v$.last_name.$error ? 'text-danger' : ''"
                  >გვარი</FormLabel
                >
                <FormInput
                  id="modal-form-2"
                  type="text"
                  :class="v$.last_name.$error ? 'border-danger' : ''"
                  placeholder="გვარი"
                  v-model="person.last_name"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel
                  htmlFor="modal-form-4"
                  :class="v$.address.$error ? 'text-danger' : ''"
                >
                  ფაქტიური მისამართი
                </FormLabel>
                <FormInput
                  id="modal-form-4"
                  type="text"
                  :class="v$.address.$error ? 'border-danger' : ''"
                  v-model="person.address"
                  placeholder="ფაქტიური მისამართი"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel
                  htmlFor="modal-form-5"
                  :class="v$.mobile_number_personal.$error ? 'text-danger' : ''"
                >
                  მობილურის ნომერი(პირადი)
                </FormLabel>
                <InputGroup>
                  <InputGroup.Text id="input-group-email">
                    +995
                  </InputGroup.Text>
                  <FormInput
                    id="modal-form-5"
                    type="text"
                    :class="
                      v$.mobile_number_personal.$error ? 'border-danger' : ''
                    "
                    v-model="person.mobile_number_personal"
                    placeholder="მობილურის ნომერი(პირადი)"
                  />
                </InputGroup>
              </div>
              <div class="col-span-12 sm:col-span-3">
                <FormLabel
                  htmlFor="modal-form-6"
                  :class="v$.gender.$error ? 'text-danger' : ''"
                  >სქესი</FormLabel
                >
                <div class="flex flex-col mt-2 sm:flex-row">
                  <FormCheck class="mr-5">
                    <FormCheck.Input
                      id="gender_id_1"
                      type="radio"
                      v-model="person.gender"
                      name="gender_id"
                      :value="2"
                    />
                    <FormCheck.Label htmlFor="gender_id_1">
                      ქალი
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck class="mt-2 sm:mt-0">
                    <FormCheck.Input
                      id="gender_id_2"
                      type="radio"
                      v-model="person.gender"
                      name="gender_id"
                      :value="1"
                    />
                    <FormCheck.Label htmlFor="gender_id_2">
                      კაცი
                    </FormCheck.Label>
                  </FormCheck>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-3">
                <FormLabel
                  htmlFor="modal-form-6"
                  :class="v$.date.$error ? 'text-danger' : ''"
                  >დაბადების თარიღი</FormLabel
                >
                <Litepicker
                  v-model="person.date"
                  :options="{
                    autoApply: false,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1940,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                    position: 'top',
                  }"
                  :class="[
                    'block w-50 ',
                    v$.date.$error ? 'border-danger' : '',
                  ]"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel
                  htmlFor="modal-form-5"
                  :class="v$.mobile_number_geostat.$error ? 'text-danger' : ''"
                >
                  მობილურის ნომერი(საქსტატი)
                </FormLabel>
                <InputGroup>
                  <InputGroup.Text id="input-group-email">
                    +995
                  </InputGroup.Text>
                  <FormInput
                    id="modal-form-5"
                    type="text"
                    :class="
                      v$.mobile_number_geostat.$error ? 'border-danger' : ''
                    "
                    v-model="person.mobile_number_geostat"
                    placeholder="მობილურის ნომერი(საქსტატი)"
                  />
                </InputGroup>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel
                  htmlFor="modal-form-5"
                  :class="v$.tablet_id.$error ? 'text-danger' : ''"
                >
                  პლანშეტის საინვენტარიზაციო კოდი
                </FormLabel>
                <FormInput
                  id="modal-form-5"
                  type="text"
                  v-model="person.tablet_id"
                  :class="v$.tablet_id.$error ? 'border-danger' : ''"
                  placeholder="პლანშეტის საინვენტარიზაციო კოდი"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <div class="flex items-center mr-auto">
                  <FormCheck.Input
                    id="has-smartphone"
                    type="checkbox"
                    class="mr-2 border"
                    v-model="person.has_smartphone"
                    value="1"
                  />
                  <FormLabel
                    htmlFor="has-smartphone"
                    class="cursor-pointer select-none"
                  >
                    მაქვს სმარტფონი
                  </FormLabel>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 mb-4">
              <FormLabel htmlFor="modal-form-5"> ტაბლეტის IMEI </FormLabel>
              <Multiselect
                v-model="person.imei_id"
                :options="ImeiCodes"
                :searchable="true"
                label="IMEI"
                track-by="IMEI"
                class="custom-multiselect"
                valueProp="id"
                placeholder="აირჩიეთ IMEI"
              />
            </div>
            <div class="col-span-12 sm:col-span-6">
              <FormLabel htmlFor="modal-form-5"> შენიშვნა </FormLabel>
              <FormInput
                id="modal-form-5"
                type="text"
                v-model="person.comment"
                placeholder="ჩაწერეთ შენიშვნა"
              />
            </div>
          </div>
        </Dialog.Description>
        <Dialog.Footer>
          <Button
            type="button"
            variant="outline-secondary"
            @click="
              () => {
                setAddPersonModalPreview(false);
                clickToNull();
              }
            "
            class="w-20 mr-1"
          >
            გათიშვა
          </Button>
          <Button
            variant="primary"
            type="button"
            class="w-20"
            @click="handleSubmit"
          >
            შენახვა
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
<style scoped>
.dialog-body {
  max-height: 70vh; /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
