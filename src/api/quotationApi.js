import { createInstance  } from "./interceptors";



const newInstance = createInstance();

function selectProductCategoryList(data) {
    return newInstance.get("/apps/quota/selectProductCategoryList" , {
        params:data,
    });
}
function selectProductList(data) {
    return newInstance.get("/apps/quota/selectProductList" , {
        params:data,
    });
}

function selectProductListForHomecare(data) {
    return newInstance.get("/apps/quota/selectProductListForHomecare" , {
        params:data,
    });
}

function selectServicePackageList(data) {
    return newInstance.get("/apps/quota/selectServicePackageList" , {
        params:data,
    });
}

function selectStockPackagePriceInfo(data) {
    return newInstance.get("/apps/quota/selectStockPackagePriceInfo" , {
        params:data,
    });
}

function selectCustomerJsonList(data) {
    return newInstance.get("/apps/quota/selectCustomerJsonList" , {
        params:data,
    });
}


function selectPromotionByAppTypeStockESales(data) {
    return newInstance.get("/apps/quota/selectPromotionByAppTypeStockESales" , {
        params:data,
    });
}

function selectProductPromotionPriceByPromoStockID(data) {
    return newInstance.get("/apps/quota/selectProductPromotionPriceByPromoStockID" , {
        params:data,
    });
}

function searchMagicAddressPopJsonList(data) {
    return newInstance.get("/apps/quota/searchMagicAddressPopJsonList" , {
        params:data,
    });
}

function selectMagicAddressComboList(data) {
    return newInstance.get("/apps/quota/selectMagicAddressComboList" , {
        params:data,
    });
}

function selectCodeList(data) {
    return newInstance.get("/apps/quota/selectCodeList" , {
        params:data,
    });
}


function selectDdlChnlDataList(data) {
    return newInstance.get("/apps/quota/selectDdlChnl" , {
        params:data,
    });
}

function selectAccBankDataList(data) {
    return newInstance.get("/apps/quota/selectAccBankDataList" , {
        params:data,
    });
}


function selectCrcBankDataList(data) {
    return newInstance.get("/apps/quota/selectCrcBankDataList" , {
        params:data,
    });
}

function selectTknId(data) {
    return newInstance.get("/apps/quota/selectTknId" , {
        params:data,
    });
}

function selectTokenNumber(data) {
    return newInstance.get("/apps/quota/selectTokenNumber" , {
        params:data,
    });
}

function existingHPCodyMobile(data) {
    return newInstance.get("/apps/quota/existingHPCodyMobile" , {
        params:data,
    });
}

function selectCustomerCreditCardJsonList(data) {
    return newInstance.get("/apps/quota/selectCustomerCreditCardJsonList" , {
        params:data,
    });
}

function selectCustomerBankAccJsonList(data) {
    return newInstance.get("/apps/quota/selectCustomerBankAccJsonList" , {
        params:data,
    });
}


function selectCustCntcJsonInfo(data) {
    return newInstance.get("/apps/quota/selectCustCntcJsonInfo" , {
        params:data,
    });
}

function selectCustAddJsonInfo(data) {
    return newInstance.get("/apps/quota/selectCustAddJsonInfo" , {
        params:data,
    });
}

function selectCustomerAddressJsonList(data) {
    return newInstance.get("/apps/quota/selectCustomerAddressJsonList" , {
        params:data,
    });
}

function saveCustomer(param) {
    return newInstance.post("/apps/quota/saveCustomer", param);
}

function attachFileUpload(formData) {
    return newInstance.post("/apps/quota/attachFileUpload", formData, {headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
}

function registerPreOrder(param) {
    return newInstance.post("/apps/quota/registerPreOrder", param);
}
  

function selectExistSofNo(data) {
    return newInstance.get("/apps/quota/selectExistSofNo" , {
        params:data,
    });
}

function selectPrevOrderNoList(data) {
    return newInstance.get("/apps/quota/selectPrevOrderNoList" , {
        params:data,
    });
}


/* homecare*/
function selectHcProductCodeList(data) {
    return newInstance.get("/apps/quota/selectHcProductCodeList" , {
        params:data,
    });
}

/* homecare*/
function checkIfIsAcInstallationProductCategoryCode(data) {
    return newInstance.get("/apps/quota/checkIfIsAcInstallationProductCategoryCode" , {
        params:data,
    });
}

/* homecare*/
function selectPromotionFreeGiftList(data) {
    return newInstance.get("/apps/quota/selectPromotionFreeGiftList" , {
        params:data,
    });
}

/* homecare*/
function selectAuxStockPriceJsonInfo(data) {
    return newInstance.get("/apps/quota/selectAuxStockPriceJsonInfo" , {
        params:data,
    });
}


/* homecare*/
function checkProductSize(data) {
    return newInstance.get("/apps/quota/checkProductSize" , {
        params:data,
    });
}

function registerHcPreOrder(param) {
    return newInstance.post("/apps/quota/registerHcPreOrder", param);
}


/* homecare*/
function selectHcPreOrderList(data) {
    return newInstance.get("/apps/quota/selectHcPreOrderList" , {
        params:data,
    });
}

/* */
function selectHaPreOrderList(data) {
    return newInstance.get("/apps/quota/selectHaPreOrderList" , {
        params:data,
    });
}




export default {
    selectProductPromotionPriceByPromoStockID,
    selectPromotionByAppTypeStockESales,
    selectStockPackagePriceInfo,
    selectProductCategoryList,
    selectProductList,
    selectServicePackageList,
    selectCustomerJsonList,
    searchMagicAddressPopJsonList,
    selectMagicAddressComboList,
    selectCodeList,
    selectDdlChnlDataList,
    selectAccBankDataList,
    selectCrcBankDataList,
    selectTknId,
    selectTokenNumber,
    existingHPCodyMobile,
    selectCustomerCreditCardJsonList,
    selectCustomerBankAccJsonList,
    selectCustCntcJsonInfo,
    selectCustAddJsonInfo,
    selectCustomerAddressJsonList,
    attachFileUpload,
    registerPreOrder,
    registerHcPreOrder,
    saveCustomer,
    selectExistSofNo,
    selectPrevOrderNoList,
    selectProductListForHomecare,
    selectHcProductCodeList,
    checkIfIsAcInstallationProductCategoryCode,
    selectPromotionFreeGiftList,
    selectAuxStockPriceJsonInfo,
    checkProductSize,
    selectHcPreOrderList,
    selectHaPreOrderList

}