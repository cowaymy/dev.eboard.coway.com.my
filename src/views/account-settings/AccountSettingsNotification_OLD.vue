<template>
  <v-card flat class="pa-3">
    <v-form class="multi-col-validation" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="subject"
            label="Subject"
            dense
            hide-details
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <!-- <v-autocomplete
						v-model="values"
						:items="items"
						outlined
						dense
						chips
						small-chips
						label="Notification Channel"
						multiple
					></v-autocomplete> -->
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="contents"
            label="Contents"
            outlined
            rows="3"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-dialog
            ref="dialog"
            v-model="smodal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Start Date"
                :prepend-icon="icons.mdiCalendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date" scrollable color="primary">
              <v-btn text color="primary" @click="smodal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-col cols="12" md="6">
          <v-dialog
            ref="dialog2"
            v-model="emodal"
            :return-value.sync="enddate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="enddate"
                label="End Date"
                :prepend-icon="icons.mdiCalendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="enddate" scrollable color="primary">
              <v-btn text color="primary" @click="emodal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog2.save(enddate)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-col cols="12" md="6">
          <label class="text-1xl font-weight-semibold">Target </label>
          <v-treeview
            v-model="selection"
            :items="items"
            :selection-type="selectionType"
            selectable
            return-object
          ></v-treeview>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col cols="12" md="6">
          <template v-if="!selection.length"> No nodes selected. </template>
          <template v-else>
            <div>
              <v-chip-group
                column
                active-class="primary accent-4  font-weight-semibold"
              >
                <v-chip v-for="node in selection" :key="node.id">
                  {{ node.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </template>
        </v-col>

        <v-col cols="12" md="6">
          <label class="text-1xl font-weight-semibold">Use </label>
          <v-switch
            v-model="useYn"
            :label="`${useYn.toString()}`"
            hide-details
          ></v-switch>
        </v-col>

        <v-col cols="12">
          <label class="text-1xl font-weight-semibold">Notification Type</label>
          <v-radio-group v-model="nType" mandatory row>
            <v-radio label="Emergency" value="E"></v-radio>
            <v-radio label="Normal" value="N"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col offset-md="6" cols="12">
          <v-btn color="primary" type="submit" :disabled="btIsActive">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar } from "@mdi/js";

import bus from "../../utils/bus";
import comApi from "../../api/index";

export default {
  props: {
    notificationData: {
      type: Object,
      default: () => {},
    },
  },
  data(props) {
    const optionsLocale = JSON.parse(JSON.stringify(props.notificationData));
    const useYn = true;

    const items = [
      {
        id: "ALL",
        name: "ALL",
        children: [
          {
            id: "SAL",
            name: "SALES",
            children: [
              { id: "GM", name: "GM" },
              { id: "SM", name: "SM" },
              { id: "HM", name: "HM" },
              { id: "HP", name: "HP" },
            ],
          },
          {
            id: "COD",
            name: "CODY",
            children: [
              { id: "GCM", name: "GCM" },
              { id: "SCM", name: "SCM" },
              { id: "CM", name: "CM" },
              { id: "CODY", name: "CODY" },
            ],
          },
        ],
      },
    ];

    const date = new Date().toISOString().substr(0, 10);
    const enddate = new Date().toISOString().substr(0, 10);

    const smodal = "";
    const emodal = "";
    const nType = "Emergency";
    const subject = "";
    const contents = "";
    return {
      selectionType: "leaf",
      selection: [],
      items,
      optionsLocale,
      date,
      enddate,
      smodal,
      emodal,
      nType,
      useYn,
      subject,
      contents,
      btIsActive: false,
      icons: { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar },
    };
  },

  methods: {
    async submitForm() {
      try {
        let target = "";
        this.selection.forEach(function (v) {
          console.log(v);
          target += "^" + v.id;
        });

        const notiObj = {
          SUBJECT: this.subject,
          CONTENTS: this.contents,
          STD_DATE: this.date,
          END_DATE: this.enddate,
          TYPE: this.nType,
          STATUS: this.useYn ? "A" : "P",
          TARGET: target,
        };
        //start spinner
        bus.$emit("start:spinner");

        const result = await comApi.saveNotification(notiObj);

        if (result.data.success) {
          this.$toasted
            .success("It has been processed", {
              icon: "check",
              position: "bottom-right",
              action: {
                text: "Close",
                onClick: (e, toastObject) => {
                  this.btIsActive = true;
                  toastObject.goAway(0);
                },
              },
            })
            .goAway(2500);

          this.btIsActive = true;
        } else {
          this.$toasted.show(result.message);
        }
      } catch (error) {
        console.log("=========>" + error);
        bus.$emit("end:spinner");
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>
