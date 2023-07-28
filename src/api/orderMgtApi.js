import { createInstance } from './interceptors';

let newInstance = createInstance();

async function fetchOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyOrderList`, {
		params: userData,
	});
}

async function fetchCCPOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyCCPOrderList`, {
		params: userData,
	});
}

async function fetchECASHOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyECASHOrderList`, {
		params: userData,
	});
}

async function fetchCALLLOGOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyCALLLOGOrderList`, {
		params: userData,
	});
}
async function fetchINSTALLOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyINSTALLOrderList`, {
		params: userData,
	});
}
async function fetchEkeyInOrderList(userData) {
	return newInstance.get(`/apps/comm/selectMyEkeyinOrderList`, {
		params: userData,
	});
}

export default {
	fetchOrderList,
	fetchCCPOrderList,
	fetchECASHOrderList,
	fetchCALLLOGOrderList,
	fetchINSTALLOrderList,
	fetchEkeyInOrderList,
};
