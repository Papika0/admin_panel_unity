<script setup lang="ts">
import LeafletMapLoader, {
  type Init,
} from "@/components/Base/LeafletMapLoader";
import { getColor } from "@/utils/colors";
import { useDarkModeStore } from "@/stores/dark-mode";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { computed, watch, ref, Ref, onBeforeUnmount } from "vue";
import { useMainMapStore } from "@/stores/map/mainMapStore";
import { useModalMapStore } from "@/stores/map/modalMapStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { MarkerCluster } from "leaflet";
import _ from "lodash";
import { toastify } from "@/utils/toast";
import { createCustomIcon } from "@/utils/map";
import L from "leaflet";
import {
  createMarker,
  getLegend,
  addSearchControl,
  createClusterIcon,
  createControlMarker,
} from "@/pages/Map/mapService";

interface Point {
  id: number;
  distr_code: string;
  house_id: string;
  x: number;
  y: number;
  status: number;
  house_code: string;
  full_name: string;
  dwelling_type_id: number;
  dwelling_type_name: string;
  location_id: number;
  address_id: number;
}

// Define props
const props = withDefaults(
  defineProps<{
    distr_code: string | null;
    showSearch?: boolean;
    point?: any | null | undefined;
    controlCoordinate?: any | null;
    searchLength?: number;
    getQuestionnaireAvgCoordinate?: boolean;
  }>(),
  {
    distr_code: null,
    showSearch: true,
    point: null,
    controlCoordinate: null,
    searchLength: 4,
    getQuestionnaireAvgCoordinate: false,
  }
);



const showSearchInput = computed(() => props.showSearch);
// Set default value for distr_code
const distr_code = props.distr_code ?? null;

const mainMapStore = useMainMapStore();
const { fetchPoint, clearStoreData } = mainMapStore;
const { points, gps, settlementFilter } = storeToRefs(mainMapStore);
const modalMapStore = useModalMapStore();
const { fetchQuestionnaireAvgCoordinate } = modalMapStore;
const { questionnaireAvgCoordinate } = storeToRefs(modalMapStore);

const center: Ref<[number, number]> = ref([41.7151, 44.8271]);
const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);
// const

const sumPointStatus = computed(() => {
  return {
    begin: _.filter(points.value, (point) => point.status === 0).length,
    current: _.filter(points.value, (point) => point.status === 1).length,
    success: _.filter(points.value, (point) => point.status === 2).length,
    error: _.filter(
      points.value,
      (point) => point.status === 3 || point.status === 8
    ).length,
    deletion: _.filter(
      points.value,
      (point) => point.status === 4 || point.status === 9
    ).length,
    deleted: _.filter(
      points.value,
      (point) => point.status === 5 || point.status === 10
    ).length,
  };
});
const gpsCoordinate = ref<{ lat: number; lng: number } | null>(null);
let watchId: number | null = null;

function setupMapLayers(mapInstance: any): any {
  const { map, leaflet } = mapInstance;

  if (!map || !leaflet) {
    toastify.error("დაფიქსირდა შეცდომა მოგვიანებით ცადეთ");
    return;
  }

  map.whenReady(() => {
    // Add the base tile layer
    const baseLayerName = "googleTileLayer";
    if (!map[baseLayerName] || !map.hasLayer(map[baseLayerName])) {
      try {
        const baseLayer = leaflet.tileLayer(
          "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
          {
            attribution: "Map data &copy; Google",
            minZoom: 1,
          }
        );

        map[baseLayerName] = baseLayer;
        baseLayer.addTo(map);
      } catch (error) {
        console.error("Error adding base tile layer:", error);
      }
    }

    // Add the WMS layer
    const wmsLayerName = "wmsTileLayer";
    if (!map[wmsLayerName] || !map.hasLayer(map[wmsLayerName])) {
      try {
        const wmsURL = "https://census-map.geostat.ge/";
        const wmsLayer = leaflet.tileLayer.wms(wmsURL, {
          layers: "census:magalmTiani",
          format: "image/png",
          transparent: true,
          version: "1.1.1",
          attribution: "Map data &copy; Geostat",
          minZoom: 1,
        });

        map[wmsLayerName] = wmsLayer;
        wmsLayer.addTo(map);
      } catch (error) {
        console.error("Error adding WMS layer:", error);
      }
    }

    // Add the search control
    if (showSearchInput.value) {
      addSearchControl(
        map,
        leaflet,
        points,
        `ძებნა ${props.searchLength} ნიშნა კოდით...`,
        props.searchLength,
        distr_code
      );
    }

    getLegend(map);
  });

  try {
    return leaflet.markerClusterGroup({
      maxClusterRadius: 30,
      disableClusteringAtZoom: 14,
      iconCreateFunction: (cluster: MarkerCluster) =>
        createClusterIcon(cluster, leaflet, sumPointStatus.value),
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
    });
  } catch (error) {
    console.error("Error creating marker cluster group:", error);
    return null;
  }
}

