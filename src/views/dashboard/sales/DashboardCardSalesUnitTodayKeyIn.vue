<template>
  <v-card elevation="0">
    <!-- Title/Header -->
    <v-card-title class="align-start pt-0 flex-nowrap">
      <div>
        <p class="mb-0 font-weight-semibold primary--text text-5xl">
          <VueRolling
            :text="rollerKeyin.toString()"
            :value="rollerKeyin.toString()"
            :isNumberFormat="true"
            :transition="4"
          ></VueRolling>
        </p>
        <small class="font-weight-semibold text-xl">Today keyIn</small>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon small class="me-n6 mt-n1">
        <v-icon size="22">
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-actions>
      <v-btn color="success" text> Explore </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon color="success" @click="show = !show">
        <v-icon>{{ show ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text class="pb-3 pt-5">
          <!-- List -->
          <v-list two-line subheader>
            <!-- List Item: Profit -->
            <v-list-item class="pa-0">
              <!-- item 1------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiWaterOutline }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_WP_CNT}}
                </v-list-item-title>
                <v-list-item-subtitle>Water purifier</v-list-item-subtitle>
              </v-list-item-content>
              <!-- item 2------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiBeaker }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_POE_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>POE</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- List Item: Income -->
            <v-list-item class="pa-0">
              <!-- item 3------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiAutorenew }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_AP_CNT}}
                </v-list-item-title>
                <v-list-item-subtitle>Air purifier</v-list-item-subtitle>
              </v-list-item-content>

              <!-- item 4------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiSeatIndividualSuite }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_MATT_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>Mattress</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- List Item: Expense -->
            <v-list-item class="pa-0">
              <!-- item 5------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiWeatherWindyVariant }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_BIDET_CNT}}
                </v-list-item-title>
                <v-list-item-subtitle>Bidet</v-list-item-subtitle>
              </v-list-item-content>

              <!-- item 6------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiNumeric10BoxMultiple }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_OUTH_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>Other</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0">
              <!-- item 1------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiFanAuto }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_AIR_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>Air Cond</v-list-item-subtitle>
              </v-list-item-content>

              <!-- item 6------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiAlphaEBox }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_EMAIL_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>eMALL</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="pa-0">
              <!-- item 1------->
              <v-list-item-avatar class="" size="40" rounded>
                <v-icon size="30" color="success">
                  {{ icons.mdiSofaSingle  }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-semibold text-3xl">
                  {{ STK_MASS_CNT }}
                </v-list-item-title>
                <v-list-item-subtitle>Massage Chair</v-list-item-subtitle>
              </v-list-item-content>

             
            </v-list-item>

            
          </v-list>
          <!-- Action Button -->
          <!-- <v-btn block color="primary"> View Report </v-btn> -->
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import VueRolling from "vue-roller";

import {
  mdiDotsVertical,
  mdiTrendingUp,
  mdiCurrencyUsd,
  mdiChartBar,
  mdiAirConditioner,
  mdiAccountHeart,
  mdiEgg,
  mdiFanAuto,
  mdiAutorenew,
  mdiSeatReclineNormal,
  mdiWeatherWindyVariant,
  mdiBeaker,
  mdiRadiatorDisabled,
  mdiSeatIndividualSuite,
  mdiWaterOutline,
  mdiNumeric10BoxMultiple,
  mdiAlphaEBox,
  mdiChevronUp,
  mdiChevronDown,mdiSofaSingle 
} from "@mdi/js";

import salesApi from "../../../api/salesApi";

export default {
  components: {
    VueRolling,
  },

  methods: {
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
      this.show = true;
    },
  },

  beforeDestroy() {
    clearInterval(this.pollData);
  },


  computed: {
    STK_AIR_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_AIR_CNT;
        });
        return rtnValue;
    },
    STK_AP_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_AP_CNT;
        });
        return rtnValue;
    },
    STK_BIDET_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_BIDET_CNT;
        });
        return rtnValue;
    },
    STK_EMAIL_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_EMAIL_CNT;
        });
        return rtnValue;
    },
    STK_MASS_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_MASS_CNT;
        });
        return rtnValue;
    },
    STK_MATT_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_MATT_CNT;
        });
        return rtnValue;
    },
    STK_OUTH_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_OUTH_CNT;
        });
        return rtnValue;
    },
    STK_POE_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_POE_CNT;
        });
        return rtnValue;
    },
    STK_SOFT_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_SOFT_CNT;
        });
        return rtnValue;
    },
    STK_WP_CNT (){
        let rtnValue =0;
        this.todayEeyin.filter((item) =>{
          rtnValue =item. STK_WP_CNT;
        });
        return rtnValue;
    }
  },

  created() {
    this.callApiEKeyInData().then((request) => {
      console.log("callApiEKeyInData API 수신 완료 ");
      this.rollerKeyin = request.data.data[0].TOTAL_SALES;
    });

    this.callApiTodayEkeyinData().then((request) => {
      this.todayEeyin = request.data.data;
    });
    this.pollData = setInterval(() => {
      this.callApiEKeyInData().then((request) => {
        this.rollerKeyin = request.data.data[0].TOTAL_SALES;
      });

      this.callApiTodayEkeyinData().then((request) => {
        this.todayEeyin = request.data.data;
      });
    }, 60000);
  },

  data() {
   
    const rollerKeyin = 0;
    const pollData = null;
    return {
      tvalue: {},
      chartData: [],
      todayEeyin: [],
      rollerKeyin,
      pollData,
      show: true,
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiCurrencyUsd,
        mdiChartBar,
        mdiAirConditioner,
        mdiAccountHeart,
        mdiEgg,
        mdiFanAuto,
        mdiAutorenew,
        mdiSeatReclineNormal,
        mdiWeatherWindyVariant,
        mdiBeaker,
        mdiRadiatorDisabled,
        mdiSeatIndividualSuite,
        mdiWaterOutline,
        mdiNumeric10BoxMultiple,
        mdiAlphaEBox,
        mdiChevronUp,
        mdiChevronDown,
        mdiSofaSingle 
      },
    };
  },
};
</script>
