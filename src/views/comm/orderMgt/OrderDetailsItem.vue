<template>
	<v-dialog v-model="isDialogVisible" width="600">
		<template #activator="{ on, attrs }">
			<v-chip v-bind="attrs" v-on="on" color="info">
				<v-icon class="me-1">
					{{ icons.mdiPageNextOutline }}
				</v-icon>
			</v-chip>
		</template>
		<div id="element-to-convert">
			<v-card>
				<v-card-title>
					<div>
						<span style="font-weight: bold"> Order progress status</span>
					</div>
					<v-spacer></v-spacer>
					<v-btn color="secondary" icon @click="isDialogVisible = false">
						<v-icon class="me-1">
							{{ setTag('close') }}
						</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<span style="font-weight: bold">
						{{ this.ekeinItem.userName }}</span
					></v-card-text
				>
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
									<span class="text-base white--text font-weight: bold"
										>Install</span
									>
									<v-spacer></v-spacer>
									<small style="color: #ffffff; font-weight: bold">
										{{ insItem.salesDate }}</small
									>
								</v-card-title>

								<v-card-text>
									<div><span style="font-weight: bold"> Order No.</span></div>
									<div class="ms-4" style="color: #000000; font-weight: bold">
										{{ insItem.salesOrdNo }}
									</div>
									<div>
										<span style="font-weight: bold"> Install No.</span>
									</div>
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
									<span class="text-base white--text font-weight: bold"
										>CALL-LOG</span
									>
									<v-spacer></v-spacer>
									<small style="color: #ffffff; font-weight: bold">
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
									<span class="text-base white--text font-weight: bold"
										>E-CASH
									</span>
									<v-spacer></v-spacer>
									<small style="color: #ffffff; font-weight: bold">
										{{ eCashItem.salesDate }}
									</small>
								</v-card-title>

								<v-card-text>
									<div><span style="font-weight: bold"> Order No.</span></div>
									<div class="ms-4" style="color: #000000; font-weight: bold">
										{{ eCashItem.salesOrdNo }}
									</div>
									<div>
										<span style="font-weight: bold">Payment Type</span>
									</div>
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
									<span class="text-base white--text font-weight: bold"
										>CCP
									</span>
									<v-spacer></v-spacer>
									<small style="color: #ffffff; font-weight: bold">{{
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

									<div>
										<span style="font-weight: bold"> CCP Status</span>
									</div>
									<div class="ms-4" style="color: #fe0000; font-weight: bold">
										{{ ccpItem.status }}
									</div>
									<div>
										<span style="font-weight: bold"> CCP Remark</span>
									</div>
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
									<span class="text-base white--text font-weight: bold"
										>eKey-in
									</span>
									<v-spacer></v-spacer>
									<small style="color: #ffffff; font-weight: bold">{{
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
									<div>
										<span style="font-weight: bold"> Share with whatsapp </span>
									</div>
									<div class="ms-4">
										<!-- <v-icon class="me-1" color="info" @click="sendWhatsApp">
											{{ icons.mdiWhatsapp }}
										</v-icon> -->
										<v-chip color="info" @click="exportToPDF">
											<v-icon>
												{{ icons.mdiWhatsapp }}
											</v-icon>
										</v-chip>

										<!-- <div style="font-weight: bold">
											<a v-bind:href="linkUri">
												<v-btn>
													✅ lajfasljflkasjfljlaslkjasfjlaksfjlkasfjasklf</v-btn
												></a
											>
										</div> -->
									</div>
								</v-card-text>
							</v-card>
						</v-timeline-item>
					</v-timeline>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-img
						max-height="20vw"
						max-width="20vw"
						contain
						class="me-3"
						:src="appLogo"
					/>
				</v-card-actions>
			</v-card>
		</div>
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
	mdiWhatsapp,
	mdiFilePdfBox,
} from '@mdi/js';

import store from '@/store';
import bus from '../../../utils/bus.js';
import themeConfig from '../../../../themeConfig';

import orderMgtStoreModule from './orderMgtStoreModule';
const ORDER_MGT_APP_STORE_MODULE_NAME = 'app-ordermgt';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

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
			linkUri: 'https://epapan.malaysia.coway.do',
			menu: false,
			appLogo: themeConfig.app.logo,
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
				userName: '',
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
				mdiWhatsapp,
				mdiFilePdfBox,
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
		sendWhatsApp() {
			// "getLocationInfo"는 react-native에서 받는 메서드 이름입니다.
			window.webViewBridge.send(
				'sendWhatsApp',
				this.ekeinItem,
				res => {
					this.result = JSON.stringify(res);
				},
				err => {
					alert(err);
					console.error(err);
				},
			);
		},
		exportToPDF() {
			let el = document.getElementById('element-to-convert');

			let opt = {
				margin: 1,
				filename: this.ekeinItem.salesOrdNo,
				image: { type: 'jpeg', quality: 1 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
			};

			html2pdf()
				.set(opt)
				.from(el)
				.toPdf()
				.outputPdf()
				.then(function (pdf) {
					const newpdf = btoa(pdf);

					var formData = new FormData();
					formData.append('uploadedFile', newpdf);
					formData.append('orderNo', opt.filename);

					//'https://epapanapis.malaysia.coway.do/apps/comm/genPdf',

					bus.$emit('start:spinner');

					axios
						.post(
							'https://epapanapis.malaysia.coway.do/apps/comm/genPdf',
							formData,
						)
						.then(res => {
							console.log(res.data);
							window.webViewBridge.send(
								'downloadFile',
								res.data,
								res => {
									this.result = JSON.stringify(res);
								},
								err => {
									alert(err);
									console.error(err);
								},
							);
						})
						.catch(error => {
							console.log(error.response);
						})
						.finally(() => {
							bus.$emit('end:spinner');
						});

					// const file = new File([pdfBase64], opt.filename, {
					// 	type: 'application/pdf',
					// });

					// const formData = new FormData();
					// formData.append('file', newpdf);

					// fetch('http://172.16.252.101:3000/apps/comm/genPdf', {
					// 	method: 'post',
					// 	body: formData,
					// })
					// 	.then(response => response.json())
					// 	.then(result => {
					// 		console.log('Success:', result);
					// 	})
					// 	.catch(error => {
					// 		console.error('Error:', error);
					// 	});

					// console.log('--------->');

					// const pdfData = {};
					// pdfData.base64data = pdfBase64;
					// pdfData.filename = opt.filename;

					// //this.callGenPdfApi(pdfBase64);
					// //console.log(pdfAsString);
					// // const preBlob = () => {
					// // 	var byteString;
					// // 	if (pdfBase64.split(',')[0].indexOf('base64') >= 0)
					// // 		byteString = atob(pdfBase64.split(',')[1]);
					// // 	else byteString = unescape(pdfBase64.split(',')[1]);

					// // 	// separate out the mime component
					// // 	var mimeString = pdfBase64
					// // 		.split(',')[0]
					// // 		.split(':')[1]
					// // 		.split(';')[0];

					// // 	// write the bytes of the string to a typed array
					// // 	var ia = new Uint8Array(byteString.length);
					// // 	for (var i = 0; i < byteString.length; i++) {
					// // 		ia[i] = byteString.charCodeAt(i);
					// // 	}

					// // 	console.log('end --->');
					// // 	return new Blob([ia], { type: mimeString });
					// // };
					// //console.log('return::preBlob');
					// //console.log(preBlob);
					// // const file = new File([pdfBase64], opt.filename, {
					// // 	type: 'application/pdf',
					// // });

					// // console.log(file);
					// // const formData = new FormData();
					// // formData.append('file', file);
					// // let data = new FormData();
					// // data.append('file', file);

					// fetch('http://172.16.252.101:3000/apps/comm/genPdf', {
					// 	method: 'post',
					// 	body: JSON.stringify(pdfBase64),
					// 	headers: { 'Content-Type': 'application/json' },
					// })
					// 	.then(response => response.json())
					// 	.then(result => {
					// 		console.log('Success:', result);
					// 	})
					// 	.catch(error => {
					// 		console.error('Error:', error);
					// 	});

					// //console.log('========>', formData);
					// //this.callGenPdfApi(formData);
					// console.log('========>');
				});
		},

		async callGenPdfApi(data) {
			console.log('api in ::::', data);
			console.log(data);
		},

		dataURItoBlob(dataURI) {
			console.log('in --->');
			// convert base64/URLEncoded data component to raw binary data held in a string
			var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0)
				byteString = atob(dataURI.split(',')[1]);
			else byteString = unescape(dataURI.split(',')[1]);

			// separate out the mime component
			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

			// write the bytes of the string to a typed array
			var ia = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}

			console.log('end --->');
			return new Blob([ia], { type: mimeString });
		},
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
						this.ekeinItem.userName = dataList.data.data[0].NAME_1;
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

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';

#app {
	margin-top: 60px;
	text-align: center;
}
</style>
