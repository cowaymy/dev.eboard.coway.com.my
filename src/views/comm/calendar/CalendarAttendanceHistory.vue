<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title>
          <span style="color: info; font-weight: bold"
            >Attendance Period</span
          ></v-card-title
        >
        <v-card-text class="d-flex align-center flex-wrap pb-0">
          <div class="d-flex align-center pb-5">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Attendance date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>

          <v-spacer></v-spacer>

          <div class="d-flex align-center pb-5">
            <!-- create invoice -->
            <v-btn color="primary" class="me-3" @click="fetchEvents()">
              <v-icon size="18" class="me-1">
                {{ icons.mdiMagnifyPlusOutline }}
              </v-icon>
              <span>Search</span>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="12">
      <v-chip
        size="x-small"
        :color="setTagColor('A0005')"
        @click="fetchEvents('A0005')"
        class="me-3"
      >
        <v-icon class="me-1">
          {{ setTag("A0005") }}
        </v-icon>
        <span>W</span>
      </v-chip>

      <v-chip
        :color="setTagColor('A0004')"
        @click="fetchEvents('A0004')"
        class="me-3"
      >
        <v-icon class="me-1">
          {{ setTag("A0004") }}
        </v-icon>
        <span> R</span>
      </v-chip>
      <v-chip
        :color="setTagColor('A0002')"
        @click="fetchEvents('A0002')"
        class="me-3"
      >
        <v-icon class="me-1">
          {{ setTag("A0002") }}
        </v-icon>
        <span> H</span>
      </v-chip>

      <v-chip
        :color="setTagColor('A0001')"
        @click="fetchEvents('A0001')"
        class="me-3"
      >
        <v-icon class="me-1">
          {{ setTag("A0001") }}
        </v-icon>
        <span> QR</span>
      </v-chip>
    </v-col>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title class="align-start">
          <span style="color: info; font-weight: bold"
            >Your Attendance History</span
          >
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          <v-list class="pt-0">
            <v-list-item
              v-for="(item, index) in events"
              :key="item.start"
              :class="`d-flex align-center px-0 ${index > 0 ? 'mt-3' : ''}`"
            >
              <template v-if="item.isAttendance == 1">
                <v-list-item-avatar size="38" color="info">
                  <v-icon size="18" color="error">
                    {{ icons.mdiCheckBold }}
                  </v-icon>
                </v-list-item-avatar>

                <div
                  class="d-flex align-center flex-grow-1 flex-wrap text-no-wrap"
                >
                  <div class="me-2">
                    <v-list-item-title class="text-xs">
                      <span style="color: info; font-weight: bold">
                        ( {{ item.title_id }} )</span
                      >{{ item.title }}
                    </v-list-item-title>

                    <div class="d-flex align-center">
                      <v-icon size="14" class="me-1">
                        {{ icons.mdiCalendarClockOutline }}
                      </v-icon>
                      <v-list-item-subtitle>
                        <span style="font-weight: bold">
                          {{ item.event_date }}</span
                        >
                        |
                        <span style="color: blue; font-weight: bold">
                          {{
                            item.attend_type_code == "A0001"
                              ? splitData(item.start, "T")[1]
                              : getType(item.attend_type_code)
                          }}</span
                        >
                      </v-list-item-subtitle>
                    </div>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <span>
                  <v-icon :color="setTagColor(item.attend_type_code)" start>
                    {{ setTag(item.attend_type_code) }}
                  </v-icon></span
                >
              </template>
              <template v-else>
                <v-list-item-avatar size="38" color="secondary">
                  <v-icon size="18">
                    {{ icons.mdiCancel }}
                  </v-icon>
                </v-list-item-avatar>

                <div
                  class="d-flex align-center flex-grow-1 flex-wrap text-no-wrap"
                >
                  <div class="me-2">
                    <v-list-item-title class="text-xs"> </v-list-item-title>

                    <div class="d-flex align-center">
                      <v-icon size="14" class="me-1">
                        {{ icons.mdiCalendarClockOutline }}
                      </v-icon>
                      <v-list-item-subtitle>
                        <span style="font-weight: bold">
                          {{ item.event_date }}</span
                        >
                      </v-list-item-subtitle>
                    </div>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <span>
                  <v-icon :color="setTagColor(item.attend_type_code)" start>
                    {{ setTag(item.attend_type_code) }}
                  </v-icon></span
                >
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiCalendarBlankOutline,
  mdiDotsVertical,
  mdiMagnifyPlusOutline,
  mdiCalendarClockOutline,
  mdiCheckBold,
  mdiLabelMultiple,
  mdiMessageAlertOutline,
  mdiQrcodeScan,
  mdiAirplaneTakeoff,
  mdiClipboardEditOutline,
  mdiCalendarHeart,
  mdiCancel,
} from "@mdi/js";

