//import axios from 'axios';
import bus from "../../../utils/bus.js";
import calendarApi from "../../../api/calendarApi";
import store from "@/store";

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: "success",
        label: "attendance",
      },
    ],
    selectedCalendars: ["attendance"],
  },
  getters: {},
  mutations: {
    SET_SELECTED_CALENDARS(state, val) {
      state.selectedCalendars = val;
    },
  },
  actions: {
    fetchEvents({ commit }, _date) {
      console.log(store);

      //start spinner
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;

      console.log("=========>", _date);

      const pramData = {
        userName: userInfo.userName,
        reqDate: _date,
      };

      return new Promise((resolve, reject) => {
        calendarApi
          .fetchAttendEvents(pramData)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchHistoryEvents({ commit }, _date) {
      console.log(store);

      //start spinner
      bus.$emit("start:spinner");

      const userInfo = store.state.userInfo;

      console.log("=========>", _date);

      const pramData = {
        userName: userInfo.userName,
        reqDate: _date,
      };

      return new Promise((resolve, reject) => {
        calendarApi
          .fetchAttendHistoryEvents(pramData)
          .then((response) => resolve(response))
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
