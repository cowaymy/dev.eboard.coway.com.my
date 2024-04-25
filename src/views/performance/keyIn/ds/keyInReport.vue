<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-alert border="left" color="black" dark elevation="1">
              <div class="nocard">keyIn e-Performance</div>
            </v-alert>
        </v-col>

        <v-col cols="12" md="6" class="align-center">
  
            <v-card  class="scroll-card">
              <v-overlay :value="loading">
                    <v-progress-circular
                      indeterminate
                      color="info"
                    ></v-progress-circular>
                  </v-overlay>

                  <v-card-title class="align-start">
                    <p class="font-weight-semibold text-xl pt-1 ps-2">
                      KeyIn 
                    </p>
                    <v-spacer></v-spacer>
                    <v-btn  icon class="me-n3 mt-n1" @click="gotoRefresh()">
                      <v-icon>
                        {{ icons.mdiRefresh  }}
                      </v-icon>
                    </v-btn>
                </v-card-title>

               

                <v-card-text >
                       <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <apexchart
                              id="chart-sales-overview"
                              :options="chartOptions"
                              :series="chartData"
                              height="350" 
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
                                <p class="text--primary mb-0 text-base font-weight-semibold  " >
                                  Total keyin
                                </p>
                                
                                
                                <span class="text--primary font-weight-semibold text-xl ">
                                    {{sUMValue()}}
                                </span>
                              </div>
                            </div>
                  
                            <v-divider class="my-6"></v-divider>
                  
                            <table class="sales-overview-stats-table">
                                <tr>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot  d-inline-block rounded-circle me-2"></div>
                                      <span class="font-weight-semibold">(R)</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                                      <span>Active</span>
                                    </div>
                                    <span  class="red--text text-base font-weight-semibold ms-4 text-right" > 
                                      {{typeValue('R_ACTIVE')}}
                                    </span>
                                  </td>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot completed d-inline-block rounded-circle me-2"></div>
                                      <span>Completed</span>
                                    </div>
                                    <span class="text-base text--primary font-weight-semibold ms-4 text-right">{{typeValue('R_COMPLTED')}}</span>
                                  </td>

                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot warning d-inline-block rounded-circle me-2"></div>
                                      <span>Cancelled</span>
                                    </div>
                                    <span class="text-base text--primary font-weight-semibold ms-4 text-right">{{typeValue('R_CANCELLED')}}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="4"> <v-divider class="my-6"></v-divider></td>
                                </tr>
                               
                                <tr>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot d-inline-block rounded-circle me-2"></div>
                                      <span class="font-weight-semibold">(O)</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                                      <span>Active</span>
                                    </div>
                                    <span class="red--text text-base  font-weight-semibold ms-4">{{typeValue('O_ACTIVE')}}</span>
                                  </td>
                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot completed d-inline-block rounded-circle me-2"></div>
                                      <span>Completed</span>
                                    </div>
                                    <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('O_COMPLTED')}}</span>
                                  </td>

                                  <td>
                                    <div class="mb-0">
                                      <div class="stats-dot warning d-inline-block rounded-circle me-2"></div>
                                      <span>Cancelled</span>
                                    </div>
                                    <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('O_CANCELLED')}}</span>
                                  </td>
                                </tr>
                              </table>
                          </v-col>
                        </v-row>
                
                 </v-card-text >
                 <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="showList" outlined icon class="me-n3 mt-n1" @click="getKeinList()">
                      <v-icon>
                        {{ icons.mdiFormatListNumbered  }}
                      </v-icon> 
                    </v-btn>
                 </v-card-actions>
            </v-card>

        </v-col>


        
        <v-col cols="12" md="6" >
          <v-tabs v-model="tab"  >
                    <v-tab v-for="(item, index) in items" :key="index">
               
                      <span class="text-base font-weight-semibold">{{ item }}</span>  
                      <v-icon end>
                        {{icons.mdiArrowRightThick }}
                      </v-icon>
                    
                    </v-tab>
                    <v-tab-item v-for="(item, index) in items" :key="index">
                      <keyInCCPReport v-if="item =='CCP' "  :title="item" ></keyInCCPReport>
                      <keyInECASHReport v-if="item =='E-CASH' "  :title="item" ></keyInECASHReport>
                      <keyInCALLLOGReport v-if="item =='CALL LOG' "  :title="item" ></keyInCALLLOGReport>
                      <keyInINSTALLReport v-if="item =='INSTALL' "  :title="item" ></keyInINSTALLReport>
                    </v-tab-item>
          </v-tabs>
        </v-col>

        <v-col cols="12">
          
          <orderList v-if="showList"></orderList>
        </v-col>
        
        <v-col cols="12" md="4">
        </v-col>
              
        <v-col cols="12" md="4">
        </v-col>
    </v-row>
  </template>
  
  <script>

