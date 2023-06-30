function saveAuthToCookie(value) {
	document.cookie = `auth=${value}`;
}

function saveAttendToCookie(key, value) {
	if (typeof Storage !== 'undefined') {
		// Code for localStorage/sessionStorage.
		localStorage.setItem(`coway_attend`, value);
	} else {
		// Sorry! No Web Storage support..
	}

	var expire = new Date();
	expire.setDate(expire.getDate() + 1000);
	document.cookie = `coway_attend=${value};`;
}

function saveUserToCookie(value) {
	document.cookie = `user=${JSON.stringify(value)}`;
}
function getAuthFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getAttendFromCookie() {
	return localStorage.getItem(`coway_attend`);
	// return document.cookie.replace(
	// 	/(?:(?:^|.*;\s*)atend_`${key}`\s*=\s*([^;]*).*$)|^.*$/,
	// 	'$1',
	// );
}

function getUserFromCookie() {
	let usercookie = document.cookie.replace(
		/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);

	if (usercookie != null && usercookie != undefined && usercookie != '') {
		return JSON.parse(usercookie);
	} else {
		return '';
	}
}

function deleteCookie(value) {
	document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function deleteAtendCookie() {
	localStorage.removeItem(`coway_attend`);

	//document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
	saveAuthToCookie,
	getAuthFromCookie,
	saveUserToCookie,
	getUserFromCookie,
	deleteCookie,
	saveAttendToCookie,
	deleteAtendCookie,
	getAttendFromCookie,
};
