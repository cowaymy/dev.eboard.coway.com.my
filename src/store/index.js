import Vue from 'vue';
import Vuex from 'vuex';
import {
	getAuthFromCookie,
	getUserFromCookie,
	saveAuthToCookie,
	saveUserToCookie,
	deleteCookie,
} from '../utils/cookies.js';
import userApi from '../api/index';

//import userInfo from '@/utils/userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: getUserFromCookie() || {},
		token: getAuthFromCookie() || '',
		userName: getUserFromCookie().userName || '',
	},
	getters: {
		isLogin(state) {
			if (state.userName != '' && state.userName != undefined) {
				return true;
			} else return false;
		},

		// getUserNickname(state) {
		// 	return state.userInfo.nickname;
		// },
	},
	mutations: {
		setUserInfo(state, user) {
			state.userInfo = user;
			state.userName = user.userName;
		},

		setToken(state, token) {
			state.token = token;
		},

		clearUserInfo(state) {
			state.userInfo = null;
			(state.token = ''), (state.userName = '');
			deleteCookie('auth');
			deleteCookie('user');
		},
	},

	actions: {
		async LOGIN({ commit }, userData) {
			const { data } = await userApi.userLogin(userData);
			commit('setUserInfo', data.user[0]);
			commit('setToken', data.token);

			if (!data.success) {
				this.sheet = true;
				this.logMaessage = data.message;
				return;
			}

			//set cookies
			saveAuthToCookie(data.token);
			saveUserToCookie(data.user[0]);

			return data.user[0];
		},
	},
});
