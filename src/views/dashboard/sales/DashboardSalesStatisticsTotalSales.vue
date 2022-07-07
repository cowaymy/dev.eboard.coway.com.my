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
					<p class="font-weight-semibold text-1xl mb-0">
						Target Sales : {{ totalsales.TARGET_AMT }}
					</p>
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
		async callApiTargetData() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.getTargetData(userInfo);
			} catch (error) {
				console.log(error);
			}
		},
	},

	created() {
		var cData = [];
		this.callApiTargetData().then(request => {
			request.data.data.forEach(function (v) {
				// var newValue = {
				// 	data: [v.RATE],
				// };

				cData.push(v.RATE);
				//cData.push(100 - parseFloat(v.RATE));
			});
			this.totalsales = request.data.data[0];
		});

		this.chartSeries = cData;

		console.log(this.chartSeries);
		console.log(this.totalsales);
	},

	data() {
		const chartSeries = [];

		const chartOptions = {
			chart: {
				offsetY: 2,
				type: 'radialBar',

				sparkline: {
					enabled: true,
				},
				animations: {
					enabled: true,
				},
			},

			colors: ['#56C6F6'],
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 15,
						size: '70%',
					},

					dataLabels: {
						showOn: 'always',
						name: {
							offsetY: -10,
							show: true,
							color: '#888',
							fontSize: '23px',
						},
						value: {
							color: '#111',
							fontSize: '30px',
							show: true,
						},
					},
				},
			},
			labels: ['Total'],
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
