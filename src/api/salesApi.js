import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

function getEKeyInData(userData) {
	return instance.post('getEKeyInData', userData);
}

function getNetSalesData(userData) {
	return instance.post('getNetSalesData', userData);
}

function getActiveData(userData) {
	return instance.post('getActiveData', userData);
}

function getSHIData(userData) {
	return instance.post('getSHIData', userData);
}

function getProdcCateory(userData) {
	return instance.post('getProdcCateory', userData);
}

function getTagetSales(userData) {
	return instance.post('getTagetSales', userData);
}

export default {
	getEKeyInData,
	getNetSalesData,
	getActiveData,
	getSHIData,
	getProdcCateory,
	getTagetSales,
};
