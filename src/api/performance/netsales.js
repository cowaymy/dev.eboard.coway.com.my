import { createInstance } from "../interceptors";
let newInstance = createInstance();

async function fetchNetSalesLevel2(userData) {
  return newInstance.get("/sales/getRinkForLevel2Data", {
    params: userData,
  });
}


async function fetchNetSalesLevel3(userData) {
  return newInstance.get("/sales/getRinkForLevel3Data", {
    params: userData,
  });
}



async function fetchNetSalesLevel4(userData) {
  return newInstance.get("/sales/getRinkForLevel4Data", {
    params: userData,
  });
}


async function fetchGetNameLevel1(userData) {
  return newInstance.get("/sales/getRinkForGMNameData", {
    params: userData,
  });
}


async function fetchGetNestSalesLevel1(userData) {
  return newInstance.get("/sales/getRinkForGMCNetSalesData", {
    params: userData,
  });
}


async function fetchGetTotalNestSalesLevel1(userData) {
  return newInstance.get("/sales/getRinkForTotNetSalesData", {
    params: userData,
  });
}



export default {
 fetchNetSalesLevel2,
 fetchNetSalesLevel3,
 fetchNetSalesLevel4,
 fetchGetNameLevel1,
 fetchGetNestSalesLevel1,
 fetchGetTotalNestSalesLevel1,
}