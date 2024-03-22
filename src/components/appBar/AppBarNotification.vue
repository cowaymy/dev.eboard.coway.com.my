<template>
  <v-menu
    offset-y
    left
    nudge-bottom="22"
    :elevation="$vuetify.theme.dark ? 9 : 8"
    content-class="list-style notification-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">

      <v-icon v-bind="attrs" v-on="on" :color="nColor"  :class="nStyle">
        {{ icons.mdiBellRing }}
      </v-icon>
    </template>
    <v-card class="app-bar-notification-content-container">
      <perfect-scrollbar
        class="ps-user-notifications"
        :options="perfectScrollbarOptions"
      >
        <v-list class="py-0">
          <!-- Header -->
          <v-list-item class="d-flex" link>
            <div class="d-flex align-center justify-space-between flex-grow-1">
              <span class="font-weight-semibold">Notifications</span>
              <v-chip
                class="v-chip-light-bg primary--text font-weight-semibold"
                small
              >
                {{ newNotificationCnt }} NEW
              </v-chip>
            </div>
          </v-list-item>
          <v-divider></v-divider>

          <!-- Notifications -->
          <template v-for="(notification, index) in notificationsData">
            <v-list-item
              :key="notification.ID"
              @click="setSelectedItem(notification)"
              link
            >
              <!-- Avatar -->
              <v-list-item-avatar
                :class="getTypeClass(notification.TYPE)"
                size="38"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#2A3B4D"
                      :class="getTypeClass(notification.TYPE)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="text-lg">{{ notification.TYPE }}</span>
                    </v-btn>
                  </template>
                  <span>{{ notification.TYPE_NM }}</span>
                </v-tooltip>
              </v-list-item-avatar>

              <!-- Content -->
              <v-list-item-content class="d-block">
                <v-list-item-title class="text-sm font-weight-semibold">
                  {{ setLimitText("T", notification.SUBJECT) }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-sm">
                  {{ setLimitText("S", notification) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <!-- Item Action/Time -->
              <v-list-item-action>
                <span class="text--secondary text-xs">{{
                  notification.STD_DATE
                }}</span>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
          <router-link to="/notif/NotificationList">
            <v-list-item key="read-all-btn" class="read-all-btn-list-item">
              <v-btn block color="primary"> Read All Notifications </v-btn>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>
        </v-list>
      </perfect-scrollbar>
    </v-card>
  </v-menu>
</template>

<script>
import { mdiBellRing } from "@mdi/js";
import store from "@/store";

import utils from "../../utils/utils.js";
import appBarNotificationStoreModule from "./appBarNotificationStoreModule";
const APPBAR_NOTIFICATION_STORE_MODULE_NAME = "appNotification";

// 3rd Party
import { PerfectScrollbar } from "vue2-perfect-scrollbar";

export default {
  components: {
    PerfectScrollbar,
  },

  computed: {
    notificationsData() {
      return this.$store.state.appNotification.dataItemList;
    },

    newNotificationCnt() {
      return this.$store.state.appNotification.newNotificationCnt;
    },

    isNewNotification() {
      return this.$store.state.appNotification.isNewNotification;
    },

    newNotiImg(){
      if(this.$store.state.appNotification.isNewNotification) return 'mdi-bell-ring'
      else return 'mdi-bell-ring'
      
    } ,  
    nColor(){
      if(this.$store.state.appNotification.isNewNotification) return 'error'
      else return 'secondary'
    },
    nStyle(){
      if(this.$store.state.appNotification.isNewNotification) return 'ball'
      else return ''
    }
  },

  data() {
    if (!store.hasModule(APPBAR_NOTIFICATION_STORE_MODULE_NAME)) {
      store.registerModule(
        APPBAR_NOTIFICATION_STORE_MODULE_NAME,
        appBarNotificationStoreModule
      );
    }

    const perfectScrollbarOptions = {
      // maxScrollbarLength: 60,
      wheelPropagation: true,
    };

    return {
      perfectScrollbarOptions,
      icons: { mdiBellRing },
    };
  },

  methods: {
    setSelectedItem(item) {
      // store.commit("appNotification/SET_SELECTED_ITEM", item);

      this.$store.state.appNotification.newNotificationCnt--;
      const arrayList =this.$store.state.appNotification.dataItemList; 
      const foundItem = arrayList.findIndex(t => t.ID === item.ID);
      if(foundItem > -1){
        arrayList.splice(foundItem,1);
      }


      if( this.$store.state.appNotification.newNotificationCnt ==0)
          this.$store.state.appNotification.isNewNotification =false;


      console.log(this.$route.query)
      const query = { ...this.$route.query ,id: item.ID };
      console.log(this.$route.query,item.ID)
      this.$router.push({ name: 'NotificationItemDetailView', query }); 
    },

   

    fetchEvents() {
      store.dispatch(`${APPBAR_NOTIFICATION_STORE_MODULE_NAME}/fetchEvents`);
    },
    getTypeClass(value) {
      return value == "E"
        ? "v-avatar-light-bg error--text justify-center"
        : "v-avatar-light-bg primary--text justify-center";
    },

    unescapeHTML(str){
        return utils.unescapeHTML(str);
    },

    setLimitText(type, value) {
      let rtnValue = "";
   
      if (type == "T") {
        rtnValue = value.length > 20 ? value.substring(0, 20) + " ..." : value;
      }

      if (type == "S") {
        
       // console.log(value)

        rtnValue = `create by ${value.CRD_USER}`;
        rtnValue = rtnValue.length > 40 ? rtnValue.substring(0, 40) + " ..." : rtnValue;
      }

      return rtnValue;
    },
  },

  created() {
    this.fetchEvents();
  },
};
</script>
<style>
.ball {
  color: #ff0000; /* 원하는 색상으로 변경 */
  border-radius: 50%;
  position: relative;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>