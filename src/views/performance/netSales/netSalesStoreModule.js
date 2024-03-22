//import axios from 'axios';
import bus from "../../../utils/bus.js";
import performanceApi from "../../../api/performanceApi.js";

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
    dataNameItemCTotalNetSalesLevel1List: [],
    dataNameItemPMTotalNetSalesLevel1List: [],
    dataNameItemPYTotalNetSalesLevel1List: [],

  },
  getters: {},
  mutations: {
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
    SET_DATA_TOTALNETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemCTotalNetSalesLevel1List = val;
    },
    SET_DATA_PMTOTALNETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemPMTotalNetSalesLevel1List = val;
    },
    SET_DATA_PYTOTALNETSALES_LEVEL1_LIST(state, val) {
      state.dataNameItemPYTotalNetSalesLevel1List = val;
    },

    SET_DATA_LEVEL2_CLEAR(state,val){
      state.dataItemLevel2List = val;
      state.dataItemLevel3List = val;
      state.dataItemLevel4List = val;
    }      
  
  },
  actions: {
    
    fetchGetNestSalesLevel1({ commit }  ) {
      //start spinner
      bus.$emit("start:spinner");
     //const userInfo = store.state.userInfo;
   
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchGetNestSalesLevel1()
          .then((response) => {
            //let onlyValue =[];

            let cNetSales =[];
            let pMNetSales =[];
            let pYNetSales =[];
            let cNameNetSales =[];
            
            response.data.dataList.filter((e) => {

              cNetSales.push(e.NETSALES);
              cNameNetSales.push(e.ORG_CODE);

              pMNetSales.push(e.PM_NETSALES);
              pYNetSales.push(e.PY_NETSALES);

            });

            commit("SET_DATA_NETSALES_LEVEL1_LIST", cNetSales);
            commit("SET_DATA_PMNETSALES_LEVEL1_LIST", pMNetSales);
            commit("SET_DATA_PYNETSALES_LEVEL1_LIST", pYNetSales);
            commit("SET_DATA_NAME_LEVEL1_LIST", cNameNetSales);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },


    fetchGetTotalNestSalesLevel1({ commit }  ) {
      //start spinner
      bus.$emit("start:spinner");
     //const userInfo = store.state.userInfo;
   
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchGetTotalNestSalesLevel1()
          .then((response) => {
         
            let cTotalNetSales =[];
            let pMTotalNetSales =[];
            let pYTotalNetSales =[];
            
            response.data.dataList.filter((e) => {
                  cTotalNetSales.push(e.CN_CNT);
                  pMTotalNetSales.push(e.PM_CNT);
                  pYTotalNetSales.push(e.PY_CNT);
                  console.log(e)
            });

              commit("SET_DATA_TOTALNETSALES_LEVEL1_LIST", cTotalNetSales);
              commit("SET_DATA_PMTOTALNETSALES_LEVEL1_LIST", pMTotalNetSales);
              commit("SET_DATA_PYTOTALNETSALES_LEVEL1_LIST", pYTotalNetSales);
          
              resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    
    fetchGetNameLevel1({ commit }  ) {
      //start spinner
      bus.$emit("start:spinner");
     //const userInfo = store.state.userInfo;
   
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchGetNameLevel1()
          .then((response) => {
            let onlyValue =[];
           
            onlyValue= Object.values(response.data.dataList[0]);

            console.log(onlyValue)
           // commit("SET_DATA_NAME_LEVEL1_LIST", onlyValue);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchLevel2Events(context  , ov) {
      //start spinner
      const userInfo = store.state.userInfo;
      ov.memCode = userInfo.userName;
      ov.orgCode = context.state.dataNameItemLevel1List[ov.index];

      context.commit("SET_DATA_LEVEL2_CLEAR",[]);


      return new Promise((resolve, reject) => {
        bus.$emit("start:spinner");
    
      
        performanceApi
          .fetchNetSalesLevel2(ov)
          .then((response) => {

            console.log(response.data)
            context.commit("SET_DATA_ITEM_LEVEL2_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    
    fetchLevel3Events({ commit } , item) {
      //start spinner
      bus.$emit("start:spinner");
    
      const userInfo = store.state.userInfo;
      item.memCode =userInfo.userName;

      
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchNetSalesLevel3(item)
          .then((response) => {

            console.log(response.data)
            commit("SET_DATA_ITEM_LEVEL3_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },

    fetchLevel4Events({ commit } , item) {
      //start spinner
      bus.$emit("start:spinner");

         
      const userInfo = store.state.userInfo;
      item.memCode =userInfo.userName;

    
      return new Promise((resolve, reject) => {
        performanceApi
          .fetchNetSalesLevel4(item)
          .then((response) => {

            console.log(response.data)
            commit("SET_DATA_ITEM_LEVEL4_LIST", response.data.dataList);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
          });
      });
    },
  },
};
