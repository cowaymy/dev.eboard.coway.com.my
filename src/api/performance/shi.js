

import { createInstance } from "../interceptors";
let newInstance = createInstance();


async function fetchRinkForTotRCHPData(userData) {

    return newInstance.get("/sales/getRinkForTotRCHPData", {
        params: userData,
    });
}

async function fetchRcHPLevel1(userData) {
    return newInstance.get("/sales/getRinkForGMRcData", {
        params: userData,
    });
}

async function fetchRcHPLevel2(userData) {
    return newInstance.get("/sales/getRinkForRcLevel2Data", {
        params: userData,
    });
}
async function fetchRcHPLevel3(userData) {
    return newInstance.get("/sales/getRinkForRcLevel3Data", {
        params: userData,
    });
}

async function fetchRcLevel4(userData) {
    return newInstance.get("/sales/getRinkForRcLevel4Data", {
        params: userData,
    });
}



export default {
    fetchRinkForTotRCHPData,
    fetchRcHPLevel1,
    fetchRcHPLevel2,
    fetchRcHPLevel3,
    fetchRcLevel4,
}