<template>
  <div style="position: relative">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="i in Personal_Data.Personal_Data_Display"
      >
        <StatisticsCardVertical v-bind="i" />
      </v-col>
      <template v-if="true">
        <v-dialog
          v-model="isDialogVisible"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ on, attrs }">
            <v-fab-transition>
              <v-btn
                color="error"
                v-bind="attrs"
                v-on="on"
                dark
                absolute
                bottom
                right
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          <v-card tile>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="isDialogVisible = false">
                <v-icon>{{ icons.mdiClose }}</v-icon>
              </v-btn>
              <v-toolbar-title>Find out More</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  class="my-auto"
                  @click="isDialogVisible = false"
                  @click.native="saveMenu"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-col cols="12"><p></p></v-col>
            <draggable v-model="Personal_Data.Personal_Data_Option" class="row">
              <v-col
                cols="12"
                sm="6"
                md="3"
                v-for="i in Personal_Data.Personal_Data_Option"
              >
                <StatisticsCardVertical v-bind="i" />
              </v-col>
            </draggable>
          </v-card>
        </v-dialog>
      </template>

      <template v-else> </template>
    </v-row>
  </div>
</template>

<script>
import StatisticsCardVertical from "../../../components/statistics-card/StatisticsCardVerticalForCody.vue";
import draggable from "vuedraggable";
import codyApi from "../../../api/codyApi";
import bus from "../../../utils/bus.js";

import {
  mdiClipboardEditOutline,
  mdiCheckboxMultipleMarkedOutline,
  mdiAccountCheckOutline,
  mdiClose,
} from "@mdi/js";

export default {
  components: {
    StatisticsCardVertical,
    draggable,
  },
  props: {
    eKeyInData: { type: Object },
    NetSalesData: { type: Object },
    ActiveHpData: { type: Object },
    SHIData: { type: Object },
    KeyInOptions: { type: Object },
    NetSalesOptions: { type: Object },
    ActiveHpOptions: { type: Object },
    RejoinOptions: { type: Object },
    Personal_Data: { Personal_Data_Display: [], Personal_Data_Option: [] },
  },
  methods: {
    saveMenu() {
      try {
        //start spinner
        bus.$emit("start:spinner");
        let user_data = {
          mem_id: this.$store.state.userInfo.memId,
          user_config: this.Personal_Data.Personal_Data_Option.reduce(function (
            a,
            b
          ) {
            return (a.statTitle || a) + "," + b.statTitle;
          }),
        };
        codyApi.updateCodyMenu(user_data);
        window.location.reload();
      } catch (error) {
        console.log(error);
        this.sheet = true;
        this.logMaessage = error.message;
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
  data() {
    const isDialogVisible = false;

    return {
      isDialogVisible,
      icons: {
        mdiClose,
      },
    };
  },
};
</script>
