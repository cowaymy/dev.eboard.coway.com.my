<template>
    <v-row>
        <v-col cols="12" md="3" class="align-center">
            <v-card  class="scroll-card">
                <v-card-text >
                    <apexchart   ref="chart" type="bar" :options="chartOptions" :series="chartSeries" height="350"  @click="handleChartClick"/>
                </v-card-text >
            </v-card>
        
        </v-col>
        
        <v-col cols="12" md="9" >
            <v-card class="scroll-card">
                <v-card-text >
                        <apexchart ref="chart2" type="bar" :options="chartOptions2" :series="chartSeries2" height="350"  />

                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="4">
            <netSalesLevel2Report/>
        </v-col>
        
        <v-col cols="12" md="4">
          <netSalesLevel3Report/>
        </v-col>
              
        <v-col cols="12" md="4">
          <netSalesLevel4Report/>
        </v-col>
    </v-row>
  </template>
  
  <script>
import VueApexCharts from "vue-apexcharts";
import netSalesLevel2Report from "./netSalesLevel2Report";
import netSalesLevel3Report from "./netSalesLevel3Report";
import netSalesLevel4Report from "./netSalesLevel4Report";

import store from "@/store";
import netSalesStoreModule from "./netSalesStoreModule";
const  performanceNetSales  = "appPerformanceNetSales";


export default {
    components: {
      apexchart: VueApexCharts,netSalesLevel2Report ,netSalesLevel3Report,netSalesLevel4Report
    },
    data() {
      
      if (!store.hasModule(performanceNetSales)) {
          store.registerModule( performanceNetSales,netSalesStoreModule );
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
                    delay: 250
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            events: {
                click: function(event, chartContext, config) {
                    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                    console.log(event);
                }
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: ['NetSales'], // X축 카테고리
          },
          legend: {
            position: 'top',
          },
          fill: {
            opacity: 10,
          },
         
        },
        selectedBarIndex: null, // 클릭된 막대 그래프의 인덱스를 저장하는 변수
      };
    },


    computed: {
        chartSeries2() {
          return[
              {
                name: '당월 NetSales',
                data : this.$store.state.appPerformanceNetSales.dataNameItemNetSalesLevel1List
              },
              {
                name: '전월 NetSales',
                data : this.$store.state.appPerformanceNetSales.dataNameItemPMNetSalesLevel1List
              },
              {
                name: '전년 동월 NetSales',
                data : this.$store.state.appPerformanceNetSales.dataNameItemPYNetSalesLevel1List
              }
         ]
        },


        chartSeries(){
             return  [
                    {
                      name: '당월 NetSales',
                      data: this.$store.state.appPerformanceNetSales.dataNameItemCTotalNetSalesLevel1List, 
                    },
                    {
                      name: '전월 NetSales',
                      data:this.$store.state.appPerformanceNetSales.dataNameItemPMTotalNetSalesLevel1List, 
                    },
                    {
                      name: '전년동월 NetSales',
                      data: this.$store.state.appPerformanceNetSales.dataNameItemPYTotalNetSalesLevel1List,
                    }
            ]
        },


        likesSomeTarget() {
             return this.selectedFilter.length > 0 && !this.clickAllTarget;
        },

        categories(){
          return this.$store.state.appPerformanceNetSales.dataNameItemLevel1List;
        },

        chartOptions2() {
           return { 
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
                              delay: 250
                          },
                          dynamicAnimation: {
                              enabled: true,
                              speed: 350
                          }
                },
                events: {
                      click: function(event, chartContext, config) {
                          const ov = {index:config.dataPointIndex};
                          store.dispatch(`${performanceNetSales}/fetchLevel2Events`,ov);
                      }
                  }
                },
                plotOptions: {
                    bar: {
                      horizontal: false,
                    },
                },
                xaxis: {
                    categories: this.categories
                },
                legend: {
                    position: 'top',
                },
                fill: {
                    opacity: 10,
                },
            }
        },

    
    },
    
    methods:{

        getCTotoalNetSalesforLevel1categories() {
            store.dispatch(`${performanceNetSales}/fetchGetTotalNestSalesLevel1`);
        },
      
        getNameforLevel1categories() {
          store.dispatch(`${performanceNetSales}/fetchGetNameLevel1`);
        },

        getCNetSalesforLevel1categories(){
          store.dispatch(`${performanceNetSales}/fetchGetNestSalesLevel1`);
        },


        handleChartClick(event, chartContext, config) {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            // 클릭된 막대 그래프의 인덱스를 저장
            this.selectedBarIndex = dataPointIndex;

            console.log(seriesIndex)
            console.log(config)

            this.getNameforLevel1categories();
            this.getCNetSalesforLevel1categories();

            
        },
        
       

        // getBarColor(index) {
        //     console.log(index)
        //     // 클릭된 막대 그래프의 인덱스와 현재 막대 그래프의 인덱스가 같으면 특정 색상으로 변경
        //     return index === this.selectedBarIndex ? '#FF5733' : null;
        // },
      },

      created(){
          this.getCTotoalNetSalesforLevel1categories();
      },

    
  };
  </script>
  

  <style scoped>
    .scroll-card {
        overflow-x: auto;
    }
  </style>