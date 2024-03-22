<template>
  <v-card class="greeting-card" elevation="0">
    <v-row class="ma-0 pa-0">
      <v-col cols="8">
        <v-card-title class="text-no-wrap pt-1 ps-2">
          Beat My Best Record
        </v-card-title>
        <v-card-subtitle class="text-no-wrap ps-2">
          ({{ data.userNo }}) {{ data.userName }}
        </v-card-subtitle>
        <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
          <div>
            <div class="text-5xl font-weight-semibold primary--text mb-2">
              <VueRolling
                :text="data.bestRecord.toString()"
                :value="data.bestRecord"
                :isNumberFormat="true"
                :transition="2"
                :default-value="0"
              ></VueRolling>

              <!-- <Roller
								text="vue-roller"
								:charList="234234234"
								:transition="2"
								:isStatic="true"
								class="roller"
							></Roller> -->
              <!-- <v-btn small color="primary" @click="isDialogVisible = false">
								View Sales
							</v-btn> -->

              <div>
                <DashboardDialog
                  :buttonTitle="`View More`"
                  :statTitle="`Beat My Best Record List`"
                />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-col>

      <v-col cols="4">
        <v-img
          contain
          height="180"
          width="159"
          :src="
            require(`@/assets/images/misc/triangle-${
              $vuetify.theme.dark ? 'dark' : 'light'
            }.png`)
          "
          class="greeting-card-bg"
        ></v-img>
        <v-img
          contain
          height="108"
          max-width="83"
          class="greeting-card-trophy"
          src="@/assets/images/misc/trophy.png"
        ></v-img>
      </v-col>
      <template v-if="isDialogVisible">
        <DashboardDialog />
      </template>

      <template v-else> </template>
    </v-row>
  </v-card>
</template>
<script>
import VueRolling from "vue-roller";
import codyApi from "../../../api/codyApi.js";
import DashboardDialog from "../../comm/DialogBottomScreen_cody.vue";

export default {
  components: { VueRolling, DashboardDialog },

  methods: {
    async callApiBestRecord() {
      try {
        const userInfo = this.$store.state.userInfo;
        return await codyApi.getCodyBestRecord(userInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    const data = {
      bestRecord: 0,
    };
    const isDialogVisible = false;
    return { data, isDialogVisible };
  },

  created() {
    this.callApiBestRecord().then((request) => {
      this.data = {
        userNo: this.$store.state.userInfo.userFullName,
        userName: this.$store.state.userInfo.userName,
        bestRecord: request.data.data[0].BEST_RECORD,
      };
    });
  },
};
</script>

<style lang="scss" scoped>
.greeting-card {
  position: relative;
  .greeting-card-bg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .greeting-card-trophy {
    position: absolute;
    bottom: 10%;
    right: 8%;
  }
}
// rtl
.v-application {
  &.v-application--is-rtl {
    .greeting-card-bg {
      right: initial;
      left: 0;
      transform: rotateY(180deg);
    }
    .greeting-card-trophy {
      left: 8%;
      right: initial;
    }
  }
}

.font-weight-semibold {
  font-weight: 600 !important;
}
.text-5xl {
  font-size: 3rem !important;
  line-height: 1 !important;
}

.text-4xl {
  font-size: 2rem !important;
  line-height: 1 !important;
}

.text-2xl {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
}
.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}

.roller .rollerBlock {
  font-size: 1rem !important;
  font-weight: 600 !important;
}
</style>
