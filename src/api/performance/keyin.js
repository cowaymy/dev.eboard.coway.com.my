
  
  import { createInstance } from "../interceptors";
  let newInstance = createInstance();
  
  async function fetchKeyinReportData(userData) {
    return newInstance.get("/sales/getKeyinReportData", {
      params: userData,
    });
  }
  async function fetchTotalKeyinReportData(userData) {
    return newInstance.get("/sales/getTotalKeyinReportData", {
      params: userData,
    });
  }

  async function fetchKeyInOrderList(userData) {
    return newInstance.get("/sales/getKeyinOrderList", {
      params: userData,
    });
  }


  async function fetchKeyInOrderListForCCP(userData) {
    return newInstance.get("/sales/getKeyinOrderListForCCP", {
      params: userData,
    });
  }
  

  async function fetchKeyInOrderListForECASH(userData) {
    return newInstance.get("/sales/getKeyinOrderListForECASH", {
      params: userData,
    });
  }

  
  async function fetchKeyInOrderListForCALL(userData) {
    return newInstance.get("/sales/getKeyinOrderListForCall", {
      params: userData,
    });
  }

  
  
  async function fetchKeyInOrderListForINSTALL(userData) {
    return newInstance.get("/sales/getKeyinOrderListForInstall", {
      params: userData,
    });
  }
  
  

  
export default {
    fetchKeyinReportData,
    fetchTotalKeyinReportData,
    fetchKeyInOrderList,
    fetchKeyInOrderListForCCP,
    fetchKeyInOrderListForECASH,
    fetchKeyInOrderListForCALL,
    fetchKeyInOrderListForINSTALL
}