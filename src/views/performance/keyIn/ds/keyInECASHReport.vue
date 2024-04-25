<template>
  
    <v-card>
        <v-divider ></v-divider>
      <v-card-title class="text--primary mb-0 text-base font-weight-semibold">
        <span>e-Cash Overview</span>
        <v-spacer></v-spacer>
      </v-card-title>
  
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <apexchart
              id="chart-sales-overview"
              :options="chartOptions" :series="chartData"
              class="h-full d-flex align-center"
            ></apexchart>
          </v-col>
  
          <v-col
            cols="12"
            sm="6"
            class="d-flex flex-column justify-center"
          >
            <div class="d-flex align-center">
              <v-avatar
                class="v-avatar-light-bg primary--text"
                rounded
                size="40"
              >
                <v-icon
                  size="30"
                  color="primary"
                >
                  {{ icons.mdiArrowCollapseRight  }}
                </v-icon>
              </v-avatar>
              <div class="ms-4 d-flex flex-column">
                <p class="text--primary mb-0 text-base font-weight-semibold">
                   CCP Approved 
                </p>
                <span class="text--primary font-weight-semibold text-xl">{{CCPApproved}}</span>
              </div>
            </div>
  
            <v-divider class="my-6"></v-divider>
  
            <table class="sales-overview-stats-table">
              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot completed d-inline-block rounded-circle me-2"></div>
                    <span>Completed</span>
                  </div>
                  <span class="text-base red--text font-weight-semibold ms-4">{{eCompleted}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot warning d-inline-block rounded-circle me-2"></div>
                    <span>Rejected</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{eRejected}}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active  d-inline-block rounded-circle me-2"></div>
                    <span>Inactive</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{eInactive}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                    <span>Waiting for ecach</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{WaitingBach}}</span>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="showList" outlined icon class="me-n3 mt-n1" @click="getKeinListECASH()">
          <v-icon>
            {{ icons.mdiFormatListNumbered  }}
          </v-icon> 
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import apexchart from "vue-apexcharts";
  import { mdiDotsVertical, mdiCurrencyUsd ,mdiArrowCollapseRight ,mdiFormatListNumbered} from '@mdi/js'
  import store from "@/store";
  
  export default {
    components: {
        apexchart
    },

    computed: {

        showList(){
          return this.$store.state.userInfo.memberLevel== 0 ? false :true; 
        },
        loading(){
          return this.$store.state.appPerformanceKeyIn.loading
        },

        chartData(){
          return [{data:this.$store.state.appPerformanceKeyIn.dataItemECASHList}]
        },

        eCompleted(){
          return this.fun_numFormat(this.$store.state.appPerformanceKeyIn.dataItemECASHList[2])
        },

        eRejected(){
          return this.fun_numFormat(this.$store.state.appPerformanceKeyIn.dataItemECASHList[1])
        },

        eInactive(){
          return this.fun_numFormat(this.$store.state.appPerformanceKeyIn.dataItemECASHList[0])
        },

        CCPApproved(){
          return this.fun_numFormat(this.$store.state.appPerformanceKeyIn.dataItemCCPList[1])
        },

        WaitingBach(){
          let a =this.$store.state.appPerformanceKeyIn.dataItemECASHList[0];
              a +=this.$store.state.appPerformanceKeyIn.dataItemECASHList[1];
              a +=this.$store.state.appPerformanceKeyIn.dataItemECASHList[2];

          let b = this.$store.state.appPerformanceKeyIn.dataItemCCPList[1];

          return this.fun_numFormat(b -a)
        },
    },

    methods:{
        fun_numFormat(number) {
        if(number) return  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //console.log(neFor);
        return null;
      },

      getKeinListECASH(){
            store.dispatch('appPerformanceKeyIn/fetchKeyInOrderListForECASH',{title:" E-CASH Order List"});
        }

    },
    data() {

      return {
        chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: ['#8A8D93', '#FFB400', '#0abf67'],
            plotOptions: {
              bar: {
                //columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: ['Inactive','Rejected','Completed'],
            }
        },         
        icons: {
          mdiDotsVertical,
          mdiCurrencyUsd,mdiArrowCollapseRight,mdiFormatListNumbered
        },
      }
    },
  }
  </script>
  
  <style lang="scss">
  #chart-sales-overview {
    .apexcharts-canvas {
      .apexcharts-text {
        &.apexcharts-datalabel-value {
          font-weight: 600;
        }
        &.apexcharts-datalabel-label {
          font-size: 1rem;
        }
      }
    }
  }
  
  .sales-overview-stats-table {
    width: 100%;
    td {
      padding-bottom: 1rem;
    }
  
    .stats-dot {
      padding: 0.33rem;
    }
  
    // Set opacity of dots
    tr {
      &:nth-of-type(1) {
        td:nth-of-type(2) {
          .stats-dot {
            opacity: 0.7;
          }
        }
      }
      &:nth-of-type(2) {
        td:nth-of-type(1) {
          .stats-dot {
            opacity: 0.5;
          }
        }
        td:nth-of-type(2) {
          .stats-dot {
            opacity: 0.15;
          }
        }
      }
    }
    
    .red--text {
        color: red !important; /* !important를 사용하여 기존 스타일을 덮어씁니다. */
      }

  }
  </style>
  