<template>
  <v-card elevation="1">
    <v-card-title class="align-start">
      <span>Sales Ranking by HP</span>

      <v-spacer></v-spacer>

      <v-btn icon small class="me-n3 mt-n2">
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item-group
          v-model="selectedItem"
          active-class="border"
          color="indigo"
        >
          <v-list-item
            v-for="(data, index) in salesByCountries"
            :key="data.name"
            :class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''}`"
          >
            <v-avatar
              :color="selectedItem === index ? 'error' : ''"
              size="30"
              :class="`${data.color} white--text font-weight-medium me-3`"
            >
              <span class="text-base">{{ data.rank }}</span>
            </v-avatar>

            <div class="d-flex align-center flex-grow-1 flex-wrap">
              <div class="me-2">
                <div class="font-weight-semibold">
                  <span class="text--primary text-xl me-1">{{
                    data.sales
                  }}</span>
                  <!-- 
								<v-icon
									size="20"
									:color="data.change.charAt(0) === '+' ? 'success' : 'error'"
								>
									{{
										data.change.charAt(0) === '+'
											? icons.mdiChevronUp
											: icons.mdiChevronDown
									}}
								</v-icon>

								<span
									:class="`text-xs ${
										data.change.charAt(0) === '+'
											? 'success--text'
											: 'error--text'
									}`"
									>{{ data.change.slice(1) }}</span
								> -->
                </div>

                <v-list-item-subtitle class="font-weight-semibold text-xs">
                  {{ data.name }}
                </v-list-item-subtitle>
              </div>

              <v-spacer></v-spacer>

              <div>
                <h4 class="font-weight-semibold"></h4>
                <span class="text-xs">{{ data.change }} %</span>
                <v-progress-linear
                  height="6"
                  rounded
                  class="project-progress mt-1"
                  :color="resolveUserProgressVariant(data.change)"
                  :value="data.change"
                ></v-progress-linear>
              </div>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from "@mdi/js";

import salesApi from "../../../api/salesApi";
export default {
  created() {
    var cData = [];
    const user = this.$store.state.userName;
    this.callApiRinkForGMData().then((request) =>
      request.data.data.forEach(function (v, index) {
        //console.log(v);
        var newValue = {
          rank: v.RNK,
          name: `(${v.MEM_CODE})${v.NAME}`.substring(0, 30),
          sales: v.NETSALES,
          color: v.RNK == "1" ? "warning" : "secondary",
          change: v.TARGET,
        };
        cData.push(newValue);
        if (v.MEM_CODE == user) {
          this.selectedItem = index;
        }
      })
    );

    this.salesByCountries = cData;
  },

  data() {
    const selectedItem = -1;
    const salesByCountries = [];

    return {
      salesByCountries,
      selectedItem,
      icons: {
        mdiDotsVertical,
        mdiChevronUp,
        mdiChevronDown,
      },
    };
  },

  methods: {
    resolveUserProgressVariant(progrss) {
      if (progrss <= 25) return "error";
      if (progrss > 25 && progrss <= 50) return "warning";
      if (progrss > 50 && progrss <= 75) return "primary";
      if (progrss > 75 && progrss <= 100) return "success";

      return "secondary";
    },

    async callApiRinkForGMData() {
      try {
        const userInfo = this.$store.state.userInfo;
        return await salesApi.getRinkForHPData(userInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.project-progress {
  min-width: 4rem;
}
.border {
  border: 6px dashed orange;
}
</style>
