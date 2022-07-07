<template>
	<v-card id="account-setting-card">
		<!-- tabs -->
		<v-tabs v-model="tab" show-arrows>
			<v-tab v-for="tab in tabs" :key="tab.icon">
				<v-icon size="20" class="me-3">
					{{ tab.icon }}
				</v-icon>
				<span>{{ tab.title }}</span>
			</v-tab>
		</v-tabs>

		<!-- tabs item -->
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<account-settings-account
					:account-data="accountSettingData.account"
				></account-settings-account>
			</v-tab-item>

			<v-tab-item>
				<account-settings-security></account-settings-security>
			</v-tab-item>

			<v-tab-item>
				<account-settings-info
					:information-data="accountSettingData.information"
				></account-settings-info>
			</v-tab-item>

			<!-- <v-tab-item>
				<account-settings-billing></account-settings-billing>
			</v-tab-item> -->
			<v-tab-item>
				<account-settings-notification
					:notification-data="accountSettingData.notification"
				></account-settings-notification>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import {
	mdiAccountOutline,
	mdiLockOpenOutline,
	mdiInformationOutline,
	mdiBookmarkOutline,
	mdiBellOutline,
} from '@mdi/js';

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue';
import AccountSettingsSecurity from './AccountSettingsSecurity.vue';
import AccountSettingsInfo from './AccountSettingsInfo.vue';
//import AccountSettingsBilling from './AccountSettingsBilling.vue';
//import AccountSettingsNotification from './AccountSettingsNotification.vue';

//console.log('=======>' + this.$store.state.userInfo);

export default {
	data() {
		const tab = '';

		console.log(this.$store.state);
		// tabs
		const tabs = [
			{ title: 'Account', icon: mdiAccountOutline },
			{ title: 'Security', icon: mdiLockOpenOutline },
			{ title: 'Info', icon: mdiInformationOutline },
			// { title: 'Billing', icon: mdiBookmarkOutline },
			//{ title: 'Notifications', icon: mdiBellOutline },
		];

		// account settings data
		const accountSettingData = {
			account: {
				avatarImg: require('@/assets/images/avatars/1.png'),
				username: this.$store.state.userInfo.userFullName,
				name: this.$store.state.userInfo.userName,
				email: this.$store.state.userInfo.userEmail,
				role: this.$store.state.userInfo.memOrgDesc,
				status: this.$store.state.userInfo.statusName,
				branch: this.$store.state.userInfo.branchName,
			},
			information: {
				bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
				birthday: this.$store.state.userInfo.dob,
				phone: this.$store.state.userInfo.telMobile,
				website: `https://emall.coway.com.my/?agentcode=${this.$store.state.userInfo.userName}`,
				Nationality: 'MALAYSIA',
				sponsor:
					`${this.$store.state.userInfo.spuseCode}` == 'null'
						? ''
						: `sponsor Code[ ] Name:${this.$store.state.userInfo.spouseName}`,
				gender: this.$store.state.userInfo.gender,
			},
			notification: {
				commentOnArticle: true,
				answerOnForm: true,
				followMe: false,
				newsAnnouncements: false,
				productUpdates: true,
				blogDigest: false,
			},
		};

		return {
			tab,
			tabs,
			accountSettingData,
			icons: {
				mdiAccountOutline,
				mdiLockOpenOutline,
				mdiInformationOutline,
				mdiBookmarkOutline,
				mdiBellOutline,
			},
		};
	},

	components: {
		AccountSettingsAccount,
		AccountSettingsSecurity,
		AccountSettingsInfo,
		//AccountSettingsBilling,
		//AccountSettingsNotification,
	},

	computed: {
		userInfoData() {
			return this.$store.state.userInfo;
		},
	},
};
</script>
