//import axios from 'axios';
import bus from "../../../utils/bus.js";
import salesApi from "../../../api/salesApi";
import store from "@/store";

export default {
  namespaced: true,
  state: {
    apiCurMonthData: {},
    apiTargetData: {},
  },
  getters: {
    apiCurMonthData(state) {
      return state.apiCurMonthData;
    },
    apiTargetData(state) {
      return state.apiTargetData;
    },
  },
  mutations: {
    setApiCurMonthData(state, data) {
      console.log(data);
      state.apiCurMonthData = data;
    },

    setApiTargetData(state, data) {
      console.log(data);
      state.apiTargetData = data;
    },
  },
  actions: {
    fetchCurMonthData({ commit }) {
      //start spinner
      bus.$emit("start:spinner");
      const userInfo = store.state.userInfo;

      return new Promise((resolve, reject) => {
        salesApi
          .getCurMonthData(userInfo)
          .then((response) => {
            commit("setApiCurMonthData", response.data);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchTargetData({ commit }) {
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;

      return new Promise((resolve, reject) => {
        salesApi
          .getTargetData(userInfo)
          .then((response) => {
            commit("setApiTargetData", response.data);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    // addEvent(ctx, { event }) {
    // 	return new Promise((resolve, reject) => {
    // 		axios
    // 			.post('/apps/calendar/events', { event })
    // 			.then(response => resolve(response))
    // 			.catch(error => reject(error));
    // 	});
    // },
    // updateEvent(ctx, { event }) {
    // 	return new Promise((resolve, reject) => {
    // 		axios
    // 			.post(`/apps/calendar/events/${event.id}`, { event })
    // 			.then(response => resolve(response))
    // 			.catch(error => reject(error));
    // 	});
    // },
    // removeEvent(ctx, { id }) {
    // 	return new Promise((resolve, reject) => {
    // 		axios
    // 			.delete(`/apps/calendar/events/${id}`)
    // 			.then(response => resolve(response))
    // 			.catch(error => reject(error));
    // 	});
    // },
  },
};
