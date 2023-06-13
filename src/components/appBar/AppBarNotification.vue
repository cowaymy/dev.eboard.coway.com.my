<template>
	<v-menu
		offset-y
		left
		nudge-bottom="22"
		:elevation="$vuetify.theme.dark ? 9 : 8"
		content-class="list-style notification-menu-content"
	>
		<template v-slot:activator="{ on, attrs }">
			<template v-if="$store.state.newNotifiCnt != 0">
				<v-badge
					color="error"
					:content="$store.state.newNotifiCnt"
					offset-x="10"
					offset-y="10"
				>
					<v-icon v-bind="attrs" v-on="on">
						{{ icons.mdiBellOutline }}
					</v-icon>
				</v-badge>
			</template>
		</template>
		<v-card class="app-bar-notification-content-container">
			<perfect-scrollbar
				class="ps-user-notifications"
				:options="perfectScrollbarOptions"
			>
				<v-list class="py-0">
					<!-- Header -->
					<v-list-item class="d-flex" link>
						<div class="d-flex align-center justify-space-between flex-grow-1">
							<span class="font-weight-semibold">Notifications</span>
							<v-chip
								class="v-chip-light-bg primary--text font-weight-semibold"
								small
							>
								{{ $store.state.newNotifiCnt }} NEW
							</v-chip>
						</div>
					</v-list-item>
					<v-divider></v-divider>

					<!-- Notifications -->
					<template v-for="(notification, index) in notificationsData">
						<v-list-item :key="notification.ID" link>
							<!-- Avatar -->
							<v-list-item-avatar
								:class="getTypeClass(notification.TYPE)"
								size="38"
							>
								<v-tooltip top>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											color="#2A3B4D"
											:class="getTypeClass(notification.TYPE)"
											v-bind="attrs"
											v-on="on"
										>
											<span class="text-lg">{{ notification.TYPE }}</span>
										</v-btn>
									</template>
									<span>{{ notification.TYPE_NM }}</span>
								</v-tooltip>
							</v-list-item-avatar>

							<!-- Content -->
							<v-list-item-content class="d-block">
								<v-list-item-title class="text-sm font-weight-semibold">
									{{ setLimitText('T', notification.SUBJECT) }}
								</v-list-item-title>
								<v-list-item-subtitle class="text-sm">
									{{ setLimitText('S', notification.CONTENTS) }}
								</v-list-item-subtitle>
							</v-list-item-content>

							<!-- Item Action/Time -->
							<v-list-item-action>
								<span class="text--secondary text-xs">{{
									notification.STD_DATE
								}}</span>
							</v-list-item-action>
						</v-list-item>
						<v-divider :key="index"></v-divider>
					</template>
					<router-link to="/NotificationList">
						<v-list-item key="read-all-btn" class="read-all-btn-list-item">
							<v-btn block color="primary"> Read All Notifications </v-btn>
						</v-list-item>
					</router-link>

					<v-divider></v-divider>
				</v-list>
			</perfect-scrollbar>
		</v-card>
	</v-menu>
</template>

<script>
import { mdiBellOutline } from '@mdi/js';
import baseApi from '../../api/index.js';

// 3rd Party
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

export default {
	components: {
		PerfectScrollbar,
	},
	data() {
		const perfectScrollbarOptions = {
			maxScrollbarLength: 60,
			wheelPropagation: false,
		};

		const notificationsData = [];
		return {
			notificationsData,
			perfectScrollbarOptions,

			icons: { mdiBellOutline },
		};
	},

	methods: {
		async callApiDetailNewNotification() {
			//start spinner
			try {
				const userInfo = this.$store.state.userInfo;
				const data = await baseApi.getDetailNewNotification(userInfo);
				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getTypeClass(value) {
			return value == 'E'
				? 'v-avatar-light-bg error--text justify-center'
				: 'v-avatar-light-bg primary--text justify-center';
		},

		setLimitText(type, value) {
			let rtnValue = '';

			if (type == 'T') {
				rtnValue = value.length > 20 ? value.substring(0, 20) + ' ...' : value;
			}

			if (type == 'S') {
				rtnValue = value.length > 40 ? value.substring(0, 40) + ' ...' : value;
			}

			return rtnValue;
		},
	},

	created() {
		// this.callApiDetailNewNotification().then(request => {
		// 	this.notificationsData = request.data.dataList;
		// 	console.log(this.notificationsData);
		// });
	},
};
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.app-bar-notification-content-container {
	.read-all-btn-list-item {
		padding-top: 14px;
		padding-bottom: 14px;
		min-height: unset;
	}
}

.ps-user-notifications {
	max-height: calc(var(--vh, 1vh) * 80);
}

.notification-menu-content {
	@media #{map-get($display-breakpoints, 'xs-only')} {
		min-width: calc(100vw - (1.5rem * 2)) !important;
		left: 50% !important;
		transform: translateX(-50%);
	}
}
</style>
