<template>
	<v-card flat class="pa-3">
		<v-form class="multi-col-validation">
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						label="Subject"
						dense
						hide-details
						outlined
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-autocomplete
						v-model="values"
						:items="items"
						outlined
						dense
						chips
						small-chips
						label="Notification Channel"
						multiple
					></v-autocomplete>
				</v-col>

				<v-col cols="12">
					<v-textarea label="Contents" outlined rows="3"></v-textarea>
				</v-col>

				<v-col cols="12" md="6">
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
								label="Start Date"
								:prepend-icon="icons.mdiCalendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>

						<v-date-picker v-model="date" scrollable color="primary">
							<v-btn text color="primary" @click="modal = false">
								Cancel
							</v-btn>
							<v-btn text color="primary" @click="$refs.dialog.save(date)">
								OK
							</v-btn>
						</v-date-picker>
					</v-dialog>
				</v-col>

				<v-col cols="12" md="6">
					<v-dialog
						ref="dialog2"
						v-model="modal1"
						:return-value.sync="enddate"
						persistent
						width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="enddate"
								label="End Date"
								:prepend-icon="icons.mdiCalendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>

						<v-date-picker v-model="enddate" scrollable color="primary">
							<v-btn text color="primary" @click="modal1 = false">
								Cancel
							</v-btn>
							<v-btn text color="primary" @click="$refs.dialog2.save(enddate)">
								OK
							</v-btn>
						</v-date-picker>
					</v-dialog>
				</v-col>

				<v-col cols="12" md="6">
					<label>Use </label>
					<v-switch
						v-model="switch1"
						:label="`${switch1.toString()}`"
						hide-details
					></v-switch>
				</v-col>

				<v-col cols="12">
					<label>Notification Type</label>
					<v-radio-group v-model="radios" mandatory row>
						<v-radio label="Emergency" value="Y"></v-radio>
						<v-radio label="Normal" value="N"></v-radio>
					</v-radio-group>
				</v-col>
				<v-col offset-md="6" cols="12">
					<v-btn color="primary"> Submit </v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-card>
</template>

<script>
import { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar } from '@mdi/js';
export default {
	props: {
		notificationData: {
			type: Object,
			default: () => {},
		},
	},
	data(props) {
		const optionsLocale = JSON.parse(JSON.stringify(props.notificationData));
		const switch1 = true;
		const items = ['ALL', 'SALES', 'CODY', 'DST', 'CCP'];
		const values = [];
		const value = '';

		const date = new Date().toISOString().substr(0, 10);
		const enddate = new Date().toISOString().substr(0, 10);

		const modal = '';
		const modal1 = '';

		const radios = 'Emergency';
		return {
			items,
			value,
			values,
			optionsLocale,
			date,
			enddate,

			modal,
			modal1,
			radios,
			switch1,
			icons: { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar },
		};
	},
};
</script>
