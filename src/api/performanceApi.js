import { createInstance } from "./interceptors";

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




async function fetchGetTotalActiveHPLevel1(userData) {
  return newInstance.get("/sales/getRinkForTotActiveHPData", {
    params: userData,
  });
}


async function fetchActiveHPLevel1(userData) {
  return newInstance.get("/sales/getRinkForGMActiveData", {
    params: userData,
  });
}

async function fetchActiveHPLevel2(userData) {
  return newInstance.get("/sales/getRinkForActiveLevel2Data", {
    params: userData,
  });
}
async function fetchActiveHPLevel3(userData) {
  return newInstance.get("/sales/getRinkForActiveLevel3Data", {
    params: userData,
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
    options.orgCode =userData.orgCode;
  }
  return options;
}

export default {
  fetchNetSalesLevel2,fetchNetSalesLevel3,fetchNetSalesLevel4,fetchGetNameLevel1
  ,fetchGetNestSalesLevel1,fetchGetTotalNestSalesLevel1,fetchGetTotalActiveHPLevel1
  ,fetchActiveHPLevel1,fetchActiveHPLevel2,fetchActiveHPLevel3
};
