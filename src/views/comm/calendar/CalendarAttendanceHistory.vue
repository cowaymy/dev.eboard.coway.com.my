<template>
	<v-row>
		<v-col cols="12" md="12">
			<v-card>
				<v-card-title>
					<span style="color: info; font-weight: bold"
						>Attendance Period</span
					></v-card-title
				>
				<v-card-text class="d-flex align-center flex-wrap pb-0">
					<div class="d-flex align-center pb-5">
						<v-dialog
							ref="dialog"
							v-model="modal"
							:return-value.sync="date"
							persistent
							width="290px"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="date"
									label="Attendance date"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker v-model="date" type="month" scrollable>
								<v-spacer></v-spacer>
								<v-btn text color="primary" @click="modal = false">
									Cancel
								</v-btn>
								<v-btn text color="primary" @click="$refs.dialog.save(date)">
									OK
								</v-btn>
							</v-date-picker>
						</v-dialog>
					</div>

					<v-spacer></v-spacer>

					<div class="d-flex align-center pb-5">
						<!-- create invoice -->
						<v-btn color="primary" class="me-3" @click="fetchEvents()">
							<v-icon size="18" class="me-1">
								{{ icons.mdiMagnifyPlusOutline }}
							</v-icon>
							<span>Search</span>
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12" md="12">
			<v-card>
				<v-card-title class="align-start">
					<span style="color: info; font-weight: bold"
						>Your Attendance History</span
					>
					<v-spacer></v-spacer>
				</v-card-title>

				<v-card-text>
					<v-list class="pt-0">
						<v-list-item
							v-for="(data, index) in events"
							:key="data.start"
							:class="`d-flex align-center px-0 ${index > 0 ? 'mt-3' : ''}`"
						>
							<v-list-item-avatar size="38" color="success">
								<v-icon size="18" color="error">
									{{ icons.mdiCheckBold }}
								</v-icon>
							</v-list-item-avatar>

							<div
								class="d-flex align-center flex-grow-1 flex-wrap text-no-wrap"
							>
								<div class="me-2">
									<v-list-item-title class="text-xs">
										<span style="color: info; font-weight: bold">
											( {{ data.title_id }} )</span
										>{{ data.title }}
									</v-list-item-title>

									<div class="d-flex align-center">
										<v-icon size="14" class="me-1">
											{{ icons.mdiCalendarClockOutline }}
										</v-icon>
										<v-list-item-subtitle>
											{{ splitData(data.start, 'T')[0] }} |
											<span style="color: blue; font-weight: bold">
												{{ splitData(data.start, 'T')[1] }}</span
											>
										</v-list-item-subtitle>
									</div>
								</div>

								<v-spacer></v-spacer>
							</div>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import {
	mdiCalendarBlankOutline,
	mdiDotsVertical,
	mdiMagnifyPlusOutline,
	mdiCalendarClockOutline,
	mdiCheckBold,
} from '@mdi/js';

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
			date: new Date().toISOString().substr(0, 7),
			menu: false,
			modal: false,
			events: [],
			icons: {
				mdiDotsVertical,
				mdiCalendarBlankOutline,
				mdiMagnifyPlusOutline,
				mdiCalendarClockOutline,
				mdiCheckBold,
			},
		};
	},

	methods: {
		fetchEvents() {
			const parsedValue = this.date.replace(/-/g, '');
			store
				.dispatch(`${CALENDAR_APP_STORE_MODULE_NAME}/fetchEvents`, parsedValue)
				.then(response => {
					console.log(response.data.dataList);
					const _events = response.data.dataList;

					this.events = [..._events];
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		splitData(data, type) {
			if (data === undefined) return '';

			return data.split(type);
		},
	},
};
</script>
