<template>
  <v-card class="stats-card-radial-bar d-flex flex-column">
    <v-card-title class="align-start">{{ statTitle }} </v-card-title>

    <VueApexCharts
      id="stats-card-radial-bar-chart"
      type="radialBar"
      class="d-flex align-top flex-grow-3"
      :options="chartOptions"
      :series="chartValue"
    ></VueApexCharts>
    <v-card-text class="font-weight-semibold text-center text--primary">
      {{ statTitle }}
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mdiBullseyeArrow } from "@mdi/js";

export default {
  components: { VueApexCharts },
  props: {
    statistics: { type: String, default: "" },
    statTitle: { type: String, default: "" },
    chartSeries: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    console.log(this.chartSeries);
  },
  data() {
    const chartOptions = {
      chart: {
        height: 150,
        width: 100,
        type: "radialBar",
      },
      series: [],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          startAngle: -45,
          endAngle: 45,
          track: {
            background: "#333",
            startAngle: -45,
            endAngle: 45,
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "butt",
      },
      labels: ["NetSales"],
    };
    return {
      chartValue: [],
      chartOptions,
      mdiBullseyeArrow,
    };
  },
};
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}
.font-weight-semibold {
  font-weight: 600 !important;
}
.text-5xl {
  font-size: 3rem !important;
  line-height: 1 !important;
}

.text-3xl {
  font-size: 2.25rem !important;
  line-height: 2rem !important;
  align-items: center;
}

.text-2xl {
  font-size: 1.25rem !important;
  line-height: 2rem !important;
}
.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}
</style>
