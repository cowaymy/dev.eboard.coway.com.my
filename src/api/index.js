import { createInstance ,createFileDwnInstance} from "./interceptors";

let newInstance = createInstance();

function registerUser(userData) {
  return newInstance.post("signup", userData);
}

function userLogin(userData) {
  return newInstance.post("login", userData);
}

async function saveBase64Pdf(data) {
  return newInstance.post("/apps/comm/genPdf", data);
}

async function saveNotification(data) {
  return newInstance.post("/apps/comm/mergeNotification", data);
}

async function updateAttendData(data) {
  return newInstance.post("/apps/comm/updateAttendData", data);
}

async function updateAttendQRBranchData(data) {
  return newInstance.post("/apps/comm/updateAttendQRBranchData", data);
}


async function selectBranchCode(userData) {
  return newInstance.get("/apps/comm/selectBranchCode",userData);
}


async function getBestRecord(userData) {
  let options = {
    memCode: userData.userName,
    memId: userData.memId,
    memberLevel: userData.memberLevel,
    userName: userData.userName,
    userTypeId: userData.userTypeId,
    roleId: userData.roleId,
  };
  return newInstance.get("/apps/comm/bestRecord", { params: options });
}






async function getBestRecordList(userData) {
  let options = {
    memCode: userData.userName,
    memId: userData.memId,
    memberLevel: userData.memberLevel,
    userName: userData.userName,
    userTypeId: userData.userTypeId,
    roleId: userData.roleId,
  };
  return newInstance.get("/apps/comm/bestRecordList", { params: options });
}

async function getNotification(userData) {
  let options = {
       ID: userData.ID,
  };

  console.log(options)
  return newInstance.get("/apps/comm/notification", { params: options });
}

async function getNotificationDataList(param) {
  // let options = {
  // 	memCode: userData.userName,
  // 	memId: userData.memId,
  // 	memberLevel: userData.memberLevel,
  // 	userName: userData.userName,
  // 	userTypeId: userData.userTypeId,
  // 	roleId: userData.roleId,
  // 	type: userData.type,
  // 	notificationType: userData.notificationsType,
  // };

  return newInstance.post("/apps/comm/notificationDataList", param);
}

async function getNewNotification(userData) {
  let options = {
    memCode: userData.userName,
    memId: userData.memId,
    memberLevel: userData.memberLevel,
    userName: userData.userName,
    userTypeId: userData.userTypeId,
    roleId: userData.roleId,
    type: userData.type,
    notificationType: userData.notificationsType,
  };

  return newInstance.get("/apps/comm/getNewNotifications", { params: options });
}

async function updateHitNotification(userData) {
  let options = {
      ID : userData.ID,
      userName: userData.userName
  };

  return newInstance.get("/apps/comm/updateHitNotification", { params: options });
}




async function getDetailNewNotification(userData) {
  let options = {
    memCode: userData.userName,
    memId: userData.memId,
    memberLevel: userData.memberLevel,
    userName: userData.userName,
    userTypeId: userData.userTypeId,
    roleId: userData.roleId,
    type: userData.type,
    notificationType: userData.notificationsType,
  };

  return newInstance.get("/apps/comm/selectDetailNewNotifications", {
    params: options,
  });
}

async function getMenuList(userData) {
  let options = {
    memCode: userData.userName,
  };
  return newInstance.get("/apps/comm/selectMenuList", {
    params: options,
  });
}

async function selectShortcuts(userData) {
  let options = {
    memCode: userData.userName,
  };

  return newInstance.get("/apps/comm/selectShortcuts", {
    params: options,
  });
}

async function getAppbarNotifications(userData) {
  let options = {
    memCode: userData.userName,
  };

  return newInstance.get("/apps/comm/getAppbarNotifications", {
    params: options,
  });
}


async function selectAttachedNotificationFiles(userData) {
  return newInstance.get("/apps/comm/selectAttachedNotificationFiles", {
    params: userData,
  });
}



async function fileUpLoad(form) {
  return newInstance.post("/apps/comm/fileUpLoad", form, {
    header: { "Content-Type": "multipart/form-data" },
  });
}


async function mfileUpLoad(form) {
  return newInstance.post("/apps/api/upload/mFileUpload", form, {
        header: { "Content-Type": "multipart/form-data" },
  });
}

  


async function genPdfUpLoad(form) {
  console.log(form);
  return newInstance.post("/apps/comm/genPdf", form);
}

async function insertShortcuts(param) {
  return newInstance.post("/apps/comm/insertShortcuts", param);
}

async function updateShortcuts(param) {
  return newInstance.post("/apps/comm/updateShortcuts", param);
}

async function getImgData(userData) {
  let options = {
    imgPath: userData.userImagePath,
  };

  return newInstance.get("/img/viewImg", { params: options });
}


async function fileDownload(userData) {
  let options = {
    path: userData.path,
  };
  return createFileDwnInstance().get("/apps/comm/download", { params: options });
}

async function removeFile(userData) {
  return newInstance.get("/apps/comm/removeFileID", { params: userData });
}







export default {
  selectBranchCode,
  registerUser,
  userLogin,
  getBestRecord,
  getBestRecordList,
  getNotification,
  saveNotification,
  getNotificationDataList,
  getNewNotification,
  getDetailNewNotification,
  fileUpLoad,mfileUpLoad,
  getImgData,
  updateAttendData,
  updateAttendQRBranchData,
  genPdfUpLoad,
  saveBase64Pdf,
  getMenuList,
  selectShortcuts,
  insertShortcuts,
  updateShortcuts,
  getAppbarNotifications,
  updateHitNotification,selectAttachedNotificationFiles,fileDownload ,removeFile
};
