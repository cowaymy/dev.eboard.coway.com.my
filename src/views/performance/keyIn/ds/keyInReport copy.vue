<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-alert border="left" color="black" dark elevation="1">
              <div class="nocard">keyIn e-Performance</div>
            </v-alert>
        </v-col>

        <v-col cols="12" md="4" class="align-center">
            <v-card  class="scroll-card">
       
              <v-overlay :value="loading">
                    <v-progress-circular
                      indeterminate
                      color="info"
                    ></v-progress-circular>
                  </v-overlay>

                <v-card-title class="font-weight-semibold text-xl pt-1 ps-2">
                  KeyIn   
                </v-card-title>

                <v-card-text >
                    <apexchart id ='chart-sales-overview'     class="h-full d-flex align-center"
                       ref="chart" type="pie" :options="chartOptions" :series="series"   @dataPointSelection="handleChartClick"/>
                </v-card-text >
                <v-card-text class="align-center" >
                  <table class="sales-overview-stats-table">
                    <tr>
                      <td>
                        <div class="mb-0">
                          <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                          <span>Active</span>
                        </div>
                        <span class="text-base text--primary font-weight-semibold ms-4">7,908</span>
                      </td>
                      <td>
                        <div class="mb-0">
                          <div class="stats-dot completed d-inline-block rounded-circle me-2"></div>
                          <span>Completed</span>
                        </div>
                        <span class="text-base text--primary font-weight-semibold ms-4">6,853</span>
                      </td>
                    </tr>
                    <tr> 
                      <td>
                        <div class="mb-0">
                          <div class="stats-dot warning d-inline-block rounded-circle me-2"></div>
                          <span>Cancelled</span>
                        </div>
                        <span class="text-base text--primary font-weight-semibold ms-4">7,51</span>
                      </td>
                      <td>
                        <div class="mb-0">
                          <div class="stats-dot error d-inline-block rounded-circle me-2"></div>
                          <span>!RANTAL</span>
                        </div>
                        <span class="text-base text--primary font-weight-semibold ms-4">43</span>
                      </td>
                    </tr>
                  </table>
                </v-card-text >
            </v-card>
        </v-col>


        
        <v-col cols="12" md="8" >
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

        <v-col cols="12" md="4">
        </v-col>
        
        <v-col cols="12" md="4">
        </v-col>
              
        <v-col cols="12" md="4">
        </v-col>
    </v-row>
  </template>
  
  <script>

import {
  mdiArrowRightThick ,mdiArrowExpandDown 
} from "@mdi/js";

import apexchart from "vue-apexcharts";

import store from "@/store";
import keyInStoreModule from "./keyInStoreModule";
const  performanceKeyIn  = "appPerformanceKeyIn";

import keyInCALLLOGReport from './keyInCALLLOGReport.vue';
import keyInCCPReport from './keyInCCPReport.vue';
import keyInINSTALLReport from './keyInINSTALLReport.vue';
import keyInECASHReport from './keyInECASHReport.vue';


export default {
    components: {
      apexchart , keyInCALLLOGReport ,keyInCCPReport ,keyInINSTALLReport ,keyInECASHReport
    },
    data() {
      
      if (!store.hasModule(performanceKeyIn)) {
          store.registerModule( performanceKeyIn,keyInStoreModule );
      }


      return {
        tab: null,
        items: ['CCP', 'E-CASH', 'CALL LOG' ,'INSTALL'], 
        series: [7908, 3672, 464],
        chartOptions: {
            chart: {
              height: 350,
              type: 'pie',
            },
         
            legend: {
                enabled: false // 범례 숨기기
            },
            labels: ['Active', 'Completed', 'Cancelled',],
          },
          icons:{
            mdiArrowRightThick,mdiArrowExpandDown 
          }

      };
    },


    computed: {
        loading(){
          return this.$store.state.appPerformanceKeyIn.loading
        },
        
    },

    mounted() {
       //this.$refs.chart2.on('dblclick', this.chart2HandleChartClick);
    },
    methods:{

        fetchKeyinReportData(){
          store.dispatch(`${performanceKeyIn}/fetchKeyinReportData`);
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

        

        handleChartClick(){}
      },

      created(){
        this.fetchKeyinReportData();
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

  }
  </style>
 



