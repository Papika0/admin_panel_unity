<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Dialog } from "@/components/Base/Headless";
import {
  FormLabel,
  FormInput,
  FormCheck,
  InputGroup,
} from "@/components/Base/Form";
import Litepicker from "@/components/Base/Litepicker";
import Multiselect from "@vueform/multiselect";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/Base/Button";
import { fetchStaffInfo, updateStaff } from "@/http/persons";
import { storeToRefs } from "pinia";
import { usePersonnelStore } from "@/stores/personnelStore";
import { useVuelidate } from "@vuelidate/core";
import Loading from "vue-loading-overlay";
import { required, minLength, numeric, maxLength } from "@vuelidate/validators";
import { toastify } from "@/utils/toast";

const addPersonModalPreview = ref(false);
const setAddPersonModalPreview = (value: boolean) => {
  addPersonModalPreview.value = value;
};

const props = defineProps<{
  user: any;
  currentPage: number;
}>();

const { fetchStaff, fetchStaffCodes } = usePersonnelStore();

const { ImeiCodes } = storeToRefs(usePersonnelStore());

const Codes = ref(ImeiCodes.value);

watch(
  () => addPersonModalPreview.value,
  (value) => {
    if (value) {
      Codes.value = [...ImeiCodes.value];
      Codes.value.unshift({ id: props.user.imei_id, IMEI: props.user.imei });
    }
  }
);

const distr_code = storeToRefs(useAuthStore()).distr_code;
const isLoading = ref(false);
const georgianChars = (value: any) => /^[ა-ჰ\s_-]+$/.test(value);

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
  id: null as number | null,
  user_id: null as number | null,
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

const v$ = useVuelidate(rules, person);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    toastify.error("შევსებული მონაცემები არა ვალიდურია");
    return;
  }
  try {
    await updateStaff(person);
    await fetchStaff(distr_code.value, props.currentPage);
    await fetchStaffCodes(distr_code.value);
    setAddPersonModalPreview(false);
    clickToNull();
    toastify.success("პიროვნება წარმატებით შეიცვალა");
  } catch (error) {
    toastify.error("პიროვნების დამატებისას მოხდა შეცდომა");
    console.error("Error saving data:", error);
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
};

const updatePerson = () => {
  Object.keys(person).forEach((key) => {
    if (person.hasOwnProperty(key)) {
      person[key as keyof typeof person] =
        props.user[key as keyof typeof person];
    }
  });
};
</script>
<template>
  <div>
    <a
      class="flex items-center mr-3 text-violet-700 cursor-pointer"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(true);
              updatePerson();
            }"
    >
      <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
      რედაქტირება
    </a>

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
          <h2 class="mr-auto text-base font-medium">რედაქტირება</h2>
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
          <div class="col-span-12 mt-3">
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
                  }"
                  :class="v$.date.$error ? 'border-danger' : ''"
                  class="block"
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
                    :true-value="1"
                    :false-value="0"
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
                :options="Codes"
                :searchable="true"
                label="IMEI"
                track-by="IMEI"
                name="imedi_id"
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
