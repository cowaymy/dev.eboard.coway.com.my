//import axios from 'axios';
import bus from "@/utils/bus.js";
import performanceApi from "@/api/performanceApi.js";
import store from "@/store";
 
export default {
  namespaced: true,
  state: {
    dataItemLevel2List: [],
    dataItemLevel3List: [],
    dataItemLevel4List: [],
    dataNameItemLevel1List: [],
    dataNameItemNetSalesLevel1List: [],
    dataNameItemPMNetSalesLevel1List: [],
    dataNameItemPYNetSalesLevel1List: [],

    /*total netsales*/ 
    dataNameItemCTotalLevel1List: [],
    dataNameItemPMTotalLevel1List: [],
    dataNameItemPYTotalLevel1List: [],


    /* progress*/
    loading:true
  },
  getters: {},
  mutations: {

    SET_LOADING_DONE(state, val){
      state.loading =val;
    },

    SET_DATA_ITEM_LEVEL2_LIST(state, val) {
      state.dataItemLevel2List = val;
    },
    SET_DATA_ITEM_LEVEL3_LIST(state, val) {
      state.dataItemLevel3List = val;
    },
    SET_DATA_ITEM_LEVEL4_LIST(state, val) {
      state.dataItemLevel4List = val;
    },
    SET_DATA_NAME_LEVEL1_LIST(state, val) {
      state.dataNameItemLevel1List = val;
    },
    SET_DATA_NETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemNetSalesLevel1List = val;
    },
    SET_DATA_PMNETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemPMNetSalesLevel1List = val;
    },
    SET_DATA_PYNETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemPYNetSalesLevel1List = val;
    },
    SET_DATA_PCTOTAL_LEVEL1_LIST(state, val) {
      state.dataNameItemCTotalLevel1List = val;
    },
    SET_DATA_PMTOTAL_LEVEL1_LIST(state, val) {
      state.dataNameItemPMTotalLevel1List = val;
    },
    SET_DATA_PYTOTAL_LEVEL1_LIST(state, val) {
      state.dataNameItemPYTotalLevel1List = val;
    },



    SET_DATA_LEVEL2_CLEAR(state,val){
      state.dataItemLevel2List = val;
      state.dataItemLevel3List = val;
      state.dataItemLevel4List = val;
    }      
  
  },
  actions: {
    
    fetchRcHPLevel1({ commit }  ) {
      
      commit("SET_LOADING_DONE", true);
      const userInfo = store.state.userInfo;

      const userData = {}
      userData.memCode = userInfo.userName;
      userData.memId = userInfo.memId;
      userData.memberLevel = userInfo.memberLevel;
      userData.userName = userInfo.userName;
      userData.userTypeId = userInfo.userTypeId;
      userData.roleId = userInfo.roleId;
   
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchRcHPLevel1(userData) 
          .then((response) => {
            //let onlyValue =[];

            let cR =[];
            let pM =[];
            let pY =[];
            let cN =[];
            


            response.data.dataList.filter((e) => {
             
              cR.push(e.PCRC > 0 ? e.PCRC.toFixed(2):e.PCRC);
              cN.push(e.X_CODE);
              pM.push(e.PMRC  > 0 ? e.PMRC.toFixed(2):e.PMRC);
              pY.push(e.PYRC   > 0 ? e.PYRC.toFixed(2):e.PYRC);

            });

            commit("SET_DATA_NETSALES_LEVEL1_LIST", cR);
            commit("SET_DATA_PMNETSALES_LEVEL1_LIST", pM);
            commit("SET_DATA_PYNETSALES_LEVEL1_LIST", pY);
            commit("SET_DATA_NAME_LEVEL1_LIST", cN);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },


    fetchGetTotalRCHPLevel1({ commit }  ) {
   
      commit("SET_LOADING_DONE", true);
   
      const userInfo = store.state.userInfo;

      const userData = {}
      userData.memCode = userInfo.userName;
      userData.memId = userInfo.memId;
      userData.memberLevel = userInfo.memberLevel;
      userData.userName = userInfo.userName;
      userData.userTypeId = userInfo.userTypeId;
      userData.roleId = userInfo.roleId;


      return new Promise((resolve, reject) => {
        performanceApi
          .fetchRinkForTotRCHPData(userData)
          .then((response) => {
         
            let cT =[];
            let pM =[];
            let pY =[];
            
            response.data.dataList.filter((e) => {
                  cT.push(e.PC.toFixed(2));
                  pM.push(e.PM.toFixed(2));
                  pY.push(e.PY.toFixed(2));
                  //console.log(e)
            });

              commit("SET_DATA_PCTOTAL_LEVEL1_LIST", cT);
              commit("SET_DATA_PMTOTAL_LEVEL1_LIST", pM);
              commit("SET_DATA_PYTOTAL_LEVEL1_LIST", pY);
          
              resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },

    
    fetchGetNameLevel1({ commit }  ) {
      //start spinner
      bus.$emit("start:spinner");
      commit("SET_LOADING_DONE", true);
     //const userInfo = store.state.userInfo;
   
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchGetNameLevel1()
          .then((response) => {
            let onlyValue =[];
           
            onlyValue= Object.values(response.data.dataList[0]);

            commit("SET_DATA_NAME_LEVEL1_LIST", onlyValue);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },

    fetchLevel2Events(context  , ov) {

      const userInfo = store.state.userInfo;
      ov.memCode = userInfo.userName;
      ov.orgCode = context.state.dataNameItemLevel1List[ov.index];

      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_DATA_LEVEL2_CLEAR",[]);


      return new Promise((resolve, reject) => {
        bus.$emit("start:spinner");
    
      
        performanceApi
          .fetchRcHPLevel2(ov)
          .then((response) => {


            context.commit("SET_DATA_ITEM_LEVEL2_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },

    
    fetchLevel3Events({ commit } , item) {
      //start spinner
      bus.$emit("start:spinner");
      commit("SET_LOADING_DONE", true);
      const userInfo = store.state.userInfo;
      item.memCode =userInfo.userName;

      
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchRcHPLevel3(item)
          .then((response) => {

            commit("SET_DATA_ITEM_LEVEL3_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },

    fetchLevel4Events({ commit } , item) {
      //start spinner
      bus.$emit("start:spinner");
      commit("SET_LOADING_DONE", true);
         
      const userInfo = store.state.userInfo;
      item.memCode =userInfo.userName;

    
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchRcLevel4(item)
          .then((response) => {

            commit("SET_DATA_ITEM_LEVEL4_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },
  },
};
