<template>
	<div id="">
		<!-- list filters -->
		<v-card>
			<v-card-title> Search &amp; Filter </v-card-title>
			<v-row class="px-2 ma-0">
				<!-- role filter -->
				<v-col cols="12" sm="4">
					<v-select
						v-model="targetFilter"
						:items="targetOptions"
						label="Select Target"
						multiple
					>
						<template v-slot:prepend-item>
							<v-list-item ripple @mousedown.prevent @click="toggle">
								<v-list-item-action>
									<v-icon
										:color="selectedTargrt.length > 0 ? 'indigo darken-4' : ''"
									>
										{{ icons.targetBox }}
									</v-icon>
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title> Select All </v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-divider class="mt-2"></v-divider>
						</template>
					</v-select>

					<!-- 
					<v-select
						v-model="targetFilter"
						chips
						clearable
						multiple
						closable-chips="true"
						:items="targetOptions"
						label="Select Target"
					/> -->

					<!-- <v-select
						v-model="targetFilter"
						placeholder="Select Target"
						:items="targetOptions"
						item-text="title"
						item-value="value"
						outlined
						clearable
						dense
						hide-details
					></v-select> -->
				</v-col>

				<!-- plan filter -->
				<v-col cols="12" sm="4">
					<v-select
						v-model="planFilter"
						placeholder="Select Plan"
						:items="planOptions"
						item-text="title"
						item-value="value"
						outlined
						dense
						clearable
						hide-details
					></v-select>
				</v-col>

				<!-- status filter -->
				<v-col cols="12" sm="4">
					<v-select
						v-model="statusFilter"
						placeholder="Select Status"
						:items="statusOptions"
						item-text="title"
						item-value="value"
						outlined
						dense
						clearable
						hide-details
					></v-select>
				</v-col>
			</v-row>

			<v-divider class="mt-4"></v-divider>

			<!-- actions -->
			<v-card-text class="d-flex align-center flex-wrap pb-0">
				<!-- search -->
				<v-text-field
					v-model="searchQuery"
					placeholder="Search"
					outlined
					hide-details
					dense
					class="user-search me-3 mb-4"
				>
				</v-text-field>

				<v-spacer></v-spacer>

				<div class="d-flex align-center flex-wrap">
					<v-btn
						color="primary"
						class="mb-4 me-3"
						@click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive"
					>
						<v-icon>{{ icons.mdiPlus }}</v-icon>
						<span>Add New User</span>
					</v-btn>

					<v-btn color="secondary" outlined class="mb-4">
						<v-icon size="17" class="me-1">
							{{ icons.mdiExportVariant }}
						</v-icon>
						<span>Export</span>
					</v-btn>
				</div>
			</v-card-text>

			<!-- table -->
			<v-data-table
				v-model="selectedRows"
				:headers="tableColumns"
				:items="userListTable"
				:options.sync="options"
				:server-items-length="totalUserListTable"
				:loading="loading"
				show-select
			>
				<!-- name -->
				<template #[`item.fullName`]="{ item }">
					<div class="d-flex align-center">
						<v-avatar
							:color="item.avatar ? '' : 'primary'"
							:class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
							size="32"
						>
							<v-img
								v-if="item.avatar"
								:src="require(`@/assets/images/avatars/${item.avatar}`)"
							></v-img>
							<span v-else class="font-weight-medium">{{
								avatarText(item.fullName)
							}}</span>
						</v-avatar>

						<div class="d-flex flex-column ms-3">
							<router-link
								:to="{ name: 'apps-user-view', params: { id: item.id } }"
								class="text--primary font-weight-semibold text-truncate cursor-pointer text-decoration-none"
							>
								{{ item.fullName }}
							</router-link>
							<small>@{{ item.username }}</small>
						</div>
					</div>
				</template>

				<!-- role -->
				<template #[`item.role`]="{ item }">
					<div class="d-flex align-center">
						<v-avatar
							size="30"
							:color="resolveUserRoleVariant(item.role)"
							:class="`v-avatar-light-bg ${resolveUserRoleVariant(
								item.role,
							)}--text me-3`"
						>
							<v-icon size="18" :color="resolveUserRoleVariant(item.role)">
								{{ resolveUserRoleIcon(item.role) }}
							</v-icon>
						</v-avatar>
						<span class="text-capitalize">{{ item.role }}</span>
					</div>
				</template>

				<!-- plan -->
				<template #[`item.currentPlan`]="{ item }">
					<span class="text-capitalize font-weight-semibold text--primary">{{
						item.currentPlan
					}}</span>
				</template>

				<!-- status -->
				<template #[`item.status`]="{ item }">
					<v-chip
						small
						:color="resolveUserStatusVariant(item.status)"
						:class="`${resolveUserStatusVariant(item.status)}--text`"
						class="v-chip-light-bg font-weight-semibold text-capitalize"
					>
						{{ item.status }}
					</v-chip>
				</template>

				<!-- actions -->
				<template #[`item.actions`]="{ item }">
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon v-bind="attrs" v-on="on">
								<v-icon>{{ icons.mdiDotsVertical }}</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item
								:to="{ name: 'apps-user-view', params: { id: item.id } }"
							>
								<v-list-item-title>
									<v-icon size="20" class="me-2">
										{{ icons.mdiFileDocumentOutline }}
									</v-icon>
									<span>Details</span>
								</v-list-item-title>
							</v-list-item>

							<v-list-item link>
								<v-list-item-title>
									<v-icon size="20" class="me-2">
										{{ icons.mdiDeleteOutline }}
									</v-icon>
									<span>Delete</span>
								</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
	mdiSquareEditOutline,
	mdiDotsVertical,
	mdiPlus,
	mdiFileDocumentOutline,
	mdiDeleteOutline,
	mdiExportVariant,
	mdiAccountOutline,
} from '@mdi/js';
// sidebar
import { avatarText } from '@core/utils/filter';

import useUsersList from './useUsersList';

export default {
	components: {},
	data() {
		const {
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
		} = useUsersList();

		const isAddNewUserSidebarActive = false;

		const targetOptions = [
			'ALL',
			'GM',
			'SM',
			'HM',
			'HP',
			'CGM',
			'CSM',
			'CM',
			'CODY',
		];

		const planOptions = [
			{ title: 'Basic', value: 'basic' },
			{ title: 'Company', value: 'company' },
			{ title: 'Enterprise', value: 'enterprise' },
			{ title: 'Standard', value: 'standard' },
		];

		const statusOptions = [
			{ title: 'Pending', value: 'pending' },
			{ title: 'Active', value: 'active' },
			{ title: 'Inactive', value: 'inactive' },
		];

		return {
			selectionType: 'leaf',
			userListTable,
			tableColumns,
			searchQuery,
			targetFilter,
			planFilter,
			statusFilter,
			totalUserListTable,
			targetOptions,
			planOptions,
			statusOptions,
			loading,
			options,
			userTotalLocal,
			isAddNewUserSidebarActive,
			selectedRows,
			avatarText,
			resolveUserRoleVariant,
			resolveUserRoleIcon,
			resolveUserStatusVariant,
			resolveUserTotalIcon,
			fetchUsers,

			// icons
			icons: {
				mdiSquareEditOutline,
				mdiFileDocumentOutline,
				mdiDotsVertical,
				mdiDeleteOutline,
				mdiPlus,
				mdiExportVariant,
				mdiAccountOutline,
				targetBox: mdiPlus,
			},

			selectedTargrt: [],
		};
	},

	computed: {
		clickAllTarget() {
			return this.selectedTargrt.length === this.targetOptions.length;
		},
		likesSomeTarget() {
			return this.selectedTargrt.length > 0 && !this.clickAllTarget;
		},
	},
	methods: {
		toggle() {
			this.$nextTick(() => {
				if (this.clickAllTarget) {
					this.selectedTargrt = [];
					this.targetBox = 'mdiAccountOutline';
				} else {
					this.selectedTargrt = this.targetOptions.slice();
					this.targetBox = 'mdiPlus';
				}
			});
		},
	},
};
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
