<template>
	<v-card elevation="1">
		<div>
			<div>
				<v-card-title>
					<v-avatar color="white" size="38">
						<v-icon size="24" color="error" class="rounded-0">
							{{ icons.mdiBullseyeArrow }}
						</v-icon>
					</v-avatar>
					Target Sales
				</v-card-title>
			</div>
			<v-card-text>
				<VueApexCharts
					id="chart-stats-total-sales"
					height="100%"
					width="300"
					:options="chartOptions"
					:series="chartSeries"
				/>
				<div class="font-weight-semibold text-1xl mb-0">
					Target Sales :
					<span class="font-weight-semibold text-2xl primary--text mb-0">
						{{ fun_numFormat(totalsales.TARGET_AMT) }}
					</span>
				</div>
			</v-card-text>
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
		fun_numFormat(number) {
			const neFor = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			//console.log(neFor);
			return neFor;
		},
	},

	created() {
		this.callApiTargetData().then(request => {
			request.data.data.forEach(function (v) {
				console.log(v.RATE);
				//cData = v.RATE;
			});
			this.totalsales = request.data.data[0];
		});
	},

	data() {
		//const chartSeries = [81];

		const chartSeries = [90];

		const chartOptions = {
			chart: {
				type: 'bar',
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: ['achieved  sales'],
			},
		};

		// const chartOptions = {
		// 	chart: {
		// 		offsetY: 2,
		// 		type: 'radialBar',
		// 		sparkline: {
		// 			enabled: true,
		// 		},
		// 		animations: {
		// 			enabled: true,
		// 		},
		// 	},
		// 	colors: ['#56C6F6'],
		// 	plotOptions: {
		// 		radialBar: {
		// 			hollow: {
		// 				margin: 15,
		// 				size: '70%',
		// 			},

		// 			dataLabels: {
		// 				showOn: 'always',
		// 				name: {
		// 					offsetY: -10,
		// 					show: true,
		// 					color: '#888',
		// 					fontSize: '23px',
		// 				},
		// 				value: {
		// 					color: '#111',
		// 					fontSize: '30px',
		// 					show: true,
		// 				},
		// 			},
		// 		},
		// 	},
		// 	labels: ['Total'],
		// };

		return {
			chartSeries,
			chartOptions,
			totalsales: {},
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
