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
						:change="KeyInOptionsdeail.change"
						:color="KeyInOptionsdeail.color"
						:icon="KeyInOptionsdeail.icon"
						:statistics="KeyInOptionsdeail.statistics"
						:stat-title="KeyInOptionsdeail.statTitle"
						:subtitle="KeyInOptionsdeail.subtitle"
					></StatisticsCardVerticalForSales>
				</v-col>
				<v-col cols="12" sm="4" md="2">
					<StatisticsCardVerticalForSales
						:change="NetSalesOptions.change"
						:color="NetSalesOptions.color"
						:icon="NetSalesOptions.icon"
						:statistics="NetSalesOptions.statistics"
						:stat-title="NetSalesOptions.statTitle"
						:subtitle="NetSalesOptions.subtitle"
					></StatisticsCardVerticalForSales>
				</v-col>
				<v-col cols="12" sm="4" md="2">
					<StatisticsCardVerticalForSales
						:change="ActiveHpOptions.change"
						:color="ActiveHpOptions.color"
						:icon="ActiveHpOptions.icon"
						:statistics="ActiveHpOptions.statistics"
						:stat-title="ActiveHpOptions.statTitle"
						:subtitle="ActiveHpOptions.subtitle"
					></StatisticsCardVerticalForSales>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>
</template>

<script>
import {
	mdiClipboardEditOutline,
	mdiCheckboxMultipleMarkedOutline,
	mdiAccountCheckOutline,
	mdiClose,
} from '@mdi/js';

import StatisticsCardVerticalForSales from '../../../components/statistics-card/StatisticsCardVerticalForSales.vue';

export default {
	components: {
		StatisticsCardVerticalForSales,
	},
	data() {
		const isDialogVisible = false;
		const notifications = false;
		const sound = true;
		const widgets = false;

		const KeyInOptionsdeail = {
			statTitle: 'KeyIn',
			icon: mdiClipboardEditOutline,
			color: 'success',
			subtitle: 'updated 10 minutes ago',
			statistics: '90,981',
			change: '+12%',
		};

		const NetSalesOptions = {
			statTitle: 'Net Sales',
			icon: mdiCheckboxMultipleMarkedOutline,
			color: 'error',
			subtitle: 'updated 10 minutes ago',
			statistics: '89,008',
			change: '+10%',
		};

		// vertical card options
		const ActiveHpOptions = {
			statTitle: 'Active HP',
			icon: mdiAccountCheckOutline,
			color: 'primary',
			subtitle: 'updated 10 minutes ago',
			statistics: '123,862',
			change: '-18%',
		};

		return {
			isDialogVisible,
			notifications,
			sound,
			widgets,
			ActiveHpOptions,
			NetSalesOptions,
			KeyInOptionsdeail,
			// icon
			icons: {
				mdiClose,
			},
		};
	},
};
</script>
