import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  deleteCookie,
} from "../utils/cookies.js";
import userApi from "../api/index";
import store from "@/store";

//import userInfo from '@/utils/userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: getUserFromCookie() || {},
    token: getAuthFromCookie() || "",
    userName: getUserFromCookie().userName || "",
    memuList :[],
    userMainHome:"",
    isConnectServer:false,
  },
  getters: {
    isLogin(state) {
      if (state.userName != "" && state.userName != undefined) {
        return true;
      } else return false;
    },

    // getUserNickname(state) {
    // 	return state.userInfo.nickname;
    // },
  },
  mutations: {

    SET_CONNECT_SERVER(state, val){
      state.isConnectServer = val;
    },

    setUserInfo(state, user) {
      state.userInfo = user;
      state.userName = user.userName;
    },

    setToken(state, token) {
      state.token = token;
    },
    

    clearUserInfo(state) {
      state.userInfo = null;
      (state.token = ""), (state.userName = "");
      deleteCookie("auth");
      deleteCookie("user");
      state.newNotifiCnt = 0;
    },

    setUserMainHome(state, value){
      state.userMainHome=value;
    },

    setMemuList (state, list){

      var temp =[];
      list.data.dataList.map((mysqlObj) => {
        var t = {
          text: mysqlObj.text,
          connect_by_order: mysqlObj.connect_by_order,
          sublinks: [],
        };

        if (mysqlObj.sublinks == "") {
          temp.push(t);
        } else {
          for (var i in temp) {
            if (temp[i].connect_by_order == mysqlObj.connect_by_order) {
              temp[i].sublinks.push(mysqlObj);
            }
          }
        }
      });

      state.memuList = temp;
    }
  },

  actions: {

    setServerConnectState({ commit }, val){
        commit("SET_CONNECT_SERVER", val);
    },


    async SET_USER_MAIN_HOME({ commit }, val){
      commit("setUserMainHome", val);
    },

    async LOGIN({ commit }, userData) {
      const result = await userApi.userLogin(userData);
      
      if (result.data.success) {
        commit("setUserInfo", result.data.user[0]);
        commit("setToken", result.data.token);

        //set cookies
        saveAuthToCookie(result.data.token);
        saveUserToCookie(result.data.user[0]);
      }

      return result.data;
    },

    
    async getMemuList({ commit }) {
      const userInfo = store.state.userInfo;
  
      return new Promise((resolve, reject) => {
        userApi
          .getMenuList(userInfo)
          .then((response) => {
            commit("setMemuList",response);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
          });
      });

    },
  },
});
