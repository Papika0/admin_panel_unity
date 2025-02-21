<script setup lang="ts">
import { ref } from "vue";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import LeafletMap from "@/components/LeafletMap";

const mapModalPreview = ref(false);
const setMapModalPreview = (value: boolean) => {
  mapModalPreview.value = value;
};
</script>
<template>
  <div>
    <Button
      variant="primary"
      class="px-2 py-1 mr-2"
      @click="(event: MouseEvent) => {
              event.preventDefault();
              setMapModalPreview(true);
            }"
    >
      რუკა
    </Button>
    <Dialog
      size="xl"
      :open="mapModalPreview"
      @close="
        () => {
          setMapModalPreview(false);
        }
      "
    >
      <Dialog.Panel class="p-2 text-center">
        <Dialog.Title>
          <h2 class="mr-auto text-base font-medium">რუკა</h2>
          <Button
            variant="outline-secondary"
            class="hidden sm:flex"
            @click="(event: MouseEvent) => {
              event.preventDefault();
              setMapModalPreview(false);
            }"
          >
            <Lucide icon="X" class="w-3 h-3 text-slate-500" />
          </Button>
        </Dialog.Title>
        <div>
          <LeafletMap class="h-[600px] rounded-md bg-slate-200" />
        </div>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>
