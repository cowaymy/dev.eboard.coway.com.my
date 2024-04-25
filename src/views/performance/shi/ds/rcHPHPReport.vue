<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-alert border="left" color="black" dark elevation="1">
              <div class="nocard">SHI e-Performance</div>
            </v-alert>
        </v-col>

        <v-col cols="12" md="5" class="align-center">
            <v-card  class="scroll-card">
              <v-overlay :value="loading">
                    <v-progress-circular
                      indeterminate
                      color="info"
                    ></v-progress-circular>
                  </v-overlay>
                <v-card-text >
                    <apexchart   ref="chart" type="bar" :options="chartOptions" :series="chartSeries" height="350"  @dataPointSelection="chart2HandleChartClick"/>
                </v-card-text >
            </v-card>
        </v-col>
        
        <v-col cols="12" md="7" >
            <v-card  >
                <v-card-text class="scroll-card" >
                   <rcHPLevel4Report></rcHPLevel4Report>
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
import rcHPLevel4Report from "./rcHPLevel4Report";

import store from "@/store";
import rcHPStoreModule from "./rcHPStoreModule";
const  performanceRcHP  = "appPerformanceRcHP";

export default {
    components: {
      apexchart ,rcHPLevel4Report
    },
    data() {
      
      if (!store.hasModule(performanceRcHP)) {
          store.registerModule( performanceRcHP,rcHPStoreModule );
      }

      return {
        chartData :[],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: false, // 멀티 막대 차트를 스택으로 설정합니다.
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 20
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: ['SHI'], // X축 카테고리
          },
         
          fill: {
            opacity: 10,
          },
          cursorStyle: 'default',
        },
        selectedBarIndex: null, // 클릭된 막대 그래프의 인덱스를 저장하는 변수
      };
    },


    computed: {
        loading(){
          return this.$store.state.appPerformanceRcHP.loading
        },

        chartSeries2() {
        return[
            {
              name: 'Current month',
              data : this.$store.state.appPerformanceRcHP.dataNameItemNetSalesLevel1List
            },
            {
              name: 'Prev month',
              data : this.$store.state.appPerformanceRcHP.dataNameItemPMNetSalesLevel1List
            },
            {
              name: 'Last Year same month',
              data : this.$store.state.appPerformanceRcHP.dataNameItemPYNetSalesLevel1List
            }
       ]
      },

        chartSeries(){
           return  [
                  {
                    name: 'Curr.Month',
                    data: this.$store.state.appPerformanceRcHP.dataNameItemCTotalLevel1List, 
                  },
                  {
                    name: 'Prev.Month',
                    data:this.$store.state.appPerformanceRcHP.dataNameItemPMTotalLevel1List, 
                  },
                  {
                    name: 'Last yr.same Month',
                    data: this.$store.state.appPerformanceRcHP.dataNameItemPYTotalLevel1List,
                  }
          ]
      },


        likesSomeTarget() {
             return this.selectedFilter.length > 0 && !this.clickAllTarget;
        },

        categories(){
          return this.$store.state.appPerformanceRcHP.dataNameItemLevel1List;
        },

        chartOptions2() {
           return { 
                chart: {
                      type: 'bar',
                      height: 350,
                      width : this.getWidth(),
                      stacked: false, // 멀티 막대 차트를 스택으로 설정합니다.
                      animations: {
                          enabled: true,
                          easing: 'easeinout',
                          speed: 800,
                          animateGradually: {
                              enabled: true,
                              delay: 50
                          },
                          dynamicAnimation: {
                              enabled: true,
                              speed: 350
                          }
                      },
                },
                plotOptions: {
                    bar: {
                      horizontal: false,
                    },
                },
                xaxis: {
                    categories: this.categories,
                    tickPlacement: 'on'
                },
                // legend: {
                //     position: 'top',
                // },
                fill: {
                    opacity: 10,
                },

                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: true,
                  },
            }
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

        getCTotoalRcHpforLevel1categories() {
          store.dispatch(`${performanceRcHP}/fetchGetTotalRCHPLevel1`);
        },
    
        getNameforLevel1categories() {
          store.dispatch(`${performanceRcHP}/fetchGetNameLevel1`);
        },

        getCRcforLevel1categories(){
          store.dispatch(`${performanceRcHP}/fetchRcHPLevel1`);
        },


        handleChartClick(event, chartContext, config) {
            //const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            // 클릭된 막대 그래프의 인덱스를 저장
            this.selectedBarIndex = dataPointIndex;

            //this.getNameforLevel1categories();
            this.getCRcforLevel1categories();
        },

        chart2HandleChartClick(event, chartContext, config){

              const dataPointIndex = config.dataPointIndex;
              //console.log('클릭 이벤트' ,dataPointIndex)

              this.$store.state.appPerformanceRcHP.dataItemLevel4List  =[];
         
              const param ={};
              param.deptCode =  this.$store.state.appPerformanceRcHP.dataNameItemLevel1List[dataPointIndex];
              store.dispatch(`${performanceRcHP}/fetchLevel4Events`,param);
        }
      },

      created(){
          this.getCTotoalRcHpforLevel1categories();
      },

    
  };
  </script>
  

  <style >
 


  .scroll-card {
    width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
    overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
  }

      
  </style>