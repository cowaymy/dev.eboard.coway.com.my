<template>
	<v-dialog v-model="isDialogVisible" width="600">
		<template #activator="{ on, attrs }">
			<v-chip v-bind="attrs" v-on="on" color="info">
				<v-icon class="me-1">
					{{ icons.mdiPageNextOutline }}
				</v-icon>
			</v-chip>
		</template>

		<v-card>
			<v-card-title>
				Order status
				<v-spacer></v-spacer>
				<v-btn color="secondary" icon @click="isDialogVisible = false">
					<v-icon class="me-1">
						{{ setTag('close') }}
					</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-timeline
					dense
					class="timeline-custom-dense timeline-custom-dots card-content"
				>
					<!-- install   -->
					<v-timeline-item small color="#1F7872">
						<v-card color="#1F7872">
							<v-card-title>
								<span class="text-base white--text">Install</span>
								<v-spacer></v-spacer>
								<small class="text-xs white--text text-no-wrap">
									{{ insItem.salesDate }}</small
								>
							</v-card-title>

							<v-card-text>
								<div><span style="font-weight: bold"> Order No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ insItem.salesOrdNo }}
								</div>
								<div><span style="font-weight: bold"> Install No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ insItem.installNo }}
								</div>
								<div>
									<span style="font-weight: bold">Install Status </span>
								</div>
								<div class="ms-4" style="color: #fe0000; font-weight: bold">
									{{ insItem.status }}
								</div>

								<div><span style="font-weight: bold"> Remark</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ insItem.rem }}
								</div>
							</v-card-text>
						</v-card>
					</v-timeline-item>

					<!-- call -log  -->
					<v-timeline-item small color="#23B5D3">
						<v-card color="#23B5D3">
							<v-card-title>
								<span class="text-base white--text">CALL-LOG</span>
								<v-spacer></v-spacer>
								<small class="text-xs white--text text-no-wrap">
									{{ calllogItem.salesDate }}</small
								>
							</v-card-title>
							<v-card-text>
								<div><span style="font-weight: bold"> Order No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ calllogItem.salesOrdNo }}
								</div>
								<div><span style="font-weight: bold">Type</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ calllogItem.type }}
								</div>

								<div><span style="font-weight: bold">Action </span></div>
								<div class="ms-4" style="color: #fe0000; font-weight: bold">
									{{ calllogItem.status }}
								</div>
								<div><span style="font-weight: bold"> Remark</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ calllogItem.rem }}
								</div>
							</v-card-text>
						</v-card>
					</v-timeline-item>

					<!-- E-CASH-->
					<v-timeline-item small color="#8b8687">
						<v-card color="#8b8687">
							<v-card-title>
								<span class="text-base white--text">E-CASH </span>
								<v-spacer></v-spacer>
								<small class="text-xs white--text text-no-wrap">
									{{ eCashItem.salesDate }}
								</small>
							</v-card-title>

							<v-card-text>
								<div><span style="font-weight: bold"> Order No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ eCashItem.salesOrdNo }}
								</div>
								<div><span style="font-weight: bold">Payment Type</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ eCashItem.type }}
								</div>

								<div><span style="font-weight: bold">Status</span></div>
								<div class="ms-4" style="color: #fe0000; font-weight: bold">
									{{ eCashItem.status }}
								</div>
								<div><span style="font-weight: bold"> Remark</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ eCashItem.rem }}
								</div>
							</v-card-text>
						</v-card>
					</v-timeline-item>

					<!-- CCP-->
					<v-timeline-item small color="#514938">
						<v-card color="#514938">
							<v-card-title>
								<span class="text-base white--text">CCP </span>
								<v-spacer></v-spacer>
								<small class="text-xs white--text text-no-wrap">{{
									ccpItem.salesDate
								}}</small>
							</v-card-title>

							<v-card-text>
								<div><span style="font-weight: bold"> Order No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ccpItem.salesOrdNo }}
								</div>
								<div><span style="font-weight: bold"> REF No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ccpItem.salesRefNo }}
								</div>

								<div><span style="font-weight: bold"> CCP Status</span></div>
								<div class="ms-4" style="color: #fe0000; font-weight: bold">
									{{ ccpItem.status }}
								</div>
								<div><span style="font-weight: bold"> CCP Remark</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ccpItem.pncRem }}
								</div>
							</v-card-text>
						</v-card>
					</v-timeline-item>

					<!-- ekey In -->
					<v-timeline-item small color="#A8A196">
						<v-card color="#A8A196">
							<v-card-title>
								<span class="text-base white--text">eKey-in </span>
								<v-spacer></v-spacer>
								<small class="text-xs white--text text-no-wrap">{{
									ekeinItem.salesDate
								}}</small>
							</v-card-title>

							<v-card-text>
								<div><span style="font-weight: bold"> SFO No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ekeinItem.salesRefNo }}
								</div>
								<div><span style="font-weight: bold"> Order No.</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ekeinItem.salesOrdNo }}
								</div>
								<div>
									<span style="font-weight: bold"> NRIC/Company No</span>
								</div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ekeinItem.nric }}
								</div>
								<div><span style="font-weight: bold"> Status</span></div>
								<div class="ms-4" style="color: #fe0000; font-weight: bold">
									{{ ekeinItem.status }}
								</div>
								<div><span style="font-weight: bold"> Product</span></div>
								<div class="ms-4" style="color: #000000; font-weight: bold">
									{{ ekeinItem.product }}
								</div>
							</v-card-text>
						</v-card>
					</v-timeline-item>
				</v-timeline>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import {
	mdiCalendarBlankOutline,
	mdiDotsVertical,
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
	mdiShapePlusOutline,
	mdiClose,
	mdiPageNextOutline,
} from '@mdi/js';