import store from "@/store";
import calendarStoreModule from "./calendarStoreModule";
const CALENDAR_APP_STORE_MODULE_NAME = "app-calendar";

export default {
  data() {
    if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) {
      store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule);
      console.log(store.hasModule(CALENDAR_APP_STORE_MODULE_NAME));
    }

    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      events: [],
      icons: {
        mdiDotsVertical,
        mdiCalendarBlankOutline,
        mdiMagnifyPlusOutline,
        mdiCalendarClockOutline,
        mdiCheckBold,
        mdiLabelMultiple,
        mdiMessageAlertOutline,
        mdiQrcodeScan,
        mdiAirplaneTakeoff,
        mdiClipboardEditOutline,
        mdiCalendarHeart,
        mdiCancel,
      },
    };
  },

  computed: {},

  methods: {
    getType(t) {
      if (t == "A0002") {
        return "Public Holiday";
      } else if (t == "A0003") {
        return "State Holiday";
      } else if (t == "A0004") {
        return "RFA";
      } else if (t == "A0005") {
        return "Waived";
      }
    },
    fetchEvents(_type) {
      const parsedValue = this.date.replace(/-/g, "");
      store
        .dispatch(
          `${CALENDAR_APP_STORE_MODULE_NAME}/fetchHistoryEvents`,
          parsedValue
        )
        .then((response) => {
          console.log(response.data.dataList);
          const _events = response.data.dataList;
          if (_type === undefined) {
            this.events = [..._events];
          } else {
            const eObj = [];

            response.data.dataList.forEach((element) => {
              if (
                element.attend_type_code == _type ||
                (_type == "A0002" && element.attend_type_code == "A0003")
              ) {
                console.log(element);
                eObj.push(element);
              }

              this.events = [...eObj];
            });
          }
          console.log(this.events);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
        });
    },

    keyEvents(type) {
      console.log("---------------------------");
      console.log(type);

      console.log("---------------------------");

      return this.events.filter((item) => {
        console.log(item),
          item.attend_type_code.toLowerCase().includes("A0004");
      });
    },
    splitData(data, type) {
      console.log(data);
      if (data === undefined || data == "" || data == null) return "";

      return data.split(type);
    },

    setTag(typeCode) {
      let tagIcon = mdiMessageAlertOutline;
      if (typeCode == "A0001") {
        tagIcon = mdiQrcodeScan;
      } else if (typeCode == "A0002" || typeCode == "A0003") {
        tagIcon = mdiAirplaneTakeoff;
      } else if (typeCode == "A0004") {
        tagIcon = mdiClipboardEditOutline;
      } else if (typeCode == "A0005") {
        tagIcon = mdiCalendarHeart;
      } else {
        tagIcon = mdiMessageAlertOutline;
      }

      return tagIcon;
    },

    setTagColor(typeCode) {
      let tagIcon = "secondary";
      if (typeCode == "A0001") {
        tagIcon = "info";
      } else if (typeCode == "A0002" || typeCode == "A0003") {
        tagIcon = "warning";
      } else if (typeCode == "A0004") {
        tagIcon = "success";
      } else if (typeCode == "A0005") {
        tagIcon = "error";
      } else {
        tagIcon = "secondary";
      }

      return tagIcon;
    },
  },
};
</script>
