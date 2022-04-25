import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/login',
			name: 'home',
		},
		{
			path: '/ssoLogin',
			name: 'ssoLogin',
			component: () => import('../views/login/AutoLogin.vue'),
		},
		{
			path: '/clock',
			name: 'clock',
			component: () => import('../views/comm/DigitalClock.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/login/LoginPage.vue'),
		},
		{
			path: '/userInfo',
			name: 'userInfo',
			component: () => import('../views/account-settings/AccountSettings.vue'),
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('../views/login/SignupPage.vue'),
		},
		{
			path: '/dscmain',
			component: () => import('../views/dashboard/DscMainPage.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '*',
			component: () => import('../views/comm/NotFoundPage.vue'),
		},
		{
			path: '/dmain',
			name: 'dmain',
			component: () => import('../views/dashboard/DscMainPage.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '/smain',
			name: 'smain',
			component: () => import('../views/dashboard/SalesMainPage.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '/salesMainHQ',
			name: 'salesMainHQ',
			component: () => import('../views/dashboard/sales/SalesMainHQPage.vue'),
			meta: { requiresAuth: false },
		},

		{
			path: '/tmain',
			name: 'tmain',
			component: () => import('../views/dashboard/TempMainPage.vue'),
			meta: { requiresAuth: false },
		},

		{
			path: '/hpmain',
			name: 'hpmain',
			component: () => import('../views/dashboard/TempMainPageForHp.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '/accsetting',
			name: 'accsetting',
			component: () => import('../views/account-settings/AccountSettings.vue'),
			meta: { requiresAuth: false },
		},
	],
});

router.beforeEach((to, from, next) => {
	if (process.env.VUE_APP_CHK_AUH) {
		if (to.meta.requiresAuth) {
			// need to login
			if (store.getters.isLogin) {
				next();
			} else {
				next({
					name: 'login',
				});
			}
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
