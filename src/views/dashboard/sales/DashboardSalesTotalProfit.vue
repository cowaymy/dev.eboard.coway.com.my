<template>
	<v-card elevation="26">
		<v-row class="ma-0">
			<v-col cols="12" sm="7" class="total-profit-chart-col">
				<v-card-title class="pt-2 font-weight-semibold text-2xl">
					Product Category</v-card-title
				>
				<VueApexCharts
					id="total-profit-chart"
					height="320"
					:options="chartOptions"
					:series="chartData"
				></VueApexCharts>
			</v-col>
			<v-col cols="12" sm="5">
				<DashboardCardSalesUnitTodayKeyIn></DashboardCardSalesUnitTodayKeyIn
			></v-col>
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
	mdiRadiatorDisabled,
	mdiSeatIndividualSuite,
	mdiWaterOutline,
	mdiNumeric10BoxMultiple,
	mdiAlphaEBox,
} from '@mdi/js';
//import { getVuetify } from '@core/utils';
//import { kFormatter } from '@core/utils/filter';
import salesApi from '../../../api/salesApi';

import DashboardCardSalesUnitTodayKeyIn from './DashboardCardSalesUnitTodayKeyIn.vue';

export default {
	components: {
		VueApexCharts,
		DashboardCardSalesUnitTodayKeyIn,
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

		async callApiTodayEkeyinData() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.getTodayEkeyinData(userInfo);
			} catch (error) {
				console.log(error);
			}
		},

		async callApiSalesTrendData() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.salesTrendData(userInfo);
			} catch (error) {
				console.log(error);
			}
		},
	},

	created() {
		var cData = [];
		this.callApiSalesTrendData().then(request => {
			request.data.data.forEach(function (v) {
				var newValue = {
					name: v.STK_CTGRY_NAME,
					data: [v.M6, v.M5, v.M4, v.M3, v.M2, v.M1, v.M],
				};
				cData.push(newValue);
			});
		});

		this.chartData = cData;

		this.callApiEKeyInData().then(request => {
			this.totalsales = {
				value: Number(request.data.data[0].TOTAL_SALES),
			};
		});

		this.callApiTodayEkeyinData().then(request => {
			this.todayEeyin = request.data.data;

			// request.data.data.forEach(function (v) {
			// 	if (v.STK_CTGRY_ID == 54) {
			// 		console.log('111111123');
			// 		//Bidet
			// 		this.tvalue.WA = v.P_TOTAL_CNT;
			// 	}
			// });

			//console.log(this.todayEeyin);
		});
		setInterval(() => {
			this.callApiEKeyInData().then(request => {
				this.totalsales = {
					value: request.data.data[0].TOTAL_SALES,
				};
			});

			this.callApiTodayEkeyinData().then(request => {
				this.todayEeyin = request.data.data;

				//console.log(request.data.data);
			});
		}, 30000);
	},

	data() {
		const checkNull = value => {
			var rtnVal = 0;
			try {
				this.todayEeyin.forEach(function (v) {
					if (value == v.STK_CTGRY_ID) {
						rtnVal = v.P_TOTAL_CNT;
					}
				});

				//rtnVal = this.todayEeyin[value].P_TOTAL_CNT;
			} catch (error) {
				rtnVal = 0;
			}

			return rtnVal;
		};

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
				categories: ['M-6', 'M-5', 'M-4', 'M-3', 'M-2', 'M-1', 'M'],
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
			checkNull,
			tvalue: {},
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
				mdiAlphaEBox,
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
