<template>
	<v-row>
		<v-col cols="12" md="12">
			<v-alert border="left" color="black" dark elevation="1">
				<div class="nocard">Cody e-TrustBoard</div>
				<div align="right">
					<DigitalClock />
				</div>
			</v-alert>
		</v-col>

		<v-col cols="12" md="4" sm="12">
			<DashboardCongratulationJohn />
		</v-col>

		<!-- <v-col cols="12" md="8">
			<DashboardStatisticsCard />
		</v-col> -->

		<!-- vertical statistics card -->

		<!-- A + B -->
		<v-col cols="12" md="8">
			<DashboardCodyDialogue
				:eKeyInData="eKeyInData"
				:NetSalesData="NetSalesData"
				:ActiveHpData="ActiveHpData"
				:SHIData="SHIData"
				:KeyInOptions="KeyInOptions"
				:NetSalesOptions="NetSalesOptions"
				:ActiveHpOptions="ActiveHpOptions"
				:RejoinOptions="RejoinOptions"
			>
			</DashboardCodyDialogue>
		</v-col>

		<v-col cols="12" md="8">
			<DashboardSalesTotalProfit :graphSales="graphSales"></DashboardSalesTotalProfit>
		</v-col>

		<v-col cols="12" md="4">
			<v-row style="match-height">
				<v-col cols="12">
					<StatisticsCardSide :NetsalesRecord="NetsalesRecord" />
				</v-col>
				<v-col cols="12">
					<DashboardSalesStatisticsTotalSales 
					:targetSales="targetSales"
					/>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="3"  v-for='i in Ranking_Data'>
			<DashboardCardSalesRankingbyGM :i='i'/>
		</v-col>
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
} from '@mdi/js';

import DashboardCodyDialogue from './DashboardCodyDialogue.vue';
import DigitalClock from '../../comm/DigitalClock.vue';
import bus from '../../../utils/bus.js';
import codyApi from '../../../api/codyApi';
import StatisticsCardSide from '../../../components/statistics-card/StatisticsCardSideForCody.vue';
import StatisticsCardRankingList from '../../../components/statistics-card/StatisticsCardRankingList.vue';
import DashboardCongratulationJohn from './DashboardCongratulationBest.vue';
import DashboardCardSalesRankingbyGM from './DashboardCardSalesRankingbyGM.vue';
import DashboardSalesTotalProfit from './DashboardSalesTotalProfit.vue';
import DashboardSalesStatisticsTotalSales from './DashboardSalesStatisticsTotalSales.vue';

