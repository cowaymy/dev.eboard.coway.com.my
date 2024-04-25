<template>
  
    <v-card>
        <v-divider ></v-divider>
      <v-card-title class="text--primary mb-0 text-base font-weight-semibold">
 
        <span>Install Overview</span>
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
              :options="chartOptions"
              :series="chartData"
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
                   Ready To Install
                </p>
                
                
                <span class=" text--primary font-weight-semibold text-xl">{{callLogActive('Ready To Install')}} + ({{CallLogValue('Ready To Install(C)')}})</span>
              </div>
            </div>
  
            <v-divider class="my-6"></v-divider>
  
            <table class="sales-overview-stats-table">
              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                    <span>Active</span>
                  </div>
                  <span class="text-base red--text font-weight-semibold ms-4">{{typeValue('Active')}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot warning d-inline-block rounded-circle me-2"></div>
                    <span>Failed</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Failed')}}</span>
                </td>
              </tr>
              <!-- <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot primary d-inline-block rounded-circle me-2"></div>
                    <span>FMCG</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">$30,234</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot secondary d-inline-block rounded-circle me-2"></div>
                    <span>Other Sales</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">$46,054</span>
                </td>
              </tr> -->
            </table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="showList" outlined icon class="me-n3 mt-n1" @click="getKeinListINSTALL()">
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
        loading(){
          return this.$store.state.appPerformanceKeyIn.loading
        },

        showList(){
          return this.$store.state.userInfo.memberLevel== 0 ? false :true; 
        },

        chartData(){
          let data =[];
           this.$store.state.appPerformanceKeyIn.dataItemINSTALLList.forEach(element => {
            data.push(element.data)
           });
          return data;
        },

        colors(){
           let color =[];
           this.$store.state.appPerformanceKeyIn.dataItemINSTALLList.forEach(element => {
              //console.log(element);
              if(element.name=='Active') color.push('#1874f5')
              else if(element.name=='Failed') color.push('#FFB400')
           }); 
           return color;
        },



        chartOptions(){
          return  {
              labels: [ 'Failed','Active'],
              chart: {
                type: 'donut',
                sparkline: {
                  enabled: true,
                },
              },
              colors: this.colors,  //['#FFB400','#1874f5'],
              plotOptions: {
                pie: {
                  donut: {
                    size: '70%',
                    labels: {
                      show: true,
                      name: {
                        fontSize: '14px',
                        offsetY: 25,
                      },
                      value: {
                        fontSize: '2.125rem',
                        fontWeight: 600,
        
                        offsetY: -15,
                        formatter(value) {
                          return `${value}`
                        },
                      },
                      total: {
                        show: true,
                        label: 'result of Call Log',
                        color: 'rgba(94, 86, 105, 0.68)',
                        formatter(value) {
                          return `${value.globals.seriesTotals.reduce((total, num) => total + num)}`
                        },
                      },
                    },
                  },
                },
              },
            }
        }
    },

    methods:{
        fun_numFormat(number) {
        if(number) return  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //console.log(neFor);
        return null;
      },

      typeValue(v){
          let rtnValue =null ;
          this.$store.state.appPerformanceKeyIn.dataItemINSTALLList.forEach(element => {
           
            if(element.name ==v) {
                rtnValue =this.fun_numFormat(element.data)
            } 
          });
          return rtnValue;
        },

        callLogActive(v){
          let rtnValue =null ;
          this.$store.state.appPerformanceKeyIn.dataItemCALLLOGORGList.forEach(element => {
           
            if(element.name ==v) {
                rtnValue =this.fun_numFormat(element.data)
            } 
          });

          return rtnValue;
        },

        getKeinListINSTALL(){
          store.dispatch('appPerformanceKeyIn/fetchKeyInOrderListForINSTALL',{title:" Install Order List"});
        },
        CallLogValue(v){
          let rtnValue =null ;
          this.$store.state.appPerformanceKeyIn.dataItemCALLLOGORGList.forEach(element => {
           
            if(element.name ==v) {
                rtnValue =this.fun_numFormat(element.data)
            } 
          });

          return rtnValue;
        },


    },

    data() {
  
      return {

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
  