<template>
	<v-card color="text-center">
		<v-card-text class="d-flex flex-column justify-center align-center">
			<!-- <v-avatar
				color="success"
				class="v-avatar-light-bg primary--text mt-10"
				icon
				size="100"
			> -->
			<v-icon size="4rem" :color="proColor">
				{{ proIcon }}
			</v-icon>
			<!-- </v-avatar> -->
			<h6 class="text-5xl mt-4 font-weight-semibold">{{ proText }}</h6>
		</v-card-text>
		<v-card-text>
			{{ resultMessage }}
		</v-card-text>
		<v-card-text>
			<v-divider></v-divider>
		</v-card-text>

		<v-card-text>
			<h3 class="text-6xl mt-4 font-weight-semibold">
				{{ this.$store.state.userInfo.userName }}
			</h3>
			<div>{{ this.scandate }}</div>
			<div>{{ this.scantime }}</div>
			<div>[{{ this.scanbranchCode }}]{{ this.scanbranchName }}</div>
			<v-divider></v-divider>
			<div>
				[location]::[{{ this.scanGpsInfo.location.geocode[0].postalCode }}]{{
					this.scanGpsInfo.location.geocode[0].city
				}}
				- {{ this.scanGpsInfo.location.geocode[0].street }}
			</div>
		</v-card-text>

		<v-card-text>
			<v-btn
				color="primary"
				class="mt-4"
				@click.native="$router.push('AttendHistory')"
			>
				check Histroy</v-btn
			>
		</v-card-text>
	</v-card>
</template>

<script>
import {
	mdiClose,
	mdiCheckBold,
	mdiCheckDecagramOutline,
	mdiHelpCircleOutline,
	//mdiCheckUnderline,
	//mdiAlertCircleOutline,
	mdiAlertCircleCheck,
	mdiCommentProcessingOutline,
	mdiCheckCircle,
	mdiAlertCircleOutline,
} from '@mdi/js';

import { getMonthName, getDate } from '../../utils/validation';
//import utils from '../../utils/utils';
import baseApi from '../../api/index.js';
import calendarApi from '../../api/calendarApi.js';

import {
	saveAttendToCookie,
	getAttendFromCookie,
	deleteAtendCookie,
} from '../../utils/cookies.js';

export default {
	name: 'AttendScanQRResult',
	components: {},
	props: {
		scandata: { type: String, default: '' },
		gpsInfo: { type: String, defalult: '' },
		// resultCode: { type: String, default::'' 'fail' },
		// resultMessage: { type: String, default: '' },
	},
	data() {
		console.log(this.scandata.data);
		return {
			// icon
			icons: {
				mdiClose,
			},
			scandate: '',
			scantime: '',
			scanbranchName: '',
			scanbranchCode: '',
			scanGpsInfo: JSON.parse(this.gpsInfo),
			month: getMonthName(),
			ndate: getDate(),
			mdiCheckBold,
			mdiCheckDecagramOutline,
			mdiHelpCircleOutline,
			proColor: 'secondary',
			proText: '',
			proIcon: mdiAlertCircleCheck,
			resultCode: 'process',
			resultMessage: null,
			mdiCheckCircle,
		};
	},

	computed: {},
	created() {
		this.initProgress();
		this.updateAttendData();
	},
	methods: {
		initProgress() {
			if (this.resultCode == 'process') {
				this.proColor = 'secondary ';
				this.proText = 'progress';
				this.resultMessage = 'validation in progress...';
				this.proIcon = mdiCommentProcessingOutline;
			}
		},

		/**
		 *
		 */
		updateProgress(data) {
			console.log(data);
			if (data.success) {
				this.proColor = 'success';
				this.proText = 'Success';
				this.resultMessage = data.message;
				this.proIcon = mdiCheckCircle;

				try {
					this.scandate = `${data.dataList.attendscandate.substr(
						6,
						2,
					)} / ${data.dataList.attendscandate.substr(
						4,
						2,
					)} / ${data.dataList.attendscandate.substr(0, 4)} `;

					this.scantime = `${data.dataList.attendscantime}`;
				} catch (ex) {
					console.log(ex);
				}

				// console.log(data.dataList.attendscandate.substr(0, 4));
				// console.log(data.dataList.attendscandate.substr(4, 2));
				// console.log(data.dataList.attendscandate.substr(6, 2));

				if (
					data.dataList.attendtoken != undefined &&
					data.dataList.attendtoken != 'undefined'
				) {
					//delete cookie
					deleteAtendCookie(this.$store.state.userInfo.userName);

					//create new cookie
					saveAttendToCookie(
						this.$store.state.userInfo.userName,
						data.dataList.attendtoken,
					);
				}
			} else {
				this.proColor = 'error';
				this.proText = 'Failed';
				this.resultMessage = data.message;
				this.proIcon = mdiAlertCircleOutline;
			}
		},

		async updateAttendData() {
			//{"deviceId":"3f71f820c5781065","currentTime":"09:47:04" ,date:"yyyymmdd"}

			try {
				const param = this.scandata;
				let obj = JSON.parse(param);

				const payload = {
					scanDate: obj.date,
					scanTime: obj.currentTime,
					scanDevice: obj.deviceId,
					scanQRType: 'A0001',
					scanQRTypeDesc: 'QR',
					scanBranchLatitude: obj.branchLatitude,
					scanBranchLongitude: obj.branchLongitude,
					scanUserToken: getAttendFromCookie(
						this.$store.state.userInfo.userName,
					),
					userName: this.$store.state.userInfo.userName,
				};

				const locData = await calendarApi.verifyLocationForHp({
					id: this.$store.state.userInfo.userName,
					deviceId: obj.deviceId,
					latitude: obj.branchLatitude,
					longitude: obj.branchLongitude,
				});

				if (!locData.data.success) {
					this.updateProgress(locData.data);
					return;
				}

				const data = await calendarApi.fetchAttendAllowLactionFroHp({
					id: this.$store.state.userInfo.userName,
					deviceId: obj.deviceId,
					latitude: obj.branchLatitude,
					longitude: obj.branchLongitude,
				});

				if (data.data.dataList[0].isAllow >= 1) {
					const { data } = await baseApi.updateAttendData(payload);

					const branchData = await calendarApi.fetchAttendBranchName(
						obj.deviceId,
					);

					if (branchData.data.success) {
						this.scanbranchName =
							branchData.data.dataList[0].attend_branch_name;
						this.scanbranchCode =
							branchData.data.dataList[0].attend_branch_code;
					} else {
						this.updateProgress(branchData.data);
					}

					this.updateProgress(data);
				} else {
					this.updateProgress({
						success: false,
						message:
							'You are not registered under this reporting branch. Kindly refer to your reporting manager',
					});
				}
			} catch (e) {
				alert(e.toString);
				console.log(e.toString());
				let data = new Object();
				data.success = false;
				data.message = e.toString();
				this.updateProgress(data);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';
</style>
