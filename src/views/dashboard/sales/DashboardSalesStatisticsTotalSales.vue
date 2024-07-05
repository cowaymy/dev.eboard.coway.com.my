<template>
  <v-card elevation="1">
    <div>
      <div>
        <v-card-title>
          <v-avatar color="white" size="38">
            <v-icon size="24" color="error" class="rounded-0">
              {{ icons.mdiBullseyeArrow }}
            </v-icon>
          </v-avatar>
          Target Sales
        </v-card-title>
      </div>
      <v-card-text>
        <VueApexCharts
          id="chart-stats-total-sales"
          height="150"
          :options="chartOptions"
          :series="chartSeries"
        />
        <div class="font-weight-semibold text-1xl mb-0">
          Target Sales :
          <span class="font-weight-semibold text-2xl primary--text mb-0">
            {{ this.totalsales }} ({{(this.fun_numFormat(this.netsales))}})
          </span>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

import { mdiChevronUp, mdiBullseyeArrow } from "@mdi/js";
import store from "@/store";

export default {
  props: {
    isDoneTartgetApi: Boolean,
    isDoneCurMonthApi: Boolean,
  },
  components: {
    VueApexCharts,
  },

  computed: {
    totalsales(){
      if(Array.isArray(store.state.app_salseEpapan.apiTargetData.data)){
        return   this.fun_numFormat(store.state.app_salseEpapan.apiTargetData.data[0].TARGET_AMT);
      }else {
        return 0;
      }         
    },

    netsales(){
      if(Array.isArray(store.state.app_salseEpapan.apiCurMonthData.data)){
        return  Number( store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES);
      }else {
        return 0;
      }
    } ,
  },

  methods: {
    fun_numFormat(number) {
      if (number != undefined) {
        const neFor = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //console.log(neFor);
        return neFor;
      }
    },
  },

  watch: {
    netsales(val){
      if(Array.isArray(store.state.app_salseEpapan.apiTargetData.data)){
         let _tot = Number( store.state.app_salseEpapan.apiTargetData.data[0].TARGET_AMT);
         let _net = Number( store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES);

         this.chartSeries = [Math.round((_net / _tot) * 100)];
      }
    },

    totalsales(val){
      if(Array.isArray(store.state.app_salseEpapan.apiCurMonthData.data)){
         let _tot = Number( store.state.app_salseEpapan.apiTargetData.data[0].TARGET_AMT);
         let _net = Number( store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES);

         this.chartSeries = [Math.round((_net / _tot) * 100)];
      }
    }
  },

  created() {
   
  },

  data() {
    const chartSeries = [0];

    const chartOptions2 = {
      labels: ["Achieved Sales", "Target Sales"],
      chart: {
        offsetY: 7,
        type: "donut",
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        colors: ["#fff"],
        width: 8,
      },
      grid: {
        padding: {
          bottom: 10,
        },
      },
      colors: ["#FF4500", "#E9EAEC"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "14px",
                offsetY: 25,
              },
              value: {
                offsetY: -13,
                formatter(val) {
                  return val;
                },
              },
              total: {
                show: false,
                label: "Target Sales",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    };
    const chartOptions = {
      chart: {
        type: "radialBar",
        animations: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        colors: ["#fff"],
        width: 50,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Achieved"],
    };
    return {
      chartSeries,
      chartOptions,
      chartOptions2,
      //totalsales: {},
      icons: {
        mdiChevronUp,
        mdiBullseyeArrow,
      },
    };
  },
};
</script>

<style lang="scss">
#chart-stats-total-sales {
  max-width: 100%;
  height: auto;
  .apexcharts-pie {
    .apexcharts-pie-series .apexcharts-pie-area {
      stroke-width: 10;
    }
  }
  .apexcharts-canvas {
    .apexcharts-text {
      &.apexcharts-datalabel-value {
        font-weight: 600;
        font-size: 1.25rem;
      }
      &.apexcharts-datalabel-label {
        font-size: 0.75rem;
        margin-bottom: 2rem;
        transform: translateY(-7px);
      }
    }
  }
}

.v-application {
  &.theme--dark {
    #chart-stats-total-sales {
      path {
        stroke: #312d4b;
      }
    }
  }
}
</style>
