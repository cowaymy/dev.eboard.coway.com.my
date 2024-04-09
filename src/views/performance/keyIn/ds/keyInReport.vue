<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-alert border="left" color="black" dark elevation="1">
              <div class="nocard">keyIn e-Performance</div>
            </v-alert>
        </v-col>

        <v-col cols="12" md="3" class="align-center">
            <v-card  class="scroll-card">
       
              <v-overlay :value="loading">
                    <v-progress-circular
                      indeterminate
                      color="info"
                    ></v-progress-circular>
                  </v-overlay>

                <v-card-title>
                  keyin 
                </v-card-title>

                <v-card-text >
                    <apexchart   ref="chart" type="pie" :options="chartOptions" :series="series" height="350"  @dataPointSelection="handleChartClick"/>
                </v-card-text >
            </v-card>
        </v-col>
        
        <v-col cols="12" md="8" >
            <v-card  >
                <v-card-text class="scroll-card" >
                </v-card-text>
            </v-card>

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
import apexchart from "vue-apexcharts";

import store from "@/store";
import keyInStoreModule from "./keyInStoreModule";
const  performanceKeyIn  = "appPerformanceKeyIn";


export default {
    components: {
      apexchart
    },
    data() {
      
      if (!store.hasModule(performanceKeyIn)) {
          store.registerModule( performanceKeyIn,keyInStoreModule );
      }


      return {
        series: [7908, 3672, 464],
        chartOptions: {
            chart: {
              height: 350,
              type: 'pie',
            },
         
            responsive: [{
              options: {
                legend: {
                  position: 'bottom'
                }
              }
            }],
            labels: ['Active', 'Completed', 'Cancelled',],
          },
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

        getWidth(){
          const breakpoint = this.$vuetify.breakpoint;
          if(breakpoint.mobile){
            return  '900'
          }else{
            return  '100%'
          }
        },

        handleChartClick(){}
      },

      created(){
      
      },

    
  };
  </script>
  

  <style >
 


  .scroll-card {
    width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
    overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
  }

      
  </style>