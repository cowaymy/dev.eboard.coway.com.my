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
	var obj = newInstance.get('/cody/getCurrentMonthData', { params: options });
	return obj;
}
function getCurRankingData(userData) {
	const options = {
		memCode: userData.userName,
		memId: userData.memId,
		memberLevel: userData.memberLevel,
		userName: userData.userName,
		userTypeId: userData.userTypeId,
		roleId: userData.roleId,
	};
	var obj = newInstance.get('/cody/getCurRankingData', { params: options });
	return obj;
}

export default {
	getCurRankingData,
	getCurMonthData,
};
