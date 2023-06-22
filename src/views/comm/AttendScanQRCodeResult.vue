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
import baseApi from '../../api/index.js';
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
		console.log('======>' + this.scandata);

		this.initProgress();
		this.updateAttendData();
	},
	methods: {
		goToAttendHisty() {
			console.log('1231');
		},
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

				console.log('결과 쿠키값 :  ', data.dataList.attendtoken);
				if (
					data.dataList.attendtoken != undefined &&
					data.dataList.attendtoken != 'undefined'
				) {
					console.log('쿠키 생성.....신규 쿠키:', data.dataList.attendtoken);

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
			console.log(this.scandata.data);

			//{"deviceId":"3f71f820c5781065","currentTime":"09:47:04" ,date:"yyyymmdd"}

			try {
				const param = this.scandata;
				let obj = JSON.parse(param);

				console.log(obj);

				const payload = {
					scanDate: obj.date,
					scanTime: obj.currentTime,
					scanDevice: obj.deviceId,
					scanUserToken: getAttendFromCookie(
						this.$store.state.userInfo.userName,
					),
					userName: this.$store.state.userInfo.userName,
				};
				const { data } = await baseApi.updateAttendData(payload);

				this.updateProgress(data);
			} catch (e) {
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
