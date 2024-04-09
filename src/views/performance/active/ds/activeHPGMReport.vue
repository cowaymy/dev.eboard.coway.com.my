<template>
  <v-row>
      <v-col cols="12" md="12">
          <v-alert border="left" color="black" dark elevation="1">
            <div class="nocard">Active Hp e-Performance</div>
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
              <v-card-text >
                  <apexchart   ref="chart" type="bar" :options="chartOptions" :series="chartSeries" height="350"  @dataPointSelection="handleChartClick"/>
              </v-card-text >
          </v-card>
      </v-col>
      
      <v-col cols="12" md="9" >
          <v-card  >
              <v-card-text class="scroll-card" >
                  <apexchart  ref="chart2" type="bar" :options="chartOptions2" :series="chartSeries2" height="350"   @dataPointSelection="chart2HandleChartClick"  />
              </v-card-text>
          </v-card>

      </v-col>

      <v-col cols="12" md="4">
          <activeHPLevel3Report/>
      </v-col>
      
      <v-col cols="12" md="4">
      </v-col>
            
      <v-col cols="12" md="4">
      </v-col>
  </v-row>
</template>

<script>
import apexchart from "vue-apexcharts";
import activeHPLevel3Report from "./activeHPLevel3Report";

import store from "@/store";
import activeHPStoreModule from "./activeHPStoreModule";
const  performanceActiveHP  = "appPerformanceActiveHP";


export default {
  components: {
    apexchart ,activeHPLevel3Report
  },
  data() {
    
    if (!store.hasModule(performanceActiveHP)) {
        store.registerModule( performanceActiveHP,activeHPStoreModule );
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
          categories: ['Active Hp'], // X축 카테고리
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
        return this.$store.state.appPerformanceActiveHP.loading
      },

      chartSeries2() {
        return[
            {
              name: 'Current month',
              data : this.$store.state.appPerformanceActiveHP.dataNameItemNetSalesLevel1List
            },
            {
              name: 'Prev month',
              data : this.$store.state.appPerformanceActiveHP.dataNameItemPMNetSalesLevel1List
            },
            {
              name: 'Last Year same month',
              data : this.$store.state.appPerformanceActiveHP.dataNameItemPYNetSalesLevel1List
            }
       ]
      },

      chartSeries(){
           return  [
                  {
                    name: 'Curr.Month',
                    data: this.$store.state.appPerformanceActiveHP.dataNameItemCTotalLevel1List, 
                  },
                  {
                    name: 'Prev.Month',
                    data:this.$store.state.appPerformanceActiveHP.dataNameItemPMTotalLevel1List, 
                  },
                  {
                    name: 'Last yr.same Month',
                    data: this.$store.state.appPerformanceActiveHP.dataNameItemPYTotalLevel1List,
                  }
          ]
      },


      likesSomeTarget() {
           return this.selectedFilter.length > 0 && !this.clickAllTarget;
      },

      categories(){
        return this.$store.state.appPerformanceActiveHP.dataNameItemLevel1List;
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

      getCTotoalActiveHpforLevel1categories() {
          store.dispatch(`${performanceActiveHP}/fetchGetTotalActiveHPLevel1`);
      },
    
      getNameforLevel1categories() {
        store.dispatch(`${performanceActiveHP}/fetchGetNameLevel1`);
      },

      getCforLevel1categories(){
        store.dispatch(`${performanceActiveHP}/fetchActiveHPLevel1`);
      },


      handleChartClick(event, chartContext, config) {
          //const seriesIndex = config.seriesIndex;
          const dataPointIndex = config.dataPointIndex;
          // 클릭된 막대 그래프의 인덱스를 저장
          this.selectedBarIndex = dataPointIndex;

          //this.getNameforLevel1categories();
          this.getCforLevel1categories();
      },

      chart2HandleChartClick(event, chartContext, config){

           const dataPointIndex = config.dataPointIndex;
            console.log('클릭 이벤트' ,dataPointIndex)


            const param ={};
            param.grpCode = this.$store.state.appPerformanceActiveHP.dataNameItemLevel1List[dataPointIndex];
            store.dispatch(`${performanceActiveHP}/fetchLevel3Events`,param);

      }
    },

    created(){
        this.getCTotoalActiveHpforLevel1categories();
    },

  
};
</script>


<style >



.scroll-card {
  width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
  overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
}

    
</style>