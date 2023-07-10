import { createInstance } from './interceptors';

let newInstance = createInstance();

async function fetchAttendEvents(userData) {
	// let options = {
	// 	reqDate: userData.reqDate,
	// 	id: userData.userName,
	// };

	return newInstance.get(
		`/apps/calendar/attendEvents/${userData.userName}/reqDate/${userData.reqDate}`,
	);
}

async function fetchAttendHistoryEvents(userData) {
	// let options = {
	// 	reqDate: userData.reqDate,
	// 	id: userData.userName,
	// };

	return newInstance.get(
		`/apps/calendar/attendHistoryEvents/${userData.userName}/reqDate/${userData.reqDate}`,
	);
}

async function fetchAttendBranchName(id) {
	return newInstance.get(`/apps/calendar/attendBranchName/${id}`);
}

async function fetchAttendAllowLactionFroHp(data) {
	console.log('fetchAttendAllowLactionFroHp=====>', data);
	return newInstance.get(
		`/apps/calendar/checkAttendanceAllowLocationForHp/${data.id}/scanDevice/${data.deviceId}`,
	);
}

export default {
	fetchAttendEvents,
	fetchAttendBranchName,
	fetchAttendAllowLactionFroHp,
	fetchAttendHistoryEvents,
};
