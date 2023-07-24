<template>
	<v-row justify="space-around">
		<v-col cols="auto">
			<v-dialog
				v-model="dialog"
				transition="dialog-top-transition"
				max-width="600"
				overlay-opacity="20"
			>
				<template>
					<v-card>
						<v-toolbar class="p-2 ma-2 font-weight-semibold text-2xl"
							>ADD HOME SCREEN
							<v-spacer></v-spacer>
							<v-btn icon @click="closeDialog">
								<v-icon>{{ icons.mdiClose }}</v-icon>
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<v-list>
								<v-list-item>
									<v-container>
										<v-row no-gutters style="height: 80px">
											<v-col align-self="start"> </v-col>
											<v-col align-self="center">
												<v-sheet class="pa-2 ma-2">
													<img
														class="reminder-modal-title-logo"
														src="img/pwa/add-mobile.png"
														alt=""
													/>
												</v-sheet>
											</v-col>
											<v-col align-self="end"> </v-col>
										</v-row>
									</v-container>
								</v-list-item>
							</v-list>

							<v-list two-line subheader>
								<v-list-item class="pa-2 ma-2">
									<!-- item 1------->
									<v-list-item-avatar class="" size="40" rounded>
										<v-img src="img/icons/favicon-32x32.png"> </v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title class="font-weight-semibold text-2xl">
											Coway ePapan Portal
										</v-list-item-title>
										<v-list-item-subtitle
											>https://epapan.malaysia.coway.do/</v-list-item-subtitle
										>
									</v-list-item-content>
								</v-list-item>
							</v-list>
							<v-divider></v-divider>
							<div class="pa-2 ma-2" style="line-height: 1.2">
								<span class="font-brand" style="font-size: 15px"
									><b
										>Add the portal to your mobile home screen to scan QR-code
										and easily access it anytime and anywhere.</b
									></span
								>
							</div>

							<template v-if="deviceMod">
								<div class="pa-2 ma-2">
									<img
										style="width: 80%"
										src="../../../public/img/pwa/pwa.png"
									/>
								</div>
							</template>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<template v-if="!deviceMod">
								<v-btn @click="clickCallback" color="info"> Install</v-btn>
							</template>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
		</v-col>
	</v-row>
</template>
<script>
import { mdiClose } from '@mdi/js';
import VuePwaInstall from 'vue-pwa-install';
import { savePWACookie, getPWAFromCookie } from '../../utils/cookies.js';

//import { instalar, eventHandler } from './PWA_Insatll';

import Vue from 'vue';

Vue.use(VuePwaInstall);

export default {
	props: {
		apptype: { type: String },
		open: { type: String },
	},

	data() {
		return {
			icons: { mdiClose },
			dialog: open,
			deviceMod: this.isIos(),
			isInstallPWA: getPWAFromCookie(),
			deferredPrompt: null,
		};
	},
	created() {
		console.log('____________________');
		console.log('open:::', this.open);
		console.log('deviceMod is ios', this.isIos);
		console.log('isInstallPWA', getPWAFromCookie());
		console.log('____________________');
		this.captureEvent();
	},

	mounted() {},
	methods: {
		closeDialog() {
			this.dialog = false;
		},

		async install() {
			this.deferredPrompt.prompt();
		},

		openDialog() {
			try {
				if (this.isIos()) {
					//checkcookie
					//if (!getPWAFromCookie()) {
					this.dialog = true;

					//}
				} else {
					if (!getPWAFromCookie()) {
						this.dialog = true;
					}
				}
				//this.dialog = true;
			} catch (e) {
				alert(e);
			}
		},

		isIos() {
			const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

			if (
				varUA.indexOf('iphone') > -1 ||
				varUA.indexOf('ipad') > -1 ||
				varUA.indexOf('ipod') > -1
			) {
				return true;
			} else {
				return false;
			}
		},

		isPwa() {
			return navigator.getInstalledRelatedApps();
		},

		captureEvent() {
			window.addEventListener('beforeinstallprompt', e => {
				// ! Prevent Chrome 67 and earlier from automatically showing the prompt
				e.preventDefault();
				// Stash the event so it can be triggered later.

				console.log('in beforeinstallprompt :::::', e);
				this.deferredPrompt = e;
			});
		},
		clickCallback() {
			try {
				// Show the prompt

				this.deferredPrompt.prompt();

				// Wait for the user to respond to the prompt
				this.deferredPrompt.userChoice.then(choiceResult => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted the install prompt');
						savePWACookie(true);
					} else {
						console.log('User dismissed the install prompt');
					}
					this.deferredPrompt = null;
				});
			} catch (e) {
				console.log(e);
				console.log('pwa :::', getPWAFromCookie());
				console.log('이미 설치 되어 있거나 지원하지 않는 브라우저 !!!');
			}
		},
	},
};
</script>
<sctyle lang="scss">
.reminder-modal-title-logo {
	width: 50px;
	padding-top: 10px;
	margin-left: 9%;
}
.reminder-modal-title-logo-sm {
	width: 80px;
	padding-top: 10px;
	margin-left: 7%;
}

.mazda-modal-close-button {
	width: 30px;
	padding-top: 25px;
}

.mazda-modal-close-button-sm {
	width: 50px;
	padding-top: 25px;
}
</sctyle>
