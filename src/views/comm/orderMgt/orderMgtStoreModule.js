//import axios from 'axios';
import bus from "../../../utils/bus.js";
import orderMgtApi from "../../../api/orderMgtApi";
import store from "@/store";

export default {
  namespaced: true,
  state: {
    orderMgtOptions: [
      {
        color: "success",
        label: "orderMgt",
      },
    ],
    selectedOrderItem: ["item"],
  },
  getters: {},
  mutations: {
    SET_SELECTED_ITEM(state, val) {
      state.selectedOrderItem = val;
    },
  },
  actions: {
    fetchEvents({ commit }, _date) {
      //start spinner
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;

      const pramData = {
        id: userInfo.userName,
        salesDt: _date,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchEkeyInOrderList({ commit }, preOrdId) {
      //start spinner
      bus.$emit("start:spinner");
      const pramData = {
        preOrdId: preOrdId,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchEkeyInOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchCCPOrderList({ commit }, salesOrdId) {
      //start spinner
      bus.$emit("start:spinner");
      const pramData = {
        salesOrdId: salesOrdId,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchCCPOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchECASHOrderList({ commit }, salesOrdId) {
      //start spinner
      bus.$emit("start:spinner");
      const pramData = {
        salesOrdId: salesOrdId,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchECASHOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchCALLLOGOrderList({ commit }, salesOrdId) {
      //start spinner
      bus.$emit("start:spinner");
      const pramData = {
        salesOrdId: salesOrdId,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchCALLLOGOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchINSTALLOrderList({ commit }, salesOrdId) {
      //start spinner
      bus.$emit("start:spinner");
      const pramData = {
        salesOrdId: salesOrdId,
      };

      return new Promise((resolve, reject) => {
        orderMgtApi
          .fetchINSTALLOrderList(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },
  },
};
