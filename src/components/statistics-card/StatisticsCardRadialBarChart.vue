<template>
	<v-card class="stats-card-radial-bar d-flex flex-column">
		<v-card-title class="text-3xl" style="text-align: center">
			<v-avatar :color="color" size="38" class="elevation-3">
				<v-icon size="24" color="red" class="rounded-0">
					{{ mdiBullseyeArrow }}
				</v-icon>
			</v-avatar>
			&nbsp; {{ statistics }}
		</v-card-title>

		<VueApexCharts
			id="stats-card-radial-bar-chart"
			type="radialBar"
			class="d-flex align-center flex-grow-1"
			:options="chartOptions"
			:series="chartSeries"
		></VueApexCharts>

		<v-card-text class="font-weight-semibold text-center text--primary">
			{{ statTitle }}
		</v-card-text>
	</v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mdiBullseyeArrow } from '@mdi/js';

export default {
	components: { VueApexCharts },
	props: {
		statistics: { type: String, default: '' },
		statTitle: { type: String, default: '' },
		chartSeries: {
			type: Array,
			default: () => [],
		},
		chartConfig: {
			type: Object,
			default: null,
		},
		chartColor: {
			type: String,
			required: true,
		},
		chartHeight: {
			type: String,
			default: 'auto',
		},
	},
	data() {
		const chartOptions = {
			chart: {
				height: 130,
				type: 'radialBar',
			},
			series: [67],
			colors: ['#20E647'],
			plotOptions: {
				radialBar: {
					startAngle: -45,
					endAngle: 45,
					track: {
						background: '#333',
						startAngle: -45,
						endAngle: 45,
					},
					dataLabels: {
						name: {
							show: false,
						},
						value: {
							fontSize: '30px',
							show: true,
						},
					},
				},
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'horizontal',
					gradientToColors: ['#87D4F9'],
					stops: [0, 100],
				},
			},
			stroke: {
				lineCap: 'butt',
			},
			labels: ['Progress'],
		};
		return {
			chartOptions,
			mdiBullseyeArrow,
		};
	},
};
</script>

// @import '~@core/preset/preset/mixins.scss'; // @include
theme--child(stats-card-radial-bar) using ($material) { //
#stats-card-radial-bar-chart { // .apexcharts-canvas { // .apexcharts-text { //
&.apexcharts-datalabel-value { // fill: map-deep-get($material, 'text',
'primary'); // font-weight: 600; // } // } // } // } // }

<style lang="scss" scoped>
.percentage {
	top: -8px;
	position: relative;
}
.font-weight-semibold {
	font-weight: 600 !important;
}
.text-5xl {
	font-size: 3rem !important;
	line-height: 1 !important;
}

.text-3xl {
	font-size: 2.25rem !important;
	line-height: 2rem !important;
	align-items: center;
}

.text-2xl {
	font-size: 1.25rem !important;
	line-height: 2rem !important;
}
.text-base {
	font-size: 1rem !important;
	line-height: 1.5rem !important;
}
</style>
