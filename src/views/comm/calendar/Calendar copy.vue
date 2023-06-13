<template>
	<v-card
		class="max-h-content-container app-calendar_X position-relative overflow-hidden text-sm"
	>
		<v-navigation-drawer
			width="250"
			mobile-breakpoint="sm"
			absolute
			touchless
			:right="this.$vuetify.rtl"
			:temporary="this.$vuetify.breakpoint.xsOnly"
			style="z-index: 2"
		>
			<calendar-left-sidebar-content
				@open-evnt-handler-drawer="isEventHandlerDrawerActive = true"
			></calendar-left-sidebar-content>
		</v-navigation-drawer>

		<!-- <v-navigation-drawer
			v-model="isEventHandlerDrawerActive"
			:right="!this.$vuetify.rtl"
			touchless
			app
			temporary
			width="420"
		>
			<calendar-event-handler-drawer-content
				:event="event"
				:clearEventData="clearEventData"
				@close-drawer="isEventHandlerDrawerActive = false"
			></calendar-event-handler-drawer-content>
		</v-navigation-drawer> -->

		<div :style="_contentStyles" class="h-full">
			<div class="calendar-header mx-6 my-5 d-flex align-center flex-wrap">
				<v-btn
					icon
					class="d-inline-block d-md-none me-1"
					@click="isLeftSidebarOpen = true"
				>
					<v-icon size="30">
						{{ icons.mdiMenu }}
					</v-icon>
				</v-btn>
				<v-btn icon class="me-1" @click="refCalendar.prev()">
					<v-icon size="30">
						{{ icons.mdiChevronLeft }}
					</v-icon>
				</v-btn>
				<v-btn icon class="me-3" @click="refCalendar.next()">
					<v-icon size="30">
						{{ icons.mdiChevronRight }}
					</v-icon>
				</v-btn>
				<p class="font-weight-semibold text-xl text--primary mb-0 me-6">{{}}</p>

				<v-spacer></v-spacer>

				<v-btn-toggle
					v-model="activeCalendarView"
					color="primary"
					class="mt-3 mt-sm-0"
				>
					<v-btn
						v-for="calendarViewOption in calendarViewOptions"
						:key="calendarViewOption"
						elevation="0"
						:value="calendarViewOption"
					>
						{{ calendarViewOption }}
					</v-btn>
				</v-btn-toggle>
			</div>

			<v-calendar
				ref="refCalendar"
				v-model="calendarValue"
				:type="activeCalendarView"
				:events="events"
				:event-height="40"
				:event-margin-bottom="5"
				:event-margin-left="20"
				@click:event="showEvent"
				@click:day="viewDay"
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
								<v-spacer></v-spacer>
								<v-btn text style="font-weight: bold">{{
									selectedEventStartText(event.start)
								}}</v-btn>
							</div>
						</div>
					</div>
				</template>
			</v-calendar>
		</div>
		<div>
			<!-- Event details menu -->
			<v-menu
				v-model="selectedOpen"
				:close-on-content-click="false"
				:activator="selectedElement"
				offset-x
			>
				<v-card min-width="200px" elevation="3">
					<v-card-text>
						<div class="text-center">
							<p class="text-h6 text--primary">{{ selectedEventTitle }}</p>
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
						<v-spacer></v-spacer>
						<v-btn
							text
							color="info"
							variant="text"
							@click="selectedOpen = false"
						>
							close
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu>
		</div>
	</v-card>
</template>

<script>
import {
	mdiChevronLeft,
	mdiChevronRight,
	mdiMenu,
	mdiCheckCircle,
	mdiCheckUnderline,
} from '@mdi/js';
import store from '@/store';
import { format } from 'date-fns';
import calendarStoreModule from './calendarStoreModule';

// Local Components
import CalendarLeftSidebarContent from './CalendarLeftSidebarContent.vue';
//import CalendarEventHandlerDrawerContent from './CalendarEventHandlerDrawerContent.vue';

