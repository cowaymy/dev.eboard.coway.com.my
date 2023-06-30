<template>
	<v-card elevation="24">
		<v-card-text>
			<div>
				<p class="text-5xl font-weight-semibold text--primary mb-2">
					<VueRolling
						:value="newEkeyIn"
						:text="newEkeyIn"
						:isNumberFormat="true"
						:transition="4"
					></VueRolling>
				</p>
				<span class="text-base font-weight-semibold">ToDay's eKeyIn</span>
			</div>
		</v-card-text>

		<v-card-text>
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
							{{ graphSales.new_sal }}
						</v-list-item-title>
						<v-list-item-subtitle>New Sales</v-list-item-subtitle>
					</v-list-item-content>
					<!-- item 2------->
					<v-list-item-avatar class="" size="40" rounded>
						<v-icon size="30" color="error">
							{{ icons.mdiSeatIndividualSuite }}
						</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-semibold text-3xl">
							{{ graphSales.hc_sal }}
						</v-list-item-title>
						<v-list-item-subtitle>HC Sales</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<!-- List Item: Income -->
				<v-list-item class="pa-0">
					<!-- item 4------->
					<v-list-item-avatar class="" size="40" rounded>
						<v-icon size="30" color="info">
							{{ icons.mdiAccount }}
						</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-semibold text-3xl">
							{{ graphSales.svm }}
						</v-list-item-title>
						<v-list-item-subtitle style="white-space: break-spaces"
							>Service Membership</v-list-item-subtitle
						>
					</v-list-item-content>

					<v-list-item-avatar class="" size="40" rounded>
						<v-icon size="30" color="primary">
							{{ icons.mdiAccountConvert }}
						</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-semibold text-3xl">
							{{ graphSales.extrade }}
						</v-list-item-title>
						<v-list-item-subtitle>Extrade</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script>
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
	mdiAccount,
	mdiAccountConvert,
	mdiWaves,
} from '@mdi/js';
import VueRolling from 'vue-roller';

import bus from '../../utils/bus.js';
//import number_format from '../../utils/number_format.js';
import codyApi from '../../api/codyApi.js';

export default {
	components: { VueRolling },

	data() {
		//const $vuetify = getVuetify();
		const newEkeyIn = '';
		const graphSales = {};

		const polling_cody = null;

		return {
			graphSales,
			newEkeyIn,
			polling_cody,
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
				mdiAccount,
				mdiAccountConvert,
				mdiWaves,
			},
		};
	},

	methods: {
		//number_format,
		getEachColorsa(caty) {
			if (caty == '54') return 'info';
			if (caty == '55') return 'primary';
			if (caty == '400') return 'primary';
			if (caty == '99999') return 'success';
			if (caty == '5707') return 'error';

			return 'secondary';
		},

		callSalesHQMainApi() {
			try {
				//start spinner
				bus.$emit('start:spinner');
				//const userdata = this.$store.state.userInfo;

				const options = {
					memCode: 'CD100042',
					memId: '7493',
					memberLevel: '0',
					userName: 'CD100042',
					userTypeId: '2',
					roleId: '1',
				};

				return codyApi.getCurMonthData(options);
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				bus.$emit('end:spinner');
			}
		},
	},

	beforeDestroy() {
		clearInterval(this.polling_cody);

		console.log('this.polling  out  cody 후 id   id :::::', this.polling_cody);
	},

	created() {
		this.callSalesHQMainApi().then(response => {
			this.graphSales = {
				new_sal:
					response.data.user[0].Net_SAL - response.data.user[0].Extrade_SAL,
				hc_sal: response.data.user[0].MAT_SAL,
				extrade: response.data.user[0].Extrade_SAL,
				svm: response.data.user[0].SVM_SAL,
				keyin: response.data.user[0].Today_Keyin,
			};

			this.newEkeyIn = response.data.user[0].Today_Keyin + '';
		});

		this.polling_cody = setInterval(() => {
			this.callSalesHQMainApi().then(response => {
				this.graphSales = {
					new_sal:
						response.data.user[0].Net_SAL - response.data.user[0].Extrade_SAL,
					hc_sal: response.data.user[0].MAT_SAL,
					extrade: response.data.user[0].Extrade_SAL,
					svm: response.data.user[0].SVM_SAL,
					keyin: response.data.user[0].Today_Keyin,
				};
				this.newEkeyIn = response.data.user[0].Today_Keyin + '';
			});
		}, 30000);

		console.log('this.polling cody id   id :::::', this.polling_cody);
	},
};
</script>

<style lang="scss" scoped>
.statistics-table {
	border-top: solid 1px rgba(93, 89, 98, 0.14);
	.badge-sm {
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 70%;
		margin: 4px;
	}
}
</style>
