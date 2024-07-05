<template>
  <v-row>

    <v-overlay :value="loading">
          <v-progress-circular
          indeterminate
          color="info"
          ></v-progress-circular>
      </v-overlay>

    <v-col cols="12" md="12">
      <v-alert border="left" color="black" dark elevation="1">
        <div class="nocard">Sales e-Performance</div>

        <div align="right">
          <DigitalClock />
        </div>
      </v-alert>
    </v-col>
    <v-col cols="12" md="12"
      ><div align="center">
        <v-alert
          v-model="alert"
          dismissible
          color="#00BFFF"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-twitter"
        >
          <Notification :autoplay="autoplay" />
        </v-alert>
      </div>
    </v-col>

    <v-col cols="12" md="4">
      <DashboardCongratulationBest />
    </v-col>

    <!-- <v-col cols="12" md="8">
			<DashboardStatisticsCard />
		</v-col> -->

    <!-- vertical statistics card -->

    <v-col cols="12" sm="4" md="2">
      <StatisticsCardVertical v-bind="eKeyInData"> </StatisticsCardVertical>
    </v-col>
    <v-col cols="12" sm="4" md="2">
      <StatisticsCardVertical v-bind="NetSalesData"></StatisticsCardVertical>
    </v-col>
    <v-col cols="12" sm="4" md="2">
      <StatisticsCardVertical v-bind="ActiveHpData"></StatisticsCardVertical>
    </v-col>
    <v-col cols="12" sm="4" md="2">
      <StatisticsCardVertical v-bind="SHIData"></StatisticsCardVertical>
    </v-col>

    <v-col cols="12" md="8">
      <DashboardSalesTotalProfit></DashboardSalesTotalProfit>
    </v-col>

    <v-col cols="12" md="4">
      <v-row>
        <v-col cols="12">
          <StatisticsCardSide />
        </v-col>
        <v-col cols="12">
          <!-- <StatisticsCardRadialBarChart
						:stat-title="salesRadialChart.statTitle"
						:statistics="salesRadialChart.statistics"
						:chart-series="salesRadialChart.series"
					>
					</StatisticsCardRadialBarChart> -->
          <DashboardSalesStatisticsTotalSales 
          />
        </v-col>
        <!-- <v-col cols="12" sm="6">
					<DashboardTopGMChart />
				</v-col> -->
      </v-row>
    </v-col>

    <!--/ vertical statistics card -->

    <v-col cols="12" md="3">
      <DashboardCardSalesRankingbyGM />
    </v-col>
    <v-col cols="12" md="3">
      <DashboardCardSalesRankingbySM />
    </v-col>
    <v-col cols="12" md="3">
      <DashboardCardSalesRankingbyHM />
    </v-col>
    <v-col cols="12" md="3">
      <DashboardCardSalesByCountries />
    </v-col>

    <!-- <v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col> -->
    <!-- <v-col cols="12" md="8">
			<DashboardCardDepositAndWithdraw />
		</v-col> -->

    <div v-if="!sheet"></div>
    <div v-else>
      <v-bottom-sheet v-model="sheet" inset>
        <v-sheet class="text-center" height="200px">
          <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
            close
          </v-btn>
          <div class="my-3">
            <v-alert
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
            >
              {{ logMaessage }}
            </v-alert>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-row>
</template>

<!-- 
<template v-if="sheet">
	<div>
		
	</div>
</template> -->

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiClipboardEditOutline,
  mdiAccountGroup,mdiHandCoin,
  mdiHelpCircleOutline,
  mdiTrendingUp,
  mdiAccountCheckOutline,
  mdiMapMarkerRadius,
} from "@mdi/js";
import store from "@/store";

import DigitalClock from "../../comm/DigitalClock.vue";
import bus from "../../../utils/bus.js";

import salesApi from "../../../api/salesApi";
import salesApiStoreModule from "./salesApiStoreModule";

