import store from '@/store';
import {
	mdiAccountCheckOutline,
	mdiAccountOutline,
	mdiAccountPlusOutline,
	mdiAccountRemoveOutline,
	mdiCogOutline,
	mdiDatabaseOutline,
	mdiDnsOutline,
	mdiPencilOutline,
} from '@mdi/js';

export default function useUsersList() {
	const userListTable = [];

	const tableColumns = [
		{ text: 'ID', value: 'id' },
		{
			text: 'Target',
			value: 'target',
			align: 'center',
			sortable: false,
		},
		{ text: 'Type', value: 'type', sortable: false },
		{ text: 'Subject', value: 'subject' },
		{ text: 'Contents', value: 'contents', sortable: false },
		{ text: 'StartDate', value: 'sdate', sortable: false },
		{ text: 'EndDate', value: 'edate', sortable: false },
		{ text: 'Ues', value: 'useYn', sortable: false },

		{
			text: 'CreteUser',
			value: 'creteuser',
			align: 'center',
			sortable: false,
		},
	];

	const searchQuery = '';
	const targetFilter = null;
	const planFilter = null;
	const statusFilter = null;
	const totalUserListTable = 0;
	const loading = false;
	const options = {
		sortBy: ['id'],
		sortDesc: [true],
	};
	const userTotalLocal = [];
	const selectedRows = [];

	// fetch data
	const fetchUsers = () => {
		store
			.dispatch('app-user/fetchUsers', {
				q: searchQuery.value,
				options: options.value,
				status: statusFilter.value,
				role: targetFilter.value,
				plan: planFilter.value,
			})
			.then(response => {
				const { filteredData, total, userTotal } = response.data;

				userListTable.value = filteredData;
				totalUserListTable.value = total;
				userTotalLocal.value = userTotal;

				// remove loading state
				loading.value = false;
			})
			.catch(error => {
				console.log(error);
			});
	};

	// *===============================================---*
	// *--------- UI ---------------------------------------*
	// *===============================================---*

	const resolveUserRoleVariant = role => {
		if (role === 'subscriber') return 'primary';
		if (role === 'author') return 'warning';
		if (role === 'maintainer') return 'success';
		if (role === 'editor') return 'info';
		if (role === 'admin') return 'error';

		return 'primary';
	};

	const resolveUserRoleIcon = role => {
		if (role === 'subscriber') return mdiAccountOutline;
		if (role === 'author') return mdiCogOutline;
		if (role === 'maintainer') return mdiDatabaseOutline;
		if (role === 'editor') return mdiPencilOutline;
		if (role === 'admin') return mdiDnsOutline;

		return mdiAccountOutline;
	};

	const resolveUserStatusVariant = status => {
		if (status === 'pending') return 'warning';
		if (status === 'active') return 'success';
		if (status === 'inactive') return 'secondary';

		return 'primary';
	};

	const resolveUserTotalIcon = total => {
		if (total === 'Total Users')
			return { icon: mdiAccountOutline, color: 'primary' };
		if (total === 'Paid Users')
			return { icon: mdiAccountPlusOutline, color: 'error' };
		if (total === 'Active Users')
			return { icon: mdiAccountCheckOutline, color: 'success' };
		if (total === 'Pending Users')
			return { icon: mdiAccountRemoveOutline, color: 'warning' };

		return { icon: mdiAccountOutline, color: 'primary' };
	};

	return {
		userListTable,
		tableColumns,
		searchQuery,
		targetFilter,
		planFilter,
		statusFilter,
		totalUserListTable,
		loading,
		options,
		userTotalLocal,
		selectedRows,
		fetchUsers,
		resolveUserRoleVariant,
		resolveUserRoleIcon,
		resolveUserStatusVariant,
		resolveUserTotalIcon,
	};
}
