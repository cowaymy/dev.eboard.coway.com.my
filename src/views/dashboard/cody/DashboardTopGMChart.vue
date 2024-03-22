<template>
  <v-card class="stats-card-radial-bar d-flex flex-column">
    <v-card-title class="text-2xl" style="text-align: center">
      GM's sales
    </v-card-title>

    <VueApexCharts
      :options="chartOptions"
      :series="chartData"
      height="130"
    ></VueApexCharts>

    <v-card-text class="font-weight-semibold text-center text--primary">
      (500571)KHOO SOON THEAM
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

import { addAlpha } from "../../../@core/utils";

export default {
  components: {
    VueApexCharts,
  },
  data() {
    const chartOptions = {
      colors: [
        addAlpha("#A9A9A9", 0.1),
        addAlpha("#A9A9A9", 0.1),
        addAlpha("#A9A9A9", 0.1),
        addAlpha("#A9A9A9", 0.1),
        "#1E90FF",
        addAlpha("#A9A9A9", 0.1),
        addAlpha("#A9A9A9", 0.1),
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
          borderRadius: 4,
          startingShape: "rounded",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        show: false,
        categories: ["S", "M", "T", "W", "T", "F", "S"],
        labels: {
          show: false,
        },

        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },
        tickPlacement: "on",
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          right: 10,
          left: -10,
          bottom: -15,
        },
      },
    };

    const chartData = [
      {
        data: [40, 60, 50, 60, 90, 40, 50],
      },
    ];

    return {
      chartOptions,
      chartData,
    };
  },
};
</script>
