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
			<DashboardCongratulationJohn />
		</v-col>

		<!-- <v-col cols="12" md="8">
			<DashboardStatisticsCard />
		</v-col> -->

		<!-- vertical statistics card -->

		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical
				:change="KeyInOptions.change"
				:color="KeyInOptions.color"
				:icon="KeyInOptions.icon"
				:statistics="KeyInOptions.statistics"
				:stat-title="KeyInOptions.statTitle"
				:subtitle="KeyInOptions.subtitle"
			></StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical
				:change="NetSalesOptions.change"
				:color="NetSalesOptions.color"
				:icon="NetSalesOptions.icon"
				:statistics="NetSalesOptions.statistics"
				:stat-title="NetSalesOptions.statTitle"
				:subtitle="NetSalesOptions.subtitle"
			></StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical
				:change="ActiveHpOptions.change"
				:color="ActiveHpOptions.color"
				:icon="ActiveHpOptions.icon"
				:statistics="ActiveHpOptions.statistics"
				:stat-title="ActiveHpOptions.statTitle"
				:subtitle="ActiveHpOptions.subtitle"
			></StatisticsCardVertical>
		</v-col>
		<v-col cols="12" sm="4" md="2">
			<StatisticsCardVertical
				:change="SHIOptions.change"
				:color="SHIOptions.color"
				:icon="SHIOptions.icon"
				:statistics="SHIOptions.statistics"
				:stat-title="SHIOptions.statTitle"
				:subtitle="SHIOptions.subtitle"
				:moreshow="SHIOptions.moreshow"
			></StatisticsCardVertical>
		</v-col>

		<v-col cols="12" md="8">
			<DashboardSalesTotalProfit></DashboardSalesTotalProfit>
		</v-col>

		<v-col cols="12" md="4">
			<v-row style="match-height">
				<v-col cols="12">
					<StatisticsCardSide
						:stat-title="salesSide.statTitle"
						:statistics="salesSide.statistics"
						:icon="salesSide.icon"
						:series="salesSide.series"
						:color="salesSide.color"
					/>
				</v-col>
				<v-col cols="12">
					<DashboardSalesStatisticsTotalSales />
					<!-- <StatisticsCardRadialBarChart
						:stat-title="salesRadialChart.statTitle"
						:statistics="salesRadialChart.statistics"
						:chart-series="salesRadialChart.series"
						:chart-color="salesRadialChart.color"
					></StatisticsCardRadialBarChart> -->
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
			<StatisticsCardRankingList
				:statTitle="rinkList.statTitle"
				:statistics="rinkList.statistics"
				:series="rinkList.series"
				:color="rinkList.color"
				:selectedItem="rinkList.selectedItem"
			>
			</StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList
				:statTitle="rinkListSM.statTitle"
				:statistics="rinkListSM.statistics"
				:series="rinkListSM.series"
				:color="rinkListSM.color"
				:selectedItem="rinkListSM.selectedItem"
			>
			</StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList
				:statTitle="rinkListHM.statTitle"
				:statistics="rinkListHM.statistics"
				:series="rinkListHM.series"
				:color="rinkListHM.color"
				:selectedItem="rinkListHM.selectedItem"
			>
			</StatisticsCardRankingList>
		</v-col>
		<v-col cols="12" md="3">
			<StatisticsCardRankingList
				:statTitle="rinkListHP.statTitle"
				:statistics="rinkListHP.statistics"
				:series="rinkListHP.series"
				:color="rinkListHP.color"
				:selectedItem="rinkListHP.selectedItem"
			>
			</StatisticsCardRankingList>
		</v-col>
		<!-- <v-col cols="12" md="8">
			<DashboardCardDepositAndWithdraw />
		</v-col> -->
	</v-row>
</template>

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

import DigitalClock from '../comm/DigitalClock.vue';

import StatisticsCardVertical from '../../components/statistics-card/StatisticsCardVertical.vue';
import StatisticsCardLineChart from '../../components/statistics-card/StatisticsCardLineChart.vue';
import StatisticsCardBarChart from '../../components/statistics-card/StatisticsCardBarChart.vue';
import StatisticsCardRadialBarChart from '../../components/statistics-card/StatisticsCardRadialBarChart.vue';
import StatisticsCardSide from '../../components/statistics-card/StatisticsCardSide.vue';

import StatisticsCardRankingList from '../../components/statistics-card/StatisticsCardRankingList.vue';

