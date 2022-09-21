<template>
	<v-card elevation="1">
		<div class="d-flex justify-space-between">
			<div>
				<v-card-title>
					<v-avatar color="white" size="38">
						<v-icon size="24" color="error" class="rounded-0">
							{{ icons.mdiBullseyeArrow }}
						</v-icon>
					</v-avatar>
					&nbsp;  {{ this.targetSales.mem_lvl != 4 ? 'Target Sales' : 'HS Progress'}}
				</v-card-title>
				<v-card-text class="text-no-wrap mt-4">
					<p class="text-xs mb-0"  v-if="this.targetSales.mem_lvl == 4" >
					Active : {{number_format(targetSales.act_hs)}} Complete : {{number_format(targetSales.com_hs)}} Cancel : {{number_format(targetSales.canc_hs)}}  Fail : {{number_format(targetSales.fal_hs)}}
					</p>
					<p class="text-xs mb-0" v-if="this.targetSales.mem_lvl != 4" >
					Target : {{number_format(targetSales.target)}} To achieved : {{number_format(targetSales.To_achieved)}} achieved : {{number_format(targetSales.achieved)}}
					</p>
					<P></P>
				</v-card-text>
			</div>

			<VueApexCharts
				id="chart-stats-total-sales"
				height="140"
				:options="chartOptions"
				:series="[targetSales.act_hs, targetSales.com_hs, targetSales.canc_hs, targetSales.fal_hs]"
				v-if="this.targetSales.mem_lvl == 4" 
			/>
			<VueApexCharts
				id="chart-stats-total-sales"
				height="140"
				:options="chartOptions2"
				:series="[targetSales.To_achieved,targetSales.achieved]"
				v-if="this.targetSales.mem_lvl != 4" 
			/>
		</div>
	</v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

import { mdiChevronUp, mdiBullseyeArrow } from '@mdi/js';
import number_format from '../../../utils/number_format.js'
export default {
	components: {
		VueApexCharts,
	},
	props:{
		targetSales:{type: Object}
		}
	,
	methods: {
		number_format
	},

	created() {
		
	},

	data() {
		const chartSeries = [10,10,10,10];
		const chartOptions = {
			labels: ['Active HS', 'Complete HS', 'Cancel HS', 'Fail HS'],
			chart: {
				offsetY: 7,
				type: 'donut',
				sparkline: {
					enabled: true,
				},
				animations: {
					enabled: false,
				},
			},
			stroke: {
				colors: ['#fff'],
				width: 8,
			},
			grid: {
				padding: {
					bottom: 10,
				},
			},
			colors: ['#FF4500', '#E9EAEC', '#1E90FF', '#FF8C00'],
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: {
								fontSize: '14px',
								offsetY: 25,
							},
							value: {
								offsetY: -13,
								formatter(val) {
									return val;
								},
							},
							total: {
								show: true,
								label: 'total',
								formatter:function (w) {
								return w.globals.seriesTotals.reduce((a, b) => {
								return a + b
								}, 0)
								},
							},
						},
					},
				},
			},
		};
		const chartOptions2 = {
			labels: ['To achieve Sales', 'Achieved Sales'],
			chart: {
				offsetY: 7,
				type: 'donut',
				sparkline: {
					enabled: true,
				},
				animations: {
					enabled: false,
				},
			},
			stroke: {
				colors: ['#fff'],
				width: 8,
			},
			grid: {
				padding: {
					bottom: 10,
				},
			},
			colors: ['#FF4500', '#E9EAEC'],
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: {
								fontSize: '14px',
								offsetY: 25,
							},
							value: {
								offsetY: -13,
								formatter(val) {
									return val;
								},
							},
							total: {
								show: true,
								label: 'Target Sales',
								formatter:function (w) {
								return w.globals.seriesTotals.reduce((a, b) => {
								return a + b
								}, 0)
								},
							},
						},
					},
				},
			},
		};
		return {
			chartSeries,
			chartOptions,
			chartOptions2,
			totalsales: {},
			// icons
			icons: {
				mdiChevronUp,
				mdiBullseyeArrow,
			},
		};
	},
};
</script>

<style lang="scss">
#chart-stats-total-sales {
	max-width: 150px;
	height: auto;
	.apexcharts-pie {
		.apexcharts-pie-series .apexcharts-pie-area {
			stroke-width: 10;
		}
	}
	.apexcharts-canvas {
		.apexcharts-text {
			&.apexcharts-datalabel-value {
				font-weight: 600;
				font-size: 1.25rem;
			}
			&.apexcharts-datalabel-label {
				font-size: 0.75rem;
				margin-bottom: 2rem;
				transform: translateY(-7px);
			}
		}
	}
}

.v-application {
	&.theme--dark {
		#chart-stats-total-sales {
			path {
				stroke: #312d4b;
			}
		}
	}
}
</style>
