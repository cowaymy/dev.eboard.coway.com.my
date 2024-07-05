<template>

<v-row class="app-invoice-preview">
    <v-col
      cols="12"
      md="12"
    >

      <v-overlay :value="loading">
          <v-progress-circular
          indeterminate
          color="info"
          ></v-progress-circular>
      </v-overlay>

        <v-stepper
          v-model="activeStep"
          vertical
          class="custom-header"
        >
          <!-- Step 1 -->
          <v-stepper-step :complete="activeStep > 1" step="1">
            <div class="d-flex align-center">
              <span class="text--primary text-4xl font-weight-bold me-3">01</span>
              <div class="d-flex flex-column">
                <span class="text--primary text-sm font-weight-semibold">Product category
                  <v-select
                      v-model="selectedItem"
                      :items="categoryItems"
                      label="Product category"
                      variant="category"
                      placeholder="Select Item"
                      class="input_text"
                      item-value="VALUE"
                      item-text="TEXT"
                      return-object
                      @change="onSelectChange"
                  />  
                </span>            
              </div>
            </div>
          </v-stepper-step>
         
          <v-stepper-content step="1">
            <div class="mb-6" >
              <product/>
            </div>
            <v-btn
              color="primary"
              class="me-2"
              @click="funProdcComplete()"
            >
              Next
            </v-btn>
          </v-stepper-content>
          <!-- Step 1  END -->


          <!-- Step 1.2 -->
          <v-stepper-step :complete="activeStep > 2" step="2">
            <div class="d-flex align-center">
              <span class="text--primary text-4xl font-weight-bold me-3">02</span>
              <div class="d-flex flex-column">
                <span class="text--primary text-sm font-weight-semibold">Verify customer </span>         
                <span class="text--secondary text-xs">Identifying Coway's Existing Customers</span>
              </div>
            </div>
          </v-stepper-step>
         
          <v-stepper-content step="2">
       
                <v-card >
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model ="keyInCustNRIC"
                        variant="underlined"
                        placeholder="Search NRIC"
                        hide-details
                        single-line
                        class="input_text"
                        :loading=selectCustomerLoding 
                        @input="convertToUppercase"
                        @keyup.enter="selectCustInfo"
                    >
                      <template #append-outer>
                        <v-icon size="23" class="mx-1" @click="selectCustInfo()">
                          {{ icons.mdiMagnify }}
                        </v-icon>
                      </template>
                    </v-text-field>
                  </v-card-title>
                  <v-card-text>
                    <v-list three-line>
                      <v-list-item>
  
                        <v-list-item-content v-if =etrustCustInfo>
                            <v-list-item-title class="d-flex flex-column">  
                              <span class="text-lg font-weight-semibold"> 
                                Customer Details  <v-icon @click="cleanCust()" color="completed ">{{ icons.mdiAccountSyncOutline }}
                                </v-icon>  </span> 
                              <v-divider></v-divider>
                            </v-list-item-title>
                            <v-list-item-title class="d-flex flex-column">
                              <div class="d-flex flex-column">
                                <span class="text-sm font-weight-semibold">{{etrustCustInfo.NAME}} <v-icon color="info">{{ icons.mdiCheckDecagram }}
                                </v-icon> </span>          
                                <span class="text-sm">{{`Customer ID : ${etrustCustInfo.CUST_ID}`}}</span>
                                <span class="text-sm">{{`NRIC/Company : ${etrustCustInfo.NRIC}`}}</span>
                                <span class="text-sm error--text font-weight-semibold">{{`Status : ${etrustCustInfo.CUST_STATUS}`}} </span>

                                <span class="text-sm">{{`Customer Type : ${etrustCustInfo.CODE_NAME1}`}} </span>
                                <span class="text-sm">{{`Nationality : ${etrustCustInfo.CODE_NAME2}`}} </span>
                                <span class="text-sm">{{`DOB : ${etrustCustInfo.DOB}`}} </span>

                              </div>
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-content v-else>
                            <v-list-item-title class="d-flex flex-column">  
                              <span class="text--primary text-xm font-weight-semibold"> 
                                  Customer Details </span> 
                              <v-divider></v-divider>
                             
                            </v-list-item-title>
                            <v-list-item-title class="d-flex flex-column"> 
                              <div class="d-flex flex-column">

                      
                                  <P></P>
                                  <p class="text-xs mb-0">Identifying Coway's Existing Customers</p>
                                  <P></P>
                                  <div v-if ="needsRegNewCustmer">  
                                      <v-btn
                                      color="success"
                                      class="me-2"
                                      @click="showDialog"
                                    >
                                      NEW REGISTER
                                    </v-btn>
                                  </div>
                             </div>

                            </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <!-- <v-expand-transition>
                    <div v-show="! isExistCust">
                      <v-card-text>
                          <v-row>
                              <v-col cols="12" md="8">
                                <v-radio-group inline label="customer type" v-model="custType">
                                    <v-radio label="Individual" value="964"/>
                                    <v-radio label="Company" value="965"/>
                                </v-radio-group>   
                              </v-col>
                          </v-row>
                          <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="custName"
                                        placeholder="Customer name"
                                        label="Customer name"
                                        class="custom-text-field_required"
                                    />
                                </v-col>
                                <v-col cols="12"  md="4">
                                    <v-text-field
                                        v-model="keyInCustNRIC"
                                        placeholder="NRIC"
                                        label="NRIC"
                                        class="custom-text-field_required"
                                    />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="custEmail"
                                        placeholder="leo.ham@coway.com.my"
                                        label="Email"
                                        class="custom-text-field_required"

                                    />
                                </v-col>

                                <v-col cols="12"  md="4">
                                    <v-text-field
                                        v-model="custMobile"
                                        placeholder="Mobile Number"
                                        label="Mobile Number"
                                        class="custom-text-field_required"
                                    />
                                </v-col>
                            </v-row>

                      </v-card-text>
                    </div>
                  </v-expand-transition> -->

                  <v-card-actions>
                      <v-btn
                        outlined
                        @click="activeStep = 1"
                      >
                        Previous 
                      </v-btn>

                      <v-btn
                        color="primary"
                        class="me-2"
                        @click="funCustComplete()"
                      >
                        Next
                      </v-btn>
                  </v-card-actions>
                </v-card>
          </v-stepper-content>
          <!-- Step 1.2  END -->


       
          <!-- Step 2 -->
          <v-stepper-step
            :complete="activeStep > 3"
            step="3"
          >
            <div class="d-flex align-center">
              <span class="text--primary text-4xl font-weight-bold me-3">03</span>
              <div class="d-flex flex-column">
                <span class="text--primary text-sm font-weight-semibold">Order Info</span>
                <span class="text--secondary text-xs">Setup Application Type ,Package and Promotion  </span>
              </div>
            </div>
          </v-stepper-step>
      
          <v-stepper-content step="3">
            <div  class="align-center colored-div" > 
            <v-row>
              <v-col cols="12" md="5">
                  <v-card-text>
                      <div class="image-container" >
                          <v-img   class="centered-image"
                          :src= makeImgURL(selectedItemInfo) 
                          ></v-img>
                      </div>
                  </v-card-text>
              </v-col>
              <v-col cols="12" md="7">  
                <v-row>
                    <v-card-title class="font-weight-bold">
                      {{selectedItemInfo == null ? '': selectedItemInfo.TITLE}}
                    </v-card-title>

                    <v-card-text class="text--primary text-base font-weight-bold">
                      <span v-if="!appSubTotalDesc">
                        Please choose a Package/Promotion type
                      </span>

                      <span v-else>
                        {{appSubTotalDesc}}
                      </span>
                    </v-card-text>

                    <v-card-text class="text--primary text-base">
                        <v-radio-group   v-model="selectedExtradeInfo"  row   @change="onSelectedExTradeChange">
                            <v-radio label="No"  :value="0" class="custom-radio"/>
                            <v-radio label="Ex-Trade" :value="1" class="custom-radio"/>
                            <v-radio label="I-Care" :value="2" class="custom-radio"/>
                        </v-radio-group>
                    </v-card-text>

                    <v-card-text v-if ='showExTradeFlag' class="text--primary text-base">
                          <v-select
                                v-model ="selectedPreOrderInfo"
                                :items="preOrderList"
                                label="Select related order number "
                                placeholder="related order number "
                                item-value="salesOrdId"
                                :item-text="combinPreOderCodeName"
                                return-object
                                class="custom-text-field custom-label"
                                @input="onSelectedPreOrderChange"

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
                    </v-card-text>


                      <!-- <v-select
                        v-model="selectedExTrade"
                        :items="extradeList"
                        label="Ex-Trade/Related No"
                        variant="extrad"
                        placeholder="Select Item"
                        item-value="code"
                        item-text="codeName"
                        return-object
                        @change="onSelectedExTradeChange"
                      /> -->
              

                    <v-card-text class="text--primary text-base">
                      <v-select
                        v-model="selectedAppType"
                        :items="appTypeList"
                        label="Application Type"
                        variant="applicationtype"
                        placeholder="Select Item"
                        item-value="value"
                        item-text="text"
                        return-object
                        @change="onSelectAppTypeChange"
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
                    </v-card-text>


                    <v-card-text class="text--primary text-base">
                      <v-select
                        v-model="selectedPacakge"
                        :items="pacakgeList"
                        label="Package "
                        variant="packageType"
                        item-value="VALUE"
                        item-text="TEXT"
                        return-object
                        @change="onSelectPacakgeChange"
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

                    </v-card-text>

                    <v-card-subtitle class="underline" v-if=isHomecareProduct>Main Product</v-card-subtitle>
                    <v-card-text class="text--primary text-base">
                      <v-select
                        v-model="selectedPromotion"
                        :items="promotionList"
                        label="Promotion "
                        variant="promotionType"
                        placeholder="Select Item"
                        item-value="code"
                        item-text="codeName"
                        return-object
                        @change="onSelectPromotionListChange"
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
                    </v-card-text>


                    <v-card-subtitle class="underline" v-if=isHomecareProduct>AUX Product (Frame/Outdoor Unit)</v-card-subtitle>

                    <v-card-text class="text--primary text-base" v-if=isHomecareProduct>
                      <v-select
                        v-model="selectedAuxProduct"
                        :items="auxProductofList"
                        label="aux Product "
                        variant="product"
                        item-value="stkId"
                        item-text="c1"
                        return-object
                        @change="onSelectedAuxProductChange"
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
                    </v-card-text>

                    <v-card-text class="text--primary text-base" v-if=isHomecareProduct>
                      <v-select
                        v-model="selectedAuxPromotion"
                        :items="auxPromotionList"
                        label="aux Promotion "
                        variant="aux promotionType"
                        placeholder="Select Item"
                        item-value="code"
                        item-text="codeName"
                        return-object
                        @change="onSelectAuxPromotionListChange"
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
                    </v-card-text>


                    <v-card-text class="text--primary text-base">
                      <span class="text--primary text-sm font-weight-semibold">QUANTITY</span>
                    </v-card-text>
                    <v-card-text class="text--primary text-base">
                      <span class="text--primary text-sm font-weight-semibold">1</span>
                    </v-card-text>
                </v-row>
              </v-col>
            </v-row>
              <v-btn
                outlined
                @click="activeStep = 2"
              >
                Previous
              </v-btn>
              <v-btn
                color="primary"
                class="ms-2"
                @click="funOrderComplete()"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>
          <!-- Step 2 END-->
      



          <v-stepper-step
            :complete="activeStep > 4"
            step="4"
          >
            <div class="d-flex align-center">
              <span class="text--primary text-4xl font-weight-bold me-3">04</span>
              <div class="d-flex flex-column">
                <span class="text--primary text-sm font-weight-semibold">Payment Info</span>
                <span class="text--secondary text-xs">choose payment for rental </span>
              </div>
            </div>
          </v-stepper-step>
      
          <v-stepper-content step="4">
            <v-card
            class="d-flex align-center mb-6 scroll-card"
              color="#F0F8FF"
            >


                 <v-card-text v-if ='this.selectedAppType && this.selectedAppType.value !=66'>
                  <v-alert
                    type="info"
                  >Payment mode can be choose one only for rental</v-alert>

                 </v-card-text>
                 <v-card-text v-if ='this.selectedAppType && this.selectedAppType.value ==66'>
                    <v-col cols="12" md="12">
                      <v-select
                          v-model="selectedRentPayMode"
                          :items="rentPayMode"
                          label="Rental Paymode "
                          placeholder="Select Item"
                          item-value="code"
                          item-text="codeName"
                          class="custom-select"
                          return-object
                          @change="onSelectRentPayModeListChange"
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
      
                  </v-col>

                  <v-col cols="12" md="12">
                      <v-select
                          v-model="selectedCustCreaditCardInfo"
                          :items="custCreaditCardList"
                          label="Customer creaddit card list "
                          placeholder="Select Item"
                          item-value="custCrcBankId"
                          :item-text="combineCardText"
                          class="custom-select"
                          return-object
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
      
                  </v-col>


                  <v-col cols="12" md="6">
                      <v-select
                          v-model="selectedCustBankAccInfo"
                          :items="custBankAccList"
                          label="Customer bank account "
                          placeholder="Select Item"
                          item-value="custAccId"
                          :item-text="combineBankText"
                          return-object
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
                  </v-col>


              </v-card-text>
            </v-card>
            <v-btn
              outlined
              @click="activeStep = 3"
            >
              Previous
            </v-btn>
            <v-btn
              color="primary"
              class="ms-2"
              @click="funPaymentComplete()"
            >
              Next
            </v-btn>
          </v-stepper-content>



          <!-- Step 5 -->
          <v-stepper-step
            :complete="activeStep > 5"
            step="4"
          >
            <div class="d-flex align-center">
              <span class="text--primary text-4xl font-weight-bold me-3">05</span>
              <div class="d-flex flex-column">
                <span class="text--primary text-sm font-weight-semibold">Review &nbsp; Submit</span>
                <span class="text--secondary text-xs">Write a Review</span>
              </div>
            </div>
          </v-stepper-step>
      
          <v-stepper-content step="5">
            <v-card
              class="mb-6"
              height="auto"
            
            >

                <quotationEdit  ref="quotationEditComponent"  :selectedCustBankAccInfo="selectedCustBankAccInfo"  
                        :selectedCustCreaditCardInfo="selectedCustCreaditCardInfo" > </quotationEdit>
            </v-card>
            <v-btn
              outlined
              @click="activeStep = 4"
            >
              Previous
            </v-btn>
            <v-btn
              color="primary"
              class="ms-2"
              @click="funComplete()"
            >
              Complete
            </v-btn>
          </v-stepper-content>
          <!-- Step5 END-->

        </v-stepper>
      </v-col>



      <!-- Right Column: Quotation Action -->
      <!-- <v-col cols="12" md="2">
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
              @click="isSendSidebarActive=true"
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
      </v-col> -->

      <newCustRegister :isOpen.sync="dialog" :nric.sync="keyInCustNRIC" ></newCustRegister>

      <quotationSidebarSend v-model="isSendSidebarActive"></quotationSidebarSend>
    </v-row>
  </template>
  
  <script>
  import { mdiContentSaveCogOutline, mdiSendOutline,mdiMagnify,mdiCheckDecagram,
    mdiDotsVertical, mdiChevronUp, mdiChevronDown ,mdiAccountSyncOutline  } from '@mdi/js'
  import product from "./product";
  //import quotationPreview from './quotationPreview.vue'
  import quotationSidebarSend from './quotationSidebarSend.vue'
  import newCustRegister from './newCustRegister.vue'
  
  import quotationEdit from './quotationEdit.vue'
  
  import store from "@/store";
  import bus from "@/utils/bus";


  import quotationStoreModule from "./quotationStoreModule";
  const  appQuotationStoreModule  = "appQuotationStoreModule";


  export default {
    components: {
      product ,quotationSidebarSend,quotationEdit,newCustRegister
    },

    computed: {

      loading(){
          return this.$store.state.appQuotationStoreModule.loading
      },

      isHomecareProduct(){
        return this.$store.state.appQuotationStoreModule.isHomecareProduct
      },

      categoryItems(){
        //console.log(store.state.appQuotationStoreModule.prodctOfCategory)
        return store.state.appQuotationStoreModule.prodctOfCategory
      },

      selectedItemInfo(){
        if(store.state.appQuotationStoreModule.selectedProdct){
          console.log("STK_IMG::::",store.state.appQuotationStoreModule.selectedProdct.STK_IMG)
        }

        return store.state.appQuotationStoreModule.selectedProdct
      },

      isRantal(){
        return store.state.appQuotationStoreModule.isRentalType 
      },

      pacakgeList(){
        return store.state.appQuotationStoreModule.pacakgeList
      },

      promotionList(){
        return store.state.appQuotationStoreModule.promotionList
      },

      appTypeList(){
        return store.state.appQuotationStoreModule.appTypeList
      },

      appSubTotalDesc(){
        return this.makempty(store.state.appQuotationStoreModule.appSubTotalDesc);
      },
      etrustCustInfo(){
        return store.state.appQuotationStoreModule.etrustCustInfo
      },

      etrustCustInfoMsg(){
        return store.state.appQuotationStoreModule.etrustCustInfoMsg
      },

      eCustomerAddressJsonList(){

          let addr = store.state.appQuotationStoreModule.eCustomerAddressJsonList[0];
          console.log('eCustomerAddressJsonList =====> ',addr);
          return addr
      },

      isExistCust(){
        return store.state.appQuotationStoreModule.isExistCust
      },

      productPromotionPriceByPromoStock(){
        return store.state.appQuotationStoreModule.productPromotionPriceByPromoStock
      },

      selectCustomerLoding(){
        return store.state.appQuotationStoreModule.selectCustomerLoding
      },

      needsRegNewCustmer(){
        return store.state.appQuotationStoreModule.needsRegNewCustmer
      },

      custBankAccList(){
        return store.state.appQuotationStoreModule.custBankAccList
      },


      custCreaditCardList(){
        return store.state.appQuotationStoreModule.custCreaditCardList
      }, 

      showExTradeFlag(){
        return  this.showExTrade;
      },

      preOrderList(){
        return store.state.appQuotationStoreModule.preOrderList
      },

      auxProductofList(){

        console.log("ITEMCODE ::::: ",store.state.appQuotationStoreModule.selectedProdct.STK_ID)
        return store.state.appQuotationStoreModule.auxProductofList; //.filter(item => item.stkId == store.state.appQuotationStoreModule.selectedProdct.STK_ID);
      },

      auxPromotionList(){
        return store.state.appQuotationStoreModule.auxPromotionList
      },

      
    },

    created(){
      store.dispatch(`${appQuotationStoreModule}/fetchCategoryList`);
      store.dispatch(`${appQuotationStoreModule}/setAppTypeList`);
      store.dispatch(`${appQuotationStoreModule}/selectBranchCode`);

      bus.$on('callbackSearchCutomerFun', this.callbackSearchCutomerFun);
      bus.$on('callbackAddProduct', this.callbackAddProduct);

    },


    beforeDestroy() {
        bus.$off('callbackSearchCutomerFun', this.callbackSearchCutomerFun);
        bus.$off('callbackAddProduct', this.callbackAddProduct);
    },
    
    methods: {

      makempty(value){

          console.log('=====================');
          console.log(value);
          console.log('=====================');
          
          if(value=== '' || value === null || value===undefined || value==='undefined'){
              
              return ''
          }
          return value;
      },

      callbackAddProduct(){
        this.funProdcComplete();
      },

      makeImgURL(url){

        if(url) return `https://emall.coway.com.my/${url.STK_IMG}`
        else return '' 

      },

      convertToUppercase() {
            this.keyInCustNRIC = this.keyInCustNRIC.toUpperCase();
      },

      callbackSearchCutomerFun(){
        this.selectCustInfo();
      },  
    
      showDialog() {
          this.dialog = true;
      },

      cleanCust(){
        store.state.appQuotationStoreModule.etrustCustInfo=null; 
      },

      isInvalid(value) {
                return value === null || value === undefined || value === '';
      },


      funProdcComplete(){

        if(this.selectedItemInfo ==null){
                this.$toasted.error("Please choose product", {
                  icon: "info",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);

                return ;
        }


        //need to reset promotion , package 
        this.funRestPackageNPro();
        this.activeStep = 2;
      },


      funCustComplete(){
        let appCustInfo={}


        if(this.isInvalid(this.etrustCustInfo)){
                this.$toasted.error("Please verify customer first", {
                  icon: "info",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);

                return ;
        }


        //고객 존재시 체크값 
        if (this.isExistCust){
            if(this.etrustCustInfo ==null){
                this.$toasted .error("Please verify customer first", {
                  icon: "info",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);

                return ;

            }else{
              appCustInfo.appCustName  = this.etrustCustInfo.NAME;
              appCustInfo.appCustEmail = this.etrustCustInfo.EMAIL;
              appCustInfo.appCustMobile = this.etrustCustInfo.MOBILE;
              appCustInfo.appCustId =this.etrustCustInfo.CUST_ID; 
              appCustInfo.appCustType   =this.custType;
            }
        }

        store.dispatch(`${appQuotationStoreModule}/setActiveSetp3ItemInfo` , appCustInfo );
        this.activeStep = 3;
      },



      funHomeCareOrderComplete(){
    
        if(this.auxProductofList.length > 0){
            if(this.selectedAuxProduct ==0){
              this.$toasted .error(" Please choose the frame. frame is  required field", {
                  icon: "check",
                  position: "top-center"
               }).goAway(2500);
              
              return false;
            }
        }

        if(this.auxPromotionList.length > 0){
            if(this.selectedAuxPromotion ==0) {
              this.$toasted .error(" Please choose the aux-promotion . it is  required field", {
                  icon: "check",
                  position: "top-center"
               }).goAway(2500);
              
              return false;
            }
        }

        return true; 
      } ,

      funOrderComplete(){

        if(! this.funHomeCareOrderComplete()){ return ;}


        if(this.isInvalid(this.selectedAppType)  || this.selectedAppType ==0 ){
                this.$toasted .error(" Application type is  required field", {
                  icon: "check",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);
                return ;
        }
        
        if(this.isInvalid(this.selectedPacakge) || this.selectedPacakge ==0){
                this.$toasted .error(" Package is  required field", {
                  icon: "check",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);
                return ;
        }

              
        if(this.isInvalid(this.selectedPromotion) || this.selectedPromotion ==0){
                this.$toasted .error(" promotion is  required field", {
                  icon: "check",
                  position: "top-center",
                  action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                }).goAway(2500);
                return ;
        }


        //extrade needs check related no 
        if(this.selectedExtradeInfo ==1){

              this.$toasted .error(" Related oder number is  required field", {
                icon: "check",
                position: "top-center",
                action: {
                        text: 'close',
                        onClick: (e, toastObject) => {
                          toastObject.goAway(0);        
                        }
                      }
              }).goAway(2500);
              return ;
        }




        if(store.state.appQuotationStoreModule.selectedProdct !=null){

            let appPriceInfo={ 
                appType : this.selectedAppType.value,
                appPackage : this.selectedPacakge.VALUE,
                appPromotion : this.selectedPromotion.code,
                appTypeDesc :this.selectedAppType.text,
                appPackageDesc : this.selectedPacakge.TEXT,
                appPromotionDesc : this.selectedPromotion.codeName,
                appSubTotal :   store.state.appQuotationStoreModule.appSubTotal,
                appOrderTotal: store.state.appQuotationStoreModule.appOrderTotal , //this.appOrderTotal,
                appDiscount: 0 , //this.appDiscount
                appSalespersonName:store.state.userInfo.userFullName 
            };


            if(this.isHomecareProduct){
              appPriceInfo.appAuxProduct =this.selectedAuxProduct.stkId;
              appPriceInfo.appAuxProductDesc =this.selectedAuxProduct.c1;
              appPriceInfo.appAuxProductPromotion=this.selectedAuxPromotion.code
              appPriceInfo.appAuxProductPromotionDesc =this.selectedAuxPromotion.codeName;
            }
   

          // let obj = store.state.appQuotationStoreModule.selectedProdct;
          // obj.appPriceInfo =appPriceInfo;

          store.dispatch(`${appQuotationStoreModule}/setActiveSetp2ItemInfo` , appPriceInfo );

        }
        this.activeStep =4;
      },

      funPaymentComplete (){

        console.log(this.selectedAppType.value,this.selectedRentPayMode)
        //for rentral
        if(this.selectedAppType.value =='66'){


            //fro credit card 
            if( this.isInvalid(this.selectedRentPayMode)){
                this.$toasted .error("Rental paymode is required", {
                    icon: "check",
                    position: "top-center",
                    action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                    }
                }).goAway(2500);

                return 
            }
            

            //fro credit card 
            if(this.selectedRentPayMode.code == '131'){

                console.log("selectedCustCreaditCardInfo:::: ",this.selectedCustCreaditCardInfo )
                if(this.isInvalid(this.selectedCustCreaditCardInfo)){
                    this.$toasted .error("Customer creadit card is required", {
                        icon: "check",
                        position: "top-center",
                    }).goAway(2500);
                    return 
                }
            }
            
            //fro credit card 
            if(this.selectedRentPayMode.code == '132'){
                if(this.isInvalid(this.selectedCustBankAccInfo)){
                    this.$toasted .error("Customer bank card is required", {
                        icon: "check",
                        position: "top-center",
                        action: {
                          text: 'close',
                          onClick: (e, toastObject) => {
                            toastObject.goAway(0);        
                          }
                        }
                        
                     }).goAway(2500);
                    return 
                }
            }
        }

        this.activeStep = 5;
      },
    

      funComplete(){
        this.$refs.quotationEditComponent.uploadFiles();
      },



      /**
       *  */  
      onSelectChange(item) {
        if(this.selectedItemInfo){
            this.$toasted .info(" will be reset when changing the product category", {
                icon: "info",
                position: "top-center",
                action: {
                  text: 'change',
                  onClick: (e, toastObject) => {

                        console.log('Selected item:', item);
                        store.dispatch(`${appQuotationStoreModule}/setClearQuotaItem` );
                        store.state.appQuotationStoreModule.prodctOfLists = null;
                        store.state.appQuotationStoreModule.selectedProdct =null;
                        this.activeStep =1;

                        let homecareProct= [5706 ,5707 ,7237 ,7241,7177,7233,7240];

                        if (homecareProct.includes(item.VALUE)){
                          store.dispatch(`${appQuotationStoreModule}/fetchProdctListForHomecare` , this.selectedItem.VALUE);
                        }else{
                          store.dispatch(`${appQuotationStoreModule}/fetchProdctList` , this.selectedItem.VALUE);
                        }

                        toastObject.goAway(0);            
                        
                      }
                }
            })
        }else{
            console.log('Selected item:', item);
            store.dispatch(`${appQuotationStoreModule}/setClearQuotaItem` );
            store.state.appQuotationStoreModule.prodctOfLists = null;
            store.state.appQuotationStoreModule.selectedProdct =null;
            this.activeStep =1;

            let homecareProct= [5706 ,5707 ,7237 ,7241,7177,7233,7240];

            if (homecareProct.includes(item.VALUE)){
              store.dispatch(`${appQuotationStoreModule}/fetchProdctListForHomecare` , this.selectedItem.VALUE);
            }else{
              store.dispatch(`${appQuotationStoreModule}/fetchProdctList` , this.selectedItem.VALUE);
            }
        }
      },

      onSelectAppTypeChange(){
        //.log(this.selectedAppType.value)
        store.dispatch(`${appQuotationStoreModule}/setRentalType` , this.selectedAppType.value);
      },

      onSelectPacakgeChange(){
          let obj ={}
          obj.appType =this.selectedAppType.value;
          obj.appPacakgeId = this.selectedPacakge.VALUE;
          
          if(this.isHomecareProduct){

            store.dispatch(`${appQuotationStoreModule}/selectHomecareStockPackagePriceInfo` , obj);
            store.dispatch(`${appQuotationStoreModule}/setPromotionList` , obj);

            this.funLoadInstallAddrForDiffBranch();
            store.dispatch(`${appQuotationStoreModule}/selectHcProductCodeList` , obj);

            this.selectedAuxPromotion=0;
            this.selectedAuxProduct=0;
            store.state.appQuotationStoreModule.auxPromotionList=[];
            store.state.appQuotationStoreModule.auxProductofList=[];
          }else{
            store.dispatch(`${appQuotationStoreModule}/selectStockPackagePriceInfo` , obj);
            store.dispatch(`${appQuotationStoreModule}/setPromotionList` , obj);
          }
      },
      

      /**
       * 
       */
      funLoadInstallAddrForDiffBranch(){

            let payload ={};
            payload.custAddId = this.eCustomerAddressJsonList.custAddId;

            store.dispatch(`appQuotationStoreModule/checkIfIsAcInstallationProductCategoryCode` , payload).then(
              (response) =>{
                  console.log("funLoadInstallAddrForDiffBranch ::: ",response);

                  if(response.data.dataList.data =="1"){
                      payload.isHomecare = 'N';
                      payload.isAC = 'Y';
                      store.dispatch(`${appQuotationStoreModule}/selectCustAddJsonInfo`,payload);
                  }else{
                      payload.isHomecare = 'Y';
                      store.dispatch(`${appQuotationStoreModule}/selectCustAddJsonInfo`,payload);
                  }
              }
          );

      },


      onSelectPromotionListChange(){
        let obj ={}
        obj.appType =this.selectedAppType.value;
        obj.appPacakgeId = this.selectedPacakge.VALUE;
        obj.appPromoId = this.selectedPromotion.code
        
        store.dispatch(`${appQuotationStoreModule}/selectProductPromotionPriceByPromoStockID` , obj);


        if(this.isHomecareProduct){
          this.selectedAuxProduct=0;
          this.selectedAuxPromotion=0;
          store.dispatch(`${appQuotationStoreModule}/selectPromotionFreeGiftList` , this.selectedPromotion.code);
        }
  
      },


      gotoPreview() {
          // 라우터 인스턴스 가져오기
          const router = this.$router;
          // 다른 페이지의 경로로 이동
          router.push('/quot/quotationPreview');
      },

      printQuoation() {
        window.print();
      },

      
      selectCustInfo(){
          let obj ={}
          obj.nric=this.keyInCustNRIC;
          if(this.keyInCustNRIC){
            store.dispatch(`${appQuotationStoreModule}/selectCustomerJsonList` , obj);
          }
      },


      onSelectRentPayModeListChange(item){
            console.log(item)
            let obj ={}
            obj.custId  =this.etrustCustInfo.CUST_ID;
            obj.callPrgm='PRE_ORD';

          if(item.code =='131'){  //for credit card 
            store.dispatch(`${appQuotationStoreModule}/selectCustomerCreditCardJsonList` , obj);
          }else if(item.code =='132'){  //for direct card 
            store.dispatch(`${appQuotationStoreModule}/selectCustomerBankAccJsonList` , obj);
          }

      },


      funRestPackageNPro(){
        //reset  package , promotions
        this.selectedPreOrderInfo=0,
        this.selectedAuxPromotion=0,
        this.selectedAuxProduct=0,
        this.selectedPacakge=0,
        this.selectedAppType=0,

        store.state.appQuotationStoreModule.preOrderList=[],
        store.state.appQuotationStoreModule.auxPromotionList=[],
        store.state.appQuotationStoreModule.auxProductofList=[],
        store.state.appQuotationStoreModule.promotionList=[],
        store.state.appQuotationStoreModule.pacakgeList=[]
      },

      
      onSelectedExTradeChange(item){
        this.showExTrade= item==0 ? false:true;

        this.funRestPackageNPro();

        if(item > 0){
          this.selectedPreOrderInfo= null;
            store.dispatch(`${appQuotationStoreModule}/selectPrevOrderNoList`);
        }
      },


      onSelectedPreOrderChange(item){
        console.log("====>",item)

        if(this.selectedExtradeInfo ==2){          
            if(item.appType =='Outright'){ 
                this.$toasted .error("Outright and Installment Order are not eligable for I-Care Programme.", {
                    icon: "check",
                    position: "top-center",
                    action: {
                      text: 'Undo',
                      onClick: (e, toastObject) => {

                        this.selectedPreOrderInfo= null;
                        // 사용자가 'Undo' 버튼을 클릭했을 때 실행할 코드
                        console.log('Undo action clicked!');
                        store.dispatch(`${appQuotationStoreModule}/selectPrevOrderNoList`);
                        toastObject.goAway(0); // 토스트 메시지를 즉시 닫습니다.
                      }
                    }
                })
                return ;
            }
        }
      },

      onSelectedCustCreaditCardListChange(item){
         console.log(item)
      },

      onSelectedAuxProductChange(item){

        console.log("onSelectedAuxProductChange:::::" ,item)

        
        this.selectedAuxPromotion=0;
        store.state.appQuotationStoreModule.auxPromotionList=[];


        let obj ={}
          obj.appType =this.selectedAppType.value;
          obj.appPacakgeId = this.selectedPacakge.VALUE;
          obj.stkId =item.stkId;


        let payload ={}
          payload.product1 = this.selectedItemInfo.STK_ID;
          payload.product2 = item.stkId;


          //size check 
          store.dispatch(`appQuotationStoreModule/checkProductSize` , payload).then(
              (response) =>{
                console.log(response);
                if(response.data.dataList.code != '00'){
                    this.$toasted .error(`${response.data.dataList.message}`, {
                      icon: "check",
                      position: "top-center",
                      action: {
                        text: 'Undo',
                        onClick: (e, toastObject) => {

                          toastObject.goAway(0); // 토스트 메시지를 즉시 닫습니다.
                          this.selectedAuxProduct=0;
                          return ;
                        }
                      }
                  });
                }else{
                  store.dispatch(`${appQuotationStoreModule}/selectAuxStockPriceJsonInfo` , obj);
                  store.dispatch(`${appQuotationStoreModule}/setAuxPromotionList` , obj);
                }
              }
          ).catch((error) => {
                 this.$toasted .error('Please check Apis server status', {
                      icon: "check",
                      position: "top-center",
                      action: {
                        text: 'Undo',
                        onClick: (e, toastObject) => {
                          this.selectedAuxProduct=0;
                          toastObject.goAway(0); // 토스트 메시지를 즉시 닫습니다.
                        }
                      }
                });
          });


        
      },


      onSelectAuxPromotionListChange(item){

        let obj ={}
        obj.appType =this.selectedAppType.value;
        obj.appPacakgeId = this.selectedPacakge.VALUE;
        obj.appPromoId = this.selectedAuxPromotion.code;
        obj.appStkId = this.selectedAuxProduct.stkId;


        console.log(obj)
        console.log(this.selectedAuxProduct)

        
        store.dispatch(`${appQuotationStoreModule}/selectAuxProductPromotionPriceByPromoStockID` , obj);
        //call freeGiftList 
      },

      combineCardText(item){
            return `${item.bankName} (${item.custCrcNo})`;
      },


      combineBankText(item){
            console.log(item)
            return `${item.custAccNo} (${item.bankCodeName})`;
      },


      combinPreOderCodeName(item){
        return `${item.stkDesc} (${item.salesOrdNo} - ${item.refNo} )`;
      },

    },


    watch: {

      // // /** auto event for promotionList */
      // promotionList: {
      //     immediate: true,
      //     handler(newItems) {
            
      //      console.log("promotionList===>:::" ,newItems)
      //       if (newItems.length === 1) {
      //         this.selectedPromotion = newItems[0];
      //         this.onSelectPromotionListChange(newItems[0]);
      //       }
      //     }
      // },

      /** auto event for pacakgeList */
      pacakgeList: {
          immediate: true,
          handler(newItems) {
            
           //console.log(newItems)
            if (newItems.length === 1) {
              this.selectedPacakge = newItems[0];
              this.onSelectPacakgeChange(newItems[0]);
            }
          }
      },
    },

  
    data() {
      
      if (!store.hasModule(appQuotationStoreModule)) {
          store.registerModule( appQuotationStoreModule,quotationStoreModule );
      }


      const sendMethods = ['Both', 'eMail' ,'WhatsApp']
      return {

        selectedRentPayMode:null,
        selectedCustBankAccInfo :null,
        selectedCustCreaditCardInfo:null,
        selectedPreOrderInfo:null,
        selectedExtradeInfo:0,
        rentPayMode :[
            {code:'131' ,codeName:"Credit Card" } ,
            {code:'132' ,codeName:"Direct Debit"} 
        ],

        extradeList:[
            {code:'0' , codeName:"No"},
            {code:'1' , codeName:"ex-Trade"},
            {code:'2' , codeName:"I-Care"}
        ],
        showExTrade:false,
        show:false,
        loaded: false,
        tab: null, 
        selectedItem: null,
        selectedAppType: null,
        selectedPromotion:null,
        selectedPacakge:null,
        selectedExTrade:null, 
        selectedAuxProduct:null,
        selectedAuxPromotion:null,
        keyInCustNRIC:"",
        activeStep: 1,
        appOrderTotal:null,
        appDiscount: null,
        isSendSidebarActive: false,
        sendMethods,
        custType: null,
        custMobile:null, 
        custEmail: null,
        custName:null,
        custNric: null, 
        dialog: false,
        // Icons
        icons: {
          mdiSendOutline,mdiMagnify,
          mdiDotsVertical, mdiChevronUp, mdiChevronDown,mdiCheckDecagram,mdiAccountSyncOutline 
        },
      }
    },
  }
  </script>
  


  <style lang="scss" scoped>
.custom-tab {
  color: inherit; /* 탭 텍스트의 색상을 부모 요소에서 상속받음 */
}

.scroll-card {
    width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
    overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
}

.custom-alert {
  border-bottom: 2px solid #ff9800; /* 아래 경계선 색상을 주황색으로 설정 */
}

.underline {
    text-decoration: underline;
    font-weight: bold;
    color: #1874f5;
}

.colored-div {
            background-color: #F0F8FF; /* 배경색을 녹색으로 설정 */
    padding: 20px; /* 패딩을 추가하여 내부 여백을 설정 */
}

.image-container {
    display: flex;
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    height: 80vh; /* 화면 전체 높이 */
}


.centered-image {
    width: 80vw; /* 뷰포트 너비의 80% */
    max-width: 300px; /* 최대 너비 */
    height: auto; /* 비율 유지 */
}
</style>
