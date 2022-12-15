<template>
	<v-card elevation="0">
		<!-- Title/Header -->
		<v-card-title class="align-start pt-0 flex-nowrap">
			<div>
				<p class="mb-0 font-weight-semibold primary--text text-5xl">
					<VueRolling
						:text="rollerKeyin.toString()"
						:value="rollerKeyin.toString()"
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

		<v-card-actions>
			<v-btn color="success" text> Explore </v-btn>

			<v-spacer></v-spacer>

			<v-btn icon color="success" @click="show = !show">
				<v-icon>{{ show ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
			</v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
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
					<!-- <v-btn block color="primary"> View Report </v-btn> -->
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
import VueRolling from 'vue-roller';

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
	mdiChevronUp,
	mdiChevronDown,
} from '@mdi/js';

import salesApi from '../../../api/salesApi';

export default {
	components: {
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
			this.show = true;
		},
	},

	beforeDestroy() {
		clearInterval(this.polling);
	},

	created() {
		this.callApiEKeyInData().then(request => {
			this.rollerKeyin = request.data.data[0].TOTAL_SALES;
		});

		this.callApiTodayEkeyinData().then(request => {
			this.todayEeyin = request.data.data;
		});
		this.pollData = setInterval(() => {
			this.callApiEKeyInData().then(request => {
				this.rollerKeyin = request.data.data[0].TOTAL_SALES;
			});

			this.callApiTodayEkeyinData().then(request => {
				this.todayEeyin = request.data.data;
			});
		}, 300000);
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
			} catch (error) {
				rtnVal = 0;
			}

			return rtnVal;
		};

		const rollerKeyin = 0;
		const pollData = null;
		return {
			checkNull,
			tvalue: {},
			chartData: [],
			todayEeyin: [],
			rollerKeyin,
			pollData,
			show: true,
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
				mdiChevronUp,
				mdiChevronDown,
			},
		};
	},
};
</script>
