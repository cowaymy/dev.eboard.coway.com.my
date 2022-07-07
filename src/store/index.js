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
			console.log(user);
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
			const result = await userApi.userLogin(userData);
			console.log('====>');
			console.log(result.data);
			console.log('====>');

			if (result.data.success) {
				commit('setUserInfo', result.data.user[0]);
				commit('setToken', result.data.token);

				//set cookies
				saveAuthToCookie(result.data.token);
				saveUserToCookie(result.data.user[0]);
			}

			return result.data;
		},
	},
});
