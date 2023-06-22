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

export default { fetchAttendEvents };
