<template>
	<v-card elevation="24">
		<v-card-text class="d-flex align-center justify-space-between pb-1 pt-5">
			<div>
				<p class="text-5xl font-weight-semibold text--primary mb-2">
					<VueRolling
						:value="newEkeyIn.toString()"
						:text="newEkeyIn.toString()"
						:isNumberFormat="true"
						:transition="4"
					></VueRolling>
				</p>
				<span class="text-base font-weight-semibold">ToDay's eKeyIn</span>
			</div>
		</v-card-text>

		<v-card-text class="mt-2">
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
						<v-icon size="30" color="info">
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
						<v-icon size="30" color="warning">
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
						<v-icon size="30" color="error">
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
						<v-icon size="30" color="primary">
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
						<v-icon size="30" color="#F08080">
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
	mdiAlphaEBox,
} from '@mdi/js';
import VueRolling from 'vue-roller';
import number_format from '../../utils/number_format.js';

import salesApi from '../../api/salesApi';

export default {
	components: { VueRolling },

	data() {
		//const $vuetify = getVuetify();
		const newEkeyIn = 0;
		const newDataList = ['', '', '', '', '', ''];
		const pollData = null;
		return {
			pollData,
			newDataList,
			newEkeyIn,
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

	methods: {
		checkNull(value) {
			var rtnVal = 0;
			try {
				this.newDataList.forEach(function (v) {
					if (value == v.STK_CTGRY_ID) {
						rtnVal = v.P_TOTAL_CNT;
					}
				});
			} catch (error) {
				rtnVal = 0;
			}

			return rtnVal;
		},
		number_format,
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
	},

	beforeDestroy() {
		clearInterval(this.polling);
	},

	created() {
		this.callApiEKeyInData().then(request => {
			console.log(request);
			this.newEkeyIn = request.data.data[0].TOTAL_SALES;
		});

		this.callApiTodayEkeyinData().then(request => {
			const newList = [];
			request.data.data.filter(function (item) {
				if (item.INDX != [1]) {
					newList.push(item);
				}
			});

			this.newDataList = newList;
		});

		this.pollData = setInterval(() => {
			this.callApiEKeyInData().then(request => {
				console.log(request);
				this.newEkeyIn = request.data.data[0].TOTAL_SALES;
			});
		}, 30000);

		setInterval(() => {
			this.callApiTodayEkeyinData().then(request => {
				const newList = [];
				request.data.data.filter(function (item) {
					if (item.INDX != [1]) {
						newList.push(item);
					}
				});

				this.newDataList = newList;
			});
		}, 30000);
	},
};
</script>

<style lang="scss" scoped>
.statistics-table {
	border-top: solid 1px rgba(89, 98, 94, 0.14);
	.badge-sm {
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 70%;
		margin: 4px;
	}
}
</style>
