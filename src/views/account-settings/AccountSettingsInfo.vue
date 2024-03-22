<template>
  <v-card flat class="pa-3 mt-2">
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="optionsLocal.notification"
              outlined
              rows="3"
              label="notification"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="optionsLocal.birthday"
              outlined
              dense
              label="Birthday"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="optionsLocal.phone"
              outlined
              dense
              label="Phone"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="optionsLocal.website"
              outlined
              dense
              label="Coway Mall Link"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="optionsLocal.Nationality"
              outlined
              dense
              label="Nationality"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="optionsLocal.sponsor"
              outlined
              dense
              multiple
              chips
              small-chips
              label="Sponsor's"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <p class="text--primary mt-n3 mb-2">Gender</p>
            <v-radio-group
              v-model="optionsLocal.gender"
              row
              class="mt-0"
              hide-details
            >
              <v-radio value="M" label="Male"> </v-radio>
              <v-radio value="F" label="Female"> </v-radio>
              <v-radio value="O" label="Other"> </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn color="primary" class="me-3 mt-3" @click="openInstallPWA">
          install PWA
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
//import { ref } from '@vue/composition-api';
import { deletePWACookie } from "../../utils/cookies.js";
import Toasted from "vue-toasted";
import Vue from "vue";

Vue.use(Toasted);
export default {
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  data(props) {
    const optionsLocal = JSON.parse(JSON.stringify(props.informationData));

    const resetForm = () => {
      optionsLocal.value = JSON.parse(JSON.stringify(props.informationData));
    };

    const openPWA = false;
    return { optionsLocal, resetForm, openPWA };
  },

  mounted: {},
  methods: {
    openInstallPWA() {
      deletePWACookie();

      Vue.toasted
        .success(
          "Can check the installation button when you re-Login  again ",
          {
            icon: "check",
            position: "bottom-center",
            action: {
              text: "Close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          }
        )
        .goAway(3500);
    },
  },
};
</script>
