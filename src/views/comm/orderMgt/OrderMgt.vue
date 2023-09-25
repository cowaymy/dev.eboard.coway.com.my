<template>
	<v-row>
		<v-col cols="12" md="12">
			<v-card>
				<v-card-title>
					<span style="color: info; font-weight: bold"
						>Order Period</span
					></v-card-title
				>
				<v-card-text class="d-flex align-center flex-wrap pb-0">
					<div class="d-flex align-center pb-5">
						<v-dialog
							ref="dialog"
							v-model="modal"
							:return-value.sync="date"
							persistent
							width="290px"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="date"
									label="order date"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker v-model="date" type="month" scrollable>
								<v-spacer></v-spacer>
								<v-btn text color="primary" @click="modal = false">
									Cancel
								</v-btn>
								<v-btn text color="primary" @click="$refs.dialog.save(date)">
									OK
								</v-btn>
							</v-date-picker>
						</v-dialog>
					</div>

					<v-spacer></v-spacer>

					<div class="d-flex align-center pb-5">
						<!-- create invoice -->
						<v-btn color="primary" class="me-3" @click="fetchEvents()">
							<v-icon size="18" class="me-1">
								{{ icons.mdiMagnifyPlusOutline }}
							</v-icon>
							<span>Search</span>
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12" md="12">
			<div class="px-4">
				<v-chip-group>
					<VBadge
						:content="staticCCPCnt"
						bordered
						color="error"
						offset-x="20"
						offset-y="20"
					>
						<v-chip
							size="x-small"
							:color="setTagColor('C')"
							@click="keyEvents('CCP')"
							class="me-3"
						>
							<span>CCP</span>
						</v-chip>
					</VBadge>
					<VBadge
						:content="staticEASCnt"
						bordered
						color="error"
						offset-x="20"
						offset-y="20"
					>
						<v-chip
							:color="setTagColor('E')"
							@click="keyEvents('ECS')"
							class="me-3"
						>
							<span>E-CASH</span>
						</v-chip>
					</VBadge>
					<VBadge
						:content="staticCAGCnt"
						bordered
						color="error"
						offset-x="25"
						offset-y="20"
					>
						<v-chip
							:color="setTagColor('G')"
							@click="keyEvents('CAG')"
							class="me-3"
						>
							<span>CALL LOG</span>
						</v-chip>
					</VBadge>
					<VBadge
						:content="staticINSCnt"
						bordered
						color="error"
						offset-x="24"
						offset-y="20"
					>
						<v-chip
							:color="setTagColor('I')"
							@click="keyEvents('INS')"
							class="me-3"
						>
							<span> INSTALL</span>
						</v-chip>
					</VBadge>
				</v-chip-group>
			</div>
		</v-col>

		<v-col cols="12" md="12">
			<v-card
				flat
				class="knowledge-base-bg d-flex align-center justify-center text-center mb-7"
			>
				<v-card-text>
					<!-- <p class="kb-title text-2xl font-weight-semibold primary--text mb-2"></p>
					Hello, how can we help?
				</p>
				<p class="mb-7">
					or choose a category to quickly find the help you need

				</p> -->

					<v-form class="kb-search-input mx-auto">
						<v-text-field
							v-model="orderNoSearchQuery"
							id="orderNoSearchQuery"
							outlined
							placeholder="keyin a orderNo...."
							hide-details
							class="kb-search-input keywordInput"
						>
							<template #prepend-inner>
								<v-icon size="23" class="mx-1">
									{{ icons.mdiMagnify }}
								</v-icon>
							</template>
						</v-text-field>
					</v-form>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12" md="12">
			<v-card>
				<v-card-title class="align-start">
					<span style="color: info; font-weight: bold">Your Order List</span>
					<v-spacer></v-spacer>
				</v-card-title>

				<v-card-text>
					<v-list dense>
						<v-list-item-group color="primary">
							<v-list-item
								v-for="(item, index) in events"
								:key="item.orderNo"
								:class="`d-flex align-center px-0 ${index > 0 ? 'mt-3' : ''}`"
							>
								<template>
									<v-list-item-avatar size="38" color="#000000">
										<span style="color: #ffffff; font-weight: bold">
											{{ index + 1 }}</span
										>
									</v-list-item-avatar>

									<div
										class="d-flex align-center flex-grow-1 flex-wrap text-no-wrap"
									>
										<div class="me-2">
											<v-list-item-title class="text-xs">
												<span style="color: #330be9; font-weight: bold">
													( {{ item.orderNo }} )</span
												>
												{{ item.custName }}
											</v-list-item-title>

											<div class="d-flex align-center">
												<v-list-item-subtitle class="mt-1 me-2 text-xs">
													<v-icon size="14" class="me-1">
														{{ icons.mdiCalendarClockOutline }}
													</v-icon>
													<span style="font-weight: bold">
														{{ item.ekeyInDate }}
													</span>

													<VBadge
														dot
														location="start center"
														offset-x="2"
														:color="setTagColor(item.orderStus)"
														class="me-2"
													/>
													<span style="font-weight: bold">
														{{ item.orderStus }}</span
													>
												</v-list-item-subtitle>
											</div>
										</div>
									</div>
									<v-spacer></v-spacer>
									<span> <orderDetail v-bind:item="item"></orderDetail></span>
								</template>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import {
	mdiCalendarBlankOutline,
	mdiDotsVertical,
	mdiMagnify,
	mdiMagnifyPlusOutline,
	mdiCalendarClockOutline,
	mdiCheckBold,
	mdiLabelMultiple,
	mdiMessageAlertOutline,
	mdiQrcodeScan,
	mdiAirplaneTakeoff,
	mdiClipboardEditOutline,
	mdiCalendarHeart,
	mdiCancel,
} from '@mdi/js';

