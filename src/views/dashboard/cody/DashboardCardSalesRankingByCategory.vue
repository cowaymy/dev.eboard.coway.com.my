<template>
  <v-card elevation="1">
    <v-card-title class="align-start" cols="12">
      <v-col cols="12" md="3" v-for="i in this.d">
        <DashboardCardSalesRankingbyGM
          :i="i"
          :j="j"
          :getCategoryIndex="getCategoryIndex"
          :getFilterCurRankingData="getFilterCurRankingData"
        />
      </v-col>
    </v-card-title>
  </v-card>
</template>

<script>
import DashboardCardSalesRankingbyGM from "./DashboardCardSalesRankingbyGM.vue";
export default {
  props: ["j", "d", "getFilterCurRankingData", "getCategoryIndex"],
  components: {
    DashboardCardSalesRankingbyGM,
  },
};
</script>
