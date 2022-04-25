import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

function registerUser(userData) {
	return instance.post('signup', userData);
}

function userLogin(userData) {
	return instance.post('login', userData);
}

async function getBestRecord(userData) {
	try {
		const response = await instance.get('sales', userData);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export default { registerUser, userLogin, getBestRecord };
