<template>
    <v-row class="app-invoice-preview">
        <v-col cols="12" md="8">
            <v-card color="#F0F8FF">
                <!-- Header -->
                <v-card-text class="py-9 px-8 text-xs">
                  <div class="invoice-header d-flex flex-wrap justify-space-between flex-column flex-sm-row">
                    <!-- Left Content -->
                    <div class="mb-6">
                        <div class="d-flex align-center mb-6">
                            <v-img
                                :src="appLogo"
                                max-height="100px"
                                max-width="100px"
                                alt="logo"
                                contain
                                class="me-3"
                            ></v-img>
                            <span class="text--primary font-weight-bold text-xl">
                            {{ appName }}
                            </span>
                        </div>
                        <span class="d-block text-xs">{{ this.$store.state.userInfo.businessAreaDesc}} </span>
                        <span class="d-block text-xs">{{ appQuotInfo.salesperson}}</span>
                    </div>
                    <!-- Right Content -->
                    <div :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                        <div class="mb-4 d-flex align-center justify-end">
                            <v-text-field
                                label="Quoation Number"
                                placeholder="quoation no Text"
                                class="custom-text-field text-xs"
                                v-model="appQuotInfo.quotationNo"
                            ></v-text-field>
                        </div>
                        <!-- <div class="mb-4 d-flex align-center">
                            <v-menu
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                eager
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        readonly
                                        outlined
                                        dense
                                        hide-details="auto"
                                        v-bind="attrs"
                                        v-on="on"
                                        label="Date Issued"
                                        class="custom-text-field"
                                        v-model="quotationData.issuedDate"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    @input="isIssueDateMenuOpen = false"
                                    v-model="quotationData.issuedDate"
                                ></v-date-picker>
                            </v-menu>
                         </div>
                        <div class="mb-2 d-flex align-center justify-end">
                            <v-menu
                                v-model="isDueDateMenuOpen"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                eager
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    label="Due Date"
                                    readonly
                                    outlined
                                    dense
                                    hide-details="auto"
                                    v-bind="attrs"
                                    v-on="on"
                                    class="custom-text-field"
                                    v-model="quotationData.dueDate"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="quotationData.dueDate"
                                    @input="isDueDateMenuOpen = false"
                                ></v-date-picker>
                            </v-menu>
                        </div> -->
                    </div>
                </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                            md="8"
                        >   
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <h8 class="font-weight-semibold ">
                                        Customer Details
                                        </h8>
                                        <p class="text-xs mb-0">
                                        Enter your customer details
                                        </p>
                                    </v-col>
                                </v-row>   
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            placeholder="Customer name"
                                            label="Customer name"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appCustName"
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            placeholder="leo.ham@coway.com.my"
                                            label="Email"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appCustEmail"
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12"  md="4">
                                        <v-text-field
                                            placeholder="Mobile Number"
                                            label="Mobile Number"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appCustMobile"
                                            readonly
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-col>
                    </v-row> 
                </v-card-text>
                <v-divider>-</v-divider>
                <v-card-text class="prdInfo_text">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-card-text>
                                <div>
                                    <v-img v-if="appProdcInfo" height="170px"  class="fixed-image"
                                    :src= appProdcInfo.imgurl
                                    ></v-img>
                                </div>
                            </v-card-text>
                        </v-col>

                        <v-col cols="12" md="8">   
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <h8 class="font-weight-semibold">
                                            {{appProdcInfo == null ?  "" :appProdcInfo.title }}
                                        </h8>
                                         <p class="text-xs mb-0">
                                            {{ appProdcInfo == null ?  "" : appProdcInfo.category }}({{appProdcInfo == null ?  "" : appProdcInfo.model}})
                                        </p>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            placeholder="APPLICATION TYPE"
                                            label="APPLICATION TYPE"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appTypeDesc"
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            placeholder="PACKAGE"
                                            label="PACKAGE"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appPackageDesc"
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            placeholder="PROMOTION"
                                            label="PROMOTION"
                                            class="custom-text-field text-xs"
                                            v-model="appQuotInfo.appPromotionDesc"
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="appQuotInfo.appQuantity"
                                            placeholder="QUANTITY"
                                            label="QUANTITY"
                                            class="custom-text-field text-xs"
                                            readonly
                                        />
                                    </v-col>

                                </v-row>
                            </v-card-text>
                        </v-col>
                    </v-row> 
                </v-card-text>

                <v-card-text class="py-9 px-8 prdInfo_text">
                    <div class="d-flex justify-space-between flex-wrap flex-column flex-sm-row">
                        <div class="mb-6 mb-sm-0">
                        <div class="mb-4 d-flex align-center">
                            <span class="font-weight-semibold text-xs me-2">Salesperson: {{appQuotInfo.appSalespersonName}}</span>
                        </div>
                    
                        {{appQuotInfo.appThanksNote}}
                    
                        </div>
                        <div>
                        <table class="w-full">
                            <tr>
                                <td class="pe-16 text-xs ">
                                    Subtotal:
                                </td>
                                <th :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    {{appQuotInfo.appSubTotal}}
                                </th>
                            </tr>
                           
                            
                        </table>
                        <v-divider class="mt-4 mb-3"></v-divider>
                        <table class="w-full">
                            <tr>
                                <td class="pe-16 font-weight-semibold text-1xl">
                                    Total:
                                </td>
                                <th :class="$vuetify.rtl ? 'font-weight-semibold text-1xl text-left' : 'font-weight-semibold text-1xl text-right'">
                                    {{appQuotInfo.appOrderTotal}}
                                </th>
                            </tr>
                            <tr>
                                <td class="text-sst" colspan="2">
                                    6% SST included wherever applicable                           
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <!-- <v-card-text class="px-8 py-6">
                    <div class="mb-0">
                        <p class="font-weight-semibold mb-2">
                        Note:
                        </p>
                        <v-textarea
                        v-model="quotationData.note"
                        outlined
                        rows="3"
                        hide-details="auto"
                        placeholder="It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!"
                        ></v-textarea>
                    </div>
                </v-card-text> -->
            </v-card>
        </v-col>

         <!-- Right Column: Quotation Action -->
      <v-col cols="12" md="4">
        <v-select
          outlined
          :items="sendMethods"
          dense
          placeholder="send method Via"
          :menu-props="{ offsetY: true }"
          hide-details="auto"
          class="mb-6"
        ></v-select>

        <v-card class="mb-6">
          <v-card-text>
            <v-btn
              color="primary"
              class="mb-2"
              block
              @click="isSendSidebarActive = true"
            >
              <v-icon
                class="me-2"
                left
              >
                {{ icons.mdiSendOutline }}
              </v-icon>
              <span>Send</span>
            </v-btn>
            <v-btn
              class="mb-3"
              color="secondary"
              block
              outlined
              @click="gotoPreview()"
            >
              Preview
            </v-btn>
            <v-btn
              color="secondary"
              block
              outlined
            >
              Save
            </v-btn>
          </v-card-text>
        </v-card>

       

        <!-- <div class="d-flex align-center justify-space-between mb-3">
          <span>Payment Terms</span>
          <v-switch
            hide-details="auto"
            :input-value="true"
            class="mt-0"
          ></v-switch>
        </div>

        <div class="d-flex align-center justify-space-between mb-3">
          <span>Client Notes</span>
          <v-switch
            hide-details="auto"
            :input-value="false"
            class="mt-0"
          ></v-switch>
        </div>
        <div class="d-flex align-center justify-space-between">
          <span>Payment Stub</span>
          <v-switch
            hide-details="auto"
            :input-value="false"
            class="mt-0"
          ></v-switch>
        </div> -->
      </v-col>
    </v-row>
