<template>
  <div id="chartdiv" ref="chartDiv" style="width: 100%; height: 500px"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useAdminChartStore } from "@/stores/charts/adminChartStore";
import { storeToRefs } from "pinia";

const adminChartStore = useAdminChartStore();
const { fetchPopulationLineChart } = adminChartStore;
const { populationLineChartDays } = storeToRefs(adminChartStore);
const chartData = ref<Record<string, Array<{ date: string; value: number }>>>(
  {}
);
const chartDiv = ref<HTMLDivElement | null>(null);

let chart: am5xy.XYChart | undefined; // Hold a reference to the chart
let root: am5.Root | undefined; // Hold a reference to the root

// Fetch data on mounted
onMounted(async () => {
  await fetchPopulationLineChart();
});

// Cleanup the chart instance before unmounting
onBeforeUnmount(() => {
  disposeChart(); // Dispose of the chart and root
});

// Watch for changes in populationLineChartDays and update the chart
watch(
  populationLineChartDays,
  (newVal) => {
    if (!newVal || newVal.length === 0) return;

    const regions = newVal[0];
    const entries = newVal[1];

    // Clear previous chart data
    chartData.value = {};

    // Extract and organize data
    entries.forEach((entry) => {
      const region = entry.Region;
      const date = new Date(entry.end_day).toISOString().split("T")[0];
      const value = entry.questionnare_cnt;

      if (!chartData.value[region]) {
        chartData.value[region] = [];
      }

      chartData.value[region].push({
        date: date,
        value: value,
      });
    });

    // Dispose of the old chart before creating a new one
    disposeChart();

    // Create the new chart
    if (Object.keys(chartData.value).length > 0) {
      setTimeout(() => createChart(chartData.value, regions), 0);
    } else {
      console.warn("No data available to create chart.");
    }
  },
  { deep: true } // Ensure deep watching of populationLineChartDays
);

// Function to dispose of the chart and root
function disposeChart() {
  if (chart) {
    chart.dispose();
    chart = undefined;
  }
  if (root) {
    root.dispose();
    root = undefined; // Dispose of the root to avoid multiple instances
  }
}

// Function to create or update the chart
function createChart(
  data: Record<string, Array<{ date: string; value: number }>>,
  regions: string[]
) {
  // Ensure chartDiv is present
  if (!chartDiv.value) return;

  // Create root element (dispose the previous root if necessary)
  root = am5.Root.new(chartDiv.value);

  const myTheme = am5.Theme.new(root);
  myTheme.rule("AxisLabel", ["minor"]).setAll({ dy: 1 });
  myTheme.rule("Grid", ["x"]).setAll({ strokeOpacity: 0.05 });
  myTheme.rule("Grid", ["x", "minor"]).setAll({ strokeOpacity: 0.05 });

  root.setThemes([am5themes_Animated.new(root), myTheme]);

  // Create chart
  chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    })
  );

  chart.get("colors").set("step", 3);

  // Create axes
  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      tooltip: am5.Tooltip.new(root, {}),
      dateFormats: {
        day: "dd MMM",
      },
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Add series for each region with default colors
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: region,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
          background: am5.Rectangle.new(root, {
            fillOpacity: 0.8,
          }),
          label: am5.Label.new(root, {
            fill: am5.color(0xffffff), // Set the text color to white
          }),
        }),
      })
    );

    // Convert dates to timestamps and set data for the series
    const formattedData = data[region].map((entry) => ({
      date: new Date(entry.date).getTime(), // Convert date to timestamp
      value: entry.value,
    }));

    series.data.setAll(formattedData);
    series.appear();
  }

  // Add legend
  const legend = chart.bottomAxesContainer.children.push(
    am5.Legend.new(root, {
      width: am5.percent(100),
      height: am5.percent(20), // Adjust height for grid layout
      paddingLeft: 15,
      paddingTop: 15,
      marginBottom: 20,
      layout: root.horizontalLayout, // Use horizontal layout for grid structure
    })
  );


  // Function to update legend layout based on screen size
  function updateLegendLayout() {
    if (window.innerWidth <= 768) {
      // Adjust the width threshold as needed for mobile
      legend.set(
        "layout",
        am5.GridLayout.new(root, {
          orientation: "horizontal",
          maxColumns: 1,
        })
      );
      legend.set("marginBottom", Object.keys(chartData.value).length * 15); // Adjust marginBottom for mobile
    }
    if (window.innerWidth <= 1024) {
      // Adjust the width threshold as needed for tablets
      legend.set(
        "layout",
        am5.GridLayout.new(root, {
          orientation: "horizontal",
          maxColumns: 2,
        })
      );
      legend.set("marginBottom", Object.keys(chartData.value).length * 10); // Adjust marginBottom for tablets
    } else {
      legend.set(
        "layout",
        am5.GridLayout.new(root, {
          orientation: "horizontal",
          maxColumns: 20, // Set grid size to 20
        })
      );
      legend.set("marginBottom", Object.keys(chartData.value).length * 8); // Adjust marginBottom for larger screens
    }

    // else {
    //   legend.set(
    //     "layout",
    //     am5.GridLayout.new(root, {
    //       orientation: "horizontal",
    //       maxColumns: 20, // Set grid size to 20
    //     })
    //   );
    //   legend.set("marginBottom", Object.keys(chartData.value).length * 8); // Adjust marginBottom for larger screens
    // }
  }

  // Initial layout update
  updateLegendLayout();

  // Update layout on window resize
  window.addEventListener("resize", updateLegendLayout);
  // Configure legend to display as a grid

  // Set legend items
  legend.data.setAll(chart.series.values);

  // Add a cursor
  let cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      behavior: "none",
    })
  );

  cursor.lineY.set("visible", false);

  // Chart animation
  chart.appear(1000, 100);
}
</script>

<style scoped>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
