import { createInstance } from './interceptors';

const newInstance = createInstance();

function getCurMonthData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	console.log(options);
	return newInstance.get('/sales/curMonthData', { params: options });
}
function getEKeyInData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/curEkeyInData', { params: options });
}

function salesTrendData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/salesTrendData', { params: options });
}

function getTodayEkeyinData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/todayEkeyinData', { params: options });
}

function getRinkForGMData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/rinkForGMData', { params: options });
}

function getRinkForSMData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/rinkForSMData', { params: options });
}

function getRinkForHMData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/rinkForHMData', { params: options });
}

function getRinkForHPData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};

	return newInstance.get('/sales/rinkForHPData', { params: options });
}

function getNetSalesData(userData) {
	return newInstance.post('getNetSalesData', userData);
}

function getActiveData(userData) {
	return newInstance.post('getActiveData', userData);
}

function getSHIData(userData) {
	return newInstance.post('getSHIData', userData);
}

function getProdcCateory(userData) {
	return newInstance.post('getProdcCateory', userData);
}

function getTagetSales(userData) {
	return newInstance.post('getTagetSales', userData);
}

export default {
	getEKeyInData,
	getNetSalesData,
	getActiveData,
	getSHIData,
	getProdcCateory,
	getTagetSales,
	getCurMonthData,
	salesTrendData,
	getTodayEkeyinData,
	getRinkForGMData,
	getRinkForSMData,
	getRinkForHMData,
	getRinkForHPData,
};
