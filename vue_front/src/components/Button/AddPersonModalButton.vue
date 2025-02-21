<script setup lang="ts">
import { ref } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog } from "@/components/Base/Headless";
import {
  FormLabel,
  FormSwitch,
  FormInput,
  FormSelect,
  FormCheck,
} from "@/components/Base/Form";
import Litepicker from "@/components/Base/Litepicker";
import Button from "@/components/Base/Button";

const addPersonModalPreview = ref(false);
const setAddPersonModalPreview = (value: boolean) => {
  addPersonModalPreview.value = value;
};
const date = ref("");
const selectedRole = ref(null);
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
    >
      დაამატეთ ახალი პიროვნება
    </Button>

    <Dialog
      size="xl"
      :open="addPersonModalPreview"
      @close="
        () => {
          setAddPersonModalPreview(false);
        }
      "
    >
      <Dialog.Panel class="p-2 text-center">
        <Dialog.Title>
          <h2 class="mr-auto text-base font-medium">დამატება</h2>
          <Button
            variant="outline-secondary"
            class="hidden sm:flex"
            @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(false);
            }"
          >
            <Lucide icon="X" class="w-3 h-3 text-slate-500" />
          </Button>
        </Dialog.Title>
        <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <FormLabel htmlFor="modal-form-1">პოზიცია</FormLabel>
            <div class="flex flex-col mt-2 sm:flex-row justify-center items-center">
              <FormCheck class="mr-3">
                <FormCheck.Input
                  id="radio-switch-4"
                  type="radio"
                  name="horizontal_radio_button"
                  value="horizontal-radio-chris-evans"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="radio-switch-4">
                  სექტორი
                </FormCheck.Label>
              </FormCheck>
              <FormCheck class="mt-2 mr-3 sm:mt-0">
                <FormCheck.Input
                  id="radio-switch-5"
                  type="radio"
                  name="horizontal_radio_button"
                  value="horizontal-radio-liam-neeson"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="radio-switch-5">
                  ზედამხედველი
                </FormCheck.Label>
              </FormCheck>
              <FormCheck class="mt-2 mr-3 sm:mt-0">
                <FormCheck.Input
                  id="radio-switch-6"
                  type="radio"
                  name="horizontal_radio_button"
                  value="horizontal-radio-daniel-craig"
                  v-model="selectedRole"
                />
                <FormCheck.Label htmlFor="radio-switch-6">
                  აღმწერი
                </FormCheck.Label>
              </FormCheck>
            </div>
          </div>
          <div class="col-span-12 mt-3">
            <hr />
            <div class="grid grid-cols-12 gap-4 gap-y-3 mt-2">
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-6">სექტორის N</FormLabel>
                <FormSelect id="modal-form-6">
                  <option>10</option>
                  <option>25</option>
                  <option>35</option>
                  <option>50</option>
                </FormSelect>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-1">სექტორის კოდი</FormLabel>
                <FormInput id="modal-form-1" type="text" placeholder="11110" disabled/>
              </div>
            </div>
          </div>
          <div class="col-span-12 mt-3">
            <hr />
            <div class="grid grid-cols-12 gap-4 gap-y-3 mt-2">
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-1">სახელი</FormLabel>
                <FormInput id="modal-form-1" type="text" placeholder="სახელი" />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-2">გვარი</FormLabel>
                <FormInput id="modal-form-2" type="text" placeholder="გვარი" />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-3"> პირადი ნომერი</FormLabel>
                <FormInput
                  id="modal-form-3"
                  type="text"
                  placeholder="პირადი ნომერი"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-4">
                  ფაქტიური მისამართი
                </FormLabel>
                <FormInput
                  id="modal-form-4"
                  type="text"
                  placeholder="ფაქტიური მისამართი"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-5">
                  მობილურის ნომერი(პირადი)
                </FormLabel>
                <FormInput
                  id="modal-form-5"
                  type="text"
                  placeholder="მობილურის ნომერი(პირადი)"
                />
              </div>
              <div class="col-span-12 sm:col-span-3">
                <FormLabel htmlFor="modal-form-6">სქესი</FormLabel>
                <div class="flex flex-col mt-2 sm:flex-row">
                  <FormCheck class="mr-5">
                    <FormCheck.Input
                      id="radio-switch-4"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-chris-evans"
                    />
                    <FormCheck.Label htmlFor="radio-switch-4">
                      ქალი
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck class="mt-2 sm:mt-0">
                    <FormCheck.Input
                      id="radio-switch-5"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-liam-neeson"
                    />
                    <FormCheck.Label htmlFor="radio-switch-5">
                      კაცი
                    </FormCheck.Label>
                  </FormCheck>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-3">
                <FormLabel htmlFor="modal-form-6">დაბადების თარიღი</FormLabel>
                <Litepicker
                  v-model="date"
                  :options="{
                    autoApply: false,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }"
                  class="block"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-5">
                  მობილურის ნომერი(საქსტატი)
                </FormLabel>
                <FormInput
                  id="modal-form-5"
                  type="text"
                  placeholder="მობილურის ნომერი(საქსტატი)"
                />
              </div>
              <div class="col-span-12 sm:col-span-6">
                <FormLabel htmlFor="modal-form-5">
                  პლანშეტის საინვენტარიზაციო კოდი
                </FormLabel>
                <FormInput
                  id="modal-form-5"
                  type="text"
                  placeholder="პლანშეტის საინვენტარიზაციო კოდი"
                />
              </div>
            </div>
          </div>
        </Dialog.Description>
        <Dialog.Footer>
          <Button
            type="button"
            variant="outline-secondary"
            @click="
              () => {
                setHeaderFooterModalPreview(false);
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
            ref="{sendButtonRef}"
          >
            შენახვა
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
