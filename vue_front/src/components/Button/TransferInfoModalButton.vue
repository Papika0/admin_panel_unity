<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";

const addPersonModalPreview = ref(false);
const setAddPersonModalPreview = (value: boolean) => {
  addPersonModalPreview.value = value;
};
</script>
<template>
  <div>
    <Button
      variant="soft-danger"
      elevated
      class="w-24 mb-2 mr-1"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(true);
           
            }"
    >
      ინსტრუქცია
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
          <div class="relative w-full">
            <h2 class="text-base font-medium text-red-600">!!!ყურადღება!!!</h2>
            <Button
              variant="outline-secondary"
              class="hidden sm:flex absolute right-0 top-0 bottom-0"
              @click="(event: MouseEvent) => {
              event.preventDefault();
              setAddPersonModalPreview(false);
            }"
            >
              <Lucide icon="X" class="w-3 h-3 text-slate-500" />
            </Button>
          </div>
        </Dialog.Title>
        <Dialog.Description class="dialog-body">
          <div class="bg-white w-full lg:text-lg sm:text-sm md:text-base">
            <p>
              შენობიდან შენობაზე კითხვარების გადატანამდე შეასრულეთ შემდეგი
              მოქმედებები:
            </p>
            <p class="mt-2">
              <span class="text-danger">!!!</span> იმ შემთხვევაში თუ კითხვარები
              გადაგაქვთ ერთი აღმწერის შენობიდან მეორე აღმწერის შენობაზე, ორივე
              აღმწერმა უნდა შეასრულოს ქვემოთ მოცემული მოქმედებები.
              <span class="text-danger">!!!</span>
            </p>
            <ol class="list-decimal list-inside mt-2">
              <li class="mt-1">
                კითხვარების გადატანამდე დაუკავშირდით იმ აღმწერ(ებ)ს ვისთანაც
                უნდა გადაიტანოთ კითხვარ(ებ)ი, სთხოვეთ მათ შეასრულონ
                სინქრონიზაცია და კითხვარების გადატანის პროცედურის დასრულებამდე
                შეწყვიტონ მუშაობა.
              </li>
              <li class="mt-1">
                მხოლოდ სინქრონიზაციის წარმატებით შესრულების შემდეგ გადაიტანეთ
                კითხვარები.
              </li>
              <li class="mt-1">
                კითხვარებს გადატანის შემდეგ დაუკავშირდით აღმწერ(ებ)ს და სთხოვეთ
                შეასრულოს ბაზის აღდგენა. (აღწერის პროგრამის ზედა მარჯვენა
                კუთხეში სამწერტილი(სინქრონიზაციის გვერდით)
                <span class="font-bold">-></span> პარამეტრები
                <span class="font-bold">-></span> ბაზის აღდგენა.)
              </li>
              <li class="mt-1">
                აღმწერ(ებ)ს მუშაობის გაგრძელება შეუძლიათ მხოლოდ ბაზის აღდგენის
                <span class="font-bold">წარმატებით</span> შესრულების შემდეგ.
              </li>
            </ol>
            <p class="mt-2 font-bold">
              (თუ ჩამოთვლილი ნაბიჯებიდან რომელიმეზე შეგექმნათ ტექნიკური
              პრობლემა, დაუკავშირდით თქვენს ზედამხედველს)
            </p>
          </div>
        </Dialog.Description>
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