export default {
	components: {
		CalendarLeftSidebarContent,
		// CalendarEventHandlerDrawerContent,
	},
	mounted() {
		this.$refs.refCalendar.checkChange();
		console.log(this.$refs.refCalendar.title);
		this.useResponsiveLeftSidebar();

		//this._contentStyles = this.useStyles('250');
	},
	created() {},
	data() {
		const CALENDAR_APP_STORE_MODULE_NAME = 'app-calendar';

		if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) {
			store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule);
			console.log(store.hasModule(CALENDAR_APP_STORE_MODULE_NAME));
		}

		const calendarViewOptions = ['month'];

		const activeCalendarView = 'month';
		const getEventTextColor = e => e.eventTextColor;
		const calendarEvents = [];

		const blankEvent = {
			id: '',
			name: '',
			start: '',
			end: '',
			timed: false,
			extendedProps: {
				calendar: '',
				guests: [],
				location: '',
				description: '',
			},
		};

		const isEventHandlerDrawerActive = true;
		let calendarTitle;
		const event = JSON.parse(JSON.stringify(blankEvent));
		const clearEventData = () => {
			event.value = JSON.parse(JSON.stringify(blankEvent));
		};
		const eventClickBugWorkaround = false;

		const calenderHandleEventClick = eventObj => {
			// Grab only event object
			event.value = eventObj.event;

			// eslint-disable-next-line no-use-before-define
			isEventHandlerDrawerActive.value = true;

			// Bug workaround
			eventClickBugWorkaround.value = true;
		};

		const calendarHandleDayClick = dayObj => {
			// Bug workaround
			if (eventClickBugWorkaround) {
				eventClickBugWorkaround.value = false;

				return;
			}

			event.value.start = dayObj.date;

			// eslint-disable-next-line no-use-before-define
			isEventHandlerDrawerActive.value = true;
		};

		const calendarHandleMoreClick = ({ date }) => {
			this.calendarValue = date;

			this.activeCalendarView = 'day';

			// Bug workaround
			this.eventClickBugWorkaround = true;
		};

		const isLeftSidebarOpen = null;
		const vue_breakpoint_name = this.$vuetify.breakpoint.name;
		const vue_bareakpoing_mdAndUp = this.$vuetify.breakpoint.mdAndUp;
		const vue_bareakpoing_smAndDown = this.$vuetify.breakpoint.smAndDown;

		const refCalendar = null;

		return {
			isLeftSidebarOpen,
			calendarEvents,
			// Icons
			isEventHandlerDrawerActive: false,

			calendarTitle,
			activeCalendarView,
			refCalendar,
			getEventTextColor,
			event,
			clearEventData,
			calendarViewOptions,
			calenderHandleEventClick,
			calendarHandleDayClick,
			calendarHandleMoreClick,
			vue_breakpoint_name,
			vue_bareakpoing_smAndDown,
			vue_bareakpoing_mdAndUp,
			icons: {
				mdiChevronLeft,
				mdiChevronRight,
				mdiMenu,
				mdiCheckCircle,
				mdiCheckUnderline,
			},
			/**event sample */
			calendarValue: '',

			selectedOpen: false,
			selectedElement: undefined,
			selectedEvent: {},
			events: [
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
			],
		};
	},
	computed: {
		_calendarTitle() {
			return '';
		},
		_contentStyles: function () {
			return this.useStyles('250');
		},

		selectedEventTitle() {
			return this.selectedEvent.title;
		},
		selectedEventStart() {
			return (
				this.selectedEvent &&
				this.selectedEvent.start &&
				format(new Date(this.selectedEvent.start), 'h:mm a')
			);
		},
		selectedEventEnd() {
			return (
				this.selectedEvent &&
				this.selectedEvent.end &&
				format(new Date(this.selectedEvent.end), 'h:mm a')
			);
		},
	},
	methods: {
		selectedEventStartText(val) {
			console.log(val);
			console.log(format(new Date(val), 'h:mm a'));
			return format(new Date(val), 'h:mm a');
		},
		useResponsiveLeftSidebar() {
			this.isLeftSidebarOpen = true;

			const setInitialValue = () => {
				console.log(this.$vuetify);

				if (this.$vuetify.breakpoint.smAndDown) this.isLeftSidebarOpen = false;
				else this.isLeftSidebarOpen = true;
			};
			// Set the initial value of sidebar

			setInitialValue();
		},

		useStyles(sidebarWidth) {
			console.log('smAndDown :::::', this.$vuetify.breakpoint.smAndDown);
			console.log('isLeftSidebarOpen :::::', this.isLeftSidebarOpen);

			const styles = {};

			const marginDirection = this.$rtl ? 'marginRight' : 'marginLeft';

			styles[marginDirection] =
				this.isLeftSidebarOpen && this.$vuetify.breakpoint.mdAndUp
					? `${sidebarWidth}px`
					: null;

			console.log(styles);

			if (styles[marginDirection] == null) {
				this.isLeftSidebarOpen = true;
			} else {
				this.isLeftSidebarOpen = false;
			}

			return styles;
		},

		viewDay({ date }) {
			this.focus = date;
			this.type = 'day';
		},
		getEvents({ start, end }) {
			const events = [];

			const min = new Date(`${start.date}T00:00:00`);
			const max = new Date(`${end.date}T23:59:59`);
			const days = (max.getTime() - min.getTime()) / 86400000;
			const eventCount = this.rnd(days, days + 20);

			for (let i = 0; i < eventCount; i++) {
				const allDay = this.rnd(0, 3) === 0;
				const firstTimestamp = this.rnd(min.getTime(), max.getTime());
				const first = new Date(firstTimestamp - (firstTimestamp % 900000));
				const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
				const second = new Date(first.getTime() + secondTimestamp);

				events.push({
					name: this.names[this.rnd(0, this.names.length - 1)],
					start: first,
					end: second,
					color: 'success',
				});
			}

			this.events = events;
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

		getEventColor(event) {
			return event.color;
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},
	},
	// watch: (this.$vuetify.breakpoint.name = () => {
	// 	// Reset left sidebar
	// 	if (this.$vuetify.breakpoint.smAndDown)
	// 		this.isLeftSidebarOpen.value = false;
	// 	if (this.$vuetify.breakpoint.mdAndUp) this.isLeftSidebarOpen.value = true;
	// }),

	watch: {
		vue_breakpoint_name() {},
		vue_bareakpoing_mdAndUp() {
			this.isLeftSidebarOpen.value = true;
			console.log('vue_bareakpoing_mdAndUp');
		},
		vue_bareakpoing_smAndDown() {
			this.isLeftSidebarOpen.value = false;
			console.log('vue_bareakpoing_smAndDown');
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
	margin-right: 0px;
}
</style>
