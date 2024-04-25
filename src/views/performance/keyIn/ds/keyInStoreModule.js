//import axios from 'axios';
import bus from "@/utils/bus.js";
import performanceApi from "@/api/performanceApi.js";
import store from "@/store";
 
export default {
  namespaced: true,
  state: {
  
    dataItemCCPList: [],
    dataItemECASHList:[],
    dataItemCALLLOGList:[],
    dataItemCALLLOGNameList:[],
    dataItemCALLLOGORGList:[],
    dataItemINSTALLList:[],
    dataItemTotalKeyinList:[],

    /* TABLE*/ 
    dataKeyInOrderList:[],
    dataKeyInOrderListForCCP:[],
    keyInDataTableTitle:"",

    /* progress*/
    loading:false
  },
  getters: {},
  mutations: {

    SET_KEYIN_TABLE_TITLE(state, val){
      state.keyInDataTableTitle=val
    },

    SET_LOADING_DONE(state, val){
      state.loading =val;
    },

    SET_DATA_ITEM_CCP_LIST(state, val) {
        state.dataItemCCPList = val;
    },
    SET_DATA_ITEM_ECASH_LIST(state, val) {
        state.dataItemECASHList = val;
    },
    
    SET_DATA_ITEM_CALLLOG_LIST(state, val) {
      state.dataItemCALLLOGList = val;
    },

    SET_DATA_ITEM_CALLLOG_NAME_LIST(state, val) {
      state.dataItemCALLLOGNameList = val;
    },

    SET_DATA_ITEM_CALLLOG_ORG_LIST(state, val) {
      state.dataItemCALLLOGORGList = val;
    },
    
    SET_DATA_ITEM_INSTALLLIST(state, val) {
      state.dataItemINSTALLList = val;
    },

    SET_DATA_ITEM_TOTALKEYIN_LIST(state, val) {
      state.dataItemTotalKeyinList = val;
    },

    SET_DATA_KEYIN_ORDER_LIST(state, val) {
      state.dataKeyInOrderList = val;
    },

    


    
  },
  actions: {


    
    fetchKeyInOrderListForCCP(context  , ov ) {
      
      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_KEYIN_TABLE_TITLE", ov.title); 
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
          .fetchKeyInOrderListForCCP(userData)
          .then((response) => {

            let keyin =[];           
            keyin= response.data.dataList;

            context.commit("SET_DATA_KEYIN_ORDER_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },

    fetchKeyInOrderListForECASH(context  , ov ) {
      
      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_KEYIN_TABLE_TITLE", ov.title); 
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
          .fetchKeyInOrderListForECASH(userData)
          .then((response) => {

            let keyin =[];           
            keyin= response.data.dataList;

            context.commit("SET_DATA_KEYIN_ORDER_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },
    fetchKeyInOrderListForCALL(context  , ov ) {
      
      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_KEYIN_TABLE_TITLE", ov.title); 
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
          .fetchKeyInOrderListForCALL(userData)
          .then((response) => {

            let keyin =[];           
            keyin= response.data.dataList;

            context.commit("SET_DATA_KEYIN_ORDER_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },


    fetchKeyInOrderListForINSTALL(context  , ov ) {
      
      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_KEYIN_TABLE_TITLE", ov.title); 
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
          .fetchKeyInOrderListForINSTALL(userData)
          .then((response) => {

            let keyin =[];           
            keyin= response.data.dataList;

            context.commit("SET_DATA_KEYIN_ORDER_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },
    
    
    fetchKeyInOrderList(context  , ov ) {
      
      context.commit("SET_LOADING_DONE", true);
      context.commit("SET_KEYIN_TABLE_TITLE", ov.title); 
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
          .fetchKeyInOrderList(userData)
          .then((response) => {

            let keyin =[];           
            keyin= response.data.dataList;

            context.commit("SET_DATA_KEYIN_ORDER_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            context.commit("SET_LOADING_DONE", false);
          });
      });
    },


    

    fetchTotalKeyinReportData({ commit }  ) {
      
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
          .fetchTotalKeyinReportData(userData)
          .then((response) => {
            
            let keyin =[];           
            keyin= response.data.dataList[0];

            commit("SET_DATA_ITEM_TOTALKEYIN_LIST", keyin);
            
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            bus.$emit("end:spinner");
            commit("SET_LOADING_DONE", false);
          });
      });
    },

    fetchKeyinReportData({ commit }  ) {
      
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
            .fetchKeyinReportData(userData)
            .then((response) => {
              //let onlyValue =[];

              //[Individual.Active, Individual.Approved  ,Company.Active,Company.Approved ]
               let ccp   =[0,0,0,0];
               let ecash =[0,0,0];

               let call =[];
               let callName =[];
               let callORG =[];
               let ins =[];
            //   let pYNetSales =[];
            //   let cNameNetSales =[];
             response.data.dataList.filter((e) => {

                  if(e.TYPE =='CCP'){
                    if(e.CUST_TYPE =='Individual'){
                        if(e.NAME =='Active'){
                           ccp[0]=(e.VALUE);
                        }
                        if(e.NAME =='Approved'){
                            ccp[1]=(e.VALUE);
                        }
                    }else if(e.CUST_TYPE =='Company'){
                        if(e.NAME =='Active'){
                           ccp[2]=(e.VALUE);
                        }
                        if(e.NAME =='Approved'){
                            ccp[3]=(e.VALUE);
                        }
                    }
                  }
                  if(e.TYPE =='ECASH'){
                    //ategories: ['Inactive','Rejected','Completed'],
                      //let obj ={name:e.NAME , data:e.VALUE};
                      if(e.NAME =='Inactive')
                          ecash[0]=(e.VALUE);

                      if(e.NAME =='Rejected')
                          ecash[1]=(e.VALUE);
                   
                      
                      if(e.NAME =='Completed')
                          ecash[2]=(e.VALUE);
                  }
                  if(e.TYPE =='CALL'){
                    let obj ={name:e.NAME , data:e.VALUE};
                    call.push(e.VALUE);
                    callName.push(e.NAME);
                    callORG.push(obj)
                    //console.log(call)
                  }
                  if(e.TYPE =='INS'){
                    let obj ={name:e.NAME , data:e.VALUE};
                    ins.push(obj);
                  }
            
              });


  
               commit("SET_DATA_ITEM_CCP_LIST", ccp);
               commit("SET_DATA_ITEM_ECASH_LIST", ecash);
               commit("SET_DATA_ITEM_CALLLOG_LIST", call);
               commit("SET_DATA_ITEM_CALLLOG_NAME_LIST", callName);
               commit("SET_DATA_ITEM_CALLLOG_ORG_LIST", callORG);
               commit("SET_DATA_ITEM_INSTALLLIST", ins);
               
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
