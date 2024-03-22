<template>
  <div id="">
    <!-- list filters -->
    <v-card>
      <v-card-title> Search &amp; Filter </v-card-title>
      <v-row class="px-2 ma-0">
        <!-- role filter -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedFilter"
            :items="targetOptions"
            label="Select Target"
            item-text="title"
            item-value="value"
            multiple
            clearable
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="toggle">
                <v-list-item-action>
                  <v-icon
                    :color="selectedTargrt.length > 0 ? 'indigo darken-4' : ''"
                  >
                    {{ icons.targetBox }}
                  </v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title> Select All </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>

          <!-- <v-select
						v-model="targetFilter"
						clearable
						multiple
						closable-chips="true"
						:items="targetOptions"
						label="Select Target"
					></v-select> -->

          <!-- <v-select
						v-model="targetFilter"
						placeholder="Select Target"
						:items="targetOptions"
						item-text="title"
						item-value="value"
						outlined
						clearable
						dense
						hide-details
					></v-select> -->
        </v-col>

        <!-- plan filter -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="notificationFilter"
            label="Select Type"
            :items="notificationOptions"
            item-text="title"
            item-value="value"
            clearable
          ></v-select>
        </v-col>

        <!-- status filter -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="statusFilter"
            label="Select Status"
            :items="statusOptions"
            item-text="title"
            item-value="value"
            clearable
          ></v-select>
        </v-col>
      </v-row>

      <v-divider class="mt-4"></v-divider>

      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="search"
          placeholder="Search"
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn
            color="primary"
            class="mb-4 me-3"
            @click="notificationDataList"
          >
            <v-icon>{{ icons.mdiSearchWeb }} </v-icon>
            <span>search</span>
          </v-btn>
        </div>
      </v-card-text>

      <v-divider class="mt-4"></v-divider>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">EDIT</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="editedItem.SUBJECT"
                    label="Subject"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.CONTENTS"
                    label="Contents"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-dialog
                    ref="dialog"
                    v-model="startdateModel"
                    :return-value.sync="startdate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startdate"
                        label="Start Date"
                        hint="YYYY-mm-dd format"
                        persistent-hint
                        :prepend-icon="icons.mdiCalendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker
                      v-model="startdate"
                      scrollable
                      color="primary"
                    >
                      <v-btn
                        text
                        color="primary"
                        @click="startdateModel = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(startdate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12" md="6">
                  <v-dialog
                    ref="dialog2"
                    v-model="enddateModel"
                    :return-value.sync="enddate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="enddate"
                        label="End Date"
                        hint="YYYY-mm-dd format"
                        persistent-hint
                        :prepend-icon="icons.mdiCalendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="enddate" scrollable color="primary">
                      <v-btn text color="primary" @click="enddateModel = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog2.save(enddate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="editedItem.TARGET"
                    label="Target "
                    :items="targetOptions"
                    item-text="title"
                    item-value="value"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="editedItem.TYPE"
                    label="Target "
                    :items="notificationOptions"
                    item-text="title"
                    item-value="value"
                    clearable
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="editedItem.STATUS"
                    label="status "
                    :items="statusOptions"
                    item-text="title"
                    item-value="value"
                    clearable
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="close"> Cancel </v-btn>

            <template v-if="isCanEdit">
              <v-btn color="blue" text @click="save"> Save </v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- table -->
      <v-data-table
        v-model="selectedRows"
        :headers="tableColumns"
        :items="desserts"
        :items-per-page="10"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <!-- type -->
        <template #[`item.TYPE_NM`]="{ item }">
          <v-chip small :color="resolveTypeVariant(item.TYPE_NM)">
            {{ item.TYPE_NM }}
          </v-chip>
        </template>

        <!-- status -->
        <template #[`item.STATUS`]="{ item }">
          <v-chip small :color="resolveUserStatusVariant(item.STATUS)">
            {{ item.STATUS }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon @click="editItem(item)"> {{ icons.mdiPencil }} </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiSquareEditOutline,
  mdiDotsVertical,
  mdiPlus,
  mdiFileDocumentOutline,
  mdiDeleteOutline,
  mdiExportVariant,
  mdiAccountOutline,
  mdiSearchWeb,
  mdiPencil,
  mdiDelete,
} from "@mdi/js";
// sidebar
//import { avatarText } from '@core/utils/filter';
import baseApi from "../../api/index.js";

