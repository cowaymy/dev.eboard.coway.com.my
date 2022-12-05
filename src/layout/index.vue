<template>
	<v-app id="inspire">
		<!-- style="background: #dcdcdc"-->
		<v-navigation-drawer
			dark
			app
			v-model="drawer"
			width="100"
			v-if="(this.$route.name != 'login') & (this.$route.name != 'ssoLogin')"
		>
			<div class="text-center mt-5">
				<v-btn fab color="white" x-large>
					<v-icon color="black">fas fa-chart-line </v-icon>
				</v-btn>
			</div>
			<v-list flat class="mt-5">
				<v-list-item-group v-model="selectedItem" color="black">
					<v-list-item
						v-for="(item, i) in items"
						:key="i"
						active-class="border"
						:ripple="false"
						class="ml-2 my-3"
						@click="gotoMenu(item.route)"
					>
						<b></b>
						<b></b>
						<v-list-item-icon>
							<v-icon v-text="item.icon"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-item-group>
			</v-list>
			<div
				style="
					position: absolute;
					bottom: 20px;
					mergin-left: auto;
					margin-right: auto;
					left: 0;
					right: 0;
					text-align: center;
				"
			>
				<v-btn text>
					<v-icon @click="logoutUser"> fas fa-sign-out-alt</v-icon>
				</v-btn>
			</div>
		</v-navigation-drawer>

		<v-app-bar
			app
			v-if="(this.$route.name != 'login') & (this.$route.name != 'ssoLogin')"
		>
			&nbsp; <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>eTtrust ePapan</v-toolbar-title>
			<v-spacer></v-spacer>
			<!--login -->
			<template v-if="isUserLogin">
				<span>{{ userInfo.nickname }}</span>
				<v-btn icon dark>
					<v-icon color="black"> far fa-bell</v-icon>
				</v-btn>
				<router-link to="/userInfo">
					<span text color="#878a94"> </span>
					<v-avatar size="30" class="ml-2">
						<v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
					</v-avatar>
				</router-link>
			</template>

			<!--not login -->
			<template v-else>
				<router-link to="/login">
					<span text color="#878a94"> Login</span>
				</router-link>
			</template>
		</v-app-bar>

		<v-main>
			<!-- <div class="app-content-container boxed-container pa-6">
				<slot></slot>
			</div> -->

			<template v-if="spinnerStatus">
				<spinner :loading="spinnerStatus"> </spinner>
			</template>
			<v-container fluid>
				<keep-alive :include="['LoginForm']">
					<transition name="fab-transition" appear>
						<router-view></router-view>
					</transition>
				</keep-alive>

				<!-- <div class="wrapper">
					<div class="content">
						<spinner :loading="spinnerStatus"> </spinner>
					</div>
				</div> -->
			</v-container>
		</v-main>

		<v-footer app inset color="transparent" absolute height="56" class="px-0">
			<div class="boxed-container w-full">
				<div class="mx-6 d-flex justify-space-between">
					<span>
						&copy; 2022
						<a href="" class="text-decoration-none" target="_blank"
							>COWAY ITS</a
						></span
					>
				</div>
			</div>
		</v-footer>
	</v-app>
</template>

<script>
import Spinner from '../components/comm/Spinner.vue';
import bus from '../utils/bus.js';

export default {
	data: function () {
		return {
			selectedItem: 0,
			drawer: null,
			spinnerStatus: false,
			items: [
				{ icon: 'fas fa-chalkboard-teacher', text: '', route: 'main' },
				{ icon: 'fas fa-cog', text: 'userInfo', route: '/accsetting' },
			],
		};
	},
	components: { Spinner },
	created() {
		bus.$on('start:spinner', this.startSpinner);
		bus.$on('end:spinner', this.endSpinner);
	},
	computed: {
		mainRoute() {
			if (this.$store.state.userInfo.userTypeId == '1') {
				var rtnRoute;
				if (
					this.$store.state.userInfo.memberLevel == null ||
					this.$store.state.userInfo.memberLevel == undefined
				) {
					return '/error';
				}
				switch (this.$store.state.userInfo.memberLevel) {
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
			} else if (this.$store.state.userInfo.userTypeId == '2') {
				return '/codyMain';
			} else if (this.$store.state.userInfo.userTypeId == '3') {
				return '/dscMain';
			} else if (this.$store.state.userInfo.userTypeId == '7') {
				return '/homecareMain';
			} else if (this.$store.state.userInfo.userTypeId == '4') {
				return '/HQMain';
			} else {
				return '/salesMainHQ';
			}
		},
		isUserLogin() {
			return this.$store.getters.isLogin;
		},

		userInfo() {
			return this.$store.state.userInfo;
		},
	},

	methods: {
		logoutUser() {
			this.$store.commit('clearUserInfo');
			this.$router.push('/');
		},

		gotoMenu(route) {
			if (route == 'main') {
				route = this.mainRoute;
			}

			if (route != this.$router.history.current.path) {
				console.log('in here');
				this.$router.push(route);
			}
		},

		startSpinner() {
			this.spinnerStatus = true;
		},

		endSpinner() {
			this.spinnerStatus = false;
		},
	},

	beforeDestroy() {
		bus.$off('start:spinner', this.startSpinner);
		bus.$off('end:spinner', this.endSpinner);
	},
};
</script>

<style>
.border {
	background: #fff;
	border-top-left-radius: 30px;
	border-bottom-left-radius: 30px;
	text-decoration: none;
}

.border b:nth-child(1) {
	position: absolute;
	top: -20px;
	height: 20px;
	width: 83%;
	background: #fff;
	display: none;
}

.border b:nth-child(1)::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-bottom-right-radius: 20px;
	background: black;
}

.border b:nth-child(2) {
	position: absolute;
	bottom: -20px;
	height: 20px;
	width: 83%;
	background: none;
}

.border b:nth-child(2)::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-top-right-radius: 20px;
	background: black;
}

.border b:nth-child(1),
.border b:nth-child(2) {
	display: none;
}

.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}
.content {
	font-family: system-ui, serif;
	font-size: 2rem;
	padding: 3rem;
	border-radius: 1rem;
}
</style>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
	.v-toolbar__content {
		padding: 0;

		.app-bar-search {
			.v-input__slot {
				padding-left: 18px;
			}
		}
	}
}

.boxed-container {
	max-width: 1440px;
	margin-left: auto;
	margin-right: auto;
}
</style>
