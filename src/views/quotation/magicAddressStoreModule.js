//import axios from 'axios';
import bus from "@/utils/bus.js";
import quotationApi from "@/api/quotationApi.js";
import store from "@/store";


export default {
    namespaced: true,
    state: {

        searchAreaDataList:[],
        stateDataList:[],
        cityDataList:[],
        postCodeDataList:[],
        areaDataList:[],


        selectCodeList_20:[],
        selectDdlChnlDataList:[],
        selectAccBankDataList:[],

        selectCrcBankDataList:[],
        selectCrcTypeDataList:[],
        selectCrcCardTypeDataList:[],
        selectCardToken:'',



        /* progress*/
        loading:true
    },
    getters: {},
    mutations: {
 
        SET_LOADING_DONE(state, val){
            state.loading =val;
        },

        SET_STATE_LIST(state, val){
            state.stateDataList =val;
        },


        SET_CITY_LIST(state, val){
            state.cityDataList =val;
        },

        SET_SEARCH_AREA_LIST(state, val){
            state.searchAreaDataList =val;
        },


        SET_POSTCODE_LIST(state, val){
            state.postCodeDataList =val;
        },

        SET_AREA_LIST(state, val){
            state.areaDataList =val;
        },

        SET_DDLCHNL_LIST(state, val){
            state.selectDdlChnlDataList =val;
        },

        SET_ACC_BANK_LIST(state, val){
            state.selectAccBankDataList =val;
        },



        SET_CRC_BANK_LIST(state, val){
            state.selectCrcBankDataList =val;
        },


        SET_TOKEN_INFO(state, val){

            // console.log(val)
            // console.log(val.bin)
            // console.log(val.cclast4)

            // state.selectCustCardNoCombin =val.bin + "******" + val.cclast4;
            // state.selectCardTokenId = val.token;
            // state.selectCardExpr=val.expr;
        },
        
        
        

        SET_CODE_LIST(state,  val){
            console.log(val)
            
            switch (val.type) {
                case 20:
                    console.log(val)
                    state.selectCodeList_20 =val.dataList;
                  break;

                case 21:
                    state.selectCrcTypeDataList =val.dataList;
                  break;

                case 115:
                    state.selectCrcCardTypeDataList =val.dataList;
                  break;

                default:
                  console.log('Unknown fruit.');
                  break;
            }
        },
    },



    actions: {

        selectCodeList({ commit }  , code ){

            commit("SET_LOADING_DONE", true);

            const params ={groupCode:code};
            return new Promise((resolve, reject) => {
                quotationApi
                .selectCodeList(params) 
                .then((response) => {
                    console.log(response.data.dataList)
                    const dataList = response.data.dataList;
                    console.log(" data:::::" , dataList)

                    const  o  ={type:code , dataList: dataList};

                    commit("SET_CODE_LIST", o );
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                  commit("SET_LOADING_DONE", false);
                });
            });
        },


        
        selectCrcBankDataList({ commit }  ){
            commit("SET_LOADING_DONE", true);
            const params ={groupCode:'' };

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCrcBankDataList (params) 
                .then((response) => {
                    commit("SET_CRC_BANK_LIST", response.data.dataList );
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                     commit("SET_LOADING_DONE", false);
                });
            });
        },

        selectDdlChnlDataList({ commit }  ){
            commit("SET_LOADING_DONE", true);
            const params ={isAllowForDd:1 };

            return new Promise((resolve, reject) => {
                quotationApi
                .selectDdlChnlDataList (params) 
                .then((response) => {
                    commit("SET_DDLCHNL_LIST", response.data.dataList );
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                     commit("SET_LOADING_DONE", false);
                });
            });
        },


        selectAccBankDataList({ commit } ,  obj ){
            commit("SET_LOADING_DONE", true);
            const params ={isAllowForDd:1  ,ddlChnl: obj.ddlChnl};

            return new Promise((resolve, reject) => {
                quotationApi
                .selectAccBankDataList (params) 
                .then((response) => {
                    commit("SET_ACC_BANK_LIST", response.data.dataList );
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    commit("SET_LOADING_DONE", false);
                });
            });
        },

        /**
         * 
         * @param {*} param0 
         * @param {*} obj 
         */
        searchMagicAddressPopJsonList({ commit }  , obj) {

            commit("SET_LOADING_DONE", true);

            const prams ={
                searchStreet: obj.searchStreet,
                state: obj.state,
                city: obj.city,
                postCode: obj.postCode
            }

            return new Promise((resolve, reject) => {
                quotationApi
                .searchMagicAddressPopJsonList(prams) 
                .then((response) => {
                     
                    commit("SET_SEARCH_AREA_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    commit("SET_LOADING_DONE", false);
                });
            });
        },


         /**
         * 
         * @param {*} param0 
         * @returns 
         */
         selectMagicAddressComboList( context   , obj) {

            context.commit("SET_LOADING_DONE", true);

            const prams ={
                searchStreet: obj.searchStreet,
                state: obj.state,
                city: obj.city,
                postCode: obj.postCode
            }

            return new Promise((resolve, reject) => {
                quotationApi
                .selectMagicAddressComboList(prams) 
                .then((response) => {
                     
                    if(obj.type ==="STATE"){
                        context.commit("SET_STATE_LIST", response.data.dataList);
                
                        context.state.cityDataList =[];
                        context.state.postCodeDataList =[];
                        context.state.areaDataList =[];
                      
                    }else if(obj.type ==='CITY'){
                        context.commit("SET_CITY_LIST", response.data.dataList);
                        context.state.postCodeDataList =[];
                        context.state.areaDataList =[];

                    }else if(obj.type ==='POSTCODE'){
                        context.commit("SET_POSTCODE_LIST", response.data.dataList);
                        context.state.areaDataList =[];

                    }else if(obj.type ==='AREA'){

                        console.log('area:::' , response.data.dataList)
                        context.commit("SET_AREA_LIST", response.data.dataList);
                    }




                    

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },
    },    
}  