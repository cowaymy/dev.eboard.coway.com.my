<template>
	<v-dialog
		v-model="isDialogVisible"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<template #activator="{ on, attrs }">
			<v-fab-transition>
				<v-btn
					color="error"
					v-bind="attrs"
					v-on="on"
					dark
					absolute
					bottom
					right
					fab
				>
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-fab-transition>
		</template>
		<v-card tile>
			<v-toolbar dark color="primary">
				<v-btn icon dark @click="isDialogVisible = false">
					<v-icon>{{ icons.mdiClose }}</v-icon>
				</v-btn>
				<v-toolbar-title>Find out More</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn dark text class="my-auto" @click="isDialogVisible = false">
						Close
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-row>
				<v-col cols="12"><p></p></v-col>
				<v-col cols="12" sm="4" md="2">
					<StatisticsCardVerticalForSales
						:change="Recruitment.change"
						:color="Recruitment.color"
						:icon="Recruitment.icon"
						:statistics="Recruitment.statistics"
						:stat-title="Recruitment.statTitle"
						:subtitle="Recruitment.subtitle"
					></StatisticsCardVerticalForSales>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>
</template>

<script>
import {
	//mdiClipboardEditOutline,
	mdiCheckboxMultipleMarkedOutline,
	//mdiAccountCheckOutline,
	mdiClose,
} from '@mdi/js';

import StatisticsCardVerticalForSales from '../../../components/statistics-card/StatisticsCardVerticalForSales.vue';
//import bus from '../../../utils/bus.js';
import salesApi from '../../../api/salesApi';
export default {
	components: {
		StatisticsCardVerticalForSales,
	},

	methods: {
		async callApiSalesHQMainApi() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.getCurMonthData(userInfo);
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.callApiSalesHQMainApi().then(
			response =>
				(this.Recruitment = {
					statTitle: 'Recruitment',
					icon: mdiCheckboxMultipleMarkedOutline,
					color: 'warning',
					subtitle: response.data.user[0].LST_UP_TIME,
					statistics: response.data.user[0].SAL_RECRUITMENT,
					//change: response.data.user[0].SAL_RECRUITMENT,
				}),
		);
	},
	data() {
		const isDialogVisible = false;
		const notifications = false;
		const sound = true;
		const widgets = false;

		return {
			isDialogVisible,
			notifications,
			sound,
			widgets,
			Recruitment: {},

			// icon
			icons: {
				mdiClose,
			},
		};
	},
};
</script>
