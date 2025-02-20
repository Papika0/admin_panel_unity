<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Define the data type
interface ChartData {
  name: string;
  value: number;
}
// Props for chart dimensions
const props = defineProps<{
  width?: number;
  height?: number;
  data: Array<ChartData>;
}>();

// Reference for the chart element
const chartDiv = ref<HTMLElement | null>(null);
let root: am5.Root | null = null;
let chart: am5xy.XYChart | null = null;
let series: am5xy.ColumnSeries | null = null;
let legend: am5.Legend | null = null;

// Colors for each country
const colors = [
  am5.color(0xff0000),
  am5.color(0x00ff00),
  am5.color(0x0000ff),
  am5.color(0xffff00),
  am5.color(0xff00ff),
  am5.color(0x00ffff),
  am5.color(0xffa500),
  am5.color(0x800080),
  am5.color(0x008000),
  am5.color(0x000080),
  am5.color(0x808000),
  am5.color(0x800000),
  am5.color(0x008080),
  am5.color(0x808080),
  am5.color(0xc0c0c0),
];

// Function to initialize the chart
function initializeChart() {
  if (chartDiv.value) {
    // Create root element for amCharts
    root = am5.Root.new(chartDiv.value);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create XY chart
    chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create X-axis (category axis)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30, // Space between labels
        }),
        categoryField: "name",
      })
    );
    xAxis.data.setAll(props.data);

    // Make sure labels are visible and positioned correctly
    xAxis.get("renderer").labels.template.setAll({
      rotation: -90, // Rotate labels if needed, e.g., 45 for angled text
      centerY: am5.p50,
      centerX: am5.p50,
      paddingTop: 10, // Adds space between column and label
    });

    // Create Y-axis (value axis)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add column series
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Countries",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "name",
      })
    );

    // Set colors for each column
    series.columns.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem) {
        const dataContext = target.dataItem.dataContext as ChartData;
        const index = props.data.findIndex(
          (item) => item.name === dataContext.name
        );
        return colors[index % colors.length];
      }
      return fill;
    });

    // Add strokes to columns
    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return am5.color(0x000000); // Black stroke
    });

    series.columns.template.set("tooltipText", "{categoryX}: {valueY}"); // Set the tooltip text
    series.columns.template.set("tooltipY", -10); // Position the tooltip above the column
    // Set up a legend

    legend = chart.children.push(
      am5.Legend.new(root, {
        useDefaultMarker: true,
        marginBottom: 20,
      })
    );
    legend.data.setAll(series.dataItems);
  }
}

// Function to update chart data
function updateChartData(newData: ChartData[]) {
  if (series) {
    series.data.setAll(newData);
  }
  if (chart) {
    const xAxis = chart.xAxes.getIndex(0); // Get the x-axis
    if (xAxis) {
      xAxis.data.setAll(newData); // Update the x-axis data as well
    }
  }

  // Update legend data
  updateLegendData();
}
function updateLegendData() {
  if (legend && series) {
    legend.data.setAll(series.dataItems); // Update legend with series data items
  }
}
watch(
  () => props.data, // Watch the data prop
  (newData) => {
    if (series) {
      updateChartData(newData); // Update the series with new data
    }
  },
  { deep: true, immediate: true } // Ensure it reacts deeply and updates immediately on mount
);

// Initialize the chart on mount
onMounted(async () => {
  await initializeChart();
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>

<template>
  <div
    :style="{ width: props.width + 'px', height: props.height + 'px' }"
    ref="chartDiv"
  ></div>
</template>
