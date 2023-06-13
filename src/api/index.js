import { createInstance } from './interceptors';

let newInstance = createInstance();

function registerUser(userData) {
	return newInstance.post('signup', userData);
}

function userLogin(userData) {
	return newInstance.post('login', userData);
}

async function saveNotification(data) {
	return newInstance.post('/apps/comm/mergeNotification', data);
}

async function updateAttendData(data) {
	return newInstance.post('/apps/comm/updateAttendData', data);
}

async function updateAttendQRBranchData(data) {
	return newInstance.post('/apps/comm/updateAttendQRBranchData', data);
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
	return newInstance.get('/apps/comm/bestRecord', { params: options });
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
	return newInstance.get('/apps/comm/bestRecordList', { params: options });
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

	return newInstance.get('/apps/comm/notification', { params: options });
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

	return newInstance.post('/apps/comm/notificationDataList', param);
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

	return newInstance.get('/apps/comm/getNewNotifications', { params: options });
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

	return newInstance.get('/apps/comm/selectDetailNewNotifications', {
		params: options,
	});
}

async function fileUpLoad(form) {
	return newInstance.post('/apps/comm/fileUpLoad', form, {
		header: { 'Content-Type': 'multipart/form-data' },
	});
}

async function getImgData(userData) {
	let options = {
		imgPath: userData.userImagePath,
	};

	return newInstance.get('/img/viewImg', { params: options });
}

export default {
	registerUser,
	userLogin,
	getBestRecord,
	getBestRecordList,
	getNotification,
	saveNotification,
	getNotificationDataList,
	getNewNotification,
	getDetailNewNotification,
	fileUpLoad,
	getImgData,
	updateAttendData,
	updateAttendQRBranchData,
};
