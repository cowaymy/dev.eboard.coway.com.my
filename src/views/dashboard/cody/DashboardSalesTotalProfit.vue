<template>
	<v-card elevation="26">
		<v-row class="ma-0">
			<v-col cols="12" sm="7" class="total-profit-chart-col">
				<v-card-title class="pt-2"> Product Category</v-card-title>
				<VueApexCharts
					id="total-profit-chart"
					height="320"
					:options="chartOptions"
					:series="[{data: [ graphSales.wp_sal,graphSales.ap_sal,graphSales.mat_sal,graphSales.extrade,graphSales.svm]}]"
				></VueApexCharts>
			</v-col>
			<v-col cols="12" sm="5">
				<v-card elevation="0">
					<!-- Title/Header -->
					<v-card-title class="align-start pt-0 flex-nowrap">
						<div>
							<p class="mb-0 font-weight-semibold primary--text text-5xl">
								<VueRolling
									:text="graphSales.keyin"
									:isNumberFormat="true"
									:transition="4"
									:defaultChar="0"
								></VueRolling>
							</p>
							<small class="font-weight-semibold text-xl">Today keyIn</small>
						</div>

						<v-spacer></v-spacer>
						<v-btn icon small class="me-n6 mt-n1">
							<v-icon size="22">
								{{ icons.mdiDotsVertical }}
							</v-icon>
						</v-btn>
					</v-card-title>

					<v-card-text class="pb-3 pt-5">
						<!-- List -->
						<v-list two-line subheader>
							<!-- List Item: Profit -->
							<v-list-item class="pa-0">
								<!-- item 1------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiWaterOutline }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{graphSales.wp_sal}}
									</v-list-item-title>
									<v-list-item-subtitle>Water purifier</v-list-item-subtitle>
								</v-list-item-content>
								<!-- item 2------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiSeatIndividualSuite }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{graphSales.mat_sal}}
									</v-list-item-title>
									<v-list-item-subtitle>Mattress</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<!-- List Item: Income -->
							<v-list-item class="pa-0">
								<!-- item 3------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiWaves }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{graphSales.ap_sal}}
									</v-list-item-title>
									<v-list-item-subtitle>Air purifier</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 4------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiAccount }}
										
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{graphSales.svm}}
									</v-list-item-title>
									<v-list-item-subtitle style="white-space: break-spaces;">Service Membership</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<!-- List Item: Expense -->
							<v-list-item class="pa-0">
								<!-- item 5------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiAccountConvert }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{graphSales.extrade}}
									</v-list-item-title>
									<v-list-item-subtitle>Extrade</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>
						<!-- Action Button -->
						<v-btn block color="primary"> View Report </v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import VueRolling from 'vue-roller';

import VueApexCharts from 'vue-apexcharts';
// eslint-disable-next-line object-curly-newline
import {
	mdiDotsVertical,
	mdiTrendingUp,
	mdiCurrencyUsd,
	mdiChartBar,
	mdiAirConditioner,
	mdiAccountHeart,
	mdiEgg,
	mdiFanAuto,
	mdiAutorenew,
	mdiSeatReclineNormal,
	mdiWeatherWindyVariant,
	mdiBeaker,
	mdiRadiatorDisabled,
	mdiSeatIndividualSuite,
	mdiWaterOutline,
	mdiNumeric10BoxMultiple,
	mdiAccount,
	mdiAccountConvert,
	mdiWaves,
} from '@mdi/js';

export default {
	components: {
		VueApexCharts,
		VueRolling,
	},

	props: {
		graphSales:{type: Object},
	},

	created() {
		var cData = [5,5,5,5,5];
		this.chartData = cData;
	},
	data() {

		const chartOptions = {
			chart: {
				type: 'bar',
				stacked: true,
				toolbar: {
					show: true,
				},
			},
			plotOptions: {
				bar: {
					borderRadius: 10,
					columnWidth: '35%',
					startingShape: 'rounded',
					endingShape: 'rounded',
				},
			},
			xaxis: {
				categories: ['WP', 'AP', 'Mattress', 'Extrade', 'SVM'],
				axisBorder: {
					show: true,
				},
				axisTicks: {
					show: true,
				},
			},
			grid: {
				strokeDashArray: 7,
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: true,
			},
			stroke: {
				curve: 'smooth',
				width: 7,
				lineCap: 'round',
				colors: ['#fff'],
			},
			responsive: [
				{
					breakpoint: 1400,
					options: {
						plotOptions: {
							bar: {
								borderRadius: 10,
								columnWidth: '45%',
							},
						},
					},
				},
			],
		};

		return {
			chartOptions,
			chartData: [],
			totalsales: {},
			todayEeyin: [],
			icons: {
				mdiDotsVertical,
				mdiTrendingUp,
				mdiCurrencyUsd,
				mdiChartBar,
				mdiAirConditioner,
				mdiAccountHeart,
				mdiEgg,
				mdiFanAuto,
				mdiAutorenew,
				mdiSeatReclineNormal,
				mdiWeatherWindyVariant,
				mdiBeaker,
				mdiRadiatorDisabled,
				mdiSeatIndividualSuite,
				mdiWaterOutline,
				mdiNumeric10BoxMultiple,
				mdiAccount,
				mdiAccountConvert,
				mdiWaves
			},
		};
	},
};
</script>

<style lang="scss">
.roller .rollerBlock {
	margin: 3px;
	font-size: 100%;
}
</style>
