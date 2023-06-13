//import axios from 'axios';

import calendarApi from '../../../api/calendarApi';
import store from '@/store';

export default {
	namespaced: true,
	state: {
		calendarOptions: [
			{
				color: 'success',
				label: 'attendance',
			},
		],
		selectedCalendars: ['attendance'],
	},
	getters: {},
	mutations: {
		SET_SELECTED_CALENDARS(state, val) {
			state.selectedCalendars = val;
		},
	},
	actions: {
		fetchEvents() {
			console.log(store);
			const userInfo = store.state.userInfo;

			console.log(calendarApi);

			return new Promise((resolve, reject) => {
				calendarApi
					.fetchAttendEvents(userInfo)
					.then(response => resolve(response))
					.catch(error => reject(error));
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
