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
					&nbsp; Target Sales
				</v-card-title>
				<v-card-text class="text-no-wrap mt-4">
					<p class="text-xs mb-0">Calculated in last 7 days</p>
					<P></P>
				</v-card-text>
			</div>

			<VueApexCharts
				id="chart-stats-total-sales"
				height="140"
				:options="chartOptions"
				:series="chartSeries"
			/>
		</div>
	</v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import salesApi from '../../../api/salesApi';

import { mdiChevronUp, mdiBullseyeArrow } from '@mdi/js';

export default {
	components: {
		VueApexCharts,
	},

	methods: {
		async callApiEKeyInData() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.getEKeyInData(userInfo);
			} catch (error) {
				console.log(error);
			}
		},
	},

	created() {
		// this.callApiEKeyInData().then(request => {
		// 	this.totalsales = request.data[0].EKEY_SALES;
		// });
	},

	data() {
		const chartSeries = [85, 20, 30, 50];
		const chartOptions = {
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
								formatter(value) {
									return `${value}k`;
								},
							},
							total: {
								show: true,
								label: 'total',
								formatter() {
									return '78%';
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