import store from '@/store';
import orderMgtStoreModule from './orderMgtStoreModule';
import orderDetail from './OrderDetailsItem.vue';
const ORDER_MGT_APP_STORE_MODULE_NAME = 'app-ordermgt';

export default {
	data() {
		if (!store.hasModule(ORDER_MGT_APP_STORE_MODULE_NAME)) {
			store.registerModule(
				ORDER_MGT_APP_STORE_MODULE_NAME,
				orderMgtStoreModule,
			);
		}
		const orderNoSearchQuery = '';

		return {
			orderNoSearchQuery,
			date: new Date().toISOString().substr(0, 7),
			menu: false,
			modal: false,
			staticCCPCnt: 0,
			staticEASCnt: 0,
			staticCAGCnt: 0,
			staticINSCnt: 0,
			events: [],
			oldEventsList: [],
			icons: {
				mdiDotsVertical,
				mdiCalendarBlankOutline,
				mdiMagnifyPlusOutline,
				mdiCalendarClockOutline,
				mdiCheckBold,
				mdiLabelMultiple,
				mdiMessageAlertOutline,
				mdiQrcodeScan,
				mdiAirplaneTakeoff,
				mdiClipboardEditOutline,
				mdiCalendarHeart,
				mdiCancel,
				mdiMagnify,
			},
		};
	},
	components: { orderDetail },
	computed: {},

	methods: {
		keyEvents(type) {
			const eObj = [];

			this.oldEventsList.forEach(element => {
				if (element.orderStus == type) {
					eObj.push(element);
				}
				this.events = [...eObj];
			});

			// return this.events.filter(item => {
			// 	item.orderStus.toLowerCase().includes('ins');
			// });
		},

		setOrderStus(item) {
			if (item.INSTALL_STUS != null) {
				this.staticINSCnt++;
				return 'INS';
			}

			if (item.CALL_LOG_STUS != null) {
				this.staticCAGCnt++;
				return 'CAG';
			}

			if (item.ECASH_STUS != null) {
				this.staticEASCnt++;
				return 'ECS';
			}

			if (item.CCP_STUS != null) {
				this.staticCCPCnt++;
				return 'CCP';
			}
		},
		convertData(rowItem) {
			let item = {};

			item.preOrdId = rowItem.PRE_ORD_ID;
			item.salesOrdId = rowItem.SALES_ORD_ID;
			item.salesRefNo = rowItem.SOF_NO;
			item.appType = 'R';
			item.orderNo =
				rowItem.SALES_ORD_NO == null ? rowItem.SOF_NO : rowItem.SALES_ORD_NO;
			item.custName = rowItem.CUST_NAME.substr(0, 10);
			item.ekeyInDate = rowItem.SALES_DT;
			item.orderStus = this.setOrderStus(rowItem);
			item.nric = rowItem.CUST_NRIC;
			item.insStus = rowItem.INSTALL_STUS;
			item.telNo = rowItem.TEL_M1;

			return item;
		},
		fetchEvents(_type) {
			this.staticCCPCnt = 0;
			this.staticEASCnt = 0;
			this.staticCAGCnt = 0;
			this.staticINSCnt = 0;
			this.events = [];

			const parsedValue = this.date.replace(/-/g, '');
			store
				.dispatch(`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchEvents`, parsedValue)
				.then(response => {
					let dataList = JSON.parse(JSON.stringify(response));

					//console.log(dataList);
					const eObj = [];

					dataList.data.data.forEach(element => {
						eObj.push(this.convertData(element));
						this.events = [...eObj];
						this.oldEventsList = [...eObj];
					});
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		splitData(data, type) {
			if (data === undefined || data == '' || data == null) return '';

			return data.split(type);
		},

		setTagColor(typeCode) {
			let tagIcon = 'info';
			if (typeCode == 'CCP' || typeCode == 'C') {
				tagIcon = '#514938';
			} else if (typeCode == 'ECS' || typeCode == 'E') {
				tagIcon = '#8b8687';
			} else if (typeCode == 'CAG' || typeCode == 'G') {
				tagIcon = '#23B5D3';
			} else if (typeCode == 'INS' || typeCode == 'I') {
				tagIcon = '#1F7872';
			}

			return tagIcon;
		},
	},

	watch: {
		orderNoSearchQuery: function (ordNo) {
			this.events = this.oldEventsList.filter(
				item =>
					item.orderNo.toLowerCase().includes(ordNo) ||
					item.custName.toLowerCase().includes(ordNo),
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.keywordInput {
	border-radius: 6.666666667px;
	font-size: 16px;
	line-height: 26.666666667px;
	padding: 6.666666667px;
	width: 133.333333333%;

	transform: scale(0.75);
	transform-origin: left top;

	/* 여기를 추가합니다. */
	margin-bottom: -10px;
	margin-right: -33.333333333%;
}
</style>
