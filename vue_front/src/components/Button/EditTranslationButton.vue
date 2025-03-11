<script setup lang="ts">
import { ref, reactive } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Dialog } from "@/components/Base/Headless";
import {
    FormLabel,
    FormInput,
    FormCheck,
} from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import { useVuelidate } from "@vuelidate/core";
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


const georgianChars = (value: any) => /^[ა-ჰ\s_-]+$/.test(value);


const text = reactive({
    key: "" as any,
    text_ka: "" as any,
    text_en: "" as any,
    text_ru: "" as any,
    group: "" as any,
    active: null as boolean | null,
});

const rules = {
    key: { required },
    text_ka: { required, georgianChars, minLength: minLength(2) },
    text_en: { required, minLength: minLength(2) },
    text_ru: { required, minLength: minLength(2) },
    group: { required },
    active: { required },
};

const v$ = useVuelidate(rules, text);

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        toastify.error("შევსებული მონაცემები არა ვალიდურია");
        return;
    }
    try {
        // await updateStaff(person);
        setAddPersonModalPreview(false);
        clickToNull();
        toastify.success("პიროვნება წარმატებით შეიცვალა");
    } catch (error) {
        toastify.error("პიროვნების დამატებისას მოხდა შეცდომა");
        console.error("Error saving data:", error);
    }
};

const clickToNull = () => {
    Object.keys(text).forEach((key) => {
        if (typeof text[key as keyof typeof text] === "string") {
            text[key as keyof typeof text] = "" as string;
        } else if (
            typeof text[key as keyof typeof text] === "number" ||
            text[key as keyof typeof text] === null
        ) {
            text[key as keyof typeof text] = null as any;
        }
    });

    v$.value.$reset();
};

const updatePerson = () => {
    Object.keys(text).forEach((key) => {
        if (text.hasOwnProperty(key)) {
            text[key as keyof typeof text] =
                props.user[key as keyof typeof text];
        }
    });
};
</script>
<template>
    <div>
        <a class="flex items-center mr-3 text-violet-700 cursor-pointer" @click="(event: MouseEvent) => {
            event.preventDefault();
            setAddPersonModalPreview(true);
            updatePerson();
        }">
            <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
            რედაქტირება
        </a>

        <Dialog size="xl" :open="addPersonModalPreview" @close="
            () => {
                setAddPersonModalPreview(false);
                clickToNull();
            }
        ">
            <Dialog.Panel class="p-2 text-center">

                <Dialog.Title>
                    <h2 class="mr-auto text-base font-medium">რედაქტირება</h2>
                    <Button variant="outline-secondary" class="hidden sm:flex" @click="(event: MouseEvent) => {
                        event.preventDefault();
                        setAddPersonModalPreview(false);
                        clickToNull();
                    }">
                        <Lucide icon="X" class="w-3 h-3 text-slate-500" />
                    </Button>
                </Dialog.Title>
                <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3 dialog-body">
                    <div class="col-span-12 mt-3">
                        <div class="grid grid-cols-12 gap-4 gap-y-3 mt-2">
                            <div class="col-span-5">
                                <FormLabel htmlFor="modal-form-1" :class="v$.key.$error ? 'text-danger' : ''">
                                    სახელი</FormLabel>
                                <FormInput id="modal-form-1" type="text" :class="v$.key.$error ? 'border-danger' : ''"
                                    v-model="text.key" placeholder="სახელი" />
                            </div>
                            <div class="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="modal-form-4" :class="v$.group.$error ? 'text-danger' : ''">
                                    ჯგუფი
                                </FormLabel>
                                <FormInput id="modal-form-4" type="text" :class="v$.group.$error ? 'border-danger' : ''"
                                    v-model="text.group" placeholder="ჯგუფი" />
                            </div>
                            <div class="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="modal-form-2" :class="v$.text_ka.$error ? 'text-danger' : ''">
                                    ტექსტი ქართულად</FormLabel>
                                <FormInput id="modal-form-2" type="text"
                                    :class="v$.text_ka.$error ? 'border-danger' : ''" placeholder="ტექსტი ქართულად"
                                    v-model="text.text_ka" />
                            </div>
                            <div class="col-span-5">
                                <FormLabel htmlFor="modal-form-3" :class="v$.text_en.$error ? 'text-danger' : ''">
                                    ტექსტი ინგლისურად</FormLabel>
                                <FormInput id="modal-form-3" type="text" v-model="text.text_en"
                                    :class="v$.text_en.$error ? 'border-danger' : ''" placeholder="ტექსტი ინგლისურად" />
                            </div>

                            <div class="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="modal-form-4" :class="v$.text_ru.$error ? 'text-danger' : ''">
                                    ტექსტი რუსულად
                                </FormLabel>
                                <FormInput id="modal-form-4" type="text"
                                    :class="v$.text_ru.$error ? 'border-danger' : ''" v-model="text.text_ru"
                                    placeholder="ტექსტი რუსულად" />
                            </div>

                            <div class="flex flex-col mt-2 sm:flex-row">
                                <FormLabel htmlFor="modal-form-4" :class="v$.active.$error ? 'text-danger' : ''">
                                    აქტიურია
                                </FormLabel>
                                <FormCheck class="mr-5">
                                    <FormCheck.Input id="gender_id_1" type="radio" v-model="text.active"
                                        name="gender_id" :value="1" />
                                    <FormCheck.Label htmlFor="gender_id_1">
                                        კი
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck class="mt-2 sm:mt-0">
                                    <FormCheck.Input id="gender_id_2" type="radio" v-model="text.active"
                                        name="gender_id" :value="0" />
                                    <FormCheck.Label htmlFor="gender_id_2">
                                        არა
                                    </FormCheck.Label>
                                </FormCheck>
                            </div>

                        </div>
                    </div>
                </Dialog.Description>
                <Dialog.Footer>
                    <Button type="button" variant="outline-secondary" @click="
                        () => {
                            setAddPersonModalPreview(false);
                            clickToNull();
                        }
                    " class="w-20 mr-1">
                        გათიშვა
                    </Button>
                    <Button variant="primary" type="button" class="w-20" @click="handleSubmit">
                        შენახვა
                    </Button>
                </Dialog.Footer>
            </Dialog.Panel>
        </Dialog>
    </div>
</template>
<style scoped>
.dialog-body {
    max-height: 70vh;
    /* Adjust the height as needed */
    overflow-y: auto;
}
</style>
