//import axios from 'axios';
import bus from "@/utils/bus.js";
import performanceApi from "@/api/performanceApi.js";
import store from "@/store";
 
export default {
  namespaced: true,
  state: {
  
    /* progress*/
    loading:false
  },
  getters: {},
  mutations: {

    SET_LOADING_DONE(state, val){
      state.loading =val;
    },

  
  },
  actions: {
    
  },
};
