import { createInstance } from './interceptors';

const newInstance = createInstance();

function registerUser(userData) {
	return newInstance.post('signup', userData);
}

function userLogin(userData) {
	return newInstance.post('login', userData);
}

async function getBestRecord(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};
	return newInstance.get('/comm/bestRecord', { params: options });
}

async function getBestRecordList(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};
	return newInstance.get('/comm/bestRecordList', { params: options });
}

export default { registerUser, userLogin, getBestRecord, getBestRecordList };