export default {
	graphSales:{},
	targetSales:{},
	curmontData: {},
	netSalesData: {},
	activeData: {},
	shiData: {},
	prodcCateory: {},
	tagetSales: {},
	KeyInOptions: {},
	NetSalesOptions: {},
	ActiveHpOptions: {},
	RejoinOptions : {},
	SHIOptions: {},
	KeyInOptions:{},
	salesSide: {},
	revenueOptions: {},
	logisticsOptions: {},
	reportsOptions: {},
	transactionsOptions: {},
	revenueLineChart: {},
	salesRadialChart: {},

	components: {
		DashboardCongratulationJohn,
		DashboardSalesTotalProfit,
		DashboardSalesStatisticsTotalSales,
		StatisticsCardSide,
		DashboardCardSalesRankingbyGM,
		StatisticsCardRankingList,
		DigitalClock,
		DashboardCodyDialogue,
	},

	methods: {
		callSalesHQMainApi() {
			try {
				//start spinner
				bus.$emit('start:spinner');
				const userdata = this.$store.state.userInfo;
				console.log('callSalesHQMainApi');
				return codyApi.getCurMonthData(userdata);
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				bus.$emit('end:spinner');
			}
		},

		callRankingAPI() {
			try {
				//start spinner
				bus.$emit('start:spinner');
				const userdata = this.$store.state.userInfo;
				return codyApi.getCurRankingData(userdata);
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
			Ranking_Data: [],
			logMaessage: '',
			sheet: false,
			mdiHelpCircleOutline,
			mdiAccountCheckOutline,
			eKeyInData: {},
			NetSalesData: {},
			ActiveHpData: {},
			SHIData: {},
			targetSales:{},
			NetsalesRecord:{},
			color: { secondary: 'secondary', warning: 'warning', error: '#00f' },
		};
	},
	created() {
		this.callSalesHQMainApi().then(response => {
			console.log('API Return',response.data.user[0]);
			const date1 = new Date(response.data.user[0].upd_dt);
			const date2 = new Date();
			let msec = date2-date1;
			console.log('time = ',date1,date2)
			const hh = Math.floor(msec / 1000 / 60 / 60);
			msec -= hh * 1000 * 60 * 60;
			const mm = Math.floor(msec / 1000 / 60);
			msec -= mm * 1000 * 60;
			let change= "";
			if(hh >= 1){
				change += hh+" Hours ago"
			}else{
				change += mm+" Mins ago"
			}
			
			this.eKeyInData = {
				statTitle: 'Active Hs Rate',
				icon: mdiClipboardEditOutline,
				color: 'success',
				subtitle: change,
				statistics: response.data.user[0].HS_RATE.toFixed(2)+"%",
			};
			this.NetSalesData = {
				statTitle: 'RC Rate',
				icon: mdiCheckboxMultipleMarkedOutline,
				color: 'error',
				subtitle: change,
				statistics: (response.data.user[0].rc_rate || 0)+"%",
			};
			this.ActiveHpData = {
				statTitle: 'Sales Key In',
				icon: mdiCheckboxMultipleMarkedOutline,
				color: 'primary',
				subtitle: change,
				statistics: response.data.user[0].Total_Keyin,
			};
			this.SHIData = {
				statTitle: 'Net Sales',
				icon: mdiTrendingUp,
				color: 'warning',
				subtitle: change,
				statistics: response.data.user[0].Net_SAL,
				moreshow: 'true',
			};

			if(response.data.user[0].MEM_LVL == 4){
				console.log('sales_men');
				this.KeyInOptions = {
					statTitle: 'SVM Sales',
					icon: mdiClipboardEditOutline,
					color: 'success',
					subtitle: change,
					statistics: response.data.user[0].SVM_SAL,
				};
				this.NetSalesOptions = {
					statTitle: 'Extrade Sales',
					icon: mdiCheckboxMultipleMarkedOutline,
					color: 'error',
					subtitle: change,
					statistics: response.data.user[0].Extrade_SAL,
				};
				this.ActiveHpOptions = {
					statTitle: 'Net Sales Rate',
					icon: mdiAccountCheckOutline,
					color: 'primary',
					subtitle: change,
					statistics: (response.data.user[0].Net_SAL / response.data.user[0].Total_Keyin).toFixed(2) ,
				};
				this.RejoinOptions = {
					appear: false
				};
			}
			else{
				this.KeyInOptions = {
					statTitle: 'Net Sales Productivity',
					icon: mdiClipboardEditOutline,
					color: 'success',
					subtitle: change,
					statistics: (response.data.user[0].Net_SAL / response.data.user[0].ACT_CODY).toFixed(2),
				};
				this.NetSalesOptions = {
					statTitle: 'Active Cody',
					icon: mdiCheckboxMultipleMarkedOutline,
					color: 'error',
					subtitle: change,
					statistics: response.data.user[0].ACT_CODY,
				};
				this.ActiveHpOptions = {
					statTitle: 'Retention',
					icon: mdiAccountCheckOutline,
					color: 'primary',
					subtitle: change,
					statistics: response.data.user[0].retention+"%" ,
				};
				this.RejoinOptions = {
					statTitle: 'Rejoin',
					icon: mdiAccountCheckOutline,
					color: 'primary',
					subtitle: change,
					statistics: response.data.user[0].rejoin ,
					appear: true
				};

			}
				this.targetSales = {
					mem_lvl:response.data.user[0].MEM_LVL,
					target:response.data.user[0].SAL_TARGET,
					achieved:response.data.user[0].Net_SAL,
					To_achieved: response.data.user[0].SAL_TARGET - response.data.user[0].Net_SAL,
					act_hs:response.data.user[0].ACT_HS,
					com_hs:response.data.user[0].COM_HS,
					canc_hs:response.data.user[0].CANC_HS,
					fal_hs:response.data.user[0].FAL_HS,
				};
			this.graphSales = {
				new_sal:response.data.user[0].Net_SAL - response.data.user[0].Extrade_SAL,
				hc_sal:response.data.user[0].MAT_SAL,
				extrade:response.data.user[0].Extrade_SAL,
				svm:response.data.user[0].SVM_SAL,
				keyin:response.data.user[0].Today_Keyin
			}
			this.NetsalesRecord = {
				curr_ranking_number : response.data.user[0].curr_ranking_number,
				curr_ranking_figure : response.data.user[0].curr_ranking_figure,
				prev_ranking_number : response.data.user[0].prev_ranking_number,
				prev_ranking_figure : response.data.user[0].prev_ranking_figure
			}
		}),
		this.callRankingAPI().then(response => {
			console.log('userdata = ',response)
			this.Ranking_Data = response.data.user
		})

		;
	},
};
</script>