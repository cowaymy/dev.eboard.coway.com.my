    <template>
               <div class="table-container" >
                
                <v-overlay :value="loading">
                    <v-progress-circular
                    indeterminate
                    color="info"
                    ></v-progress-circular>
                </v-overlay>
                
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="7">
                                <v-img
                                    :src="appLogo"
                                    max-height="100px"
                                    max-width="120px"
                                    alt="logo"
                                    contain
                                ></v-img>
                                <br>

                                <h5 class="text--secondary font-weight-semibold">{{this.$store.state.userInfo.businessAreaDesc}}</h5> <br>
                                <span class="text--primary text-md font-weight-semibold">{{ this.$store.state.userInfo.userFullName}} </span>

                            </v-col>

                            
                            <v-col cols="12" md="5">
                 

                                <v-text-field
                                    v-model ="selectedSalesOrderformNo"
                                    label="Sales order form"
                                    placeholder="Sales order form No"
                                    class="custom-height right-aligned-label custom-label "
                                    @change="onSalesOrderFormNoChange"
                                    @input="convertToUppercase"
                                    @keyup.enter="selectExistSofNo"
                                >
                                              
                                <template   v-if = "isExistSofNo ==false"   #prepend-inner>
                                    <v-icon size="23"  class="mx-1" color="info" >
                                        {{ icons.mdiCheckDecagram }}
                                    </v-icon>
                                </template>
                                <template  #append-outer>
                                    <v-icon size="23" class="mx-1" @click="selectExistSofNo()">
                                       {{ icons.mdiMagnify }}
                                    </v-icon>
                                </template>
                            </v-text-field>  
                            </v-col>
                        
                        </v-row>
                        <br>
                        <br>
                        <v-row>
                            <v-col cols="12" md="12">
                                    <span class="font-weight-semibold text-sm">
                                            Customer information<br>
                                            <v-divider color="#16B1FF"></v-divider>
                                    </span>
                                </v-col>
                           
                        </v-row>

                        <v-row>
                          <!-- Tabs -->
                          <v-tabs v-model="tab"     class="custom-tabs" >
                            <v-tab key="1" href='#1'>
                                <h5>Customer</h5>
                            </v-tab>
                            <v-tab key="2" href='#2'>
                                <h5>Install</h5>
                            </v-tab>
                            <v-tab key="3" href='#3'>
                                <h5>Payment</h5>
                            </v-tab>
                            <v-tab key="4" href='#4'>
                                <h5>Attachment</h5>
                            </v-tab>
                        </v-tabs>

                        <!-- Tab Items -->
                        <v-tabs-items v-model="tab">
                            <v-tab-item key=1  value='1'>
                            <v-card >
                                    <v-card-text> 

                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <span class="font-weight-semibold text-sm">
                                                        Customer <br>
                                                        <v-divider ></v-divider>
                                                </span>
                                            </v-col>

                                            <v-col cols="12" md="12">
                                                <div class="d-flex flex-column"  v-if =etrustCustInfo >
                                                        <h5 class="text--primary font-weight-semibold"> {{etrustCustInfo.NAME}}  </h5>         
                                                        <h5 class="text--secondary ">{{`Customer ID : ${etrustCustInfo.CUST_ID}`}}</h5>
                                                        <h5 class="text--secondary ">{{`NRIC/Company : ${etrustCustInfo.NRIC}`}}</h5>
                                                        <h5 class="text--success  font-weight-semibold">{{`Status : ${etrustCustInfo.CUST_STATUS}`}} </h5>

                                                        <h5 class="text--secondary ">{{`Customer Type : ${etrustCustInfo.CODE_NAME1}`}} </h5>
                                                        <h5 class="text--secondary ">{{`Nationality : ${etrustCustInfo.CODE_NAME2}`}} </h5>
                                                        <h5 class="text--secondary ">{{`DOB : ${etrustCustInfo.DOB}`}} </h5>


                                                        <br>
                                                        <div class="d-flex flex-column" v-if="eCustCntcJsonInfo">
                                                            <span class="text--secondary text-ls font-weight-semibold">Contact Person information</span>
                                                            <v-divider></v-divider>
                                                            <h5 class="text--secondary ">{{`Service contact person name : ${makempty(eCustCntcJsonInfo.name1)}`}} </h5>
                                                            <h5 class="text--secondary ">{{`Mobile : ${makempty(eCustCntcJsonInfo.telM1)}`}} </h5>
                                                            <h5 class="text--secondary ">{{`Tel (Residence/Office) : ${makempty(eCustCntcJsonInfo.telM2)}`}} </h5>
                                                        </div>
                                                        <br>   
                                                    </div>
                                            </v-col>
                                            </v-row>  

                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item key=2  value='2'>
                            <v-card >
                                    <v-card-text> 
                                        <v-row>
                                        <v-col cols="12" md="12">
                                            <span class="text--secondary text-sm font-weight-semibold">Install address info</span>
                                            <v-divider ></v-divider>
                                        </v-col>

                                        <v-col cols="12" md="12">
                                       
                                                <v-select
                                                    v-model="selectedECustomerAddress"
                                                    :items="eCustomerAddressJsonList"
                                                    label="Select existing address "
                                                    placeholder="existing address "
                                                    item-value="custAddId"
                                                    :item-text="combinCodeName"
                                                    return-object
                                                    @change="onCustomerAddressJsonListChange"
                                                    class="custom-text-field custom-label"
                                            >

                                                        <template v-slot:prepend-item>
                                                            <v-list-item class="info">
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Please choose  one
                                                                </v-list-item-title>
                                                            </v-list-item-content>
                                                            </v-list-item>
                                                            <v-divider></v-divider>
                                                        </template>
                                            </v-select>
                                            <div class="d-flex flex-column" v-if="eCustAddJson" >
                                                <h5 class="text--primary "> {{`Address Line : ${makempty(eCustAddJson.addrDtl)}`}}  </h5>         
                                                <h5 class="text--secondary ">{{`Area  : ${makempty(eCustAddJson.area)}`}}</h5>
                                                <h5 class="text--secondary ">{{`City  : ${makempty(eCustAddJson.city)}`}}</h5>
                                                <h5 class="text--secondary  ">{{`PostCode : ${makempty(eCustAddJson.postcode)}`}} </h5>
                                                <h5 class="text--secondary  ">{{`State : ${makempty(eCustAddJson.state)}`}} </h5>
                                                <h5 class="text--secondary  ">{{`Country  : ${makempty(eCustAddJson.country)}`}} </h5>

                                                <h5 class="text--secondary  ">{{`DSC Branch : ${makempty(selectedDscBranchInfoDesc)}`}} </h5>
                                                <h5 class="text--secondary  ">{{`Posting Branch  : ${makempty(selectedPostingBranchInfoDesc)}`}} </h5>

                                            <br>

                                            <v-select v-if="false"
                                                    v-model="selectedDscBranchInfo"
                                                    :items="selectedBranchList"
                                                    label="DSC Branch "
                                                    placeholder="DSC Branch"
                                                    item-value="CODE_ID"
                                                    item-text="CODE_NAME"
                                                    return-object
                                                    class="custom-text-field"
                                            />
                                            <v-select v-if="false"
                                                    v-model="selectedPostingBranchInfo"
                                                    :items="selectedBranchList"
                                                    label="Posting Branch "
                                                    placeholder="Posting Branch"
                                                    item-value="CODE_ID"
                                                    item-text="CODE_NAME"
                                                    class="custom-text-field"
                                                    return-object
                                                    readonly
                                            />
                                            </div>
                                        </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item key=3  value='3'>
                            <v-card >
                                    <v-card-text> 
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <span class="text--secondary text-sm font-weight-semibold">Payment info</span>
                                                <v-divider ></v-divider>
                                            </v-col>
                                            <v-col cols="12" md="12">

                                                <div v-if="selectedCustCreaditCardInfo" class="d-flex flex-column">
                                                    <span class="text--secondary text-xs font-weight-semibold"> Bank Card </span>
                                                
                                                    <h5 class="text--secondary  ">{{`Card Number : ${selectedCustCreaditCardInfo.custCrcNo}`}} </h5>
                                                    <h5 class="text--secondary  ">{{`Visa/Master : ${selectedCustCreaditCardInfo.codeName1}`}} </h5>
                                                    <h5 class="text--secondary  ">{{`Name on Card   : ${selectedCustCreaditCardInfo.custCrcOwner}`}} </h5>
                                                    <h5 class="text--secondary  ">{{`Issue Bank   : ${selectedCustCreaditCardInfo.bankName}`}} </h5>
                                                    <h5 class="text--secondary ">{{`Card Type   : ${selectedCustCreaditCardInfo.codeName}`}} </h5>
                                                </div>
                                                <br>
                                                
                                                <div v-if="selectedCustBankAccInfo" class="d-flex flex-column">
                                                    <span class="text--secondary text-xs font-weight-semibold" > Direct Debit </span>
                                            
                                                    <h5 class="text--secondary  ">{{`Account Number : ${selectedCustBankAccInfo.custAccNo}`}} </h5>
                                                    <h5 class="text--secondary  ">{{`Account Type	 : ${selectedCustBankAccInfo.codeName}`}} </h5>
                                                    <h5 class="text--secondary  ">{{`Name on Card   : ${selectedCustBankAccInfo.custAccOwner}`}} </h5>
                                                    <h5 class="text--secondary ">{{`Issue Bank   : ${selectedCustBankAccInfo.bankCodeName}`}} </h5>
                                                </div>

                                            </v-col>    
                                        </v-row>  
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item key=4 value='4'>
                                <v-card>

                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <span class="font-weight-semibold text-sm">
                                                        Attachment<br>
                                                        <v-divider ></v-divider>
                                                </span>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                            <h5 class="text-success"  > Only allow picture format (JPG, PNG, JPEG, PDF) less than 2 MB.</h5>
                                            </v-col>

                                        

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="sof_File"
                                                    label="Sales Order Form"
                                                    class="custom-height custom-label"
                                                    chips
                                                    @change="handleFileChange('sof_File', $event)"
                                                ></v-file-input>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                v-model="nric_File"
                                                    label="NRIC & Bank Card"
                                                    class="custom-height custom-label"
                                                    chips
                                                    @change="handleFileChange('nric_File', $event)"
                                                ></v-file-input>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                v-model="softnc_File"
                                                    label="SOF TnC"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('softnc_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="payment_File"
                                                    label="Payment document"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('payment_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="tr_File"
                                                    label="Temporary receipt (TR)"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('tr_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="dlof_File"
                                                    label="Declaration letter Others form"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('dlof_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="dlof2_File"
                                                    label="Declaration letter Others form2"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('dlof2_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="msof_File"
                                                    label="mSales Order Form(SOF)"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('msof_File', $event)"
                                                ></v-file-input>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-file-input
                                                    v-model="msoftnc_File"
                                                    label="mSales Order Form TnC(SOF TnC)"
                                                    class="custom-height"
                                                    chips
                                                    @change="handleFileChange('msoftnc_File', $event)"
                                                ></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>    

                                </v-card>
                            </v-tab-item>
                         </v-tabs-items>
                     </v-row>


                        <v-row>
                             <v-col cols="12" md="12">
                                <span class="font-weight-semibold text-sm">
                                        Prodect detail<br>
                                        <v-divider color="#16B1FF"></v-divider>
                                </span>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="4">
                                <v-card-text>
                                    <div class="center-container1" >
                                        <v-img  v-if="appProdcInfo" 
                                        :src= makeImgURL(appProdcInfo) 
                                        ></v-img>
                                    </div>
                                </v-card-text>
                            </v-col>

                            <v-col cols="12" md="8">   
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <h6 class="font-weight-semibold text-2xl">
                                                {{appProdcInfo == null ?  "" :appProdcInfo.TITLE }}
                                            </h6>
                                            <p class="font-weight-semibold text-xs mb-0">
                                                {{ appProdcInfo == null ?  "" : appProdcInfo.CATEGORY }}({{appProdcInfo == null ?  "" : appProdcInfo.MODEL}})
                                            </p>
                                        </v-col>

                                        <v-col cols="12" >
   
                                            <v-text-field
                                                placeholder="APPLICATION TYPE"
                                                label="APPLICATION TYPE"
                                                class="custom-height"
                                                v-model="appPriceInfo.appTypeDesc"
                                                readonly
                                            />  
                                        </v-col> 

                                        <v-col cols="12" >
                                            <v-text-field
                                                placeholder="PACKAGE"
                                                label="PACKAGE"
                                                class="custom-height"
                                                v-model="appPriceInfo.appPackageDesc"
                                                readonly
                                            />
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                placeholder="PROMOTION"
                                                label="PROMOTION"
                                                class="custom-height"
                                                v-model="appPriceInfo.appPromotionDesc"
                                                readonly
                                            />
                                        </v-col>


                                        <v-col cols="12" v-if=isHomecareProduct>
                                            <div class="underline" >AUX Product (Frame/Outdoor Unit)</div>
                                        </v-col>


                                        <v-col cols="12" v-if=isHomecareProduct>
                                            <v-text-field
                                                placeholder="AUX Product"
                                                label="AUX Product"
                                                class="custom-height"
                                                v-model="appPriceInfo.appAuxProductDesc"
                                                readonly
                                            />
                                        </v-col>
                                       

                                        <v-col cols="12" v-if=isHomecareProduct>
                                            <v-text-field
                                                placeholder="AUX Promotion"
                                                label="AUX Promotion"
                                                class="custom-height"
                                                v-model="appPriceInfo.appAuxProductPromotionDesc"
                                                readonly
                                            />
                                        </v-col>

                                        <v-col cols="12" >
                                            <v-text-field
                                                v-model="appPriceInfo.appQuantity"
                                                placeholder="QUANTITY"
                                                label="QUANTITY"
                                                class="custom-height"
                                                readonly
                                            />
                                        </v-col>

                                    </v-row>
                                </v-card-text>

                                <v-card-text >
                                        <div class="d-flex justify-space-between flex-wrap flex-column flex-sm-row">
                                            <div> <v-spacer></v-spacer> </div>
                                            
                                            <div>
                                                <table class="w-full">
                                                    <tr>
                                                        
                                                        <td :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                                            Subtotal : RM {{addCommasToInteger(appPriceInfo.appSubTotal)}}
                                                        </td>
                                                    </tr>
                                                </table>
                                                <v-divider class="mt-4 mb-3" color="black"></v-divider>
                                                <table class="w-full">
                                                    <tr>
                                                        <!-- <td class="pe-16 font-weight-semibold">
                                                            Total:
                                                        </td> -->
                                                        <td class="text-right">
                                                            Total : <span class="text--dark font-weight-semibold text-ms">RM {{addCommasToInteger(appPriceInfo.appOrderTotal) }}</span> {{appPriceInfo.appType==66 ? '/month' : ''}}
                                                        </td>
                                                    </tr>
                                                </table>
                                           </div>
                                        </div>
                                </v-card-text>
                            </v-col>
                        </v-row> 
                    </v-card-text>
                </v-card> 
            </div>
    </template>
    
    <script>
    import Vue from "vue";
    import themeConfig from '@themeConfig'
    import store from "@/store";
    import quotationApi from "@/api/quotationApi.js";
    import {mdiAccountSettings,mdiMagnify,mdiCheckDecagram} from '@mdi/js'
 
    
    
    export default {
        props: {
             selectedCustCreaditCardInfo: Object ,
             selectedCustBankAccInfo:Object
        },

        computed: {

            loading(){
                return this.$store.state.appQuotationStoreModule.loading
            },

            selectedItemInfo(){

                console.log("STK_IMG::::",store.state.appQuotationStoreModule.selectedProdct.STK_IMG)
                return store.state.appQuotationStoreModule.selectedProdct 
            },
            
            etrustCustInfo(){
                return store.state.appQuotationStoreModule.etrustCustInfo
            },

            eCustAddJson(){
                return store.state.appQuotationStoreModule.eCustAddJson
            },

            eCustCntcJsonInfo(){
                return store.state.appQuotationStoreModule.eCustCntcJsonInfo
            },

            eCustomerAddressJsonList(){
                return store.state.appQuotationStoreModule.eCustomerAddressJsonList
            },

            selectedBranchList(){
                return store.state.appQuotationStoreModule.selectedBranchList
            },


            custCreaditCardList(){
                return store.state.appQuotationStoreModule.custCreaditCardList
            },

                    
            custBankAccList(){
                return store.state.appQuotationStoreModule.custBankAccList
            },

            productPromotionPriceByPromoStock(){
                return store.state.appQuotationStoreModule.productPromotionPriceByPromoStock
            },


            productAuxPromotionPriceByPromoStock(){
                return store.state.appQuotationStoreModule.productAuxPromotionPriceByPromoStock
            },

            selectStockPackagePriceInfo(){
                return store.state.appQuotationStoreModule.selectStockPackagePriceInfo
            },
            selectAuxStockPriceJsonInfo(){
                return store.state.appQuotationStoreModule.selectAuxStockPriceJsonInfo
            },

            isExistSofNo(){
                return store.state.appQuotationStoreModule.isExistSofNo
            },

            isExistSofNoImg(){
                return store.state.appQuotationStoreModule.isExistSofNo ? '':  this.icons.mdiMagnify 
            },

            isHomecareProduct(){
                return this.$store.state.appQuotationStoreModule.isHomecareProduct
            },


            appPriceInfo(){
                let obj ={};
                obj.appType = store.state.appQuotationStoreModule.appType;
                obj.appTypeDesc = store.state.appQuotationStoreModule.appTypeDesc;
                obj.appPackage = store.state.appQuotationStoreModule.appPackage;
                obj.appPackageDesc = store.state.appQuotationStoreModule.appPackageDesc;
                obj.appPromotion = store.state.appQuotationStoreModule.appPromotion;
                obj.appPromotionDesc = store.state.appQuotationStoreModule.appPromotionDesc;
                obj.appDiscount = store.state.appQuotationStoreModule.appDiscount;
                obj.appQuantity = store.state.appQuotationStoreModule.appQuantity;


                if(this.isHomecareProduct){
                    obj.appAuxProduct = store.state.appQuotationStoreModule.appAuxProduct;
                    obj.appAuxProductDesc = store.state.appQuotationStoreModule.appAuxProductDesc;
                    obj.appAuxProductPromotion = store.state.appQuotationStoreModule.appAuxProductPromotion;
                    obj.appAuxProductPromotionDesc = store.state.appQuotationStoreModule.appAuxProductPromotionDesc;
                }

                if(this.productPromotionPriceByPromoStock){
                    obj.appSubTotal = store.state.appQuotationStoreModule.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                    obj.appOrderTotal = store.state.appQuotationStoreModule.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                } 

                console.log(obj)

                return obj;
            },

            
            appProdcInfo(){
                let obj= {};
                obj= store.state.appQuotationStoreModule.selectedProdct == null ?{}:store.state.appQuotationStoreModule.selectedProdct;
                return obj ;
            },
            
            appQuotInfo(){
                let obj ={};
                obj.quotationNo = store.state.appQuotationStoreModule.quotationNo;
                obj.issuedDate = store.state.appQuotationStoreModule.issuedDate;
                obj.appPackage = store.state.appQuotationStoreModule.appPackage;
                obj.dueDate = store.state.appQuotationStoreModule.dueDate;
                obj.appNote = store.state.appQuotationStoreModule.appNote;
                obj.appThanksNote = store.state.appQuotationStoreModule.appThanksNote;
                obj.appSalespersonName = store.state.appQuotationStoreModule.appSalespersonName; 

                /** customer info */
                obj.appCustName = store.state.appQuotationStoreModule.appCustName; 
                obj.appCustEmail = store.state.appQuotationStoreModule.appCustEmail; 
                obj.appCustMobile = store.state.appQuotationStoreModule.appCustMobile; 
                obj.appCustType = store.state.appQuotationStoreModule.appCustType; 

                return obj;            
            },
         
        },
        methods: {
                    
            convertToUppercase() {
                    this.selectedSalesOrderformNo = this.selectedSalesOrderformNo.toUpperCase();
            },

            makeImgURL(url){

                if(url) return `https://emall.coway.com.my/${url.STK_IMG}`
                else return '' 

            },

            onSalesOrderFormNoChange(){
                store.state.appQuotationStoreModule.isExistSofNo =true;
            },


            
            selectExistSofNo(){
                if(this.isInvalid(this.selectedSalesOrderformNo)) {
                    this.invalidMsg('Sales Order Form');
                    return  false;
                }

                if(this.isHomecareProduct){
                    if( ! this.selectedSalesOrderformNo.startsWith('MSO') ){
                            Vue.toasted
                            .error('Please key in MSO at SOF No' , {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                            text: "Close",
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            },
                                        },
                            }).goAway(3500);

                        return false; 
                    }

                }else{
                    if( ! this.selectedSalesOrderformNo.startsWith('AAA') ){
                            Vue.toasted
                            .error('Please key in AAA at SOF No' , {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                            text: "Close",
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            },
                                        },
                            }).goAway(3500);

                        return false; 
                    }
                }


                let payload ={sofNo:this.selectedSalesOrderformNo};
                store.dispatch(`appQuotationStoreModule/selectExistSofNo` ,  payload).then(
                    (response) =>{
                       
                        console.log(response);

                        if(response.data.dataList.isExist  =='true'){
                            Vue.toasted
                            .error(` ${this.selectedSalesOrderformNo} has already been used `, {
                                        icon: "info",
                                        position: "top-center",
                                        action: {
                                            text: "Close",
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            },
                                        },
                            }).goAway(3500);
                    
                            this.selectedSalesOrderformNo ='';
                        }

                        return false;
                    }
                ).catch((error) => {
                    this.$toasted .error('Please check Apis server status', {
                        icon: "check",
                        position: "top-center",
                        action: {
                            text: 'Undo',
                            onClick: (e, toastObject) => {
                                this.selectedSalesOrderformNo ='';
                                toastObject.goAway(0); // 토스트 메시지를 즉시 닫습니다.
                            }
                        }
                    });
              });
            },


            onCustomerAddressJsonListChange(item){
                console.log(item);

                let payload ={}
                payload.custAddId = item.custAddId;
                store.dispatch(`appQuotationStoreModule/selectCustAddJsonInfo` ,  payload).then(
                    (response) =>{

                            //console.log("selectCustAddJsonInfo", response)
                            this.selectedDscBranchInfo = response.data.dataList.brnchId;
                            this.selectedPostingBranchInfo = response.data.dataList.soBrnchId;

                            let dscDesc ='';
                            let postDesc ='';

                            this.selectedBranchList.forEach(element => {
                                    if( element.CODE_ID == response.data.dataList.brnchId){
                                        dscDesc = element.CODE_NAME;
                                    }

                                    if( element.CODE_ID == response.data.dataList.soBrnchId){
                                        postDesc = element.CODE_NAME;
                                    }
                                }
                            );

                            this.selectedDscBranchInfoDesc = dscDesc; 
                            this.selectedPostingBranchInfoDesc = postDesc; 

                    }
                ).catch((error) => {
                    this.$toasted .error('Please check Apis server status', {
                        icon: "check",
                        position: "top-center",
                        action: {
                            text: 'Undo',
                            onClick: (e, toastObject) => {
                                toastObject.goAway(0); // 토스트 메시지를 즉시 닫습니다.
                            }
                        }
                    });
                });
            },

            combinCodeName(item){
                return `${item.name} (${item.addrDtl})`;
            },

            addCommasToInteger(number) {

                if(number)
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            makempty(value){
                if(value=== '' || value === null || value===undefined){
                    
                    return ''
                }
                return value;
           },


           handleFileChange(index, event){
                const file = event;
                if(index=='sof_File'){
                    this.sof_File =file;
                }else if(index=='nric_File'){
                    this.nric_File =file;
                }else if(index=='payment_File'){
                    this.payment_File =file;
                }else if(index=='tr_File'){
                    this.tr_File =file;
                }else if(index=='dlof_File'){
                    this.dlof_File =file;
                }else if(index=='dlof2_File'){
                    this.dlof2_File =file;
                }else if(index=='softnc_File'){
                    this.softnc_File =file;
                }else if(index=='msof_File'){
                    this.msof_File =file;
                }else if(index=='msoftnc_File'){
                    this.msoftnc_File =file;
                }
           },

            uploadFiles(){

                this.selectedAttchedGrpFileId =null; 

                if(this.isInvalid(this.sof_File)) {
                    this.invalidMsg('Sales Order Form Atteche');
                    return ;
                }
                if(this.isInvalid(this.nric_File)) {
                    this.invalidMsg('Customer NRIC & Bank Card');
                    return ;
                }
                
                if(! this.checkRequiedField()){
                    return 
                }


                const formData = new FormData();

                if (this.sof_File)  formData.append('1', this.sof_File);
                if (this.nric_File) formData.append('2', this.nric_File);
                if (this.payment_File) formData.append('3', this.payment_File);
                if (this.tr_File) formData.append('4', this.tr_File);
                if (this.dlof_File) formData.append('5', this.dlof_File);
                if (this.dlof2_File) formData.append('6', this.dlof2_File);
                if (this.softnc_File) formData.append('7', this.softnc_File);
                if (this.msof_File) formData.append('8', this.msof_File);
                if (this.msoftnc_File) formData.append('9', this.msoftnc_File);

                formData.append('userId', store.state.userInfo.userId);

                this.$store.state.appQuotationStoreModule.loading =true;

                fetch(`${process.env.VUE_APP_API_URL}/apps/quota/attachFileUpload`, {
                    method: 'POST',
                    body: formData,
                    headers :{
                        Authorization : store.state.token
                    }
                })
                .then((response) => { 
                    console.log("attachFileUpload::::: ", response);

                    if(response.ok){
                       return  response.json();
                    }else{
                        Vue.toasted
                        .error(response.message, {
                                icon: "info",
                                position: "top-center",
                                action: {
                                        text: "Close",
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        },
                                    },
                        }).goAway(3500);
                    }
                }) .then(data => {
                    console.log('Success:', data); // JSON 데이터 출력
                    this.selectedAttchedGrpFileId = data.dataList.data.fileGroupKey;

                    console.log('selectedAttchedGrpFileId:', this.selectedAttchedGrpFileId); // JSON 데이터 출력

                    ////////////save preOrder///////// 
                    if(this.isHomecareProduct){
                        this.doHomeCareSavePreOrder();
                    }else{
                        this.doSavePreOrder();
                    }
                    ////////////save preOrder/////////

                })
                .catch((error) => {
                    console.error(error);
                    store.state.appQuotationStoreModule.loading =false; 
                });
           },

           isInvalid(value) {
                return value === null || value === undefined || value === '';
           },
           
           invalidMsg(msg){
                Vue.toasted
                .error(`${msg} is required field `, {
                        icon: "info",
                        position: "top-center",
                        action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(3500);
           },


           checkRequiedField(){


                console.log('selectedSalesOrderformNo::',this.selectedSalesOrderformNo)            
                if(this.isInvalid(this.selectedSalesOrderformNo)) {
                    this.invalidMsg('Sales order form No');
                    return  false ;
                }

                if(this.isInvalid(this.appPriceInfo.appType)) {
                    this.invalidMsg('Application Type');
                    return false;
                }
                if(this.isInvalid(this.appPriceInfo.appPackage)) {
                    this.invalidMsg('Package');
                    return false;
                }
                if(this.isInvalid(this.appPriceInfo.appPromotion)) {
                    this.invalidMsg('Promotion');
                    return false;
                }
                if(this.isInvalid(this.etrustCustInfo.CUST_ID)) {
                    this.invalidMsg('Customer ID');
                    return false;
                }
          
                console.log('custCntcId::',this.eCustCntcJsonInfo.custCntcId)
                if(this.isInvalid(this.eCustCntcJsonInfo.custCntcId)) {
                    this.invalidMsg('Customer contact ID');
                    return false;
                }

                console.log('custAddId::',this.eCustAddJson.custAddId)
                if(this.isInvalid(this.eCustAddJson.custAddId )) {
                    this.invalidMsg('Customer install address ID');
                    return false;
                }

                console.log('custAddId::',this.eCustAddJson.custAddId)
                if(this.isInvalid(this.eCustAddJson.custAddId )) {
                    this.invalidMsg('Customer install address ID');
                    return false;
                }

                console.log('Posting::',this.selectedPostingBranchInfo)
                if(this.isInvalid(this.selectedPostingBranchInfo )) {
                    this.invalidMsg('Posting branch ID');
                    return false;
                }

                console.log('DSC branch::',this.selectedDscBranchInfo)
                if(this.isInvalid(this.selectedDscBranchInfo )) {
                    this.invalidMsg('DSC branch ID');
                    return false;
                }

                console.log(' STK_ID::',this.selectedItemInfo.STK_ID)
                if(this.isInvalid(this.selectedItemInfo.STK_ID )) {
                    this.invalidMsg('Product ID');
                    return false;
                }

                return true;
           },

           /**/ 
           doHomeCareSavePreOrder(){

                console.log('in do save pre order  befer check');


                //sofno check again
                if(this.selectExistSofNo()){
                    console.log('return selectExistSofNo');
                    return ;
                }

                if(! this.checkRequiedField()){

                    console.log('return checkRequiedField ');

                    return ;
                }

                if(this.isInvalid(this.selectedAttchedGrpFileId)) {
                    this.invalidMsg('Attched File ID');
                    return false;
                }

                console.log('in do save pre order ');

                const preOderInfoJson ={};

                preOderInfoJson.sofNo =this.selectedSalesOrderformNo;
                preOderInfoJson.appTypeId =this.appPriceInfo.appType;
                preOderInfoJson.srvPacId  =this.appPriceInfo.appPackage;

                preOderInfoJson.custPoNo='';
                preOderInfoJson.instPriod='';

                preOderInfoJson.custId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.empChk='0';

                preOderInfoJson.atchFileGrpId =this.selectedAttchedGrpFileId;
                preOderInfoJson.custCntcId =this.eCustCntcJsonInfo.custCntcId;  
                preOderInfoJson.instAddId  =this.eCustAddJson.custAddId ;
                preOderInfoJson.keyinBrnchId =this.selectedPostingBranchInfo; 
                preOderInfoJson.dscBrnchId =this.selectedDscBranchInfo ;

                preOderInfoJson.instct='';
                preOderInfoJson.exTrade='0';
              

                // preOderInfoJson.mthRentAmt=  this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                // preOderInfoJson.totAmt=this.productPromotionPriceByPromoStock.orderPricePromo;
                // preOderInfoJson.norAmt=this.selectStockPackagePriceInfo.orderPrice;
                // preOderInfoJson.discRntFee=this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                // preOderInfoJson.totPv=this.productPromotionPriceByPromoStock.orderPVPromo;
                // preOderInfoJson.totPvGst=this.productPromotionPriceByPromoStock.orderPVPromoGST;
                // preOderInfoJson.prcId=this.selectStockPackagePriceInfo.ordPriceId;

                preOderInfoJson.memCode = store.state.userInfo.userName;
                preOderInfoJson.crtUserId = store.state.userInfo.userId;

                preOderInfoJson.advBill ='0';
                preOderInfoJson.custCrcId=this.selectedCustCreaditCardInfo.custCrcId;
                preOderInfoJson.bankId   =this.selectedCustCreaditCardInfo.custCrcBankId;
                preOderInfoJson.custAccId='0';
                preOderInfoJson.is3rdParty='0';

                preOderInfoJson.rentPayCustId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.rentPayModeId='131';

                preOderInfoJson.custBillId='0';
                preOderInfoJson.custBillCustId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.custBillCntId=this.eCustCntcJsonInfo.custCntcId;
                preOderInfoJson.custBillAddId=this.eCustAddJson.custAddId ;
                preOderInfoJson.custBillEmail='';
                preOderInfoJson.custBillIsSms='1';
                preOderInfoJson.custBillIsPost='0';
                preOderInfoJson.custBillEmailAdd='';

                preOderInfoJson.custBillIsWebPortal='0';
                preOderInfoJson.custBillWebPortalUrl='';
                preOderInfoJson.custBillIsSms2='0';
                preOderInfoJson.custBillCustCareCntId='';

                preOderInfoJson.corpCustType=this.etrustCustInfo.corpTypeId;
                preOderInfoJson.agreementType='';
                preOderInfoJson.salesOrdIdOld='';

                preOderInfoJson.relatedNo='';
                preOderInfoJson.isExtradePR='';
                preOderInfoJson.receivingMarketingMsgStatus=this.etrustCustInfo.receivingMarketingMsgStatus;
                preOderInfoJson.voucherCode='';


                /*homecare*/ 
                preOderInfoJson.itmCompId1=null;
                preOderInfoJson.itmStkId1=this.selectedItemInfo.STK_ID;
                preOderInfoJson.promoId1=this.appPriceInfo.appPromotion;


                preOderInfoJson.mthRentAmt1=  this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                preOderInfoJson.totAmt1=this.productPromotionPriceByPromoStock.orderPricePromo;
                preOderInfoJson.norAmt1=this.selectStockPackagePriceInfo.orderPrice;
                preOderInfoJson.discRntFee1=this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                preOderInfoJson.totPv1=this.productPromotionPriceByPromoStock.orderPVPromo;
                preOderInfoJson.totPvGst1=this.productPromotionPriceByPromoStock.orderPVPromoGST;
                preOderInfoJson.prcId1=this.selectStockPackagePriceInfo.ordPriceId;


                preOderInfoJson.itmCompId2='';
                preOderInfoJson.itmStkId2=this.appPriceInfo.appAuxProduct ;
                preOderInfoJson.promoId2=this.appPriceInfo.appAuxProductPromotion;

                
                preOderInfoJson.mthRentAmt2=this.productAuxPromotionPriceByPromoStock.orderRentalFeesPromo; 
                preOderInfoJson.totAmt2=this.selectAuxStockPriceJsonInfo.orderPrice;
                preOderInfoJson.norAmt2='';
                preOderInfoJson.discRntFee2=this.productAuxPromotionPriceByPromoStock.orderRentalFeesPromo;
                preOderInfoJson.totPv2=this.productAuxPromotionPriceByPromoStock.orderPVPromo;
                preOderInfoJson.totPvGst2=this.productAuxPromotionPriceByPromoStock.orderPVPromoGST;
                preOderInfoJson.busType='';
                preOderInfoJson.prcId2=this.selectAuxStockPriceJsonInfo.priceId;


                // 현재 날짜를 가져옵니다.
                let today = new Date();
                // 날짜에 하루를 더합니다.
                today.setDate(today.getDate() + 1);
                preOderInfoJson.preDt  = today.toLocaleDateString("en-GB");          ;   
                preOderInfoJson.preTm ="11:00 AM";


                return new Promise((resolve, reject) => {
                    quotationApi
                    .registerHcPreOrder(preOderInfoJson) 
                    .then((response) => {


                        console.log(response);

                        if(response.data.code=='00'){
                            Vue.toasted
                            .info(`${response.data.dataList.message}`, {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                        text: "Close",
                                        onClick: (e, toastObject) => {
                                            const query = { ...this.$route.query ,id: response.data.dataList.data };
                                            console.log(query)
                                            this.$router.push({ name: 'ekeyInList', query }); 

                                            toastObject.goAway(0);
                                        },
                                    },
                            });
                        }else{
                            Vue.toasted
                            .error(`${response.data.dataList.message}`, {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                        text: "Close",
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        },
                                    },
                            }).goAway(3000);
                        }   
                        resolve(response);
                    })
                    .catch((error) => reject(error))
                    .finally(() => {
                        
                    });
                });
           },

           doSavePreOrder(){

                console.log('in do save pre order  befer check');


                //sofno check again
                if(this.selectExistSofNo()){
                    console.log('return selectExistSofNo');
                    return ;
                }

                if(! this.checkRequiedField()){

                    console.log('return checkRequiedField ');

                    return ;
                }

                if(this.isInvalid(this.selectedAttchedGrpFileId)) {
                    this.invalidMsg('Attched File ID');
                    return false;
                }

                console.log('in do save pre order ');

                const preOderInfoJson ={};

                preOderInfoJson.sofNo =this.selectedSalesOrderformNo;
                preOderInfoJson.appTypeId =this.appPriceInfo.appType;
                preOderInfoJson.srvPacId  =this.appPriceInfo.appPackage;

                preOderInfoJson.custPoNo='';
                preOderInfoJson.instPriod='';

                preOderInfoJson.custId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.empChk='0';
                
                preOderInfoJson.atchFileGrpId =this.selectedAttchedGrpFileId;
                preOderInfoJson.custCntcId =this.eCustCntcJsonInfo.custCntcId;  
                preOderInfoJson.instAddId  =this.eCustAddJson.custAddId ;
                preOderInfoJson.keyinBrnchId =this.selectedPostingBranchInfo; 
                preOderInfoJson.dscBrnchId =this.selectedDscBranchInfo ;

                preOderInfoJson.instct='';
                preOderInfoJson.exTrade='0';
                preOderInfoJson.itmStkId =this.selectedItemInfo.STK_ID;
                preOderInfoJson.itmCompId=null;
                preOderInfoJson.promoId =this.appPriceInfo.appPromotion;

                preOderInfoJson.mthRentAmt=  this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                preOderInfoJson.totAmt=this.productPromotionPriceByPromoStock.orderPricePromo;
                preOderInfoJson.norAmt=this.selectStockPackagePriceInfo.orderPrice;
                preOderInfoJson.discRntFee=this.productPromotionPriceByPromoStock.orderRentalFeesPromo;
                preOderInfoJson.totPv=this.productPromotionPriceByPromoStock.orderPVPromo;
                preOderInfoJson.totPvGst=this.productPromotionPriceByPromoStock.orderPVPromoGST;
                preOderInfoJson.prcId=this.selectStockPackagePriceInfo.ordPriceId;

                preOderInfoJson.memCode = store.state.userInfo.userName;
                preOderInfoJson.crtUserId = store.state.userInfo.userId;

                preOderInfoJson.advBill ='0';
                preOderInfoJson.custCrcId=this.selectedCustCreaditCardInfo.custCrcId;
                preOderInfoJson.bankId   =this.selectedCustCreaditCardInfo.custCrcBankId;
                preOderInfoJson.custAccId='0';
                preOderInfoJson.is3rdParty='0';

                preOderInfoJson.rentPayCustId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.rentPayModeId='131';

                preOderInfoJson.custBillId='0';
                preOderInfoJson.custBillCustId=this.etrustCustInfo.CUST_ID;
                preOderInfoJson.custBillCntId=this.eCustCntcJsonInfo.custCntcId;
                preOderInfoJson.custBillAddId=this.eCustAddJson.custAddId ;
                preOderInfoJson.custBillEmail='';
                preOderInfoJson.custBillIsSms='1';
                preOderInfoJson.custBillIsPost='0';
                preOderInfoJson.custBillEmailAdd='';

                preOderInfoJson.custBillIsWebPortal='0';
                preOderInfoJson.custBillWebPortalUrl='';
                preOderInfoJson.custBillIsSms2='0';
                preOderInfoJson.custBillCustCareCntId='';

                preOderInfoJson.corpCustType=this.etrustCustInfo.corpTypeId;
                preOderInfoJson.agreementType='';
                preOderInfoJson.salesOrdIdOld='';

                preOderInfoJson.relatedNo='';
                preOderInfoJson.isExtradePR='';
                preOderInfoJson.receivingMarketingMsgStatus=this.etrustCustInfo.receivingMarketingMsgStatus;
                preOderInfoJson.voucherCode='';


                return new Promise((resolve, reject) => {
                    quotationApi
                    .registerPreOrder(preOderInfoJson) 
                    .then((response) => {


                        console.log(response);

                        if(response.data.code=='00'){
                            Vue.toasted
                            .info(`${response.data.dataList.message}`, {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                        text: "Close",
                                        onClick: (e, toastObject) => {
                                            const query = { ...this.$route.query ,id: response.data.dataList.data };
                                            console.log(query)
                                            this.$router.push({ name: 'ekeyInList', query }); 

                                            toastObject.goAway(0);
                                        },
                                    },
                            });
                        }else{
                            Vue.toasted
                            .error(`${response.data.dataList.message}`, {
                                    icon: "info",
                                    position: "top-center",
                                    action: {
                                        text: "Close",
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        },
                                    },
                            }).goAway(3000);
                        }   
                        resolve(response);
                    })
                    .catch((error) => reject(error))
                    .finally(() => {
                        
                    });
                });
           }
        },
        data () {

            let selectedDscBranchInfoDesc='';
            let selectedPostingBranchInfoDesc='';

            return {
                sof_File:null,        //1
                nric_File:null,       //2
                payment_File:null,    //3
                tr_File:null,         //4
                dlof_File:null,       //5
                dlof2_File:null,      //6
                softnc_File:null,     //7
                msof_File:null,       //8
                msoftnc_File:null,    //9
                selectedDscBranchInfoDesc,
                selectedPostingBranchInfoDesc,
                selectedAttchedGrpFileId:null,
                selectedPostingBranchInfo:null,
                selectedDscBranchInfo:null,
                selectedECustomerAddress: null,
                selectedSalesOrderformNo:null,
                appName: themeConfig.app.name,
                appLogo: themeConfig.app.logo,

                tab: null,
                icons:{
                    mdiAccountSettings ,mdiMagnify,mdiCheckDecagram
                }
            }
        }
    }
    </script>


  <style lang="scss">

    .table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch; /* 모바일 터치 스크롤 부드럽게 */
    }

    .center-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh; /* 100% of the viewport height */
            border: 1px solid #ccc; /* Optional: for visualization */
    }
    .center-container img {
            max-width: 100%; /* Ensures the image scales down if too large */
            max-height: 100%; /* Ensures the image scales down if too large */
    }


    .custom-label .v-label {
        color: #ff6347 !important; /* Tomato color */
    }

    .custom-alert-height {
        height: 23px; /* 원하는 높이로 설정 */
        overflow: false; /* 텍스트가 잘리지 않도록 스크롤바 추가 */
        display: flex;
        align-items: center; /* 수직 가운데 정렬 */
        justify-content: left; /* 수평 가운데 정렬 */
        text-align:left; /* 텍스트 가운데 정렬 */
    }

    .custom-tabs {
      height: 50px; /* 탭의 높이를 60px로 설정 */
      background-color: #8dbff8; /* 탭의 배경색을 보라색으로 설정 */
    }
    .custom-tab-item {
      height: 60px; /* 각 탭 항목의 높이를 60px로 설정 */
    }
    .custom-tab-item .v-tab {
      color: white; /* 탭 텍스트 색상을 흰색으로 설정 */
    }
    .v-tabs__prepend {
      display: none; /* prepend 요소를 숨김 */
    }
    .underline {
     text-decoration: underline;
        font-weight: bold;
        color: #1874f5;
    }
  </style>
  