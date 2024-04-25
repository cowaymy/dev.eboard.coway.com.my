<template>
  
    <v-card>
        <v-divider ></v-divider>
      <v-card-title class="font-weight-semibold text-xl pt-1 ps-2">
        <span>Call Log Overview</span>
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
                   e-cash Completed 
                </p>
                <span class="text--primary font-weight-semibold text-xl">{{eCompleted}}</span>
              </div>
            </div>
  
            <v-divider class="my-6"></v-divider>
  
            <table class="sales-overview-stats-table">
              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot completed d-inline-block rounded-circle me-2"></div>
                    <span>Ready To Install</span>
                  </div>
                  <span class="text-base red--text font-weight-semibold ms-4">{{typeValue('Ready To Install')}} + ({{typeValue('Ready To Install(C)')}})</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                    <span>Recall</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Recall')}}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot warning  d-inline-block rounded-circle me-2"></div>
                    <span>Waiting For Cancel</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Waiting For Cancel')}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active d-inline-block rounded-circle me-2"></div>
                    <span>Active</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Active')}}</span>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot active  d-inline-block rounded-circle me-2"></div>
                    <span>Inactive</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Inactive')}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot secondary d-inline-block rounded-circle me-2"></div>
                    <span>Closed</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Closed')}}</span>
                </td>
              </tr>


              <tr>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot secondary  d-inline-block rounded-circle me-2"></div>
                    <span>Pending</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Pending')}}</span>
                </td>
                <td>
                  <div class="mb-0">
                    <div class="stats-dot secondary d-inline-block rounded-circle me-2"></div>
                    <span>Solved</span>
                  </div>
                  <span class="text-base text--primary font-weight-semibold ms-4">{{typeValue('Solved')}}</span>
                </td>
              </tr>


            </table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  v-if="showList" outlined icon class="me-n3 mt-n1" @click="getKeinListCALL()">
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
          //console.log(this.$store.state.appPerformanceKeyIn.dataItemCALLLOGList)
          return [{data:this.$store.state.appPerformanceKeyIn.dataItemCALLLOGList}]
        },
       
        eCompleted(){
          return this.fun_numFormat(this.$store.state.appPerformanceKeyIn.dataItemECASHList[2])
        },

        categories(){

          //console.log(this.$store.state.appPerformanceKeyIn.dataItemCALLLOGNameList)
          return this.$store.state.appPerformanceKeyIn.dataItemCALLLOGNameList
        },

        comReadyToInstall(){
          //console.log(this.$store.state.appPerformanceKeyIn.dataItemCALLLOGList)
          return null
        },
        colors(){
          //['#0ABF67', '#1874f5', '#FFB400' ,'#0874f5','#0824f5','#8A8D93','#8A8D93','#8A8D93'],
           let color =[];
           this.$store.state.appPerformanceKeyIn.dataItemCALLLOGNameList.forEach(element => {
                //console.log(element);
                if(element=='Solved') color.push('#8A8D93')
                else if(element=='Cancelled') color.push('#8A8D93')
                else if(element=='Pending') color.push('#8A8D93')
                else if(element=='Inactive') color.push('#0824f5')
                else if(element=='Active') color.push('#0874f5')
                else if(element=='Waiting For Cancel') color.push('#FFB400')
                else if(element=='Recall') color.push('#1874f5')
                else if(element=='Ready To Install') color.push('#0ABF67')
                else if(element=='Ready To Install(C)') color.push('#0ABF67')
           });

           return color;
        },


        chartOptions() {
          return { 
              chart: {
                  height: 350,
                  type: 'bar',
                  events: {
                    click: function(chart, w, e) {
                      // console.log(chart, w, e)
                    }
                  }
                },
                colors: this.colors,
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
                  categories: this.categories,
                }
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
          this.$store.state.appPerformanceKeyIn.dataItemCALLLOGORGList.forEach(element => {
           
            if(element.name ==v) {
                rtnValue =this.fun_numFormat(element.data)
            } 
          });

          return rtnValue;
        },

        getKeinListCALL(){
            store.dispatch('appPerformanceKeyIn/fetchKeyInOrderListForCALL',{title:" Call Log Order List"});
        }

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
  