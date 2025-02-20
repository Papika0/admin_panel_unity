<script setup lang="ts">
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { onMounted, ref, onUnmounted } from "vue";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

// Reference for the chart element
const chartDiv = ref<HTMLElement | null>(null);
let chart: am5.Chart | null = null;

// Initialize the amCharts 5 horizontal bar chart
onMounted(() => {
  // Create root element
  const root = am5.Root.new(chartDiv.value!);

  // Create XY chart
  chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      layout: root.verticalLayout,
    })
  );

  // Create Y-axis (category axis)
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      categoryField: "month",
    })
  );

  // Create X-axis (value axis)
  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
    })
  );

  // Add bar series for "Html Template"


  // Add bar series for "VueJs Template"
  const series2 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "VueJs Template",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "vueJsTemplate",
      categoryYField: "month",
    })
  );

  // Set data
  const data = [
    { month: "თბილისი",  vueJsTemplate: 100 },
    { month: "გურია",  vueJsTemplate: 300 },
    { month: "კახეთი",  vueJsTemplate: 400 },
    { month: "მცხეთა-მთიანეთი",  vueJsTemplate: 560 }
  ];

  // Set data to the series
  series2.data.setAll(data);

  // Set data to Y-axis categories
  yAxis.data.setAll(data);

  // Cleanup the chart instance on unmount
  onUnmounted(() => {
    root.dispose();
  });
});
</script>

<template>
  <div :style="{ width: props.width + 'px', height: props.height + 'px' }" ref="chartDiv"></div>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
