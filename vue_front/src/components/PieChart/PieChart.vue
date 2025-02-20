<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useAdminChartStore } from "@/stores/charts/adminChartStore";
import { storeToRefs } from "pinia";

let chart: am5percent.PieChart | undefined;
let series: am5percent.PieSeries | undefined;
let legend: am5.Legend | undefined;
const props = defineProps<{
  width?: number;
  height?: number;
}>();

const adminChartStore = useAdminChartStore();
const { fetchAdminProgressChart } = adminChartStore;
const { progress } = storeToRefs(adminChartStore);

const colors: { [key: string]: am5.Color } = {
  house_point_statuses_0: am5.color(0xf70776), // Red
  house_point_statuses_1: am5.color(0xffff00), // Yellow
  house_point_statuses_2: am5.color(0x00ff00), // Green
  house_point_statuses_3: am5.color(0x0000ff), // Blue
  house_point_statuses_4: am5.color(0xff00ff), // Magenta
  house_point_statuses_5: am5.color(0x00ffff), // Cyan
  house_point_statuses_7: am5.color(0xffa500), // Orange
};

const names: { [key: string]: string } = {
  house_point_statuses_0: 'საწყისი',
  house_point_statuses_1: 'დაწყებული',
  house_point_statuses_2: 'დასრულებული',
  house_point_statuses_3: 'უკანდაბრუნებული',
  house_point_statuses_4: 'წასაშლელი',
  house_point_statuses_5: 'წაშლილი',
  house_point_statuses_7: 'არასაცხოვრებელი',
};

function transformData(data: {
  [key: string]: string | number;
}): { category: string; value: number; color: am5.Color }[] {
  const result = [];
  for (const key in data) {
    const category = names[key]; // Get the name from the names object
    const value = parseFloat(data[key] as string);
    const color = colors[key]; // Use the original key to get the color
    if (!color) {
      console.error(`Color not found for categoryKey: ${key}`);
      continue;
    }
    result.push({ category, value, color });
  }
  return result;
}

function initializeChart() {
  const root = am5.Root.new("chartdiv");

  root.setThemes([am5themes_Animated.new(root)]);

  chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
    })
  );

  series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    })
  );

  // Disable labels on pie slices
  series.labels.template.set("forceHidden", true);
  series.ticks.template.set("forceHidden", true);

  // Create and configure the legend
  legend = chart.children.push(
    am5.Legend.new(root, {
      useDefaultMarker: true,
      marginBottom: 20,
    })
  );
}

function updateChartData(data: { [key: string]: string | number }) {
  if (series) {
    const transformedData = transformData(data);
    series.data.setAll(transformedData);

    // Apply custom colors to each slice
    series.dataItems.forEach((dataItem: am5percent.PieSeriesDataItem) => {
      const slice = dataItem.get("slice") as am5percent.PieSlice; // Type assertion
      const category = dataItem.get("category") as string;
      const color = colors[category.replace("საწყისი", "house_point_statuses_0")
        .replace("დაწყებული", "house_point_statuses_1")
        .replace("დასრულებული", "house_point_statuses_2")
        .replace("უკანდაბრუნებული", "house_point_statuses_3")
        .replace("წასაშლელი", "house_point_statuses_4")
        .replace("წაშლილი", "house_point_statuses_5")
        .replace("არასაცხოვრებელი", "house_point_statuses_7")];
      if (!color) {
        console.error(`Color not found for category: ${category}`);
        return;
      }
      slice.set("fill", color); // Set fill color
      slice.set("stroke", am5.color(0xffffff)); // Set stroke color (white)
      slice.set("strokeWidth", 2); // Optional: Set stroke width
    });

    // Update legend data
    if (legend) {
      legend.data.setAll(series.dataItems);
    }
  }
}

onMounted(async () => {
  try {
    await fetchAdminProgressChart();
    initializeChart();
    if (progress.value) {
      updateChartData(progress.value);
    }
  } catch (error) {
    console.error("Failed to initialize chart:", error);
  }
});

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
  }
});

watch(progress, (newVal) => {
  if (newVal) {
    updateChartData(newVal);
  }
});
</script>

<template>
  <div
    id="chartdiv"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
    }"
  ></div>
</template>