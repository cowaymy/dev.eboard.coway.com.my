<template>
  <v-card elevation="24">
    <v-card-text class="d-flex align-center justify-space-between pb-1 pt-5">
      <div>
        <p class="text-5xl font-weight-semibold text--primary mb-2">
          <VueRolling
            :value="newEkeyIn.toString()"
            :text="newEkeyIn.toString()"
            :isNumberFormat="true"
            :transition="4"
          ></VueRolling>
        </p>
        <span class="text-base font-weight-semibold">Today's KeyIn</span>
      </div>
    </v-card-text>

    <v-card-text class="d-flex align-center justify-space-between pb-1 pt-5">
      <div>
        <p class="text-5xl font-weight-semibold text--primary mb-2">
          <VueRolling
            :value="newEkeyIn.toString()"
            :text="newEkeyIn.toString()"
            :isNumberFormat="true"
            :transition="4"
          ></VueRolling>
        </p>
        <span class="text-base font-weight-semibold">Today's KeyIn</span>
      </div>
    </v-card-text>


    <v-card-text class="d-flex align-center justify-space-between pb-1 pt-5">
      <div>
        <p class="text-5xl font-weight-semibold text--primary mb-2">
          <VueRolling
            :value="newEkeyIn.toString()"
            :text="newEkeyIn.toString()"
            :isNumberFormat="true"
            :transition="4"
          ></VueRolling>
        </p>
        <span class="text-base font-weight-semibold">Today's KeyIn</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mdiAirConditioner, mdiAirPurifier,mdiToilet,mdiBedKingOutline ,mdiShowerHead,mdiWaterOpacity,mdiCartMinus,mdiBeaker,mdiNumeric10BoxMultiple
} from "@mdi/js";
import VueRolling from "vue-roller";
import number_format from "../../utils/number_format.js";

import salesApi from "../../api/salesApi";

export default {
  components: { VueRolling },

  data() {
    //const $vuetify = getVuetify();
    const newEkeyIn = 0;
    const newDataList = ["", "", "", "", "", ""];
    const pollData = null;
    const pollTodyData = null;
    return {
      pollData,
      pollTodyData,
      newDataList,
      newEkeyIn,
      icons: {
        mdiAirConditioner, mdiAirPurifier,mdiToilet,mdiBedKingOutline ,mdiShowerHead,mdiWaterOpacity,mdiCartMinus,mdiBeaker,mdiNumeric10BoxMultiple
      },
    };
  },

  methods: {
    checkNull(value) {
      var rtnVal = 0;
      try {
        this.newDataList.forEach(function (v) {
          if (value == v.STK_CTGRY_ID) {
            rtnVal = v.P_TOTAL_CNT;
          }
        });
      } catch (error) {
        rtnVal = 0;
      }

      return rtnVal;
    },
    number_format,
    async callApiEKeyInData() {
      try {
        const userInfo = this.$store.state.userInfo;
        return await salesApi.getEKeyInData(userInfo);
      } catch (error) {
        console.log(error);
      }
    },

    async callApiTodayEkeyinData() {
      try {
        const userInfo = this.$store.state.userInfo;
        return await salesApi.getTodayEkeyinData(userInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.pollData);
    clearInterval(this.pollTodyData);
  },

  created() {
    this.callApiEKeyInData().then((request) => {
      this.newEkeyIn = request.data.data[0].TOTAL_SALES;
    });

    this.callApiTodayEkeyinData().then((request) => {
      const newList = [];
      request.data.data.filter(function (item) {
        if (item.INDX != [1]) {
          newList.push(item);
        }
      });

      this.newDataList = newList;
    });

    this.pollData = setInterval(() => {
      this.callApiEKeyInData().then((request) => {
        console.log(request);
        this.newEkeyIn = request.data.data[0].TOTAL_SALES;
      });
    }, 30000);

    this.pollTodyData = setInterval(() => {
      this.callApiTodayEkeyinData().then((request) => {
        const newList = [];

        console.log(request.data.data);
        request.data.data.filter(function (item) {
          if (item.INDX != [1]) {
            newList.push(item);
          }
        });

        this.newDataList = newList;
      });
    }, 30000);
  },
};
</script>

<style lang="scss" scoped>
.statistics-table {
  border-top: solid 1px rgba(89, 98, 94, 0.14);
  .badge-sm {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 70%;
    margin: 4px;
  }
}
</style>
