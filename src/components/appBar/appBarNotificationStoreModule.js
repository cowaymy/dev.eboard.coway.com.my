//import axios from 'axios';
import bus from "../../utils/bus.js";
import baseApi from "../../api/index.js";
import store from "@/store";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    selectedItem: {},
    dataItemList: [],
    newNotificationCnt: 0,
    isNewNotification: false,
  },
  getters: {},
  mutations: {
    SET_SELECTED_ITEM(state, val) {
      state.selectedItem = Object.assign({}, val);
    },

    SET_DATA_ITEM_LIST(state, val) {
      state.dataItemList = val;
    },

    SET_DATA_COUNT(state) {
      state.newNotificationCnt = state.dataItemList.length;
      state.isNewNotification = state.dataItemList.length > 0;

      if (state.dataItemList.length > 0 ) state.isNewNotification = true ;
      else state.isNewNotification = false ;
    },
  },
  actions: {
    fetchEvents({ commit }) {
      //start spinner
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;
      return new Promise((resolve, reject) => {
        baseApi
          .getDetailNewNotification(userInfo)
          .then((response) => {
            //console.log(response.data.dataList);
            commit("SET_DATA_ITEM_LIST", response.data.dataList);
            commit("SET_DATA_COUNT");
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },
  },
};
