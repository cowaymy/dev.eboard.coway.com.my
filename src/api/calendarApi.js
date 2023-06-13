import { createInstance } from './interceptors';

let newInstance = createInstance();

async function fetchAttendEvents(userData) {
	let options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};
	return newInstance.get('/apps/calendar/attendEvents', { params: options });
}

export default { fetchAttendEvents };