</template>

<script>
import themeConfig from '@themeConfig'
import { mdiSendOutline, mdiCurrencyUsd } from '@mdi/js'
import store from "@/store";

export default {

    computed: {

        appProdcInfo(){
                return store.state.appQuotationStoreModule.selectedProdct ;
        },

        appQuotInfo(){

                let obj ={};
                obj.appType = store.state.appQuotationStoreModule.appType;
                obj.appTypeDesc = store.state.appQuotationStoreModule.appTypeDesc;
                obj.appPackage = store.state.appQuotationStoreModule.appPackage;
                obj.appPackageDesc = store.state.appQuotationStoreModule.appPackageDesc;
                obj.appPromotion = store.state.appQuotationStoreModule.appPromotion;
                obj.appPromotionDesc = store.state.appQuotationStoreModule.appPromotionDesc;
                obj.appSubTotal = store.state.appQuotationStoreModule.appSubTotal;
                obj.appOrderTotal = store.state.appQuotationStoreModule.appOrderTotal;
                obj.appDiscount = store.state.appQuotationStoreModule.appDiscount;
                obj.appQuantity = store.state.appQuotationStoreModule.appQuantity;
                obj.quotationNo = store.state.appQuotationStoreModule.quotationNo;
                obj.issuedDate = store.state.appQuotationStoreModule.issuedDate;
                obj.appPackage = store.state.appQuotationStoreModule.appPackage;
                obj.dueDate = store.state.appQuotationStoreModule.dueDate;
                obj.appNote = store.state.appQuotationStoreModule.appNote;
                obj.appThanksNote = store.state.appQuotationStoreModule.appThanksNote;
                obj.appSalespersonName = store.state.appQuotationStoreModule.appSalespersonName; 
                obj.appCustName = store.state.appQuotationStoreModule.appCustName;
                obj.appCustEmail = store.state.appQuotationStoreModule.appCustEmail;
                obj.appCustMobile = store.state.appQuotationStoreModule.appCustMobile; 

                return obj;            
            },
    },

    methods: {
        printQuoation() {
             window.print();
        }
    },

    data () {
        const sendMethods = ['Both', 'eMail' ,'WhatsApp']

        return {
            appName: themeConfig.app.name,
            appLogo: themeConfig.app.logo,
            isDueDateMenuOpen:false,
            isAddPaymentSidebarActive: false,
            sendMethods,
            icons: {
                mdiSendOutline,
                mdiCurrencyUsd,
            },
        }
    }
}
</script>





<style lang="scss">
@import '~@core/preset/preset/apps/invoice.scss';

.fixed-image {
    right: 20px; /* 화면 오른쪽에서의 간격 조절 */
    max-width: 200px; /* 최대 너비 설정 */
    max-height: 200px; /* 최대 높이 설정 */
/* 다른 스타일 속성들 */
}

.text-sst{
    text-align: left;
    font-size: 10px; /* 원하는 크기로 변경 */
}

.card-text-custom{
    //height: 230px;
}

.custom-text-field {
    height: 25px;
}

.app-invoice-editable {
.input-salesperson {
  width: 100px;
}

.select-invoice-to {
  width: 190px !important;
}

.header-inputs {
  width: 122px;
}

.prdInfo_text{
    height: 130px;
}

.add-products-form {
  .single-product-form {
    &:not(:first-child) {
      margin-top: 2rem;
    }
  }

  .header-spacer {
    // This is according to item actions width
    width: 39px;
  }
  .item-actions {
    @at-root {
      @include theme--child(add-products-form) using ($material) {
        .item-actions {
          border-left: thin solid map-deep-get($material, 'dividers');
        }
      }
    }
  }
}
}
</style>
