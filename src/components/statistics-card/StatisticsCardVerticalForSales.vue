<template>
  <v-card elevation="3">
    <v-card-title class="align-start">
      <v-avatar :color="color" size="38" elevation="5">
        <v-icon size="24" color="white" class="rounded-0">
          {{ icon }}
        </v-icon>
      </v-avatar>

      <p class="v-card__title text-no-wrap pt-1 ps-2">
        {{ statTitle }}
      </p>
      <v-spacer></v-spacer>
      <v-btn small icon class="me-n3 mt-n1">
        <v-icon>
          {{ mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <!-- <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
			<div>
				<div class="text-5xl font-weight-semibold primary--text mb-2">
					12,012 <v-btn small color="primary"> View Sales </v-btn>
				</div>
			</div>
		</v-card-text> -->

    <v-card-text class="text--primary mt-3">
      <div style="text-align: center">
        <span class="text-3xl align-center font-weight-semibold mb-3">
          {{ statistics }}
        </span>
        <!-- <span
					class="percentage text-xs mb-2"
					:class="checkChange(change) ? 'success--text' : 'error--text'"
				>
					{{ change }}</span
				> -->
      </div>
      <p style="text-align: right" class="text-xs text--secondary mb-0">
        {{ subtitle }}
      </p>

      <template v-if="moreshow">
        <DashboardDialog />
      </template>

      <template v-else> </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical } from "@mdi/js";
import DashboardDialog from "../../views/dashboard/sales/DashboardDialogFullScreenforSales.vue";

export default {
  components: {
    DashboardDialog,
  },
  props: {
    statTitle: { type: String, default: "" },
    icon: { type: String, default: "" },
    color: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    statistics: { type: String, default: "" },
    change: { type: String, default: "" },
    moreshow: { type: String, default: "" },
  },

  data() {
    const isDialogVisible = false;
    const notifications = false;
    const sound = true;
    const widgets = false;

    const checkChange = (value) => {
      const firstChar = value.charAt(0);
      if (firstChar === "+") {
        return true;
      }

      return false;
    };

    return {
      mdiDotsVertical,
      checkChange,
      isDialogVisible,
      notifications,
      sound,
      widgets,
    };
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

.v-card__title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}
</style>
