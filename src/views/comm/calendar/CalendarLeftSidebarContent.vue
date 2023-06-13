<template>
	<div class="ma-5">
		<!-- <v-btn block color="primary" @click="$emit('open-evnt-handler-drawer')">
			Add Event
		</v-btn> -->

		<v-btn block color="primary"> Attendance </v-btn>

		<!-- Calendars -->
		<p class="text-xs text--disabled mt-8 mb-1">CALENDARS</p>

		<!-- Calendar Options -->
		<!-- <v-checkbox v-model="checkAll" label="View All" hide-details></v-checkbox> -->
		<v-checkbox
			v-for="item in calendarOptions"
			:key="item.label"
			v-model="selectedCalendars"
			:value="item.label"
			:color="item.color"
			:label="item.label"
			class="mt-2"
			hide-details
		>
		</v-checkbox>
	</div>
</template>

<script>
import store from '@/store';

export default {
	created() {
		//this.initCalendar();
	},

	methods: {},

	data() {
		// // ------------------------------------------------
		// // calendarOptions
		// // ------------------------------------------------
		// const calendarOptions = computed(
		// 	() =>,
		// );

		// // ------------------------------------------------
		// // selectedCalendars
		// // ------------------------------------------------
		// const selectedCalendars = computed({
		// 	get: () => store.state['app-calendar'].selectedCalendars,
		// 	set: val => {
		// 		store.commit('app-calendar/SET_SELECTED_CALENDARS', val);
		// 	},
		// });

		return {
			checkAll: false,
			calendarOptions: store.state['app-calendar'].calendarOptions,
			selectedCalendars: store.state['app-calendar'].selectedCalendars,
		};
	},
};
</script>

<style></style>