export default {
  components: {},
  data() {
    const startdate = new Date().toISOString().substr(0, 10);
    const enddate = new Date().toISOString().substr(0, 10);
    const isCanEdit = false;

    const isAddNewUserSidebarActive = false;
    const targetOptions = [
      { title: "ALL", value: "ALL" },
      { title: "All Salse", value: "^GM^SM^HM^HP" },
      { title: "GM", value: "GM" },
      { title: "SM", value: "SM" },
      { title: "HM", value: "HM" },
      { title: "HP", value: "HP" },

      { title: "All Cody", value: "^GCM^SCM^CM^CODY" },
      { title: "GCM", value: "GCM" },
      { title: "SCM", value: "SCM" },
      { title: "CM", value: "CM" },
      { title: "CODY", value: "CODY" },
    ];

    const notificationOptions = [
      { title: "Emergency", value: "E" },
      { title: "Normal", value: "N" },
    ];

    const statusOptions = [
      { title: "Pending", value: "P" },
      { title: "Active", value: "A" },
      { title: "Inactive", value: "I" },
    ];

    const tableColumns = [
      { text: "ID", value: "ID" },
      {
        text: "Target",
        value: "TARGET",
        align: "center",
        sortable: true,
      },
      { text: "Type", value: "TYPE_NM", sortable: true },
      { text: "Subject", value: "SUBJECT" },
      { text: "Contents", value: "CONTENTS", sortable: true },
      { text: "StartDate", value: "STD_DATE", sortable: true },
      { text: "EndDate", value: "END_DATE", sortable: true },
      { text: "Status", value: "STATUS", sortable: true },

      {
        text: "User",
        value: "CRD_USER",
        align: "center",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false },
    ];

    // const itemTarget = [
    // 	{
    // 		id: 1,
    // 		name: 'ALL',
    // 		children: [
    // 			{
    // 				id: 'SAL',
    // 				name: 'SALES',
    // 				children: [
    // 					{ id: 'GM', name: 'GM' },
    // 					{ id: 'SM', name: 'SM' },
    // 					{ id: 'HM', name: 'HM' },
    // 					{ id: 'HP', name: 'HP' },
    // 				],
    // 			},
    // 			{
    // 				id: 'CODY_ALL',
    // 				name: 'CODY',
    // 				children: [
    // 					{ id: 'GCM', name: 'GCM' },
    // 					{ id: 'SCM', name: 'SCM' },
    // 					{ id: 'CM', name: 'CM' },
    // 					{ id: 'CODY', name: 'Cody' },
    // 				],
    // 			},
    // 		],
    // 	},
    // ];

    const options = {
      sortBy: ["id"],
      sortDesc: [true],
    };

    const desserts = [];
    const selectedRows = [];

    return {
      selectionType: "leaf",
      targetOptions,
      isAddNewUserSidebarActive,
      //avatarText,
      selectedFilter: [],
      notificationFilter: null,
      notificationOptions,
      statusFilter: null,
      statusOptions,
      dialog: false,
      dialogDelete: false,
      /** DATA TABLE  */
      selectedRows,
      tableColumns,
      desserts,
      searchQuery: "",
      totalDatalListTable: "",
      loading: false,
      options,
      startdate,
      enddate,
      startdateModel: "",
      enddateModel: "",
      isCanEdit,
      // icons
      icons: {
        mdiSquareEditOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
        mdiDeleteOutline,
        mdiPlus,
        mdiExportVariant,
        mdiAccountOutline,
        mdiSearchWeb,
        mdiPencil,
        mdiDelete,
        targetBox: mdiPlus,
      },
      search: "",
      selectedTargrt: [],
      editedIndex: -1,
      editedItem: {
        ID: "",
        SUBJECT: "",
        CONTENTS: "",
        STATUS: "",
        STD_DATE: "",
        END_DATE: "",
        TARGET: "",
        TYPE: "",
        CRD_USER: "",
      },

      defaultItem: {
        ID: "",
        SUBJECT: "",
        CONTENTS: "",
        STATUS: "",
        STD_DATE: "",
        END_DATE: "",
        TARGET: "",
        TYPE: "",
      },
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  computed: {
    clickAllTarget() {
      return this.selectedFilter.length === this.targetOptions.length;
    },
    likesSomeTarget() {
      return this.selectedFilter.length > 0 && !this.clickAllTarget;
    },
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.clickAllTarget) {
          this.selectedFilter = [];
          this.targetBox = "mdiAccountOutline";
        } else {
          this.selectedFilter = this.targetOptions.slice();
          this.targetBox = "mdiPlus";
        }
      });
    },

    async notificationDataList() {
      const payload = {
        status: this.statusFilter,
        notificationTarget: this.selectedFilter,
        notificationType: this.notificationFilter,
      };

      const data = await baseApi.getNotificationDataList(payload);
      this.desserts = data.data.dataList;
    },

    async notificationDataUpdate() {
      const data = await baseApi.saveNotification(this.editedItem);
      console.log(data);
    },

    resolveUserStatusVariant(status) {
      if (status === "P") return "warning";
      if (status === "A") return "success";
      if (status === "I") return "secondary";

      return "primary";
    },

    resolveTypeVariant(status) {
      if (status === "Emergency") return "error";
      if (status === "Normal") return "success";

      return "primary";
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.startdate = item.STD_DATE;
      this.enddate = item.END_DATE;
      this.editTarget = item.TARGET;
      this.editType = item.TYPE;
      this.editState = item.STATUS;
      this.dialog = true;
      this.isCanEditItem(item);
      this.editedItem.CRD_USER = this.$store.state.userName;
    },
    deleteItem(item) {
      console.log(item);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      this.editedItem.STD_DATE = this.startdate;
      this.editedItem.END_DATE = this.enddate;
      this.notificationDataUpdate();
      this.close();
    },

    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },

    isCanEditItem(item) {
      if (this.$store.state.userInfo.userTypeId == 4) {
        this.isCanEdit = true;
      } else {
        this.isCanEdit =
          item.CRD_USER == this.$store.state.userName ? true : false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