import DashboardCongratulationJohn from './sales/DashboardCongratulationJohn.vue';
import DashboardStatisticsCard from './sales/DashboardStatisticsCard.vue';
//import DashboardCardTotalEarning from './sales/DashboardCardTotalEarning.vue';
import DashboardCardDepositAndWithdraw from './sales/DashboardCardDepositAndWithdraw.vue';
import DashboardCardSalesByCountries from './sales/DashboardCardSalesByCountries.vue';
import DashboardCardSalesRankingbyGM from './sales/DashboardCardSalesRankingbyGM.vue';
import DashboardCardSalesRankingbySM from './sales/DashboardCardSalesRankingbySM.vue';
import DashboardCardSalesRankingbyHM from './sales/DashboardCardSalesRankingbyHM.vue';

import DashboardCardWebsiteStatistics from './sales/DashboardCardWebsiteStatistics.vue';
import DashboardSalesTotalProfit from './sales/DashboardSalesTotalProfit.vue';

import DashboardSalesStatisticsTotalSales from './sales/DashboardSalesStatisticsTotalSales.vue';

import DashboardTopGMChart from './sales/DashboardTopGMChart.vue';

//import DashboardTotalProfit from './sales/DashboardTotalProfit.vue';

//import DashboardWeeklyOverview from './sales/DashboardWeeklyOverview.vue';
//import DashboardDatatable from './sales/DashboardDatatable.vue';