import StatisticsCardVertical from "../../../components/statistics-card/StatisticsCardVertical.vue";
import StatisticsCardSide from "../../../components/statistics-card/StatisticsCardSide.vue";

//import StatisticsCardRankingList from '../../../components/statistics-card/StatisticsCardRankingList.vue';
// import StatisticsCardRadialBarChart from '../../../components/statistics-card/StatisticsCardRadialBarChart.vue';

import DashboardCongratulationBest from "./DashboardCongratulationBest.vue";
import DashboardCardSalesByCountries from "./DashboardCardSalesByCountries.vue";
import DashboardCardSalesRankingbyGM from "./DashboardCardSalesRankingbyGM.vue";
import DashboardCardSalesRankingbySM from "./DashboardCardSalesRankingbySM.vue";
import DashboardCardSalesRankingbyHM from "./DashboardCardSalesRankingbyHM.vue";

import DashboardSalesTotalProfit from "./DashboardSalesTotalProfit.vue";
import DashboardSalesStatisticsTotalSales from "./DashboardSalesStatisticsTotalSales.vue";
import Notification from "../../comm/Notification.vue";
const SASLE_APP_STORE_MODULE_NAME = "app_salseEpapan";
//

/*
beforeCreate: Called synchronously after the instance has just been initialized, before data observation and event/watcher setup.
created: Called synchronously after the instance is created. At this stage, the instance has finished processing the options which means the following have been set up: data observation, computed properties, methods, watch/event callbacks. However, the mounting phase has not been started, and the $el property will not be available yet.
beforeMount: Called right before the mounting begins: the render function is about to be called for the first time.
mounted: Called after the instance has just been mounted where el is replaced by the newly created vm.$el.
beforeUpdate: Called when the data changes, before the virtual DOM is re-rendered and patched.
updated: Called after a data change causes the virtual DOM to be re-rendered and patched.
*/
export default {
  curmontData: {},

  components: {
    StatisticsCardVertical,
    DashboardCongratulationBest,
    DashboardCardSalesByCountries,
    DashboardSalesTotalProfit,
    DashboardSalesStatisticsTotalSales,
    StatisticsCardSide,
    DashboardCardSalesRankingbyGM,
    DashboardCardSalesRankingbySM,
    DashboardCardSalesRankingbyHM,
    //StatisticsCardRankingList,
    DigitalClock,
    Notification,
    // StatisticsCardRadialBarChart,
  },

  //page
  beforeMount() {
    //bus.$emit('end:spinner');
  },


  computed: {
    loading(){
          return  store.state.app_salseEpapan.loading
    },
  },

  methods: {

    allowTargerUserList(userData){
          let USERLIST =['AUSTIN','JOANNE','AZZA','YNNG','HCLEOW',
                          'RUHANA','XWQUAH', 'EUNICE1','SYAFIQAH','MYTANG','FIONATAN','NATALIE','FASIHA','KYCHOONG','HAIDA02','ZAYANAH','PYWOON'] ;

          if (("4" == userData.userTypeId || "6" == userData.userTypeId) ) {
            return  USERLIST.includes(userData.userName);
          }else{
            return true
          }
    }, 
    fetchCurMonthData() {
      //console.log('fetchCurMonthData ==>');
      store
        .dispatch(`${SASLE_APP_STORE_MODULE_NAME}/fetchCurMonthData`)
        .then((response) => {
          (this.eKeyInData = {
            statTitle: "Key In",
            jumpRoute: "/performance/keyInReport",  
            icon: mdiClipboardEditOutline,
            color: "info",
            subtitle: response.data.data[0].LST_UP_TIME,
            statistics: response.data.data[0].SAL_KEYIN + "",
            //change: response.data.user[0].PE_SAL_KEYIN,
          }),
            (this.NetSalesData = {
              statTitle: "Net Sales",
              jumpRoute: "/performance/NetSalesReport",
              icon: mdiHandCoin,    
              color: "error",
              subtitle: response.data.data[0].LST_UP_TIME,
              statistics: response.data.data[0].SAL_NET_SALES + "",
              //change: response.data.user[0].PE_SAL_NET_SALES,
            }),
            (this.ActiveHpData = {
              statTitle: "Active HP",
              jumpRoute: "/performance/ActiveHPReport",
              icon: mdiAccountGroup,
              color: "info",
              subtitle: response.data.data[0].LST_UP_TIME,
              statistics: response.data.data[0].SAL_ACTIVE_HP + "",
              //change: response.data.user[0].PE_SAL_ACTIVE_HP,
            }),
            (this.SHIData = {
              statTitle: "SHI",
              jumpRoute: "/performance/SHIReport",
              icon: mdiTrendingUp,
              color: "info",
              subtitle: response.data.data[0].LST_UP_TIME,
              statistics: response.data.data[0].SAL_SHI + "",
              //change: response.data.user[0].PE_SAL_SHI,
              moreshow: "true",
            });

          this.isDoneCurMonthApi = true;
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
        });
    },

    callApiTargetData() {
      store
        .dispatch(`${SASLE_APP_STORE_MODULE_NAME}/fetchTargetData`)
        .then((response) => {
          this.fetchCurMonthData();
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
        })
    },
  },

  data() {

    if (!store.hasModule(SASLE_APP_STORE_MODULE_NAME)) {
      store.registerModule(SASLE_APP_STORE_MODULE_NAME, salesApiStoreModule);
    }


    return {
      logMaessage: "",
      sheet: false,
      mdiHelpCircleOutline,
      mdiAccountCheckOutline,
      eKeyInData: {},
      NetSalesData: {},
      ActiveHpData: {},
      SHIData: {},
      salesRadialChart: {},
      color: { secondary: "secondary", warning: "warning", error: "#00f" },
      autoplay: true,
      alert: true,
    };
  },
  created() {

    

  
    // this.callApiSalesHQMainApi().then(
    //   (response) => (
    //     (this.eKeyInData = {
    //       statTitle: "Key In",
    //       jumpRoute: "/performance/keyInReport",  
    //       icon: mdiClipboardEditOutline,
    //       color: "info",
    //       subtitle: response.data.data[0].LST_UP_TIME,
    //       statistics: response.data.data[0].SAL_KEYIN + "",
    //       //change: response.data.user[0].PE_SAL_KEYIN,
    //     }),
    //     (this.NetSalesData = {
    //       jumpRoute: "/performance/NetSalesReport",
    //       statTitle: "Net Sales",
    //       icon: mdiHandCoin,
    //       color: "error",
    //       subtitle: response.data.data[0].LST_UP_TIME,
    //       statistics: response.data.data[0].SAL_NET_SALES + "",
    //       //change: response.data.user[0].PE_SAL_NET_SALES,
    //     }),
    //     (this.ActiveHpData = {
    //       statTitle: "Active HP",
    //       jumpRoute: "/performance/ActiveHPReport",
    //       icon: mdiAccountGroup,
    //       color: "info",
    //       subtitle: response.data.data[0].LST_UP_TIME,
    //       statistics: response.data.data[0].SAL_ACTIVE_HP + "",
    //       //change: response.data.user[0].PE_SAL_ACTIVE_HP,
    //     }),
    //     (this.SHIData = {
    //       statTitle: "SHI",
    //       jumpRoute: "/performance/SHIReport",
    //       icon: mdiTrendingUp,
    //       color: "info",
    //       subtitle: response.data.data[0].LST_UP_TIME,
    //       statistics: response.data.data[0].SAL_SHI + "",
    //       //change: response.data.user[0].PE_SAL_SHI,
    //       moreshow: "true",
    //     })
    //   )
    // );
    let userData =  this.$store.state.userInfo;

    if(this.allowTargerUserList(userData)){
      this.callApiTargetData();
    }else{
      this.fetchCurMonthData();
    }
  },
};
</script>
