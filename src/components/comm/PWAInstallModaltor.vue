<template>
	<v-row justify="space-around">
		<v-btn color="secondary" @click="openDialog">From the top</v-btn>
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

							<div class="pa-2 ma-2">
								<img
									style="width: 80%"
									src="https://customer.mazda.com.my/images/add-to-home-iOS3.png"
								/>
							</div>
						</v-card-text>
					</v-card>
				</template>
			</v-dialog>
		</v-col>
	</v-row>
</template>
<script>
import { mdiClose } from '@mdi/js';
export default {
	props: {
		apptype: { type: String },
	},

	data() {
		return { icons: { mdiClose }, dialog: false };
	},
	created() {
		console.log('____________________');
		console.log(this.isPwa());
		console.log('____________________');
	},
	methods: {
		closeDialog() {
			this.dialog = false;
		},

		openDialog() {
			alert('isPwa::', this.isPwa());
			if (!this.isPwa()) {
				this.dialog = true;
			}
		},

		isPwa() {
			navigator.getInstalledRelatedApps().then(r => {
				return r.length == 0 ? false : true;
			});
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
