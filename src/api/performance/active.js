  
  import { createInstance } from "../interceptors";
  let newInstance = createInstance();
  
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


  export default {
    fetchGetTotalActiveHPLevel1,
    fetchActiveHPLevel1,
    fetchActiveHPLevel2,
    fetchActiveHPLevel3,
   }