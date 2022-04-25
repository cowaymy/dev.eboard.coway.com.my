<template>
	<v-card elevation="26">
		<v-row class="ma-0">
			<v-col cols="12" sm="7" class="total-profit-chart-col">
				<v-card-title class="pt-2"> Product Category</v-card-title>
				<VueApexCharts
					id="total-profit-chart"
					height="320"
					:options="chartOptions"
					:series="chartData"
				></VueApexCharts>
			</v-col>
			<v-col cols="12" sm="5">
				<v-card elevation="0">
					<!-- Title/Header -->
					<v-card-title class="align-start pt-0 flex-nowrap">
						<div>
							<p class="mb-0 font-weight-bold text-5xl">4,590</p>
							<small class="text--secondary text-xs text-no-wrap"
								>Today keyIn</small
							>
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
									<v-icon size="30" color="primary">
										{{ icons.mdiEgg }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>Water purifier</v-list-item-subtitle>
								</v-list-item-content>
								<!-- item 2------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="rad">
										{{ icons.mdiBeaker }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>POE</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<!-- List Item: Income -->
							<v-list-item class="pa-0">
								<!-- item 3------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiAutorenew }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>Air purifier</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 4------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="purple">
										{{ icons.mdiSeatReclineNormal }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>Massage Chair</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<!-- List Item: Expense -->
							<v-list-item class="pa-0">
								<!-- item 5------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="warning">
										{{ icons.mdiWeatherWindyVariant }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										590
									</v-list-item-title>
									<v-list-item-subtitle>Bidet</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 6------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiEgg }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>Other</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item class="pa-0">
								<!-- item 1------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="primary">
										{{ icons.mdiFanAuto }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold">
										1,000
									</v-list-item-title>
									<v-list-item-subtitle>Air Cond</v-list-item-subtitle>
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
} from '@mdi/js';
//import { getVuetify } from '@core/utils';
//import { kFormatter } from '@core/utils/filter';

export default {
	components: {
		VueApexCharts,
	},
	data() {
		//	const $vuetify = getVuetify();

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
				categories: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'April'],
				axisBorder: {
					show: true,
				},
				axisTicks: {
					show: true,
				},
			},
			yaxis: {
				labels: {
					formatter: value => value,
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
				width: 6,
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

		const chartData = [
			{
				name: 'W.purf',
				data: [3100, 2540, 4540, 4540, 3540, 5540],
			},
			{
				name: 'A.purf',
				data: [3100, 2540, 4540, 4540, 3540, 5540],
			},
			{
				name: 'Bidet',
				data: [520, 120, 220, 320, 220, 620],
			},
			{
				name: 'POE',
				data: [100, 10, 20, 10, 390, 120],
			},
			{
				name: 'Massage Chair',
				data: [22, 33, 100, 100, 12, 120],
			},
			{
				name: 'Air Cond',
				data: [100, 200, 100, 109, 100, 120],
			},
			{
				name: 'Other',
				data: [2999, 2999, 2999, 2999, 2999, 2999],
			},
		];

		return {
			chartOptions,
			chartData,

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
			},
		};
	},
};
</script>

<style lang="scss"></style>
