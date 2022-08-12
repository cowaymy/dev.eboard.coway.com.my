<template>
	<v-card>
		<v-card-title class="align-start">
			<span>Product Category</span>
			<v-spacer></v-spacer>

			<v-btn icon small class="me-n3 mt-n2">
				<v-icon>
					{{ icons.mdiDotsVertical }}
				</v-icon>
			</v-btn>
		</v-card-title>

		<v-card-text class="d-flex align-center justify-space-between pb-1 pt-5">
			<div>
				<p class="text-5xl font-weight-semibold text--primary mb-2">4,590</p>
				<span class="text-base">Total keyIn</span>
			</div>

			<div class="chart-wrapper">
				<VueApexCharts :options="chartOptions" :series="series"></VueApexCharts>
			</div>
		</v-card-text>

		<v-card-text class="mt-2">
			<div
				v-for="(data, index) in websiteStatistics"
				:key="data.title"
				:class="`statistics-table d-flex align-center pt-3 ${
					index > 0 ? 'mt-3' : ''
				}`"
			>
				<span :class="`badge-sm ${data.color}`"></span>
				<span class="text--primary ms-2">{{ data.title }}</span>

				<v-spacer></v-spacer>

				<span class="font-weight-semibold text--primary me-6">{{
					data.traffic
				}}</span>
				<span class="font-weight-semibold text--primary me-1">{{
					data.percentage.slice(1)
				}}</span>
				<v-icon
					size="20"
					:color="data.percentage.charAt(0) === '+' ? 'success' : 'error'"
				>
					{{
						data.percentage.charAt(0) === '+'
							? icons.mdiChevronUp
							: icons.mdiChevronDown
					}}
				</v-icon>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import VueApexCharts from 'vue-apexcharts';

import { getVuetify } from '../../../@core/utils';

export default {
	components: {
		VueApexCharts,
	},
	data() {
		//const $vuetify = getVuetify();

		const chartOptions = {
			chart: {
				type: 'bar',
				toolbar: {
					show: false,
				},
				sparkline: {
					enabled: true,
				},
			},
			grid: {
				show: false,
			},
			//colors: [$vuetify.theme.currentTheme.primary],
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '30%',
					startingShape: 'rounded',
					endingShape: 'rounded',
					borderRadius: 4,
				},
			},
			legend: {
				show: false,
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				labels: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				show: false,
			},
			tooltip: {
				x: {
					show: false,
				},
			},
		};

		const websiteStatistics = [
			{
				title: 'W.purf',
				color: 'success',
				traffic: '86,471',
				percentage: '-15%',
			},
			{
				title: 'A.purf',
				color: 'primary',
				traffic: '57,484',
				percentage: '+85%',
			},
			{
				title: 'Bidef',
				color: 'warning',
				traffic: '2,534',
				percentage: '+48%',
			},
			{
				title: 'Softner',
				color: 'error',
				traffic: '977',
				percentage: '-36%',
			},
		];

		return {
			chartOptions,
			websiteStatistics,
			series: [
				{
					name: '2020',
					data: [50, 40, 110, 80, 40, 60, 40],
				},
			],
			icons: {
				mdiDotsVertical,
				mdiChevronUp,
				mdiChevronDown,
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
	max-width: 130px;
}
.statistics-table {
	border-top: solid 1px rgba(93, 89, 98, 0.14);
	.badge-sm {
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 50%;
		margin: 4px;
	}
}

.font-weight-semibold {
	font-weight: 600 !important;
}
.text-5xl {
	font-size: 3rem !important;
	line-height: 1 !important;
}

.text-base {
	font-size: 1rem !important;
	line-height: 1.5rem !important;
}
</style>
