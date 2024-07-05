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

      <!-- table -->
      <v-data-table
        v-model="selectedRows"
        :headers="tableColumns"
        :items="tableDataList"
        :items-per-page="20"
        :search="search"
        :loading="loading"
        :custom-filter="filterOnlyCapsText"
        :mobile-breakpoint="0"

      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Data List</v-toolbar-title>
          </v-toolbar>
        </template>

        <!-- id -->
        <template #[`item.shortSUBJECT`]="{item}">
            <router-link
              class="font-weight-medium text-decoration-none"
              :to="{ name: 'NotificationItemDetailView', query: { id: item.ID } }"
            >
              {{ item.shortSUBJECT }}
          </router-link>
        </template>

        <!-- type -->
        <template #[`item.TYPE_NM`]="{ item }">
          <v-chip small :color="resolveTypeVariant(item.TYPE_NM)">
            {{ item.TYPE_NM }}
          </v-chip>
        </template>

        <!-- status -->
        <template #[`item.STATUS`]="{ item }">
          <v-chip small :color="resolveUserStatusVariant(item.STATUS)">
            <span>{{ item.STATUS }} </span> 
          </v-chip>
        </template>
        
        <!-- read  -->
        <template #[`item.rcnt`]="{ item }">
          <span class="table_bold-text">{{ item.rcnt }} </span> 
        </template>
        
        <!-- attcheced  -->
        <template #[`item.acnt`]="{ item }">
          <span class="table_bold-text">  {{ item.acnt == 0 ? '':item.acnt }}</span>
        </template>

        
        <template v-slot:item.actions="{ item }">
          <router-link  v-if =isCanEditItem(item)
              class="font-weight-medium text-decoration-none"
              :to="{ name: 'NotificationItemDetailEdit', query: { id: item.ID } }"
            >
            <v-icon > {{ icons.mdiPencil }} </v-icon>
          </router-link>
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
import utils from "../../utils/utils.js";

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
        { text: "ID",value: "ID",align: "center", sortable: true,width: '5%' },
        { text: "Target",value: "TARGET",align: "center",sortable: true,},
        { text: "Subject", value: "shortSUBJECT"  , align: 'start', removable: true  ,width: '50%'},
        { text: "Status", value: "STATUS", sortable: true , align: 'end',removable: true},
        { text: "Read", value: "rcnt", sortable: true , align: 'end',removable: true},
        { text: "Attached", value: "acnt", sortable: true , align: 'end',removable: true},
        { text: "Actions", value: "actions", sortable: false },
    ];
    const options = {
        sortBy: ["id"],
        sortDesc: [true],
    };

    const tableDataList  = [];
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
      tableDataList,
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

    isCanEditItem(item) {
      if (this.$store.state.userInfo.userTypeId == 4) {
          return true;
      } else {
         return item.CRD_USER == this.$store.state.userName ? true : false;
      }
    },
    remove (key) {
        this.headers = this.headers.filter(header => header.key !== key)
    },

    async notificationDataList() {
        this.loading =true;
        const payload = {
          status: this.statusFilter,
          notificationTarget: this.selectedFilter,
          notificationType: this.notificationFilter,
        };

        const data = await baseApi.getNotificationDataList(payload);
      
        if(data){
          for ( var n in data.data.dataList){  
              data.data.dataList[n].shortSCONTENTS =  utils.unescapeHTML(data.data.dataList[n].CONTENTS).substr(0,50);
              data.data.dataList[n].SCONTENTS      =  utils.unescapeHTML(data.data.dataList[n].CONTENTS);

              data.data.dataList[n].shortSUBJECT   =  utils.unescapeHTML(data.data.dataList[n].SUBJECT).substr(0,20);
              data.data.dataList[n].SUBJECT        =  utils.unescapeHTML(data.data.dataList[n].SUBJECT);
          }
          this.tableDataList = data.data.dataList;
          this.loading =false;
        }
      
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

    resolveAttched(cnt) {
      if (cnt) return "info";

      return "";
    },

    editItem(item) {
      this.editedIndex = this.tableDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.startdate = item.STD_DATE;
      this.enddate = item.END_DATE;
      this.editTarget = item.TARGET;
      this.editType = item.TYPE;
      this.editState = item.STATUS;
      this.editState = item.STATUS;

      
      this.editedItem.CRD_USER = this.$store.state.userInfo.userName;
      this.dialog = true;
      this.isCanEditItem(item);

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
  },
};
</script>

<style scoped>
.columns-style{
  color: #220fcf;
}

.table_bold-text {
  font-weight: bold;
}
</style>
