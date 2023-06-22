<template>
	<v-row class="fill-height">
		<v-col>
			<v-sheet height="68">
				<v-toolbar flat>
					<v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
						Today
					</v-btn>
					<v-btn fab text small color="grey darken-2" @click="prev">
						<v-icon> mdi-chevron-left </v-icon>
					</v-btn>
					<v-btn fab text small color="grey darken-2" @click="next">
						<v-icon> mdi-chevron-right </v-icon>
					</v-btn>
					<v-toolbar-title v-if="$refs.calendar">
						{{ $refs.calendar.title }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
								<span>{{ typeToLabel[type] }}</span>
								<v-icon right> mdi-menu-down </v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="type = 'month'">
								<v-list-item-title>Month</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-sheet>
			<v-sheet height="600">
				<v-calendar
					ref="calendar"
					v-model="focus"
					:events="events"
					:event-height="40"
					:event-margin-bottom="5"
					:event-margin-left="20"
					:event-more="false"
					:event-color="getEventColor"
					type="month"
					@click:event="showEvent"
					@click:more="viewDay"
					@click:date="viewDay"
					@change="updateRange"
				>
					<template v-slot:event="{ event }">
						<div>
							<div class="mr-12 my-event" style="display: flow-root">
								<div style="float: left">
									<div style="float: left">
										<v-btn id="btn-open" text icon color="error"
											><v-icon>{{ icons.mdiCheckUnderline }}</v-icon></v-btn
										>
									</div>
								</div>
								<div style="float: right">
									<v-btn text style="font-weight: bold">{{
										selectedEventStartText(event.start)
									}}</v-btn>
								</div>
							</div>
						</div>
					</template>
				</v-calendar>
			</v-sheet>
			<v-menu
				v-model="selectedOpen"
				:close-on-content-click="false"
				:activator="selectedElement"
				offset-x
			>
				<v-card color="grey lighten-4" min-width="200px" flat>
					<v-card-text>
						<div class="text-center">
							<p class="text-h6 text--primary">{{ selectedEvent.title }}</p>
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text-center">
							<v-icon size="30" color="error">
								{{ icons.mdiCheckCircle }}
							</v-icon>
							<p class="font-weight-semibold text-xl text--primary">
								{{ selectedEventStart }}
							</p>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-btn text color="info" @click="selectedOpen = false">
							close
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu>
		</v-col>
	</v-row>
</template>
<script>
import {
	mdiChevronLeft,
	mdiChevronRight,
	mdiMenu,
	mdiCheckCircle,
	mdiCheckUnderline,
} from '@mdi/js';

import { format } from 'date-fns';
import store from '@/store';
import calendarStoreModule from './calendarStoreModule';

const CALENDAR_APP_STORE_MODULE_NAME = 'app-calendar';

export default {
	data() {
		if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) {
			store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule);
			console.log(store.hasModule(CALENDAR_APP_STORE_MODULE_NAME));
		}

		return {
			focus: '',
			type: 'month',
			typeToLabel: {
				month: 'Month',
				day: 'Day',
			},
			selectedEvent: {},
			selectedElement: null,
			selectedOpen: false,
			events: [],
			// colors: [
			// 	'error',
			// 	'info',
			// 	'secondary',
			// 	'success',
			// 	'warning',
			// 	'primary',
			// 	'grey darken-1',
			// ],
			// names: [
			// 	'Meeting',
			// 	'Holiday',
			// 	'PTO',
			// 	'Travel',
			// 	'Event',
			// 	'Birthday',
			// 	'Conference',
			// 	'Party',
			// ],
			icons: {
				mdiChevronLeft,
				mdiChevronRight,
				mdiMenu,
				mdiCheckCircle,
				mdiCheckUnderline,
			},
		};
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
	computed: {
		selectedEventStart() {
			return (
				this.selectedEvent &&
				this.selectedEvent.start &&
				format(new Date(this.selectedEvent.start), 'h:mm a')
			);
		},
	},

	methods: {
		selectedEventStartText(val) {
			return format(new Date(val), 'h:mm a');
		},

		viewDay({ date }) {
			this.focus = date;
			this.type = 'day';
		},
		getEventColor(event) {
			return event.color;
		},
		setToday() {
			this.focus = '';
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},

		selectedEventTitle() {
			return this.selectedEvent.title;
		},

		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				this.selectedElement = nativeEvent.target;
				requestAnimationFrame(() =>
					requestAnimationFrame(() => (this.selectedOpen = true)),
				);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				requestAnimationFrame(() => requestAnimationFrame(() => open()));
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		updateRange({ start, end }) {
			const _events = [
				{
					name: '',
					start: '2023-05-01T09:40:00',
					color: '#FFFFFF',
					title: 'sales office a',
				},
				{
					name: '',
					start: '2023-05-02T09:10',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office b',
				},
				{
					name: '',
					start: '2023-05-03 08:10:30',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office c',
				},
				{
					name: '',
					start: '2023-05-04 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
				{
					name: '',
					start: '2023-05-06 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
				{
					name: '',
					start: '2023-05-11 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
				{
					name: '',
					start: '2023-05-18 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
				{
					name: '',
					start: '2023-05-25 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
				{
					name: '',
					start: '2023-05-30 08:50:00',
					timed: true,
					color: '#FFFFFF',
					title: 'sales office d',
				},
			];

			// const newEventItem = [];
			// _events.forEach(item => {
			// 	newEventItem.push({
			// 		name: '',
			// 		start: item.start,
			// 		end: item.end,
			// 		color: item.color,
			// 		timed: item.timed,
			// 	});

			// 	console.log(newEventItem);
			// });
			// this.events = newEventItem;
			// console.log(this.events);
			// const events = [];
			// const min = new Date(`${start.date}T00:00:00`);
			// const max = new Date(`${end.date}T23:59:59`);
			// const days = (max.getTime() - min.getTime()) / 86400000;
			// const eventCount = this.rnd(days, days + 20);
			// for (let i = 0; i < eventCount; i++) {
			// 	const allDay = this.rnd(0, 3) === 0;
			// 	const firstTimestamp = this.rnd(min.getTime(), max.getTime());
			// 	const first = new Date(firstTimestamp - (firstTimestamp % 900000));
			// 	const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
			// 	const second = new Date(first.getTime() + secondTimestamp);
			// 	events.push({
			// 		name: this.names[this.rnd(0, this.names.length - 1)],
			// 		start: first,
			// 		end: second,
			// 		color: this.colors[this.rnd(0, this.colors.length - 1)],
			// 		timed: !allDay,
			// 	});
			// }
			// this.events = events;
			//this.events = [..._events];

			this.fetchEvents();
		},

		fetchEvents() {
			console.log('fetchevents ==>', this.$refs.calendar);

			let yyyy = this.$refs.calendar.parsedValue.year.toString();
			let mon = this.$refs.calendar.parsedValue.month.toString();

			console.log(mon.length);

			let cmon = mon.length == 1 ? '0'.concat(mon) : mon;

			const parsedValue = yyyy.concat(cmon);
			store
				.dispatch(`${CALENDAR_APP_STORE_MODULE_NAME}/fetchEvents`, parsedValue)
				.then(response => {
					console.log(response.data.dataList);
					const _events = response.data.dataList;
					_events.forEach(fetchedEvent => {
						console.log(fetchedEvent);
						/* eslint-disable no-param-reassign */
					});

					this.events = [..._events];
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},
	},
};
</script>

<style scoped>
.my-event {
	margin-left: 6px;
}

.my-event.with-time {
	position: absolute;
	right: 4px;
	height: 100;
	margin-right: 0px;
}
</style>
