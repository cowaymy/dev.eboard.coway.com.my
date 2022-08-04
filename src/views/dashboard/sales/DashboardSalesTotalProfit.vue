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
				<v-card elevation="0">
					<!-- Title/Header -->
					<v-card-title class="align-start pt-0 flex-nowrap">
						<div>
							<p class="mb-0 font-weight-semibold primary--text text-5xl">
								<VueRolling
									:text="totalsales.value"
									:isNumberFormat="true"
									:transition="4"
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
										{{ checkNull('54') }}
									</v-list-item-title>
									<v-list-item-subtitle>Water purifier</v-list-item-subtitle>
								</v-list-item-content>
								<!-- item 2------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiBeaker }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('400') }}
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
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('55') }}
									</v-list-item-title>
									<v-list-item-subtitle>Air purifier</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 4------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiSeatIndividualSuite }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('5706') }}
									</v-list-item-title>
									<v-list-item-subtitle>Mattress</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<!-- List Item: Expense -->
							<v-list-item class="pa-0">
								<!-- item 5------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiWeatherWindyVariant }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('56') }}
									</v-list-item-title>
									<v-list-item-subtitle>Bidet</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 6------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiNumeric10BoxMultiple }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('5707') }}
									</v-list-item-title>
									<v-list-item-subtitle>Other</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item class="pa-0">
								<!-- item 1------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiFanAuto }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('AI') }}
									</v-list-item-title>
									<v-list-item-subtitle>Air Cond</v-list-item-subtitle>
								</v-list-item-content>

								<!-- item 6------->
								<v-list-item-avatar class="" size="40" rounded>
									<v-icon size="30" color="success">
										{{ icons.mdiAlphaEBox }}
									</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="font-weight-semibold text-3xl">
										{{ checkNull('99999') }}
									</v-list-item-title>
									<v-list-item-subtitle>eMALL</v-list-item-subtitle>
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
	mdiAlphaEBox,
} from '@mdi/js';
//import { getVuetify } from '@core/utils';
//import { kFormatter } from '@core/utils/filter';
import salesApi from '../../../api/salesApi';

export default {
	components: {
		VueApexCharts,
		VueRolling,
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
