import { createInstance } from './interceptors';

let newInstance = createInstance();

function registerUser(userData) {
	return newInstance.post('signup', userData);
}

function userLogin(userData) {
	return newInstance.post('login', userData);
}

async function saveNotification(data) {
	return newInstance.post('/comm/notification', data);
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
	return newInstance.get('/comm/bestRecord', { params: options });
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
	return newInstance.get('/comm/bestRecordList', { params: options });
}

async function getNotification(userData) {
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

	console.log(userData);
	return newInstance.get('/comm/notification', { params: options });
}

export default {
	registerUser,
	userLogin,
	getBestRecord,
	getBestRecordList,
	getNotification,
	saveNotification,
};
