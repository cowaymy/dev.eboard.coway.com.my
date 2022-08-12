<template>
	<v-row>
		<v-col cols="12" md="12">
			<v-alert border="left" color="black" dark elevation="1">
				<div class="nocard">Sales e-TrustBoard</div>
				<div align="right">
					<DigitalClock />
				</div>
			</v-alert>
		</v-col>

		<v-col cols="12" md="4">
			<DashboardCongratulationBest />
		</v-col>

		<!-- <v-col cols="12" md="8">
			<DashboardStatisticsCard />
		</v-col> -->

		<!-- vertical statistics card -->

		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical v-bind="eKeyInData"> </StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical v-bind="NetSalesData"></StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical v-bind="ActiveHpData"></StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical v-bind="SHIData"></StatisticsCardVertical>
		</v-col>

		<v-col cols="12" md="8">
			<DashboardSalesTotalProfit></DashboardSalesTotalProfit>
		</v-col>

		<v-col cols="12" md="4">
			<v-row style="match-height">
				<v-col cols="12">
					<StatisticsCardSide />
				</v-col>
				<v-col cols="12">
					<DashboardSalesStatisticsTotalSales />
				</v-col>
				<!-- <v-col cols="12" sm="6">
					<DashboardTopGMChart />
				</v-col> -->
			</v-row>
		</v-col>

		<!--/ vertical statistics card -->

		<v-col cols="12" md="3">
			<DashboardCardSalesRankingbyGM />
		</v-col>
		<v-col cols="12" md="3">
			<DashboardCardSalesRankingbySM />
		</v-col>
		<v-col cols="12" md="3">
			<DashboardCardSalesRankingbyHM />
		</v-col>
		<v-col cols="12" md="3">
			<DashboardCardSalesByCountries />
		</v-col>

		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList> </StatisticsCardRankingList>
		</v-col>
		<!-- <v-col cols="12" md="8">
			<DashboardCardDepositAndWithdraw />
		</v-col> -->

		<div v-if="!sheet"></div>
		<div v-else>
			<v-bottom-sheet v-model="sheet" inset>
				<v-sheet class="text-center" height="200px">
					<v-btn class="mt-6" text color="error" @click="sheet = !sheet">
						close
					</v-btn>
					<div class="my-3">
						<v-alert
							border="bottom"
							colored-border
							type="warning"
							elevation="2"
						>
							{{ logMaessage }}
						</v-alert>
					</div>
				</v-sheet>
			</v-bottom-sheet>
		</div>
	</v-row>
</template>

<!-- 
<template v-if="sheet">
	<div>
		
	</div>
</template> -->

<script>
// eslint-disable-next-line object-curly-newline
import {
	mdiClipboardEditOutline,
	mdiCheckboxMultipleMarkedOutline,
	mdiHelpCircleOutline,
	mdiTrendingUp,
	mdiAccountCheckOutline,
	mdiMapMarkerRadius,
} from '@mdi/js';

import DigitalClock from '../../comm/DigitalClock.vue';
import bus from '../../../utils/bus.js';
import salesApi from '../../../api/salesApi';

import StatisticsCardVertical from '../../../components/statistics-card/StatisticsCardVertical.vue';
import StatisticsCardSide from '../../../components/statistics-card/StatisticsCardSide.vue';

import StatisticsCardRankingList from '../../../components/statistics-card/StatisticsCardRankingList.vue';

import DashboardCongratulationBest from './DashboardCongratulationBest.vue';
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue';
import DashboardCardSalesRankingbyGM from './DashboardCardSalesRankingbyGM.vue';
import DashboardCardSalesRankingbySM from './DashboardCardSalesRankingbySM.vue';
import DashboardCardSalesRankingbyHM from './DashboardCardSalesRankingbyHM.vue';

import DashboardSalesTotalProfit from './DashboardSalesTotalProfit.vue';

import DashboardSalesStatisticsTotalSales from './DashboardSalesStatisticsTotalSales.vue';

