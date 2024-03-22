<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-alert border="left" color="black" dark elevation="1">
        <div class="nocard">Cody e-TrustBoard</div>
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
          <Notification :autoplay="autoplay" :noteType="noteType" />
        </v-alert>
      </div>
    </v-col>
    <v-col cols="12" md="4" sm="12">
      <DashboardCongratulationJohn />
    </v-col>

    <!-- <v-col cols="12" md="8">
			<DashboardStatisticsCard />
		</v-col> -->

    <!-- vertical statistics card -->

    <!-- A + B -->
    <v-col cols="12" md="8">
      <DashboardCodyDialogue
        :eKeyInData="eKeyInData"
        :NetSalesData="NetSalesData"
        :ActiveHpData="ActiveHpData"
        :SHIData="SHIData"
        :KeyInOptions="KeyInOptions"
        :NetSalesOptions="NetSalesOptions"
        :ActiveHpOptions="ActiveHpOptions"
        :RejoinOptions="RejoinOptions"
        :Personal_Data="Personal_Data"
      >
      </DashboardCodyDialogue>
    </v-col>

    <v-col cols="12" md="8">
      <DashboardSalesTotalProfit
        :graphSales="graphSales"
      ></DashboardSalesTotalProfit>
    </v-col>

    <v-col cols="12" md="4">
      <v-row style="match-height">
        <v-col cols="12">
          <StatisticsCardSide :NetsalesRecord="NetsalesRecord" />
        </v-col>
        <v-col cols="12">
          <DashboardSalesStatisticsTotalSales :targetSales="targetSales" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-for="j in Categories">
      <DashboardCardSalesRankingByCategory
        :j="j"
        :getCategoryIndex="getCategoryIndex"
        :getFilterCurRankingData="getFilterCurRankingData"
        :d="Ranking_Data.filter((x) => x.Type == j)"
      />
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiClipboardEditOutline,
  mdiCheckboxMultipleMarkedOutline,
  mdiHelpCircleOutline,
  mdiTrendingUp,
  mdiAccountCheckOutline,
} from "@mdi/js";

