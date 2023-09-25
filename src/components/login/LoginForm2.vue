<template>
	<div class="auth-wrapper auth-v1">
		<div class="auth-inner">
			<v-card class="auth-card">
				<!-- logo -->
				<v-card-title class="d-flex align-center justify-center py-7">
					<router-link to="/" class="d-flex align-center">
						<v-img
							:src="appLogo"
							max-height="20vw"
							max-width="20vw"
							alt="logo"
							contain
							class="me-3"
						></v-img>

						<h2 class="text-2xl font-weight-semibold">
							{{ appName }}
						</h2>
					</router-link>
				</v-card-title>

				<!-- title -->
				<v-card-text>
					<!-- <p class="text-2xl font-weight-semibold text--primary mb-2">
						Welcome to ePAPAN! 👋🏻
					</p> -->
					<p class="mb-2">
						Please sign-in to your account and start the adventure
					</p>
				</v-card-text>

				<!-- login form -->
				<v-card-text>
					<v-form @submit.prevent="submitForm">
						<v-text-field
							v-model="userId"
							label="UserID"
							hide-details
							class="mb-3 logInput"
						></v-text-field>

						<v-text-field
							v-model="password"
							class="logInput"
							:type="isPasswordVisible ? 'text' : 'password'"
							label="Password"
							placeholder="············"
							:append-icon="
								isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
							"
							hide-details
							@click:append="isPasswordVisible = !isPasswordVisible"
						></v-text-field>

						<div class="d-flex align-center justify-space-between flex-wrap">
							<v-checkbox label="Remember Me" hide-details class="me-3 mt-1">
							</v-checkbox>

							<!-- forgot link -->
							<!-- <router-link
								:to="{ name: 'auth-forgot-password-v1' }"
								class="mt-1"
							>
								Forgot Password?
							</router-link> -->
						</div>

						<v-btn
							block
							color="primary"
							class="mt-6"
							:disabled="!isFormValid"
							type="submit"
						>
							Login
						</v-btn>
					</v-form>
				</v-card-text>

				<!-- create new account  -->
				<!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
					<span class="me-2"> New on our platform? </span>
					<router-link :to="{ name: 'auth-register-v1' }">
						Create an account
					</router-link>
				</v-card-text> -->

				<!-- divider -->
			</v-card>
		</div>

		<v-bottom-sheet v-model="sheet" inset>
			<v-sheet class="text-center" height="200px">
				<v-btn class="mt-6" text color="error" @click="sheet = !sheet">
					close
				</v-btn>
				<div class="my-3">
					<v-alert border="bottom" colored-border type="warning" elevation="2">
						{{ logMaessage }}
					</v-alert>
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
//import { ref } from '@vue/composition-api';
import themeConfig from '../../../themeConfig';
//import { validEmail } from '@/utils/validation';
import bus from '../../utils/bus.js';

export default {
	data() {
		return {
			userId: '',
			password: '',
			logMaessage: '',
			isPasswordVisible: false,
			sheet: false,
			// themeConfig
			appName: themeConfig.app.name,
			appLogo: themeConfig.app.logo,
			result: ':::=>',

			icons: {
				mdiEyeOutline,
				mdiEyeOffOutline,
			},
		};
	},
	created() {
		console.log(process.env.VUE_APP_API_URL);
	},
	computed: {
		isFormValid() {
			var isValid = true; //validEmail(this.username);
			if (this.password == '') isValid = false;

			return isValid;
		},
	},

	mounted() {
		// console.debug('===========>');
		// // 웹에서 메시지를 받을 수 있도록 이벤터 리스너를 등록한다
		// document.addEventListener('message', this.receiveMessage, true);
		// window.addEventListener('message', this.receiveMessage, true);
		// alert(document.toString());
	},
	methods: {
		// receiveMessage(event) {
		// 	alert(event.data);
		// 	console.log('origin: ', event.origin); // 메시지를 보낸 곳
		// 	console.log('message: ', event.data); // 보낸 메시지
		// },

		onNativeEventTest() {
			// "getLocationInfo"는 react-native에서 받는 메서드 이름입니다.
			window.webViewBridge.send(
				'getLocationInfo',
				'',
				function (res) {
					this.result = JSON.stringify(res);
				},
				function (err) {
					console.error(err);
				},
			);
		},
		async submitForm() {
			try {
				const userdata = {
					memCode: this.userId,
					password: this.password,
				};

				//start spinner
				bus.$emit('start:spinner');

				//call lgoin api
				const data = await this.$store.dispatch('LOGIN', userdata);

				if (data.success) {
					const userInfo = this.$store.state.userInfo;
					//const dataNotifi = await this.$store.dispatch('GETNOTIFI', userInfo);
					//go to main page
					this.$router.push(this.getNextRoute(data.user[0]));
				} else {
					this.sheet = true;
					this.logMaessage = data.message;
				}
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				this.initForm();
				bus.$emit('end:spinner');
			}
		},

		initForm() {
			this.userId = '';
			this.password = '';
			this.isPasswordVisible = false;
		},

		getNextRoute(data) {
			if (data.userTypeId == '1') {
				var rtnRoute;
				if (data.memberLevel == null || data.memberLevel == undefined) {
					return '/error';
				}
				switch (data.memberLevel) {
					case 0:
						rtnRoute = '/salesMainSGM';
						break;
					case 1:
						rtnRoute = '/salesMainGM';
						break;
					case 2:
						rtnRoute = '/salesMainSM';
						break;
					case 3:
						rtnRoute = '/salesMainHM';
						break;
					case 4:
						rtnRoute = '/salesMainHP';
						break;
					case 99:
						rtnRoute = '/salesMainHQ';
						break;
				}
				return rtnRoute;
			} else if (data.userTypeId == '2') {
				return '/codyMain';
			} else if (data.userTypeId == '3') {
				return '/dscMain';
			} else if (data.userTypeId == '7') {
				return '/homecareMain';
			} else if (data.userTypeId == '4') {
				//HQ
				return '/HQMain';
			} else {
				return '/salesMainHQ';
			}
		},
	},
};

// export default {
// 	data() {
// 		const isPasswordVisible = false;
// 		const email = '';
// 		const password = '';
// 		const socialLink = [
// 			{
// 				icon: mdiFacebook,
// 				color: '#4267b2',
// 				colorInDark: '#4267b2',
// 			},
// 			{
// 				icon: mdiTwitter,
// 				color: '#1da1f2',
// 				colorInDark: '#1da1f2',
// 			},
// 			{
// 				icon: mdiGithub,
// 				color: '#272727',
// 				colorInDark: '#fff',
// 			},
// 			{
// 				icon: mdiGoogle,
// 				color: '#db4437',
// 				colorInDark: '#db4437',
// 			},
// 		];

// 		return {
// 			isPasswordVisible,
// 			email,
// 			password,
// 			socialLink,

// 			// themeConfig
// 			appName: themeConfig.app.name,
// 			appLogo: 'themeConfig.app.logo',

// 			icons: {
// 				mdiEyeOutline,
// 				mdiEyeOffOutline,
// 			},
// 		};
// 	},
// };
</script>

<style lang="scss" scoped>
@import '/src/@core/preset/preset/pages/auth.scss';

.logInput {
	border-radius: 6.666666667px;
	font-size: 16px;
	line-height: 26.666666667px;
	padding: 6.666666667px;
	width: 133.333333333%;

	transform: scale(0.75);
	transform-origin: left top;

	/* 여기를 추가합니다. */
	margin-bottom: -10px;
	margin-right: -33.333333333%;
}
</style>