export default {
	components: {
		StatisticsCardVertical,
		StatisticsCardBarChart,
		StatisticsCardLineChart,
		DashboardCongratulationJohn,
		DashboardStatisticsCard,
		DashboardCardDepositAndWithdraw,
		DashboardCardSalesByCountries,
		DashboardCardWebsiteStatistics,
		DashboardSalesTotalProfit,
		StatisticsCardRadialBarChart,
		DashboardSalesStatisticsTotalSales,
		DashboardTopGMChart,
		StatisticsCardSide,
		DashboardCardSalesRankingbyGM,
		DashboardCardSalesRankingbySM,
		DashboardCardSalesRankingbyHM,
		StatisticsCardRankingList,
		//DashboardTotalProfit,
		//DashboardWeeklyOverview,
		DigitalClock,
	},
	data() {
		const KeyInOptions = {
			statTitle: 'KeyIn',
			icon: mdiClipboardEditOutline,
			color: 'success',
			subtitle: 'updated 10 minutes ago',
			statistics: '90,981',
			change: '+12%',
		};

		const NetSalesOptions = {
			statTitle: 'Net Sales',
			icon: mdiCheckboxMultipleMarkedOutline,
			color: 'error',
			subtitle: 'updated 10 minutes ago',
			statistics: '89,008',
			change: '+10%',
		};

		// vertical card options
		const ActiveHpOptions = {
			statTitle: 'Active HP',
			icon: mdiAccountCheckOutline,
			color: 'primary',
			subtitle: 'updated 10 minutes ago',
			statistics: '123,862',
			change: '-18%',
		};

		const SHIOptions = {
			statTitle: 'SHI',
			icon: mdiTrendingUp,
			color: 'warning',
			subtitle: 'updated 10 minutes ago',
			statistics: '15',
			change: '-18%',
			moreshow: 'true',
		};

		const salesSide = {
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

		const revenueOptions = {
			statTitle: 'Sales Quries',
			icon: mdiHelpCircleOutline,
			color: 'warning',
			subtitle: 'updated 10 minutes ago',
			statistics: '15',
			change: '-18%',
		};

		const logisticsOptions = {
			statTitle: 'Sales Quries',
			icon: mdiHelpCircleOutline,
			color: 'warning',
			subtitle: 'updated 10 minutes ago',
			statistics: '15',
			change: '-18%',
		};
		const reportsOptions = {
			statTitle: 'Sales Quries',
			icon: mdiHelpCircleOutline,
			color: 'warning',
			subtitle: 'updated 10 minutes ago',
			statistics: '15',
			change: '-18%',
		};

		const transactionsOptions = {
			statTitle: 'Sales Quries',
			icon: mdiHelpCircleOutline,
			color: 'warning',
			subtitle: 'updated 10 minutes ago',
			statistics: '15',
			change: '-18%',
		};

		const revenueLineChart = {
			statTitle: 'Total Revenue',
			statistics: '$35.4k',
			color: 'primary',
			series: [
				{
					data: [28, 58, 40, 68],
				},
			],
		};

		const salesRadialChart = {
			statTitle: 'Total Sales Target',
			statistics: '10,120',
			color: 'primary',
			series: [78],
		};

		const rinkList = {
			statTitle: 'Sales Ranking by GM(Recruitment)',
			icon: mdiMapMarkerRadius,
			color: '',
			subtitle: '',
			selectedItem: '5',
			series: [
				{
					abbr: '1',
					name: '(506089)MOEY WENG HONG',
					change: '98.8',
					sales: '18,00',
					color: 'warning',
				},
				{
					abbr: '2',
					name: '(524903) MUHAMMAD ARIF BIN ROSDAN',
					change: '80',
					sales: '1,060',
					color: 'secondary',
				},
				{
					abbr: '3',
					name: '(512558)KHAIRULLNIZAM BIN SABTU',
					change: '70',
					sales: '1,000',
					color: 'secondary',
				},
				{
					abbr: '4',
					name: '(616508)LIEW LAY YEE',
					change: '68',
					sales: '980',
					color: 'secondary',
				},
				{
					abbr: '5',
					name: '(653856)NORHISHAM BIN MOHD YAACOB',
					change: '67',
					sales: '970',
					color: 'secondary',
				},

				{
					abbr: '15',
					name: '(653856)LEO GM',
					change: '72',
					sales: '677',
					color: 'secondary',
				},
			],
		};

		const rinkListSM = {
			statTitle: 'Sales Ranking by SM(Recruitment)',
			icon: mdiMapMarkerRadius,
			color: '',
			subtitle: '',
			selectedItem: '5',
			series: [
				{
					abbr: '1',
					name: '(506089)MOEY WENG HONG',
					change: '98.8',
					sales: '18,00',
					color: 'warning',
				},
				{
					abbr: '2',
					name: '(524903) MUHAMMAD ARIF BIN ROSDAN',
					change: '80',
					sales: '1,060',
					color: 'secondary',
				},
				{
					abbr: '3',
					name: '(512558)KHAIRULLNIZAM BIN SABTU',
					change: '70',
					sales: '1,000',
					color: 'secondary',
				},
				{
					abbr: '4',
					name: '(616508)LIEW LAY YEE',
					change: '68',
					sales: '980',
					color: 'secondary',
				},
				{
					abbr: '5',
					name: '(653856)NORHISHAM BIN MOHD YAACOB',
					change: '67',
					sales: '970',
					color: 'secondary',
				},

				{
					abbr: '15',
					name: '(653856)LEO GM',
					change: '72',
					sales: '677',
					color: 'secondary',
				},
			],
		};

		const rinkListHM = {
			statTitle: 'Sales Ranking by HM(Recruitment)',
			icon: mdiMapMarkerRadius,
			color: '',
			subtitle: '',
			selectedItem: '5',
			series: [
				{
					abbr: '1',
					name: '(506089)MOEY WENG HONG',
					change: '98.8',
					sales: '18,00',
					color: 'warning',
				},
				{
					abbr: '2',
					name: '(524903) MUHAMMAD ARIF BIN ROSDAN',
					change: '80',
					sales: '1,060',
					color: 'secondary',
				},
				{
					abbr: '3',
					name: '(512558)KHAIRULLNIZAM BIN SABTU',
					change: '70',
					sales: '1,000',
					color: 'secondary',
				},
				{
					abbr: '4',
					name: '(616508)LIEW LAY YEE',
					change: '68',
					sales: '980',
					color: 'secondary',
				},
				{
					abbr: '5',
					name: '(653856)NORHISHAM BIN MOHD YAACOB',
					change: '67',
					sales: '970',
					color: 'secondary',
				},

				{
					abbr: '15',
					name: '(653856)LEO GM',
					change: '72',
					sales: '677',
					color: 'secondary',
				},
			],
		};

		const rinkListHP = {
			statTitle: 'Sales Ranking by HP(Recruitment)',
			icon: mdiMapMarkerRadius,
			color: '',
			subtitle: '',
			selectedItem: '5',
			series: [
				{
					abbr: '1',
					name: '(506089)MOEY WENG HONG',
					change: '98.8',
					sales: '18,00',
					color: 'warning',
				},
				{
					abbr: '2',
					name: '(524903) MUHAMMAD ARIF BIN ROSDAN',
					change: '80',
					sales: '1,060',
					color: 'secondary',
				},
				{
					abbr: '3',
					name: '(512558)KHAIRULLNIZAM BIN SABTU',
					change: '70',
					sales: '1,000',
					color: 'secondary',
				},
				{
					abbr: '4',
					name: '(616508)LIEW LAY YEE',
					change: '68',
					sales: '980',
					color: 'secondary',
				},
				{
					abbr: '5',
					name: '(653856)NORHISHAM BIN MOHD YAACOB',
					change: '67',
					sales: '970',
					color: 'secondary',
				},

				{
					abbr: '15',
					name: '(653856)LEO GM',
					change: '72',
					sales: '677',
					color: 'secondary',
				},
			],
		};

		return {
			KeyInOptions,
			NetSalesOptions,
			ActiveHpOptions,
			SHIOptions,
			revenueOptions,
			logisticsOptions,
			reportsOptions,
			transactionsOptions,
			revenueLineChart,
			salesRadialChart,
			salesSide,
			rinkList,
			rinkListSM,
			rinkListHM,
			rinkListHP,
		};
	},
};
</script>
