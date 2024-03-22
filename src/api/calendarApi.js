import { createInstance } from "./interceptors";

let newInstance = createInstance();

async function fetchAttendEvents(userData) {
  // let options = {
  // 	reqDate: userData.reqDate,
  // 	id: userData.userName,
  // };

  return newInstance.get(
    `/apps/calendar/attendEvents/${userData.userName}/reqDate/${userData.reqDate}`
  );
}

async function fetchAttendHistoryEvents(userData) {
  // let options = {
  // 	reqDate: userData.reqDate,
  // 	id: userData.userName,
  // };

  return newInstance.get(
    `/apps/calendar/attendHistoryEvents/${userData.userName}/reqDate/${userData.reqDate}`
  );
}

async function fetchAttendBranchName(id) {
  return newInstance.get(`/apps/calendar/attendBranchName/${id}`);
}

async function fetchAttendAllowLactionFroHp(data) {
  console.log("fetchAttendAllowLactionFroHp=====>", data);
  return newInstance.get(
    `/apps/calendar/checkAttendanceAllowLocationForHp/${data.id}/scanDevice/${data.deviceId}/latitude/${data.latitude}/longitude/${data.longitude}`
  );
}
async function verifyLocationForHp(data) {
  console.log("verifyLocationForHp=====>", data);
  return newInstance.get(
    `/apps/calendar/verifyLocationForHp/${data.id}/scanDevice/${data.deviceId}/latitude/${data.latitude}/longitude/${data.longitude}`
  );
}

export default {
  fetchAttendEvents,
  fetchAttendBranchName,
  fetchAttendAllowLactionFroHp,
  fetchAttendHistoryEvents,
  verifyLocationForHp,
};