import store from '@/store';
import orderMgtStoreModule from './orderMgtStoreModule';
const ORDER_MGT_APP_STORE_MODULE_NAME = 'app-ordermgt';

export default {
	props: ['item'],
	data() {
		if (!store.hasModule(ORDER_MGT_APP_STORE_MODULE_NAME)) {
			store.registerModule(
				ORDER_MGT_APP_STORE_MODULE_NAME,
				orderMgtStoreModule,
			);
		}
		return {
			date: new Date().toISOString().substr(0, 7),
			menu: false,
			modal: false,
			isDialogVisible: false,
			events: [],
			ccpItem: {
				salesDate: '',
				salesRefNo: '',
				salesOrdNo: '',
				status: '',
				pncRem: '',
			},
			calllogItem: {
				salesDate: '',
				salesOrdNo: '',
				status: '',
				rem: '',
				type: '',
			},
			eCashItem: {
				salesDate: '',
				salesOrdNo: '',
				salesRefNo: '',
				status: '',
				rem: '',
				type: '',
			},
			insItem: {
				salesDate: '',
				installNo: '',
				salesOrdNo: '',
				status: '',
				rem: '',
			},
			ekeinItem: {
				salesDate: '',
				salesRefNo: '',
				salesOrdNo: '',
				status: '',
				nric: '',
				product: '',
			},
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
				mdiShapePlusOutline,
				mdiClose,
				mdiPageNextOutline,
			},
		};
	},

	computed: {},

	created() {},

	watch: {
		isDialogVisible: function (_val) {
			if (_val) {
				this.fetchCCPOrderList();
				this.fetchECASHOrderList();
				this.fetchCALLLOGOrderList();
				this.fetchINSTALLOrderList();
				this.fetchEkeyInOrderList();
			}
		},
	},
	methods: {
		fetchEkeyInOrderList() {
			const preOrdId = this.item.preOrdId;
			store
				.dispatch(
					`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchEkeyInOrderList`,
					preOrdId,
				)
				.then(response => {
					if (response != undefined) {
						let dataList = JSON.parse(JSON.stringify(response));

						this.ekeinItem.salesDate = this.item.ekeyInDate;
						this.ekeinItem.salesRefNo = this.item.salesRefNo;
						this.ekeinItem.salesOrdNo = this.item.orderNo;
						this.ekeinItem.status = dataList.data.data[0].NAME;
						this.ekeinItem.nric = dataList.data.data[0].NRIC;
						this.ekeinItem.product = dataList.data.data[0].STK_DESC;
					}
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		fetchCCPOrderList() {
			const salesOrdId = this.item.salesOrdId;
			store
				.dispatch(
					`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchCCPOrderList`,
					salesOrdId,
				)
				.then(response => {
					try {
						let dataList = JSON.parse(JSON.stringify(response));

						this.ccpItem.salesDate = dataList.data.data[0].CCP_UPD_DT;
						this.ccpItem.salesRefNo = this.item.salesRefNo;
						this.ccpItem.salesOrdNo = this.item.orderNo;
						this.ccpItem.status = dataList.data.data[0].NAME;
						this.ccpItem.pncRem = dataList.data.data[0].CCP_PNC_REM;
					} catch (e) {
						console.log(e);
					}
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		fetchECASHOrderList() {
			const salesOrdId = this.item.salesOrdId;
			store
				.dispatch(
					`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchECASHOrderList`,
					salesOrdId,
				)
				.then(response => {
					try {
						let dataList = JSON.parse(JSON.stringify(response));

						this.eCashItem.salesDate = dataList.data.data[0].FILE_ITM_APPR_DT;
						this.eCashItem.salesRefNo = this.item.salesRefNo;
						this.eCashItem.salesOrdNo = this.item.orderNo;
						this.eCashItem.status = dataList.data.data[0].FILE_ITM_STUS;
						this.eCashItem.rem = dataList.data.data[0].FILE_ITM_REM;
						this.eCashItem.type = 'Rental Payment';
					} catch (e) {
						console.log(e);
					}
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		fetchCALLLOGOrderList() {
			const salesOrdId = this.item.salesOrdId;
			store
				.dispatch(
					`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchCALLLOGOrderList`,
					salesOrdId,
				)
				.then(response => {
					try {
						let dataList = JSON.parse(JSON.stringify(response));

						this.calllogItem.salesDate = dataList.data.data[0].CALL_ACTN_DT;
						this.calllogItem.salesOrdNo = this.item.orderNo;
						this.calllogItem.status = dataList.data.data[0].NAME;
						this.calllogItem.rem = dataList.data.data[0].CALL_REM;
						this.calllogItem.type = 'New Installation Order';
					} catch (e) {
						console.log(e);
					}
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		fetchINSTALLOrderList() {
			const salesOrdId = this.item.salesOrdId;
			store
				.dispatch(
					`${ORDER_MGT_APP_STORE_MODULE_NAME}/fetchINSTALLOrderList`,
					salesOrdId,
				)
				.then(response => {
					try {
						//console.log(response);
						let dataList = JSON.parse(JSON.stringify(response));

						this.insItem.salesDate = dataList.data.data[0].INSTALL_DT;
						this.insItem.installNo = dataList.data.data[0].INSTALL_ENTRY_NO;
						this.insItem.salesOrdNo = this.item.orderNo;
						this.insItem.status = dataList.data.data[0].NAME;
						this.insItem.rem = dataList.data.data[0].REM;
					} catch (e) {
						//console.log(this.item);
						if (this.item.insStus == 'Active') {
							this.insItem.salesOrdNo = this.item.orderNo;
							this.insItem.status = 'Active';
						}
					}
				})
				.catch(error => {
					console.error(error);
					console.error(error.response);
				});
		},

		setTag(typeCode) {
			let tagIcon = mdiMessageAlertOutline;
			if (typeCode == 'A0001') {
				tagIcon = mdiQrcodeScan;
			} else if (typeCode == 'A0002' || typeCode == 'A0003') {
				tagIcon = mdiAirplaneTakeoff;
			} else if (typeCode == 'A0004') {
				tagIcon = mdiClipboardEditOutline;
			} else if (typeCode == 'A0005') {
				tagIcon = mdiCalendarHeart;
			} else if (typeCode == 'close') {
				tagIcon = mdiClose;
			} else {
				tagIcon = mdiMessageAlertOutline;
			}

			return tagIcon;
		},
	},
};
</script>