const startGpsWatch = () => {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        gpsCoordinate.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const stopGpsWatch = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};
const init: Init = async (initializeMap) => {
  const mapInstance = await initializeMap({
    config: {
      center: center.value,
      zoom: 12,
      minZoom: 1,
    },
  });

  if (!mapInstance) return;

  const markersLayer = setupMapLayers(mapInstance);
  let gpsMarker: L.Marker | null = null;

  // Function to add markers to the map
  const addMarkers = (points: Point[]) => {
    points.forEach((point: Point) => {
      if (point.x !== null && point.y !== null) {
        createMarker(point, mapInstance.leaflet, markersLayer, settlementFilter);
      }
      // createMarker(point, mapInstance.leaflet, markersLayer);
    });

    // Update the map view to fit markers
    const bounds = markersLayer.getBounds();
    if (bounds.isValid()) {
      const centerBounds = bounds.getCenter();
      center.value = [centerBounds.lat, centerBounds.lng];
      mapInstance.map.setView(center.value, mapInstance.map.getZoom());
    }
  };

  // Add markers and set the initial map view
  // if (points.value) {
  //   addMarkers(points.value);
  // }

  mapInstance.map.addLayer(markersLayer);

  // Watch for changes to colorScheme and darkMode to re-initialize the map
  const unwatch = watch([colorScheme, darkMode], () => {
    unwatch(); // Stop watching after the first run
    init(initializeMap); // Re-initialize the map with updated settings
  });

  // Watch for changes to points and update markers
  watch(points, (newPoints) => {
    if (newPoints && newPoints.length) {
      
      markersLayer.clearLayers(); // Clear existing markers
      addMarkers(newPoints); // Add new markers
    }
  });
  watch(
    () => props.point,
    (newPoint, oldPoint) => {
      if (newPoint) {
        
        
        if (markersLayer) {
          markersLayer.clearLayers();
          
        }
        addMarkers([newPoint]);
      }
    },
    { immediate: true }
  );

  watch(gps, (newVal, oldVal) => {
    if (newVal) {
      // Start GPS watch
      startGpsWatch();
    } else {
      // Stop GPS watch and remove marker and circle
      stopGpsWatch();
      if (gpsMarker) {
        markersLayer.removeLayer(gpsMarker);
      }
    }
  });

  // Watch for changes to GPS coordinates
  watch(gpsCoordinate, (newVal) => {
    if (newVal) {
      // Remove old GPS marker and circle if they exist

      if (gpsMarker) {
        markersLayer.removeLayer(gpsMarker);
      }

      // Add a blue circle around the GPS marker
      const customIcon = createCustomIcon("#3399CC");
      gpsMarker = L.marker([newVal.lat, newVal.lng], {
        icon: customIcon,
      }).addTo(markersLayer!);

      // Optionally, update the map view to the new GPS location
      mapInstance.map.setView(
        [newVal.lat, newVal.lng],
        mapInstance.map.getZoom()
      );
    }
  });
  // Check if controlCoordinate is not null and create control marker
  if (props.controlCoordinate) {
    createControlMarker(props.controlCoordinate, mapInstance.map);
  }

  watch(questionnaireAvgCoordinate, (newVal, oldVal) => {
    if (newVal && newVal.avg_latitude > 0 && newVal.avg_longitude > 0) {
      const coordinateArray = [newVal.avg_latitude, newVal.avg_longitude];

      // Perform any additional actions when the value changes
      if (coordinateArray.length === 2) {
        // Perform any additional actions when the value changes
        createControlMarker(
          coordinateArray as [number, number],
          mapInstance.map
        );
      } else {
        console.error("Invalid coordinate array:", coordinateArray);
      }
    } else {
      toastify.info("კოორდინატი ვერ მოიძებნა");
    }
  });
};

onMounted(async () => {
  if (!props.point) {
    await fetchPoint(distr_code);
  }

  if (props.getQuestionnaireAvgCoordinate) {
    await fetchQuestionnaireAvgCoordinate(props.point.address_id);
  }
});

onBeforeUnmount(() => {
  clearStoreData();
});
</script>

<template>
  <LeafletMapLoader :init="init" :darkMode="darkMode" />
</template>
<style scoped>
.custom-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-icon-z-index {
  z-index: 1000; /* Adjust the z-index value as needed */
}
</style>
