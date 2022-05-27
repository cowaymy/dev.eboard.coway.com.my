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
	return newInstance.post('getEKeyInData', userData);
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
};
