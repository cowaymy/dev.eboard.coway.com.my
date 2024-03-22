<template>
  <v-card elevation="1">
    <v-card-title class="align-start">
      <v-avatar :color="color" size="38" elevation="5">
        <v-icon size="24" color="white" class="rounded-0"> icon </v-icon>
      </v-avatar>

      <p class="v-card__title text-no-wrap pt-1 ps-2">Net Sales Record</p>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <div>
        <v-carousel
          :cycle="true"
          :interval="5000"
          show-arrows-on-hover
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="200"
        >
          <v-carousel-item>
            <v-sheet color="white" height="100%" tile>
              <v-timeline align-top dense>
                <v-timeline-item small color="error">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="font-weight-semibold me-1">{{ thisMonth }}</h4>
                  </div>
                  <p class="mb-0">
                    You are
                    <span class="text-xs error--text">
                      Top {{ this.NetsalesRecord.curr_ranking_number }} ({{
                        this.NetsalesRecord.curr_ranking_figure
                      }})
                    </span>
                    Sales Ranking Now
                  </p>
                </v-timeline-item>
                <v-timeline-item small color="blue-grey">
                  <div style="text-align: left">
                    <h4 class="font-weight-semibold me-1">
                      {{ previousMonth }}
                    </h4>
                  </div>
                  <p class="mb-0">
                    You are
                    <span class="text-xs error--text">
                      Top {{ this.NetsalesRecord.prev_ranking_number }} ({{
                        this.NetsalesRecord.prev_ranking_figure
                      }})
                    </span>
                    Sales Ranking
                  </p>
                </v-timeline-item>
              </v-timeline>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical } from "@mdi/js";

export default {
  props: {
    NetsalesRecord: {},
    statTitle: { type: String, default: "" },
    icon: { type: String, default: "" },
    color: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    statistics: { type: String, default: "" },
    change: { type: String, default: "" },
    series: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mdiDotsVertical,
    };
  },
  created() {
    const current = new Date();
    this.thisMonth = current.toLocaleString("default", { month: "long" });
    current.setMonth(current.getMonth() - 1);
    this.previousMonth = current.toLocaleString("default", { month: "long" });
  },
};
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}
.font-weight-semibold {
  font-weight: 600 !important;
}
.text-5xl {
  font-size: 3rem !important;
  line-height: 1 !important;
}

.text-3xl {
  font-size: 2.25rem !important;
  line-height: 2rem !important;
  align-items: center;
}

.text-2xl {
  font-size: 1.25rem !important;
  line-height: 2rem !important;
}
.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}

.sales {
  border: 2px outset rgb(238, 122, 27);
  background-color: rgb(255, 255, 255);
  text-align: center;
}
.join {
  border: 2px outset rgba(16, 202, 9, 0.774);
  background-color: rgb(255, 255, 255);
  text-align: center;
}

.age {
  border: 2px outset rgb(218, 241, 82);
  background-color: rgb(255, 255, 255);
  text-align: center;
}
.among {
  border: 2px outset rgb(90, 117, 241);
  background-color: rgb(255, 255, 255);
  text-align: center;
}
</style>
