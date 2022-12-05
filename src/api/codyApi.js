import { createInstance } from './interceptors';

const newInstance = createInstance();

function getCurMonthData(userData) {
	var obj = newInstance.get('/cody/getCurrentMonthData', {
		params: trickToLevel0(userData),
	});
	return obj;
}
function getCurRankingData(userData) {
	var obj = newInstance.get('/cody/getCurRankingData', {
		params: trickToLevel0(userData),
	});
	return obj;
}

function updateCodyMenu(user_config) {
	const options = {
		memId: user_config.mem_id,
		user_config: user_config.user_config,
	};
	var obj = newInstance.get('/cody/updateCodyMenu', { params: options });
	return obj;
}

function trickToLevel0(userData) {
	const options = {};

	if ('4' == userData.userTypeId) {
		options.memCode = 'CD100042';
		options.memId = '7493';
		options.memberLevel = '0';
		options.userName = 'CD100042';
		options.userTypeId = '2';
		options.roleId = '1';
	} else {
		options.memCode = userData.userName;
		options.memId = userData.memId;
		options.memberLevel = userData.memberLevel;
		options.userName = userData.userName;
		options.userTypeId = userData.userTypeId;
		options.roleId = userData.roleId;
	}
	return options;
}
export default {
	getCurRankingData,
	getCurMonthData,
	updateCodyMenu,
};
