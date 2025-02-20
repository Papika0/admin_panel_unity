<script setup lang="ts">
import "@/assets/css/vendors/leaflet.css";
import {
  initializeMap,
  type MapConfig,
  type LeafletElement,
} from "./leaflet-map-loader";
import { type HTMLAttributes, ref, onMounted } from "vue";
import Loading from 'vue-loading-overlay';
import { useMainMapStore } from "@/stores/map/mainMapStore";
import { storeToRefs } from "pinia";

export type Init = (
  callback: (
    mapConfig: MapConfig
  ) => ReturnType<typeof initializeMap> | undefined
) => void;

interface LeafletMapLoaderProps extends /* @vue-ignore */ HTMLAttributes {
  init: Init;
  darkMode?: boolean;
}

const props = defineProps<LeafletMapLoaderProps>();

const mapRef = ref<LeafletElement>();
const mainMapStore = useMainMapStore();
const { isLoading } = storeToRefs(mainMapStore);

onMounted(() => {
  props.init((mapConfig) => {
    if (mapRef.value) {
      return initializeMap(mapRef.value, mapConfig);
    }
  });
});
</script>

<template>
  <div
    :class="{
      
    }"
  >
  <loading v-model:active="isLoading"
                 :can-cancel="false"
                 loader="dots"
                 :is-full-page="true"/>
    <div ref="mapRef" class="w-full h-full"></div>
  </div>
</template>