import DashboardCodyDialogue from "./DashboardCodyDialogue.vue";
import DigitalClock from "../../comm/DigitalClock.vue";
import bus from "../../../utils/bus.js";
import codyApi from "../../../api/codyApi";
import StatisticsCardSide from "../../../components/statistics-card/StatisticsCardSideForCody.vue";
//import StatisticsCardRankingList from '../../../components/statistics-card/StatisticsCardRankingList.vue';
import DashboardCongratulationJohn from "./DashboardCongratulationBest.vue";
import DashboardCardSalesRankingbyGM from "./DashboardCardSalesRankingbyGM.vue";
import DashboardSalesTotalProfit from "./DashboardSalesTotalProfit.vue";
import DashboardSalesStatisticsTotalSales from "./DashboardSalesStatisticsTotalSales.vue";
import number_format from "../../../utils/number_format.js";
import Notification from "../../comm/Notification.vue";
import DashboardCardSalesRankingByCategory from "./DashboardCardSalesRankingByCategory.vue";
export default {
  targetSales: {},
  curmontData: {},
  netSalesData: {},
  activeData: {},
  shiData: {},
  prodcCateory: {},
  tagetSales: {},
  KeyInOptions: {},
  NetSalesOptions: {},
  ActiveHpOptions: {},
  RejoinOptions: {},
  SHIOptions: {},
  salesSide: {},
  revenueOptions: {},
  logisticsOptions: {},
  reportsOptions: {},
  transactionsOptions: {},
  revenueLineChart: {},
  salesRadialChart: {},

  components: {
    DashboardCongratulationJohn,
    DashboardSalesTotalProfit,
    DashboardSalesStatisticsTotalSales,
    StatisticsCardSide,
    DashboardCardSalesRankingbyGM,
    //	StatisticsCardRankingList,
    DigitalClock,
    DashboardCodyDialogue,
    Notification,
    DashboardCardSalesRankingByCategory,
  },

  methods: {
    getFilterCurRankingData(filterRankingData) {
      this.Ranking_Data.forEach((data, index) => {
        filterRankingData.data.user.forEach((dataFilter, indexFilter) => {
          if (dataFilter.Level == data.Level && dataFilter.Type == data.Type) {
            this.Ranking_Data[index].Mem_data = dataFilter.Mem_data;
          }
        });
      });
    },
    getCategoryIndex(category, level, index) {
      this.Ranking_Data = this.Ranking_Data.map((eachLvlData, i) => {
        const copy = { ...eachLvlData };
        copy.Mem_data = copy.Mem_data.map((memData, memIndex) => {
          if (
            copy.Type == category &&
            copy.Level == level &&
            memIndex == index
          ) {
            return { ...memData, selected: 0 };
          } else {
            return { ...memData, selected: -1 };
          }
        });
        return copy;
      });
    },
    callSalesHQMainApi() {
      try {
        //start spinner
        bus.$emit("start:spinner");
        const userdata = this.$store.state.userInfo;
        return codyApi.getCurMonthData(userdata);
      } catch (error) {
        console.log(error);
        this.sheet = true;
        this.logMaessage = error.message;
      } finally {
        bus.$emit("end:spinner");
      }
    },
    callRankingAPI() {
      try {
        //start spinner
        bus.$emit("start:spinner");
        const userdata = this.$store.state.userInfo;
        return codyApi.getCurRankingData(userdata);
      } catch (error) {
        console.log(error);
        this.sheet = true;
        this.logMaessage = error.message;
      } finally {
        bus.$emit("end:spinner");
      }
    },
    number_format,
  },

  data() {
    return {
      Ranking_Data: [],
      Categories: [],
      FilterData: [],
      Personal_Data: { Personal_Data_Display: [], Personal_Data_Option: [] },
      logMaessage: "",
      sheet: false,
      mdiHelpCircleOutline,
      mdiAccountCheckOutline,
      eKeyInData: {},
      NetSalesData: {},
      ActiveHpData: {},
      SHIData: {},
      KeyInOptions: {},
      NetSalesOptions: {},
      ActiveHpOptions: {},
      RejoinOptions: {},
      graphSales: { keyin: 0, new_sal: 0, extrade: 0, hc_sal: 0, svm: 0 },
      targetSales: {
        act_hs: 0,
        com_hs: 0,
        canc_hs: 0,
        fal_hs: 0,
        target: 0,
        To_achieved: 0,
        achieved: 0,
        mem_lvl: 0,
      },
      NetsalesRecord: {},
      color: { secondary: "secondary", warning: "warning", error: "#00f" },

      autoplay: true,
      alert: true,
      noteType: "CODY",
    };
  },
  created() {
    this.callSalesHQMainApi().then((response) => {
      const date1 = new Date(response.data.user[0].upd_dt);
      const date2 = new Date();
      let msec = date2 - date1;
      const hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      const mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      let change = "";
      if (hh >= 1) {
        change += hh + " Hours ago";
      } else {
        change += mm + " Mins ago";
      }
      const user_config = response.data.user[0].user_config.split(",");

      let Data_Temp = [];
      this.eKeyInData = {
        statTitle: "Complete Hs Rate",
        icon: mdiClipboardEditOutline,
        color: "success",
        subtitle: change,
        statistics:
          (
            (response.data.user[0].COM_HS /
              (response.data.user[0].COM_HS +
                response.data.user[0].ACT_HS +
                response.data.user[0].FAL_HS +
                response.data.user[0].CANC_HS)) *
            100
          ).toFixed(2) + "%",
      };
      this.NetSalesData = {
        statTitle: "RC Rate",
        icon: mdiCheckboxMultipleMarkedOutline,
        color: "error",
        subtitle: change,
        statistics: (response.data.user[0].rc_rate || "0") + "%",
      };
      this.ActiveHpData = {
        statTitle: "Sales Key In",
        icon: mdiCheckboxMultipleMarkedOutline,
        color: "primary",
        subtitle: change,
        statistics: this.number_format(response.data.user[0].Total_Keyin),
      };
      this.SHIData = {
        statTitle: "Net Sales",
        icon: mdiTrendingUp,
        color: "warning",
        subtitle: change,
        statistics: this.number_format(response.data.user[0].Net_SAL),
        moreshow: "true",
      };

      if (response.data.user[0].MEM_LVL == 4) {
        this.KeyInOptions = {
          statTitle: "SVM Sales",
          icon: mdiClipboardEditOutline,
          color: "success",
          subtitle: change,
          statistics: this.number_format(response.data.user[0].SVM_SAL),
        };
        this.NetSalesOptions = {
          statTitle: "Extrade Sales",
          icon: mdiCheckboxMultipleMarkedOutline,
          color: "error",
          subtitle: change,
          statistics: this.number_format(response.data.user[0].Extrade_SAL),
        };
        this.ActiveHpOptions = {
          statTitle: "Net Sales Rate",
          icon: mdiAccountCheckOutline,
          color: "primary",
          subtitle: change,
          statistics: (
            response.data.user[0].Net_SAL / response.data.user[0].Total_Keyin
          ).toFixed(2),
        };
        Data_Temp.push(
          this.KeyInOptions,
          this.NetSalesOptions,
          this.ActiveHpOptions
        );
      } else {
        this.KeyInOptions = {
          statTitle: "Net Sales Productivity",
          icon: mdiClipboardEditOutline,
          color: "success",
          subtitle: change,
          statistics: (
            response.data.user[0].Net_SAL / response.data.user[0].ACT_CODY
          ).toFixed(2),
        };
        this.NetSalesOptions = {
          statTitle: "Active Cody",
          icon: mdiCheckboxMultipleMarkedOutline,
          color: "error",
          subtitle: change,
          statistics: this.number_format(response.data.user[0].ACT_CODY),
        };
        this.RejoinOptions = {
          statTitle: "Rejoin",
          icon: mdiAccountCheckOutline,
          color: "primary",
          subtitle: change,
          statistics: this.number_format(response.data.user[0].rejoin),
        };
        Data_Temp.push(
          this.KeyInOptions,
          this.NetSalesOptions,
          this.RejoinOptions
        );
      }

      Data_Temp.push(
        this.eKeyInData,
        this.NetSalesData,
        this.ActiveHpData,
        this.SHIData
      );
      Data_Temp.sort(function (a, b) {
        let x = user_config.indexOf(a.statTitle);
        let y = user_config.indexOf(b.statTitle);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

      this.Personal_Data.Personal_Data_Display = Data_Temp.slice(0, 4);

      this.Personal_Data.Personal_Data_Option = Data_Temp;

      this.targetSales = {
        mem_lvl: response.data.user[0].MEM_LVL,
        target: response.data.user[0].SAL_TARGET || 0,
        achieved: response.data.user[0].Net_SAL,
        To_achieved:
          response.data.user[0].SAL_TARGET - response.data.user[0].Net_SAL,
        act_hs: response.data.user[0].ACT_HS,
        com_hs: response.data.user[0].COM_HS,
        canc_hs: response.data.user[0].CANC_HS,
        fal_hs: response.data.user[0].FAL_HS,
      };
      this.graphSales = {
        new_sal:
          response.data.user[0].Net_SAL - response.data.user[0].Extrade_SAL,
        hc_sal: response.data.user[0].MAT_SAL,
        extrade: response.data.user[0].Extrade_SAL,
        svm: response.data.user[0].SVM_SAL,
        keyin: response.data.user[0].Today_Keyin,
      };
      this.NetsalesRecord = {
        curr_ranking_number: this.number_format(
          response.data.user[0].curr_ranking_number
        ),
        curr_ranking_figure: this.number_format(
          response.data.user[0].curr_ranking_figure
        ),
        prev_ranking_number: this.number_format(
          response.data.user[0].prev_ranking_number
        ),
        prev_ranking_figure: this.number_format(
          response.data.user[0].prev_ranking_figure
        ),
      };
    });

    this.callRankingAPI().then((response) => {
      this.Ranking_Data = response.data.user;
      this.Ranking_Data.forEach((data) => {
        data.Mem_data.forEach((memData) => {
          memData["selected"] = -1;
        });
      });
      this.Categories = response.data.user.reduce((acc, curr) => {
        return acc.indexOf(curr.Type) != -1 ? acc : [...acc, curr.Type];
      }, []);
    });
  },
};
</script>
