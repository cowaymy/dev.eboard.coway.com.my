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
            {{ totalsales }}
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

  methods: {
    setData() {
      // this.totalsales = request.data.data[0];

      this.totalsales = this.fun_numFormat(
        store.state.app_salseEpapan.apiTargetData.data[0].TARGET_AMT
      );

      let _totalsales = Number(
        store.state.app_salseEpapan.apiTargetData.data[0].TARGET_AMT
      );
      let _netsales = Number(
        store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES
      );
      //console.log('_totalsales', _totalsales);
      //console.log('_netsales', _netsales);

      //this.chartSeries.push(_totalsales);
      this.chartSeries.push(Math.round((_netsales / _totalsales) * 100));
    },
    // getNetSaleAmt() {
    // 	let chartSeries = [];
    // 	chartSeries[0] =
    // 		store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES;

    // 	console.log(chartSeries);
    // 	return chartSeries;
    // },
    // async callApiTargetData() {
    // 	try {
    // 		const userInfo = this.$store.state.userInfo;
    // 		return await salesApi.getTargetData(userInfo);
    // 	} catch (error) {
    // 		console.log(error);
    // 	}
    // },
    fun_numFormat(number) {
      if (number != undefined) {
        const neFor = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //console.log(neFor);
        return neFor;
      }
    },

    // },
    // 	this.totalsales = store.state.app_salseEpapan.apiTargetData[0].TARGET_AMT;
    // 	let _totalsales = Number(this.totalsales);
    // 	let _netsales = Number(
    // 		store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES,
    // 	);
  },

  watch: {
    isDoneTartgetApi(val) {
      console.log("isDoneCurMonthApi :", this.isDoneCurMonthApi);
      if (val && this.isDoneCurMonthApi) {
        console.log(store.state.app_salseEpapan.apiTargetData);
        this.setData();
      } else {
        this.totalsales = 0;
      }
    },

    isDoneCurMonthApi(val) {
      console.log("isDoneCurMonthApi :", this.isDoneCurMonthApi);
      if (val && this.isDoneTartgetApi) {
        console.log(store.state.app_salseEpapan.apiTargetData);
        this.setData();
      }
    },
  },

  computed: {
    // ...mapState({
    // 	loginInfo: state => store.state.app_salseEpapan.apiTargetData,
    // }),
    // totalsalesAmt() {
    // 	let rtnValue = 0;
    // 	if (this.doneTartgetApi) {
    // 		console.log(store.state.app_salseEpapan.apiTargetData);
    // 		this.fun_numFormat(
    // 			util.checkNull(
    // 				store.state.app_salseEpapan.apiTargetData[0].TARGET_AMT,
    // 			),
    // 		);
    // 	}
    // 	console.log(rtnValue);
    // 	return rtnValue;
    // },
    // 	this.totalsales = store.state.app_salseEpapan.apiTargetData[0].TARGET_AMT;
    // 	let _totalsales = Number(this.totalsales);
    // 	let _netsales = Number(
    // 		store.state.app_salseEpapan.apiCurMonthData.data[0].SAL_NET_SALES,
    // 	);
    // 	console.log('_totalsales', _totalsales);
    // 	console.log('_netsales', _netsales);
  },

  created() {
    // this.callApiTargetData().then(request => {
    // 	console.log(request);
    // 	request.data.data.forEach(function (v) {
    // 		//console.log(v.RATE);
    // 		//cData = v.RATE;
    // 	});
    // 	//console.log(vRate);
    // });
    //this.setData();
    //this.getApiTargetData();
    // //isDoneTartgetApi(val) {
    // console.log('===========>', this.isDoneTartgetApi);
    // //clearTimeout(this.timer);
    // if (this.isDoneTartgetApi) {
    // 	console.log(store.state.app_salseEpapan.apiTargetData);
    // 	this.totalsales = this.fun_numFormat(
    // 		util.checkNull(store.state.app_salseEpapan.apiTargetData[0].TARGET_AMT),
    // 	);
    // } else {
    // 	this.totalsales = 0;
    // }
    //},
  },

  data() {
    const chartSeries = [];

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

    // const chartOptions = {
    // 	chart: {
    // 		offsetY: 2,
    // 		type: 'radialBar',
    // 	},
    // 	colors: ['#56C6F6'],
    // 	plotOptions: {
    // 		radialBar: {
    // 			hollow: {
    // 				margin: 15,
    // 				size: '70%',
    // 			},

    // 			dataLabels: {
    // 				showOn: 'always',
    // 				name: {
    // 					offsetY: 0,
    // 					show: true,
    // 					color: '#888',
    // 					fontSize: '23px',
    // 				},
    // 				value: {
    // 					color: '#111',
    // 					fontSize: '30px',
    // 					show: true,
    // 				},
    // 			},
    // 		},
    // 	},
    // 	labels: ['Total'],
    // };

    return {
      chartSeries,
      chartOptions,
      chartOptions2,
      totalsales: {},
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
