//import axios from 'axios';
import bus from "@/utils/bus.js";
import quotationApi from "@/api/quotationApi.js";
import indexApi from "@/api/index.js";

import store from "@/store";
import dataList from './datalist'
 
export default {
  namespaced: true,
  state: {
    isHomecareProduct:false, 

    /* e-key in data */
    eCustomerAddressJsonList:[],      //Installation Address & Information
    eCustAddJson:null,                // Installation Address
    eCustCntcJsonInfo:null,           //Contact Person information
    isExistSofNo:true,

    etrustCustInfoMsg:"Get customer info & provide better promotions",
    etrustCustInfo:null,
    selectedProdct:null,
    productPromotionPriceByPromoStock:null, 
    productAuxPromotionPriceByPromoStock:null, 
    selectAuxStockPriceJsonInfo:null,
    selectStockPackagePriceInfo: null,


    
    selectedBranchList:[],
    prodctOfCategory:[],
    prodctOfLists:[],
    appTypeList:[],
    pacakgeList:[],
    promotionList:[],
    
    custBankAccList:[],
    custCreaditCardList:[],
    preOrderList:[],


    /*aux product for homecare*/
    auxProductofList:[],
    auxPromotionList:[],


    isRentalType:true,
    isExistCust:false,    
    
    checkCustNRIC:null,

    /**quotation info*/
    quotationNo:'',
    appQuantity: 1,

    issuedDate: '',
    dueDate: '',
    appType:'',
    appTypeDesc:'',
    appPackage:'',
    appPackageDesc:'',
    appPromotion:'',
    appPromotionDesc:'',

    appAuxProduct :'',
    appAuxProductDesc :'',
    appAuxProductPromotion:'',
    appAuxProductPromotionDesc :'',


    appSubTotal:0,
    appSubTotalDesc:'',
    appOrderTotal:0,
    appDiscount:0,
    appCustName:'',
    appCustEmail:'',
    appCustMobile:'',
    appCustType:'',
    appCustId :'',
    appNote:'',
    appThanksNote:'',
    appSalespersonName:'',

    /* progress*/
    loading:false,
    selectCustomerLoding:false,
    needsRegNewCustmer:false,


    hcEkeyinDataList :[], 
    haEkeyinDataList :[],

  },
  getters: {
    // GET_STOCK_PACKAGE_PRICE(state){
    //     return state.selectStockPackagePriceInfo;
    // }
  },
  mutations: {

        SET_HAEKEYIN_LIST(state, val){
            state.haEkeyinDataList =val;
        },

        
        SET_HCEKEYIN_LIST(state, val){
            state.hcEkeyinDataList =val;
        },

        SET_BRANCH_LIST(state, val){
            state.selectedBranchList =val;
        },

        SET_EXIST_SOF_NO(state, val){
            state.isExistSofNo =val;
        },

        SET_CUST_ADDRESS_LIST(state, val){
            state.eCustomerAddressJsonList =val;
        },

        SET_CUST_MAIN_ADDRESS_INFO(state, val){
            state.eCustAddJson =val;
        },

        SET_CUST_CONTACT_INFO(state, val){
            state.eCustCntcJsonInfo =val;
        },

        SET_CUST_BANK_ACC_LIST(state, val){
            state.custBankAccList =val;
        },

        SET_CUST_CREADIT_CARD_LIST(state, val){
            state.custCreaditCardList =val;
        },


        SET_IS_EXIST_CUST(state, val){
            state.isExistCust =val;
        },

        SET_NEEDS_REGCUST(state, val){
            state.needsRegNewCustmer =val;
        },

        SET_ETRUST_CUST_INFO(state, val){
            state.etrustCustInfo =val;
        },

        SET_ETRUST_CUST_MSG(state, val){
            state.etrustCustInfoMsg =val;
        },
        

        SET_APPTYPE_LIST(state, val){
            state.appTypeList =val;
        },

        SET_PROMOTION_LIST(state, val){
            state.promotionList =val;
        },

        SET_PROMOTION_PRICE_BY_STOCK(state, val){
            state.productPromotionPriceByPromoStock =val;
        },

        SET_AUX_PROMOTION_PRICE_BY_STOCK(state, val){
            state.productAuxPromotionPriceByPromoStock =val;
        },

        SET_AUX_STOCK_PRICE_INFO(state, val){
            state.selectAuxStockPriceJsonInfo =val;
        },

        

        SET_STOCK_PACKAGE_PRICE(state, val){
            state.selectStockPackagePriceInfo =val;
        },
        

        SET_PACKAGE_LIST(state, val){
            state.pacakgeList =val;
        },

        SET_LOADING_DONE(state, val){
             state.loading =val;
        },

        SET_PRODCT_LIST(state, val){
            state.prodctOfLists =val;
        },

        SET_SELECTED_ITEM(state, val){

            //console.log(" SET_SELECTED_ITEM ::: ",val);
            let homecareProct= [5706 ,5707 ,7237 ,7241,7177,7233,7240];

            if(homecareProct.includes(val.CODE_ID)){
                state.isHomecareProduct=true;
            }else{
                state.isHomecareProduct=false;
            }


            //console.log(" SET_SELECTED_ITEM ::: ",homecareProct.includes(val.CATEGORY));

            state.selectedProdct=val;
        },

        SET_PRODCT_CATEGORY_LIST(state, val){
            state.isHomecareProduct=false;
            state.prodctOfCategory =val;
        },

        SET_IS_RENTAL(state, val){
            state.isRentalType =val;
        },

        SET_ACTIVE_STEP2_ITEM(state, val){
            state.appType =val.appType;
            state.appTypeDesc=val.appTypeDesc;
            state.appPackage=val.appPackage;
            state.appPackageDesc=val.appPackageDesc;
            state.appPromotion=val.appPromotion;
            state.appPromotionDesc=val.appPromotionDesc;
            state.appSubTotal=val.appSubTotal;
            state.appOrderTotal=val.appOrderTotal;
            state.appDiscount=val.appDiscount;

            /* homecare*/
            state.appAuxProduct =val.appAuxProduct;
            state.appAuxProductDesc =val.appAuxProductDesc;
            state.appAuxProductPromotion=val.appAuxProductPromotion;
            state.appAuxProductPromotionDesc =val.appAuxProductPromotionDesc;

        },

        SET_ACTIVE_STEP3_ITEM(state, val){
            state.appCustName =val.appCustName,
            state.appCustEmail=val.appCustEmail,
            state.appCustMobile=val.appCustMobile,
            state.appCustType=val.appCustType,
            state.appCustId  =val.appCustId
        },

        SET_CLEAR_QUOTA_ITEM(state){
            state.isHomecareProduct=false, 
            /* e-key in data */
            state.eCustomerAddressJsonList=[],      //Installation Address & Information
            state.eCustAddJson=null,                // Installation Address
            state.eCustCntcJsonInfo=null,           //Contact Person information
            state.isExistSofNo=true,

            state.etrustCustInfoMsg="Get customer info & provide better promotions",
            state.etrustCustInfo=null,
            state.selectedProdct=null,
            state.productPromotionPriceByPromoStock=null, 
            state.selectStockPackagePriceInfo= null,


            
            state.selectedBranchList=[],
            state.prodctOfLists=[],
            state.pacakgeList=[],
            state.promotionList=[],
            
            state.custBankAccList=[],
            state.custCreaditCardList=[],
            state.preOrderList=[],


            /*aux product for homecare*/
            state.auxProductofList=[],
            state.auxPromotionList=[],


            state.isRentalType=true,
            state.isExistCust=false,    
            
            state.checkCustNRIC=null,

            /**quotation info*/
            state.quotationNo='',
            state.appQuantity= 1,

            state.appType='',
            state.appTypeDesc='',
            state.appPackage='',
            state.appPackageDesc='',
            state.appPromotion='',
            state.appPromotionDesc='',
            /* homecare*/
            state.appAuxProduct ='';
            state.appAuxProductDesc ='';
            state.appAuxProductPromotion=''
            state.appAuxProductPromotionDesc ='';

            state.appSubTotal=0,
            state.appSubTotalDesc='',
            state.appOrderTotal=0,
            state.appDiscount=0,
            state.appCustName='',
            state.appCustEmail='',
            state.appCustMobile='',
            state.appCustType='',
            state.appCustId ='',
            state.appNote='',
            state.appSalespersonName='',

            /* progress*/
            state.loading=true,
            state.selectCustomerLoding=false,
            state.needsRegNewCustmer=false
        },

        SET_PRE_ORD_LIST(state,val){
            state.preOrderList=val;
        },

        SET_AUX_PRODCT_LIST(state,val){
            state.auxProductofList=val;
        },

        SET_AUX_PROMTION_LIST(state,val){
            state.auxPromotionList=val;
        },
        
        
        
  },
  actions: {


        /**
         * 
         * @param {*} context 
         */
        setAppTypeList(context ){

            let obj =[
                {value:"66", text :"Rental"},
                {value:"67", text :"Outright"},
            ]
            context.commit("SET_APPTYPE_LIST", obj);
        },


        selectCustomerCreditCardJsonList(context , param){

            context.commit("SET_LOADING_DONE", true);

            const  userData = {   callPrgm        :param.callPrgm
                                , custId          :param.custId
                                , searchWord      :param.searchWord
             }

            //console.log(userData);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustomerCreditCardJsonList(userData) 
                .then((response) => {
                    context.commit("SET_CUST_CREADIT_CARD_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });

        },

        
        /**
         * 
         */
        selectCustomerBankAccJsonList(context , param){

            context.commit("SET_LOADING_DONE", true);

            const  userData = {   callPrgm        :param.callPrgm
                                , custId          :param.custId
                                , searchWord      :param.searchWord
             }

            //console.log(userData);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustomerBankAccJsonList(userData) 
                .then((response) => {


                   //console.log("selectCustomerBankAccJsonList", response.data.dataList)
                    context.commit("SET_CUST_BANK_ACC_LIST", response.data.dataList);

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });

        },

        /**
         * 
         * @param {*} context 
         * @param {*} code 
         * @returns 
         */
        setPromotionList(context , param){

            context.commit("SET_LOADING_DONE", true);

            context.commit("SET_PROMOTION_LIST", []); 
            context.commit("SET_PROMOTION_PRICE_BY_STOCK", null);
            context.state.appSubTotalDesc ='';
            context.state.appSubTotal=0;
            context.state.appOrderTotal=0;


           //console.log('setPromotionList param ::::',param)

            const isExistCust = context.state.isExistCust;

            //console.log(isExistCust);
            const  userData = {   appTypeId      :param.appType
                                , srvPacId       :param.appPacakgeId
                                , stkId          :context.state.selectedProdct.STK_ID
                                , isSrvPac       :'Y' 
                                , exTrade        :0
                                , empChk         :0 
                                , voucherPromotion:0
                                , promoCustType   : isExistCust == true ? context.state.etrustCustInfo.TYPE_ID : context.state.appCustType
                                , custStatus      : isExistCust ? context.state.etrustCustInfo.CUST_STATUS_ID : '7465'
             }

            //console.log(userData);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectPromotionByAppTypeStockESales(userData) 
                .then((response) => {


                    //console.log(response.data.dataList)
                    context.commit("SET_PROMOTION_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },



         /**
         * 
         * @param {*} context 
         * @param {*} code 
         * @returns 
         */
         setAuxPromotionList(context , param){

            context.commit("SET_LOADING_DONE", true);

            context.commit("SET_AUX_PROMTION_LIST", []); 
            // context.state.appSubTotalDesc ='';
            // context.state.appSubTotal=0;
            // context.state.appOrderTotal=0;


            const isExistCust = context.state.isExistCust;

            //console.log(isExistCust);
            const  userData = {   appTypeId      :param.appType
                                , srvPacId       :param.appPacakgeId
                                , stkId          :param.stkId =='' ? context.state.selectedProdct.STK_ID :param.stkId
                                , isSrvPac       :'Y' 
                                , exTrade        :0
                                , empChk         :0 
                                , voucherPromotion:0
                                , promoCustType   : isExistCust == true ? context.state.etrustCustInfo.TYPE_ID : context.state.appCustType
                                , custStatus      : isExistCust ? context.state.etrustCustInfo.CUST_STATUS_ID : '7465'
             }

            //console.log(userData);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectPromotionByAppTypeStockESales(userData) 
                .then((response) => {

                    context.commit("SET_AUX_PROMTION_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


         /**
         * 
         * @param {*} context 
         * @param {*} code 
         * @returns 
         */
         selectProductPromotionPriceByPromoStockID(context , param){

            context.commit("SET_LOADING_DONE", true);

            context.state.productPromotionPriceByPromoStock =null;

            const  userData = {   promoId        :param.appPromoId
                                , srvPacId       :param.appType == 66 ? param.appPacakgeId : 0
                                , stkId          :context.state.selectedProdct.STK_ID
             }

            //console.log(userData);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectProductPromotionPriceByPromoStockID(userData) 
                .then((response) => {
                    console.log("selectProductPromotionPriceByPromoStockID", response.data.dataList)

                    if(response.data.dataList){
                        context.state.appOrderTotal = response.data.dataList.orderRentalFeesPromo
                        context.state.appSubTotal   = response.data.dataList.orderRentalFeesPromo

                        if(param.appType ==66){
                            context.state.appSubTotalDesc = `RM ${response.data.dataList.orderRentalFeesPromo} /month`;
                        }else{
                            context.state.appSubTotalDesc = `RM ${response.data.dataList.orderRentalFeesPromo}` 
                        }
                    }

                    context.commit("SET_PROMOTION_PRICE_BY_STOCK", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },



        /**
         * 
         * @param {*} context 
         * @param {*} code 
         * @returns 
         */
        selectAuxProductPromotionPriceByPromoStockID(context , param){

            context.commit("SET_LOADING_DONE", true);


            // main 프로모션 가격을 가져오기 위함. 
            //context.state.productPromotionPriceByPromoStock =null;

            const  userData = {   promoId        :param.appPromoId
                                , srvPacId       :param.appType == 66 ? param.appPacakgeId : 0
                                , stkId          :param.appStkId 
            }

            let promoAmt  = context.state.productPromotionPriceByPromoStock.orderRentalFeesPromo;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectProductPromotionPriceByPromoStockID(userData) 
                .then((response) => {
                    //console.log("selectProductPromotionPriceByPromoStockID", response.data.dataList)

                    if(response.data.dataList){


                        let price=0;
                            price =parseFloat(promoAmt)   + parseFloat(response.data.dataList.orderRentalFeesPromo);
                  
                        if(param.appType ==66){
                            context.state.appSubTotalDesc = `RM ${price.toFixed(2)} /month`;
                        }else{
                            context.state.appSubTotalDesc = `RM ${price.toFixed(2)}` 
                        }

                        context.state.appOrderTotal  = price.toFixed(2)
                        context.state.appSubTotal    = price.toFixed(2);
                    }

                    context.commit("SET_AUX_PROMOTION_PRICE_BY_STOCK", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


        

        /**
         * 
         * @param {*} context 
         * @param {*} isRental 
         * @returns 
         */
        setRentalType(context , isRental ) {

            
            context.state.appSubTotalDesc ='';
            context.state.appSubTotal=0;
            context.state.appOrderTotal=0;

            context.commit("SET_LOADING_DONE", true);
            context.commit("SET_IS_RENTAL", isRental);
            
            context.commit("SET_PROMOTION_LIST", [] );  
            context.commit("SET_PACKAGE_LIST", []);
            context.commit("SET_PROMOTION_PRICE_BY_STOCK", null);            
            //console.log('isRental::::',isRental)

            const userData = {}

           // console.log(context.state.selectedProdct)
            userData.itemId = context.state.selectedProdct.STK_ID;
            userData.appType = isRental;

           // console.log('userData::::',userData)
            
            return new Promise((resolve, reject) => {
                quotationApi
                .selectServicePackageList(userData) 
                .then((response) => {

                    //console.log('SET_PACKAGE_LIST::', response.data.dataList);
                    context.commit("SET_PACKAGE_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        /**
         * 
         * @param {*} context 
         * @param {*} item 
         */
        selectedItemInfo(context , item ) {
            //console.log("selectedItemInfo===>",item);
            context.commit("SET_SELECTED_ITEM", item);
        },

        /**
         * 
         * @param {*} context 
         * @param {*} item 
         */
        setActiveSetp2ItemInfo(context , item ){
           // console.log(item);
            context.commit("SET_ACTIVE_STEP2_ITEM", item);
        },

        /**
         * 
         * @param {*} context 
         * @param {*} item 
         */
        setActiveSetp3ItemInfo(context , item ){
            //console.log(item);
            context.commit("SET_ACTIVE_STEP3_ITEM", item);
        },

        /**
         * 
         * @param {*} context 
         * @param {*} item 
         */
        setClearQuotaItem(context , item ){
            //console.log(item);
            context.commit("SET_CLEAR_QUOTA_ITEM");
        },


        

        /**
         * 
         */
        selectExistSofNo(context,params){

            context.commit("SET_LOADING_DONE", true);

            const userData = {}
            userData.sofNo = params.sofNo;
            userData.selType = '1';

            
            context.state.isExistSofNo=true;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectExistSofNo(userData) 
                .then((response) => {


                    //console.log(response)
                    if( response.data.dataList.isExist =='false'){
                        context.commit("SET_EXIST_SOF_NO", false);
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
        /**
         * 
         */
        selectBranchCode(context){
            context.commit("SET_LOADING_DONE", true);

            return new Promise((resolve, reject) => {
                indexApi
                .selectBranchCode({}) 
                .then((response) => {

                    context.commit("SET_BRANCH_LIST", response.data.data);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


        checkProductSize(context,userData){
            context.commit("SET_LOADING_DONE", true);

            return new Promise((resolve, reject) => {
                quotationApi
                .checkProductSize(userData) 
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },
        


        /**
         * 
         */
        selectCustCntcJsonInfo(context,id){
            
            const userData = {}
            userData.custCntcId =id //id;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustCntcJsonInfo(userData) 
                .then((response) => {

                    //console.log(response)
                    context.commit("SET_CUST_CONTACT_INFO", response.data.dataList);

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        selectCustAddJsonInfo(context,payload){
            const userData = {}
            userData.custAddId  = payload.custAddId;
            userData.isHomecare = payload.isHomecare;
            userData.isAC       = payload.isAC;
            
            console.log("selectCustAddJsonInfo ::::")

            console.log(payload)


            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustAddJsonInfo(userData) 
                .then((response) => {
                    context.commit("SET_CUST_MAIN_ADDRESS_INFO", response.data.dataList);
                    resolve(response);
                })  
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        selectCustomerAddressJsonList(context ,id){
            const userData = {}
            userData.callPrgm = 'PRE_ORD_INST_ADD';
            userData.custId = id;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustomerAddressJsonList(userData) 
                .then((response) => {

                    //console.log(response)
                    context.commit("SET_CUST_ADDRESS_LIST", response.data.dataList);

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        /**
         * 
         * @param {*} context 
         * @param {*} param 
         * @returns 
         */
        selectCustomerJsonList(context , param ){
            context.commit("SET_LOADING_DONE", true);
            //console.log('param::::',param);

            context.commit("SET_IS_EXIST_CUST"  , false ); 
            context.commit("SET_NEEDS_REGCUST"  , false );   
            context.state.etrustCustInfo=null;

            const userData = {}
            userData.nric = param.nric;
            context.state.checkCustNRIC =param.nric;
            context.state.selectCustomerLoding =true; 
            
            //console.log('userData::::',userData)

            return new Promise((resolve, reject) => {
                quotationApi
                .selectCustomerJsonList(userData) 
                .then((response) => {


                    console.log(response)
                    if(response.data.dataList.length ==0){
                        context.commit("SET_ETRUST_CUST_MSG" ,'Customer information does not exist.' );
                        context.commit("SET_IS_EXIST_CUST"  , false );        
                        context.commit("SET_NEEDS_REGCUST"  , true );      
                    }else{
                        context.commit("SET_ETRUST_CUST_INFO" ,response.data.dataList[0] );
                        context.commit("SET_IS_EXIST_CUST"  , true ); 

                        console.log("::::selectCustomerJsonList::::" , response.data.dataList[0])  

                        let payload ={};
                        payload.custAddId = response.data.dataList[0].CUST_ADD_ID;

                        context.dispatch("selectCustCntcJsonInfo",response.data.dataList[0].CUST_ID );
                        context.dispatch("selectCustAddJsonInfo",payload);
                        context.dispatch("selectCustomerAddressJsonList",response.data.dataList[0].CUST_ID );
                    }

                    context.commit("SET_ETRUST_CUST_INFO" ,response.data.dataList[0] );

                    context.state.selectCustomerLoding =false; 

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },
        

        /**
         * 
         * @param {*} context 
         * @param {*} param 
         * @returns 
         */
        selectStockPackagePriceInfo(context , param ){

            context.commit("SET_LOADING_DONE", true);
            //console.log('param::::',param)

            const userData = {}

            console.log(param, param.stkId)
            console.log(context.state.selectedProdct.STK_ID )

            if(param.stkId){
                userData.itemId =param.stkId;
            }else {
                userData.itemId =context.state.selectedProdct.STK_ID ;
            }
            
            userData.appType = param.appType;
            userData.appPacakgeId = param.appPacakgeId;

           // console.log('userData::::',userData)

            context.state.appSubTotalDesc ='';
            context.state.appSubTotal=0;



            context.state.selectStockPackagePriceInfo=null;
                        
            return new Promise((resolve, reject) => {
                quotationApi
                .selectStockPackagePriceInfo(userData) 
                .then((response) => {

                    //context.state.appSubTotal=102;

                    let Price = response.data.dataList[0].NORMAL_PRICE;

                    if(param.appType==66){
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)} /month`;
                    }else {
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)}`;
                    } 
                    
                    //set NORMAL_PRICE 
                    context.state.appSubTotal=Price.toFixed(2);
                    context.state.appOrderTotal =Price.toFixed(2);

                    console.log("SET_STOCK_PACKAGE_PRICE====>",response.data.dataList[0]);
                    context.commit("SET_STOCK_PACKAGE_PRICE", response.data.dataList[0]);


                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


        /**
         * 
         * @param {*} context 
         * @param {*} param 
         * @returns 
         */
        selectHomecareStockPackagePriceInfo(context , param ){

            context.commit("SET_LOADING_DONE", true);
            //console.log('param::::',param)

            const userData = {}

            console.log("selectedProdct ::",context.state.selectedProdct)
            userData.itemId =  context.state.selectedProdct.STK_ID;
            userData.appType = param.appType;
            userData.appPacakgeId = param.appPacakgeId;

           // console.log('userData::::',userData)

            context.state.appSubTotalDesc ='';
            context.state.appSubTotal=0;



            context.state.selectStockPackagePriceInfo=null;
                        
            return new Promise((resolve, reject) => {
                quotationApi
                .selectStockPackagePriceInfo(userData) 
                .then((response) => {

                    //context.state.appSubTotal=102;

                    let Price = 0;
                    if(response.data.dataList.normalRentalFees)Price = response.data.dataList.normalRentalFees;

                    if(param.appType==66){
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)} /month`;
                    }else {
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)}`;
                    } 
                    
                    //set NORMAL_PRICE 
                    context.state.appSubTotal=Price;


                    console.log("SET_STOCK_PACKAGE_PRICE::::",response);
                    context.commit("SET_STOCK_PACKAGE_PRICE", response.data.dataList);


                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


        /**
         * 
         * @param {*} context 
         * @param {*} param 
         * @returns 
         */
        selectAuxStockPriceJsonInfo(context , param ){

            context.commit("SET_LOADING_DONE", true);
            context.commit("SET_AUX_STOCK_PRICE_INFO", null);
            //console.log('param::::',param)

            const userData = {}

            //console.log(context.state.selectedProdct)
            userData.stkId =  param.stkId;
            userData.appTypeId = param.appType;
            userData.srvPacId = param.appPacakgeId;
             return new Promise((resolve, reject) => {
                quotationApi
                .selectAuxStockPriceJsonInfo(userData) 
                .then((response) => {
                   // console.log("response:::::",  response)

                    //console.log("selectStockPackagePriceInfo:::::",  context.state.selectStockPackagePriceInfo)

                    let subtotal  = context.state.productPromotionPriceByPromoStock.orderRentalFeesPromo;

                    //let subtotal =context.state.appSubTotal;
                    let Price = parseFloat(subtotal) + parseFloat(response.data.dataList.orderRentalFees);


                    console.log("=========================");
                    console.log("context.state.appSubTotal:::::",  context.state.appSubTotal)
                    console.log("=========================");

                    console.log("=========================");
                    console.log(":::::",  response.data.dataList.orderRentalFees)
                    console.log("=========================");

                    if(param.appType==66){
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)} /month`;
                    }else {
                        context.state.appSubTotalDesc = `RM ${Price.toFixed(2)}`;
                    } 
                    
                    //set NORMAL_PRICE 
                    context.state.appSubTotal=Price;
                    context.state.appOrderTotal =Price;

                    //console.log("selectAuxStockPriceJsonInfo:::", response.orderRentalFees)
                    context.commit("SET_AUX_STOCK_PRICE_INFO", response.data.dataList);
                    
                    resolve(response);

                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        /**
         * 
         * @param {*} param0 
         * @returns 
         */
        fetchCategoryList({ commit }  ) {

            commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const userData = {}
            userData.memCode = userInfo.userName;
            userData.memId = userInfo.memId;
            userData.memberLevel = userInfo.memberLevel;
            userData.userName = userInfo.userName;
            userData.userTypeId = userInfo.userTypeId;
            userData.roleId = userInfo.roleId;

            // const items= ['Water Purifier', 'Air Purifier', 'Bathroom' ,'Outdoor','Relax','Mattress','Cooling']; 

            // commit("SET_PRODCT_CATEGORY_LIST", items);

            
            return new Promise((resolve, reject) => {
                quotationApi
                .selectProductCategoryList(userData) 
                .then((response) => {
                     
                    //console.log(response.data.dataList)
                    commit("SET_PRODCT_CATEGORY_LIST", response.data.dataList);
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
         * @param {*} context 
         * @param {*} id 
         * @returns 
         */
        selectPrevOrderNoList(context){

            context.state.selectPrevOrderNoList =null;

            const userData = {}
            userData.isHomecare = '0';
            userData.custId = '1530820' //id;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectPrevOrderNoList(userData) 
                .then((response) => {

                   // console.log(response)
                    context.commit("SET_PRE_ORD_LIST", response.data.dataList);

                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },


        /**
         * 
         * @param {*} param0 
         * @param {*} _type 
         * @returns 
         */
        fetchProdctList({ commit }  , _type) {

            commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const paramData = {}
            paramData.stkCtgryId= _type;
            return new Promise((resolve, reject) => {
                quotationApi
                .selectProductList(paramData) 
                .then((response) => {
                    //console.log(response)

                    commit("SET_PRODCT_LIST", response.data.dataList);
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
         * @param {*} _type 
         * @returns 
         */
         fetchProdctListForHomecare({ commit }  , _type) {

            commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const paramData = {}
            paramData.stkCtgryId= _type;
            return new Promise((resolve, reject) => {
                quotationApi
                .selectProductListForHomecare(paramData) 
                .then((response) => {


                    //console.log("fetchProdctListForHomecare :::",response)
                    commit("SET_PRODCT_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    bus.$emit("end:spinner");
                    commit("SET_LOADING_DONE", false);
                });
            });
        },



        selectHcProductCodeList({ commit }  ,  obj) {
            commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const paramData = {}
            paramData.stkType= 1;
            paramData.srvPacId=obj.appPacakgeId;
            paramData.productType=2;


            return new Promise((resolve, reject) => {
                quotationApi
                .selectHcProductCodeList(paramData) 
                .then((response) => {
                    console.log("selectHcProductCodeList :::",response)
                    commit("SET_AUX_PRODCT_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    commit("SET_LOADING_DONE", false);
                });
            });
        },


        selectHcPreOrderList({ commit }  ,  obj) {
            commit("SET_LOADING_DONE", true);

            //commit.state.hcEkeyinDataList=[];

            return new Promise((resolve, reject) => {
                quotationApi
                .selectHcPreOrderList(obj) 
                .then((response) => {
                    //console.log("selectHcPreOrderList :::",dataList)
                    commit("SET_HCEKEYIN_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    commit("SET_LOADING_DONE", false);
                });
            });
        },

        selectHaPreOrderList({ commit }  ,  obj) {
            commit("SET_LOADING_DONE", true);

            return new Promise((resolve, reject) => {
                quotationApi
                .selectHaPreOrderList(obj) 
                .then((response) => {
                    //console.log("selectHaPreOrderList :::",dataList)
                    commit("SET_HAEKEYIN_LIST", response.data.dataList);
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
         * @returns 
         */
        checkIfIsAcInstallationProductCategoryCode( context ) {
            context.commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const paramData = {}
            paramData.stkId= context.state.selectedProdct.STK_ID;

            return new Promise((resolve, reject) => {
                quotationApi
                .checkIfIsAcInstallationProductCategoryCode(paramData) 
                .then((response) => {
                    //console.log("checkIfIsAcInstallationProductCategoryCode :::",response)
                    //commit("SET_AUX_PRODCT_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },

        /**
         * 
         * @param {*} param0 
         * @returns 
         */
        selectPromotionFreeGiftList( context , promoId) {
            context.commit("SET_LOADING_DONE", true);
            const userInfo = store.state.userInfo;

            const paramData = {}
            paramData.promoId= promoId;

            return new Promise((resolve, reject) => {
                quotationApi
                .selectPromotionFreeGiftList(paramData) 
                .then((response) => {
                    //console.log("selectPromotionFreeGiftList :::",response)
                    //commit("SET_AUX_PRODCT_LIST", response.data.dataList);
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    context.commit("SET_LOADING_DONE", false);
                });
            });
        },
    }
};
