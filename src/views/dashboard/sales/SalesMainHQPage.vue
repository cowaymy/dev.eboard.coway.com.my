<template>
  <v-row>
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
          <DashboardSalesStatisticsTotalSales />
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
  mdiCheckboxMultipleMarkedOutline,
  mdiHelpCircleOutline,
  mdiTrendingUp,
  mdiAccountCheckOutline,
  mdiMapMarkerRadius,
} from "@mdi/js";

import DigitalClock from "../../comm/DigitalClock.vue";
import bus from "../../../utils/bus.js";
import salesApi from "../../../api/salesApi";

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
  methods: {
    async callApiSalesHQMainApi() {
      //start spinner
      try {
        const userInfo = this.$store.state.userInfo;
        return await salesApi.getCurMonthData(userInfo);
      } catch (error) {
        console.log(error);
        this.sheet = true;
        this.logMaessage = error.message;
      } finally {
        bus.$emit("end:spinner");
      }
    },

    callSalesHQMainApi2() {
      console.log("this is test data.....");
      //start spinner
      //bus.$emit('start:spinner');
      try {
        this.salesSide = {
          statTitle: "Hi Leo, You are here!!",
          icon: mdiMapMarkerRadius,
          color: "red",
          subtitle: "updated 10 minutes ago",
          statistics: "15",
          series: [
            {
              type: "sales",
              curmvalue: "20%",
              pevmvalue: "19%",
              curmsg: " Sales Ranking now",
              pevmsg: " Sales Ranking",
              curm: "April",
              pevm: "March",
            },
            {
              type: "join",
              curmvalue: "25%",
              pevmvalue: "12%",
              curmsg: " who join the same batch with you",
              pevmsg: " who join the same batch with you",
              curm: "April",
              pevm: "March",
            },
            {
              type: "age",
              curmvalue: "28%",
              pevmvalue: "29%",
              curmsg: " who join the same age with you",
              pevmsg: " who join the same age with you",
              curm: "April",
              pevm: "March",
            },
            {
              type: "among",
              curmvalue: "30%",
              pevmvalue: "49%",
              curmsg: " who among GM group with you",
              pevmsg: " who among GM group with you",
              curm: "April",
              pevm: "March",
            },
          ],
        };

        this.curmontData = salesApi.getCurMonthData();
      } catch (error) {
        console.log(error);
        this.sheet = true;
        this.logMaessage = error.message;
      } finally {
        //bus.$emit('end:spinner');
      }
    },

    async callApiTargetData() {
      //start spinner
      //bus.$emit('start:spinner');
      try {
        const userInfo = this.$store.state.userInfo;
        return await salesApi.getTargetData(userInfo);
      } catch (error) {
        console.log(error);
      } finally {
        //bus.$emit('end:spinner');
      }
    },
  },

  data() {
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
  
    this.callApiSalesHQMainApi().then(
      (response) => (
        (this.eKeyInData = {
          statTitle: "Key In",
          jumpRoute: "/performance/keyInReport",  
          icon: mdiClipboardEditOutline,
          color: "success",
          subtitle: response.data.data[0].LST_UP_TIME,
          statistics: response.data.data[0].SAL_KEYIN + "",
          //change: response.data.user[0].PE_SAL_KEYIN,
        }),
        (this.NetSalesData = {
          jumpRoute: "/performance/NetSalesReport",
          statTitle: "Net Sales",
          icon: mdiCheckboxMultipleMarkedOutline,
          color: "error",
          subtitle: response.data.data[0].LST_UP_TIME,
          statistics: response.data.data[0].SAL_NET_SALES + "",
          //change: response.data.user[0].PE_SAL_NET_SALES,
        }),
        (this.ActiveHpData = {
          statTitle: "Active HP",
          jumpRoute: "/performance/ActiveHPReport",
          icon: mdiCheckboxMultipleMarkedOutline,
          color: "primary",
          subtitle: response.data.data[0].LST_UP_TIME,
          statistics: response.data.data[0].SAL_ACTIVE_HP + "",
          //change: response.data.user[0].PE_SAL_ACTIVE_HP,
        }),
        (this.SHIData = {
          statTitle: "SHI",
          jumpRoute: "/performance/SHIReport",
          icon: mdiTrendingUp,
          color: "warning",
          subtitle: response.data.data[0].LST_UP_TIME,
          statistics: response.data.data[0].SAL_SHI + "",
          //change: response.data.user[0].PE_SAL_SHI,
          moreshow: "true",
        })
      )
    );
  },
};
</script>
