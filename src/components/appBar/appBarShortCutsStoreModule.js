//import axios from 'axios';
import bus from "../../utils/bus.js";
import baseApi from "../../api/index.js";
import store from "@/store";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    currentShortCuts: "currentShortCuts",
    shortCustsItemList: [],
  },
  getters: {
    isExsitPath(state) {
      for (var i in store.state.appShortcusts.shortCustsItemList) {
        if (
          store.state.appShortcusts.shortCustsItemList[i].menu_url ==
          state.currentShortCuts
        ) {
          return true;
        }
      }
      return false;
    },
  },
  mutations: {
    SET_CUURENT_SHORTCUTS(state, val) {
      state.currentShortCuts = val;
    },

    SET_SHORTCUTS_LIST(state, val) {
      state.shortCustsItemList = val;
    },
  },
  actions: {
    insertEvents({ commit }, data) {
      commit("SET_CUURENT_SHORTCUTS", data.shortcuts);

      for (var i in store.state.appShortcusts.shortCustsItemList) {
        if (
          store.state.appShortcusts.shortCustsItemList[i].menu_url ==
          data.shortcuts
        ) {
          console.log("이미 존재 합니다. ");
          Vue.toasted
            .info("The requested data already exists.", {
              icon: "info",
              position: "top-center",
              action: {
                text: "Close",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            })
            .goAway(3500);
          return false;
        }
      }

      //start spinner
      bus.$emit("start:spinner");
      return new Promise((resolve, reject) => {
        baseApi
          .insertShortcuts(data)
          .then((response) => {
            resolve(response);
            store.dispatch("appShortcusts/fetchEvents");

            Vue.toasted
              .success("has been added", {
                icon: "success",
                position: "top-center",
                action: {
                  text: "Close",
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              })
              .goAway(2500);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchEvents({ commit }) {
      //start spinner
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;
      const data = {
        userName: userInfo.userName,
      };

      return new Promise((resolve, reject) => {
        baseApi
          .selectShortcuts(data)
          .then((response) => {
            commit("SET_SHORTCUTS_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    updateEvents({ commit }, data) {
      //start spinner
      bus.$emit("start:spinner");
      return new Promise((resolve, reject) => {
        baseApi
          .updateShortcuts(data)
          .then((response) => {
            resolve(response);
            store.dispatch("appShortcusts/fetchEvents");
            Vue.toasted
              .success("has been deleted", {
                icon: "success",
                position: "top-center",
                action: {
                  text: "Close",
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              })
              .goAway(2500);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },
  },
};