import {
  mdiArrowRightThick ,mdiArrowExpandDown ,mdiArrowCollapseRight,mdiRefresh ,mdiFormatListNumbered  
} from "@mdi/js";

import apexchart from "vue-apexcharts";

import store from "@/store";
import keyInStoreModule from "./keyInStoreModule";
const  performanceKeyIn  = "appPerformanceKeyIn";

import keyInCALLLOGReport from './keyInCALLLOGReport.vue';
import keyInCCPReport from './keyInCCPReport.vue';
import keyInINSTALLReport from './keyInINSTALLReport.vue';
import keyInECASHReport from './keyInECASHReport.vue';
import orderList from './orderList.vue';



export default {
    components: {
      apexchart , keyInCALLLOGReport ,keyInCCPReport ,keyInINSTALLReport ,keyInECASHReport ,orderList
    },

      
    data() {
      
      if (!store.hasModule(performanceKeyIn)) {
          store.registerModule( performanceKeyIn,keyInStoreModule );
      }

      const refetchData = hideOverlay => {
        setTimeout(() => {
          hideOverlay()
        }, 3000)
      }

      return {
        refetchData,
        tab: null,
        items: ['CCP', 'E-CASH', 'CALL LOG' ,'INSTALL'], 
          icons:{
            mdiArrowRightThick,mdiArrowExpandDown ,mdiArrowCollapseRight,mdiRefresh ,mdiFormatListNumbered  
          }
      };
    },


    computed: {

        showList(){
          return this.$store.state.userInfo.memberLevel== 0 ? false :true; 
        },

        loading(){
          return this.$store.state.appPerformanceKeyIn.loading
        },

        chartData(){
          return Object.values(this.$store.state.appPerformanceKeyIn.dataItemTotalKeyinList)
        },

        //series: [7908, 3672, 464],

        chartOptions() {
          return {
                  chart: {
                      type: 'pie',
                  },
                  legend: {
                        enabled: false, // 범례 숨기기
                        show: false,
                  },
                  labels: ['R_ACTIVE', 'R_COMPLTED', 'R_CANCELLED' ,'O_ACTIVE', 'O_COMPLTED', 'O_CANCELLED'],
          }
        }
    },

    mounted() {
       //this.$refs.chart2.on('dblclick', this.chart2HandleChartClick);
    },
    methods:{

        gotoRefresh(){
          this.fetchKeyinReportData();
          this.fetchTotalKeyinReportData();
        },

        getKeinList(){
          store.dispatch(`${performanceKeyIn}/fetchKeyInOrderList`,{title:"Total Keyin Order List"});
        },

        fetchKeyinReportData(){
          store.dispatch(`${performanceKeyIn}/fetchKeyinReportData`);
        },

        fetchTotalKeyinReportData(){
          store.dispatch(`${performanceKeyIn}/fetchTotalKeyinReportData`);
        },

        getWidth(){
          const breakpoint = this.$vuetify.breakpoint;
          if(breakpoint.mobile){
            return  '900'
          }else{
            return  '100%'
          }
        },

        fun_numFormat(number) {
          if(number) return  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //console.log(neFor);
          return null;
        },

        typeValue(v){
           let rtnValue =null ;
           const data = this.$store.state.appPerformanceKeyIn.dataItemTotalKeyinList;
           rtnValue=this.fun_numFormat(data[v])
           return rtnValue;
        },

        sUMValue(){
           let rtnValue =null ;
           const data = this.$store.state.appPerformanceKeyIn.dataItemTotalKeyinList;
           for (const key in data) {
              if (typeof data[key] === 'number') {
                  rtnValue += data[key];
              }
          }
      
           rtnValue=this.fun_numFormat(rtnValue)
           return rtnValue;
        },

        handleChartClick(){}
      },

      created(){
        this.fetchKeyinReportData();
        this.fetchTotalKeyinReportData();
      },

    
  };
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
    .scroll-card {
      width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
      overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
    }

    .red--text {
        color: red !important; /* !important를 사용하여 기존 스타일을 덮어씁니다. */
      }

  }
  </style>
 



