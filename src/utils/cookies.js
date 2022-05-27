function saveAuthToCookie(value) {
	document.cookie = `auth=${value}`;
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

export {
	saveAuthToCookie,
	getAuthFromCookie,
	saveUserToCookie,
	getUserFromCookie,
	deleteCookie,
};
