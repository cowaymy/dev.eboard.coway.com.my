import { createInstance } from "./interceptors";

const newInstance = createInstance();

function getCurMonthData(userData) {
  return newInstance.get("/sales/curMonthData", {
    params: trickToLevel0(userData),
  });
}
function getEKeyInData(userData) {
  return newInstance.get("/sales/curEkeyInData", {
    params: trickToLevel0(userData),
  });
}

function salesTrendData(userData) {
  return newInstance.get("/sales/salesTrendData", {
    params: trickToLevel0(userData),
  });
}

function getTodayEkeyinData(userData) {
  return newInstance.get("/sales/todayEkeyinData", {
    params: trickToLevel0(userData),
  });
}

function getRinkForGMData(userData) {
  return newInstance.get("/sales/rinkForGMData", {
    params: trickToLevel0(userData),
  });
}

function getRinkForSMData(userData) {
  return newInstance.get("/sales/rinkForSMData", {
    params: trickToLevel0(userData),
  });
}

function getRinkForHMData(userData) {
  return newInstance.get("/sales/rinkForHMData", {
    params: trickToLevel0(userData),
  });
}

function getRinkForHPData(userData) {
  return newInstance.get("/sales/rinkForHPData", {
    params: trickToLevel0(userData),
  });
}

function getTargetData(userData) {

  return newInstance.get("/sales/targetData", {
    params: trickToLevel0(userData),
  });
}

function getSalesBestRecord(userData) {
  return newInstance.get("/apps/comm/bestRecord", {
    params: trickToLevel0(userData),
  });
}

function getSalesBestRecordList(userData) {
  return newInstance.get("/apps/comm/bestRecordList", {
    params: trickToLevel0(userData),
  });
}

function trickToLevel0(userData) {
  const options = {};

  if ("4" == userData.userTypeId || "6" == userData.userTypeId) {
    options.memCode = "503581";
    options.memId = "78068";
    options.memberLevel = "0";
    options.userName = "503581";
    options.userTypeId = "1";
    options.roleId = "1";
  } else {
    options.memCode = userData.userName;
    options.memId = userData.memId;
    options.memberLevel = userData.memberLevel;
    options.userName = userData.userName;
    options.userTypeId = userData.userTypeId;
    options.roleId = userData.roleId;
  }
  return options;
}

function getNetSalesData(userData) {
  return newInstance.post("getNetSalesData", userData);
}

function getActiveData(userData) {
  return newInstance.post("getActiveData", userData);
}

function getSHIData(userData) {
  return newInstance.post("getSHIData", userData);
}

function getProdcCateory(userData) {
  return newInstance.post("getProdcCateory", userData);
}

function getTagetSales(userData) {
  return newInstance.post("getTagetSales", userData);
}

export default {
  getEKeyInData,
  getNetSalesData,
  getActiveData,
  getSHIData,
  getProdcCateory,
  getTagetSales,
  getCurMonthData,
  salesTrendData,
  getTodayEkeyinData,
  getRinkForGMData,
  getRinkForSMData,
  getRinkForHMData,
  getRinkForHPData,
  getTargetData,
  getSalesBestRecord,
  getSalesBestRecordList,
};
