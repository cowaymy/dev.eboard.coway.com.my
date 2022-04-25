import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from '@/utils/userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
	state: { userInfo },
	getters: {
		isLogin(state) {
			if (
				state.userInfo.username != '' &&
				state.userInfo.username != undefined
			) {
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
		},

		clearUserInfo(state) {
			state.userInfo = null;
		},
	},
});