export default {
	curmontData: {},

	components: {
		StatisticsCardVertical,
		DashboardCongratulationBest,
		DashboardCardSalesByCountries,
		DashboardSalesTotalProfit,
		DashboardSalesStatisticsTotalSales,
		StatisticsCardSide,
		DashboardCardSalesRankingbyGM,
		DashboardCardSalesRankingbySM,
		DashboardCardSalesRankingbyHM,
		StatisticsCardRankingList,
		DigitalClock,
	},

	methods: {
		async callApiSalesHQMainApi() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await salesApi.getCurMonthData(userInfo);
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				bus.$emit('end:spinner');
			}
		},

		callSalesHQMainApi2() {
			console.log('this is test data.....');
			//start spinner
			bus.$emit('start:spinner');
			try {
				//start spinner
				bus.$emit('start:spinner');

				this.salesSide = {
					statTitle: 'Hi Leo, You are here!!',
					icon: mdiMapMarkerRadius,
					color: 'red',
					subtitle: 'updated 10 minutes ago',
					statistics: '15',
					series: [
						{
							type: 'sales',
							curmvalue: '20%',
							pevmvalue: '19%',
							curmsg: ' Sales Ranking now',
							pevmsg: ' Sales Ranking',
							curm: 'April',
							pevm: 'March',
						},
						{
							type: 'join',
							curmvalue: '25%',
							pevmvalue: '12%',
							curmsg: ' who join the same batch with you',
							pevmsg: ' who join the same batch with you',
							curm: 'April',
							pevm: 'March',
						},
						{
							type: 'age',
							curmvalue: '28%',
							pevmvalue: '29%',
							curmsg: ' who join the same age with you',
							pevmsg: ' who join the same age with you',
							curm: 'April',
							pevm: 'March',
						},
						{
							type: 'among',
							curmvalue: '30%',
							pevmvalue: '49%',
							curmsg: ' who among GM group with you',
							pevmsg: ' who among GM group with you',
							curm: 'April',
							pevm: 'March',
						},
					],
				};

				this.salesRadialChart = {
					statTitle: 'Total Sales Target',
					statistics: '10,120',
					color: 'primary',
					series: [78],
				};

				this.curmontData = salesApi.getCurMonthData();
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				bus.$emit('end:spinner');
			}
		},
	},

	data() {
		return {
			logMaessage: '',
			sheet: false,
			mdiHelpCircleOutline,
			mdiAccountCheckOutline,
			eKeyInData: {},
			color: { secondary: 'secondary', warning: 'warning', error: '#00f' },
		};
	},
	created() {
		//start spinner
		bus.$emit('start:spinner');

		this.callApiSalesHQMainApi().then(
			response => (
				(this.eKeyInData = {
					statTitle: 'eKey In',
					icon: mdiClipboardEditOutline,
					color: 'success',
					subtitle: response.data.user[0].LST_UP_TIME,
					statistics: response.data.user[0].SAL_KEYIN,
					change: response.data.user[0].PE_SAL_KEYIN,
				}),
				(this.NetSalesData = {
					statTitle: 'Net Sales',
					icon: mdiCheckboxMultipleMarkedOutline,
					color: 'error',
					subtitle: response.data.user[0].LST_UP_TIME,
					statistics: response.data.user[0].SAL_NET_SALES,
					change: response.data.user[0].PE_SAL_NET_SALES,
				}),
				(this.ActiveHpData = {
					statTitle: 'Active HP',
					icon: mdiCheckboxMultipleMarkedOutline,
					color: 'primary',
					subtitle: response.data.user[0].LST_UP_TIME,
					statistics: response.data.user[0].SAL_ACTIVE_HP,
					change: response.data.user[0].PE_SAL_ACTIVE_HP,
				}),
				(this.SHIData = {
					statTitle: 'SHI',
					icon: mdiTrendingUp,
					color: 'warning',
					subtitle: response.data.user[0].LST_UP_TIME,
					statistics: response.data.user[0].SAL_SHI,
					change: response.data.user[0].PE_SAL_SHI,
					moreshow: 'true',
				})
			),
		);
	},
};
</script>
