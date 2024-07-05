<template>
    <v-dialog  v-model="localIsOpen" :height="height"  :width="width">

        <v-stepper v-model="activeStep" vertical>
            <v-row>
                <v-col cols="12" md="3">
                    <v-stepper-step :complete="activeStep > 1" step="1">
                    Basic Info
                    </v-stepper-step>
                    <v-stepper-step :complete="activeStep > 2" step="2">
                    Install Address
                    </v-stepper-step>

                    <v-stepper-step :complete="activeStep > 2" step="3">
                    Additional Service Contact
                    </v-stepper-step>

                    <v-stepper-step :complete="activeStep > 3" step="4">
                    New Bank Account 
                    </v-stepper-step>

                    <v-stepper-step :complete="activeStep > 4" step="5">
                    New Cread Card
                    </v-stepper-step>



                    <v-overlay :value="loading">
                        <v-progress-circular
                        indeterminate
                        color="info"
                        ></v-progress-circular>
                    </v-overlay>

                    
                </v-col>

                <v-col cols="12" md="9">
                <v-stepper-content step="1" >
                    <v-row>
                        <v-col cols="12">
                            <span class="text-xm font-weight-semibold text-2sl" >Customer Details</span>
                            <p class="text-xs mb-0">Enter Customer Details</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-select
                                v-model=selectedType
                                :items="customerTypeItems"
                                placeholder="select customer type"
                                label="Customer Type"
                                eager
                                class="einput_text"
                                @change="onCustTypeChanged"
                                :rules="[rules.required]"
                                required
                            />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-select
                                v-model=selectedCompanyType
                                :items="companyTypeItems"
                                placeholder="select Company type"
                                label="Company Type"
                                eager 
                                class="einput_text"
                                :disabled ="custTypeDisabled"
                                />
                        
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select

                                v-model=selectedInitial
                                :items="InitialItems"
                                placeholder="select Initial"
                                label="Initial"
                                eager 
                                class="einput_text"
                                :rules="[rules.required]"
                                required
                            />

                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model=custName
                                placeholder="Customer Name"
                                label="CustomerName" 
                                class="einput_text"
                                :rules="[rules.required]"
                                required
                            />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model=checkCustNRIC
                                placeholder="NRIC/Company No"
                                label="NRIC/Company No" 
                                class="einput_text"
                                disabled
                            />
                        </v-col>

                        <v-col cols="12" md="4">

                            <datepickerBasic @date-selected="DOBHandleDateSelected" 
                                class="einput_text"
                                :rules="[rules.required]"
                                title ="Select DOB"
                            ></datepickerBasic>
                           
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-radio-group
                                v-model="custGender"
                                row
                                :rules="[rules.required]"
                                >
                                <v-radio
                                    label="Male"
                                    value="M"
                                ></v-radio>
                                <v-radio
                                    label="Female"
                                    value="F"
                                    
                                ></v-radio>
                            </v-radio-group>
                                
                          
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select
                                v-model=custRace
                                :items="custRaceItems"
                                placeholder="select Race"
                                label="Race"
                                eager 
                                class="einput_text"
                                :rules="[rules.required]"
                                required
                                item-text="codeName"
                                item-value="codeId"
                            />
                        </v-col>


                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model=custEmail
                                placeholder="eMail"
                                label="eMail"
                                class="einput_text"
                                :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model='custContactNo'
                                placeholder="ContactNo"
                                label="ContactNo"
                                class="einput_text"
                                @change="onCustContactNoChanged"
                                :loading=contactLoding 
                                :rules="[rules.required]"

                            />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model='custContactOffice'
                                placeholder="Contact Office"
                                label="Contact Office"
                                class="einput_text"
                                @change="onCustContactNoChanged"
                                :loading=contactLoding 
                            />
                        </v-col>

                    </v-row> 

                    <v-row>
                        <v-col class="margin-top20" >
                                <v-spacer></v-spacer>
                                <div class="custom-button_success"  @click="checkforBasic">
                                    Next
                                </div>
                        </v-col>
                    </v-row>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card >
                        <v-card-title>
                            <span class="text-xm font-weight-semibold text-2sl">Install Details</span>
                        </v-card-title>

                        <v-card-subtitle>
                            Enter install address
                        </v-card-subtitle>
                        <!-- <v-col cols="12">
                            <span class="text-xm font-weight-semibold text-2sl">Install Details</span>
                            <p class="text-xs mb-0">Enter install address</p>
                        </v-col> -->

                    <v-card-text>
                    <v-row>

                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="selectedAreaLine"
                                placeholder="eg. No 10/Unit 13-02/LOT 33945"
                                label="Address line"
                                class="einput_text"
                                @input="toUpperCase"
                            />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                v-model="selectedState"
                                :items="stateDataList"
                                placeholder="State"
                                label="State"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onStateItemSelected"
                                class="einput_text"
                            >
                                <template v-slot:prepend-item>
                                    <v-list-item class="info">
                                        <v-list-item-content >
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
                            v-model="selectedCity"
                            :items="cityDataList"
                            placeholder="City"
                            label="City"
                            item-text="codeName"
                            item-value="codeId"
                            @change="onCityItemSelected"
                            class="einput_text"
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

                    <v-col cols="12" md="12"   class="margin-top20">
                            <v-combobox 
                                filed
                                outlined
                                rounded
                                dense
                                v-model="autoAearSearch"
                                :items="searchAreaDataList"
                                @keydown="onKeydown"
                                label="Search for an AREA"
                                :loading="loading"
                                clearable
                                item-value ="areaId"
                                :item-text = "combineAreaText"
                                @change="onItemSelected"
                                style="margin-top: 20px;"
                            />
                    </v-col>


                    <v-col cols="12" md="6">
                            <v-select
                                v-model="selectedPostCode"
                                :items="postCodeDataList"
                                placeholder="PostCode"
                                label="PostCode"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onPostCopeItemSelected"
                                class="einput_text"
                            >
                            <template v-slot:prepend-item>
                                <v-list-item class="info">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Please choose One
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                        </template>
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-select
                                v-model="selectedArea"
                                :items="areaDataList"
                                placeholder="Area"
                                label="Area"
                                class="einput_text"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onAreaItemSelected"
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
                            <v-text-field
                                v-model="selectedCountry"
                                placeholder="Country"
                                label="Country"
                                class="einput_text"
                                disabled
                            />
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model=selectedAreaRemark
                                rows="2"
                                placeholder="Remark"
                                label="remark"
                                class="einput_text"
                            />
                        </v-col>                    
                    </v-row>
                     </v-card-text>
                  
                    <v-card-actions>
                        <div class="button-container">
                                <div class="custom-button_secondary"  @click="activeStep--">
                                    Prev
                                </div>

                                <div class="custom-button_success"  @click="checkforInstall">
                                    Next
                                </div>
                               
                                <div v-if ="saveBTNDisabled ==false"  class="custom-button_completed"   @click="createCustomer">
                                    Save
                                </div>
                        </div>
                    </v-card-actions>
                </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">

                    <v-card >
                        <v-card-title>
                            <span class="text-xm font-weight-semibold text-2sl">Contact Details</span>
                        </v-card-title>

                        <v-card-subtitle>
                            Enter service contact info 
                        </v-card-subtitle>

                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn class="success" @click="copyFromCustInfo">Copy From Customer Info</v-btn>
                        </v-card-title>


                        <v-card-text>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="selectedContactName"
                                    placeholder="Name"
                                    label="Contact Name"
                                    class="einput_text"
                                />
                          </v-col>

                          <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="selectedContactMobile"
                                    placeholder="Contact Mobile"
                                    label="Contact Mobile"
                                    class="einput_text"
                                />
                          </v-col>

                          <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="selectedContactOffice"
                                    placeholder="Contact Office"
                                    label="Contact Office"
                                    class="einput_text"
                                />
                          </v-col>
                        </v-card-text>

                        <v-card-actions>
                            <div class="button-container">
                                    <div class="custom-button_secondary"  @click="activeStep--">
                                        Prev
                                    </div>

                                    <div class="custom-button_success"  @click="checkforContact">
                                        Next
                                    </div>
                                
                                    <div v-if ="saveBTNDisabled ==false"  class="custom-button_completed"   @click="createCustomer">
                                        Save
                                    </div>
                            </div>
                        </v-card-actions>

                    </v-card>

                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-card>
                    <v-row>
                        <v-col cols="12"  md="6">
                            <span class="text-xm font-weight-semibold text-2sl">Bank Account Details </span>
                            <p class="text-xs mb-0">Enter bank account Details</p>
                        </v-col>

                    
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="selectedBankTypeCode"
                                :items="selectCodeList_20"
                                placeholder="Type"
                                label="Type"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onBankTypeItemSelected"
                                class="einput_text"
                                :rules="[rules.required]"
                            >
                                <template v-slot:prepend-item>
                                    <v-list-item class="info">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Please choose One
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                v-model="selectedDdlChnlCode"
                                :items="selectDdlChnlDataList"
                                placeholder="Deduction Channel"
                                label="Deduction Channel"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onDdlChnlItemSelected"
                                class="einput_text"
                                :rules="[rules.required]"
                            >
                                <template v-slot:prepend-item>
                                    <v-list-item class="info">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Please choose One
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                v-model="selectedAccBankCode"
                                :items="selectAccBankDataList"
                                placeholder="Issue Bank"
                                label="Issue Bank"
                                item-text="codeName"
                                item-value="codeId"
                                @change="onAccBankItemSelected"
                                class="einput_text"
                                :rules="[rules.required]"
                            >
                                <template v-slot:prepend-item>
                                    <v-list-item class="info">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Please choose One
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="selectedAccNo"
                                placeholder="Account No"
                                label="Account No"
                                class="einput_text"
                                :rules="[rules.required]"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="selectedBankBranch"
                                placeholder="Bank Branch"
                                label="Bank Branch"
                                class="einput_text"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="selectedAccOwner"
                                placeholder="Account Owner"
                                label="Account Owner"
                                class="einput_text"
                                :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="selectedAccRemark"
                                rows="2"
                                placeholder="remark"
                                label="remark"
                            />
                        </v-col>
                    </v-row> 
                   
                    <v-card-actions>
                        <div class="button-container">
                            <div class="custom-button_secondary"  @click="activeStep--">
                                        Prev
                            </div>

                            <div class="custom-button_success"  @click="checkforBankInfo">
                                Next
                            </div>

                            <div v-if ="saveBTNDisabled ==false"  class="custom-button_completed"   @click="createCustomer">
                                Save
                            </div>
                        </div>
                    </v-card-actions>
                </v-card>
                </v-stepper-content>

                <v-stepper-content step="5">
                    <v-card>
                        <v-row>
                        
                            <v-col cols="12"  md="6">
                                <span class="text-xm font-weight-semibold text-2sl">Customer Credit Card </span>
                                <p class="text-xs mb-0">Enter credit card Details</p>
                            </v-col>



                            <v-col cols="12" md="12">
                                <v-select
                                    v-model="selectedCardAccBankCode"
                                    :items="selectCrcBankDataList"
                                    placeholder="Issue Bank"
                                    label="Issue Bank"
                                    item-text="codeName"
                                    item-value="codeId"
                                    @change="onCardAccBankItemSelected"
                                    class="einput_text"
                                >
                                    <template v-slot:prepend-item>
                                        <v-list-item class="info">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Please choose One
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                    </template>
                                </v-select>
                            </v-col>
                            


                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="selectedCardAccTypeCode"
                                    :items="selectCrcTypeDataList"
                                    placeholder="Type"
                                    label="Type"
                                    item-text="codeName"
                                    item-value="code"
                                    @change="onCardAccTypeItemSelected"
                                    class="einput_text"
                                >
                                    <template v-slot:prepend-item>
                                        <v-list-item class="info">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Please choose One
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                    </template>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="selectedCardAccCardTypeCode"
                                    :items="selectCrcCardTypeDataList"
                                    placeholder="Card Type"
                                    label="Card Type"
                                    item-text="codeName"
                                    item-value="codeId"
                                    @change="onCardAccCardTypeItemSelected"
                                    class="einput_text"
                                >
                                    <template v-slot:prepend-item>
                                        <v-list-item class="info">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Please choose One
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                    </template>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="selectedNameOnCreaditCard"
                                    placeholder="Name on Card"
                                    label="Name on Card"
                                    class="einput_text"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="selectedCreditCardNo"
                                    placeholder="CreditCard No"
                                    label="CreditCard No"
                                    class="einput_text"
                                >
                                <template #append-outer>
                                    <v-icon size="23" class="mx-1" @click="oepnMCPaymentPop">
                                    {{ icons.mdiMagnify }}
                                    </v-icon>
                                </template>
                                </v-text-field>
                            </v-col>
                             
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="selectedCardExpiryDate"
                                    placeholder="ExpiryDate"
                                    label="ExpiryDate"
                                    class="einput_text"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-textarea
                                    v-model="selectedCardRemark"
                                    rows="2"
                                    placeholder="remark"
                                    label="remark"
                                />
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <div class="button-container">
                                <div class="custom-button_secondary"  @click="activeStep--">
                                    Prev
                                </div>

                                <div v-if ="saveBTNDisabled ==false"  class="custom-button_completed"   @click="createCustomer">
                                    Save
                                </div>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                </v-col>    
            </v-row>
        </v-stepper>
        
        <!-- 하위 다이얼로그 -->
        <v-dialog v-model="nestedDialog" max-width="600px">
            <v-card>
                <v-btn icon @click="nestedDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-text>
                <iframe
                    :src="externalUrl"
                    width="100%"
                    height="400px"
                    frameborder="0"
                ></iframe>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"  @click="oepnMCPaymentPopClose"> Close </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-dialog>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import bus from "@/utils/bus";

import { mdiMagnify} from '@mdi/js'
import quotationApi from "@/api/quotationApi.js";
import cRegUtil from './custRegisterUtils.js'
import datepickerBasic from '@/components/comm/DatepickerBasic'

import magicAddressStoreModule from "./magicAddressStoreModule";
const  appMagicAddressStoreModule  = "appMagicAddressStoreModule";

export default {
 
    components:{
        datepickerBasic
    },
    props: {
        isOpen: {
             type: Boolean,
             required: true
        },

        nric:{
            type: String,
            required: true
        },
        title: {
            type: String,
            default: 'Dialog Title'
        },
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: '950px'
        }
    },
    watch: {
        isOpen(newValue) {
             this.localIsOpen = newValue;
        },
        localIsOpen(newValue) {
            this.$emit('update:isOpen', newValue);
        },

        // /** auto event for promotionList */
        postCodeDataList: {
            immediate: true,
            handler(newItems) {
       
                if (newItems.length === 1) {
                    this.selectedPostCode = newItems[0];
                    this.onPostCopeItemSelected(newItems[0]);
                }
            }
        },
    },

    data(){

        if (!store.hasModule(appMagicAddressStoreModule)) {
          store.registerModule( appMagicAddressStoreModule,magicAddressStoreModule );
        }

     
        return {
            externalUrl: null,
            nestedDialog: false,
            localIsOpen:false,
            autoSearchList:false, 

            /** cust info */
            custTypeDisabled:true,
            contactLoding:false,
            custContactNo:null, 
            custContactOffice:null,
            custEmail:null, 
            custName:null, 
            selectedInitial:null,
            selectedCompanyType:null,
            selectedType:null,
            custDOB:null,
            custGender:null,
            custRace:null,
            custRaceItems:[
                { "codeName" : 'Chinese',  "codeId"  : "11"},
                { "codeName" : 'Indian',  "codeId"  : "12"},
                { "codeName" : 'Korean',  "codeId"  : "14"},
                { "codeName" : 'Malay',  "codeId"  : "10"},
                { "codeName" : 'Other',  "codeId"  : "13"}
            ],


            /** install address*/ 
            selectedAreaLine:null,
            selectedAreaId:null,
            selectedState:null,
            selectedPostCode: null,
            selectedCity: null,
            selectedCountry: "Malaysia",
            selectedArea: null,
            selectedAreaRemark:null,
            autoAearSearch:'',
            //menuProps:{value: true ,maxHeight: '300px'}, 
            autoAreaitems :[],

            /** Service Contact*/ 
            selectedContactName:null,
            selectedContactOffice:null,
            selectedContactMobile:null,


            /** New bank info*/
            selectedBankTypeCode:null, 
            selectedDdlChnlCode:null, 
            selectedAccBankCode:null,
            selectedAccNo:null, 
            selectedBankBranch:null,
            selectedAccOwner:null,
            selectedAccRemark:null, 

            /** Credit Card Info */
            selectedCardAccBankCode:null, 
            selectedCardAccTypeCode:null, 
            selectedCardAccCardTypeCode:null,
            selectedNameOnCreaditCard:null,
            selectedCardExpiryDate:null,
            selectedCreditCardNo:null, 
            selectedCardRemark:null,
            selectedCardTknRefNo:null, 
            selectedCardTRefId:null,  


          
            customerTypeItems:[
                { "text" : 'Company',  "value"  : "965"},
                {"text" : 'Individual',  "value"  : "964" },
            ],
            companyTypeItems :[
                { "text" : 'Bank VIP',  "value"  : "1154"},
                { "text" : 'Berhad VIP', "value"  : "1152"},
                {"text" : 'Government', "value"  : "1151"},
                {"text" : 'Private', "value"  : "7524"},  
                {"text" : 'SDN BHD', "value"  : "1153"}, 
                {"text" : 'SME', "value"  : "1173"},
            ],
            InitialItems :[
                { "text" : 'Datin',  "value"  : "120"},
                { "text" : 'Dato.', "value"  : "119"},
                {"text" : 'Dr.', "value"  : "118"},
                {"text" : 'Mr.', "value"  : "115"},  
                {"text" : 'Mrs.', "value"  : "117"}, 
                {"text" : 'Ms.', "value"  : "116"},
            ],

            activeStep: 1,
            
   
            icons:{
                mdiMagnify,
            },

            rules: {
                required: value => !!value || 'Field is required',
            },

            customerInfoText:null,
            customerInstallInfoText:null,
            customerBankInfoText:null,
            customerCardInfoText:null,
            saveBTNDisabled: true // 비활성 상태
        }
    },
    methods: {



        copyFromCustInfo(){


            this.saveBTNDisabled =true;

            this.selectedContactName =this.custName;
            this.selectedContactOffice=this.custContactOffice;
            this.selectedContactMobile=this.custContactNo;


            if(! this.isInvalid(this.selectedContactName)  &&  ! this.isInvalid(this.selectedContactMobile)){
                  this.saveBTNDisabled =false;
            }
        },

        DOBHandleDateSelected(date){
            this.custDOB =date;
        },


        getCardInfo(){
              const custCardInfo={};
                custCardInfo.selectedCardAccBankCode =this.selectedCardAccBankCode;
                custCardInfo.selectedCardAccTypeCode =this.selectedCardAccTypeCode;
                custCardInfo.selectedCardAccCardTypeCode =this.selectedCardAccCardTypeCode;
                custCardInfo.selectedNameOnCreaditCard =this.selectedNameOnCreaditCard;
                custCardInfo.selectedCardExpiryDate =this.selectedCardExpiryDate;
                custCardInfo.selectedCreditCardNo =this.selectedCreditCardNo;
                custCardInfo.selectedCardTknRefNo =this.selectedCardTknRefNo;
                custCardInfo.selectedCardTRefId =this.selectedCardTRefId;
                custCardInfo.selectedCardRemark =this.selectedCardRemark;

                this.customerCardInfoText= custCardInfo;

                return custCardInfo;

        },

        getCustomerInfo(){

            const custInfo={};

               custInfo.regId=this.$store.state.userInfo.userName;
               custInfo.name = this.custName;
               custInfo.nric = this.checkCustNRIC;
               custInfo.nation = 1;
               custInfo.dob = this.custDOB;
               custInfo.gender = this.custGender;
               custInfo.raceId = this.custRace;
               custInfo.email = this.custEmail;
               custInfo.rem ='';

               custInfo.typeId = this.selectedType;
               custInfo.pasSportExpr = '';
               custInfo.visaExpr = '';
               custInfo.corpTypeId = this.selectedCompanyType;
               custInfo.oldIc = '';
               custInfo.receivingMarketingMsgStatus= '1',

               custInfo.eInvFlg='N';

               custInfo.contactName = this.custName;
               custInfo.contactCustInitial = this.selectedInitial;
               custInfo.contactNric = this.checkCustNRIC;
               custInfo.contactTelM1 = this.custContactNo;
               custInfo.contactTelO =  this.custContactOffice;
               custInfo.contactTelR = '';
               custInfo.contactTelf = '';


               custInfo.careCntName =this.selectedContactName;
               custInfo.careCntCustInitial =this.selectedInitial;
               custInfo.careCntTelM = this.selectedContactMobile;
               custInfo.careCntTelO = this.selectedContactOffice;
               //custInfo.careCntTelR : careCntTelR,
               //custInfo.careCntExt : careCntExt,
               //custInfo.careCntEmail : careCntEmail,


               custInfo.addressAddrDtl=this.selectedAreaLine;
               custInfo.addressAreaId=this.selectedAreaId;
               custInfo.addressRem=this.selectedAreaRemark;
               custInfo.addressStreet='';




            // custInfo.cmbTypeId=this.selectedType;
            // custInfo.custName=this.custName;
            // custInfo.cmbCorpTypeId=this.selectedCompanyType;
            // custInfo.custInitial=this.selectedInitial;
            // custInfo.nric=this.checkCustNRIC,
            // custInfo.oldNric='';
            // custInfo.gstRgistNo='';
            // custInfo.cmbNation='1';
            // custInfo.pasSportExpr='';
            // custInfo.dob=this.custDOB;
            // custInfo.visaExpr='',
            // custInfo.gender=this.custGender;
            // custInfo.email=this.custEmail;
            // custInfo.cmbRace=this.custRace;
            // custInfo.telM1=this.custContactNo;
            // custInfo.telR='';
            // custInfo.telF='';
            // custInfo.telO='';
            // custInfo.ext='';
            // custInfo.rem='';
            // custInfo.receivingMarketingMsgStatus='1';
            // custInfo.sstRgistNo='';
            // custInfo.tin='';
            // custInfo.eInvFlg=0;

            // custInfo.asCustName=this.custName;
            // custInfo.asTelM=this.custContactNo;
            // custInfo.asTelO='';
            // custInfo.asTelR='';
            // custInfo.asTelF='';
            // custInfo.asExt='';
            // custInfo.asEmail='';

            // custInfo.addrDtl=this.selectedAreaLine;
            // custInfo.areaId=this.selectedAreaId;
            // custInfo.addrRem=this.selectedAreaRemark;
            // custInfo.streetDtl='';
            
            this.customerInfoText= custInfo;

            return custInfo;
        },


        getInstallAddressInfo(){

            const custInstallInfo={};
                custInstallInfo.selectedAreaLine =this.selectedAreaLine;
                custInstallInfo.selectedCountry =this.selectedCountry;
                custInstallInfo.selectedState =this.selectedState;
                custInstallInfo.selectedPostCode =this.selectedPostCode;
                custInstallInfo.selectedArea =this.selectedArea;
                custInstallInfo.selectedAreaRemark =this.selectedAreaRemark;
                custInstallInfo.selectedAreaId  =this.selectedAreaId;
            this.customerInstallInfoText= custInstallInfo;

            return custInstallInfo;
        },


        getBankInfo(){

            const custBankInfo={};
            custBankInfo.selectedBankTypeCode =this.selectedBankTypeCode;
                custBankInfo.selectedDdlChnlCode =this.selectedDdlChnlCode;
                custBankInfo.selectedAccBankCode =this.selectedAccBankCode;
                custBankInfo.selectedAccNo =this.selectedAccNo;
                custBankInfo.selectedAccOwner =this.selectedAccOwner;
                custBankInfo.selectedAccRemark =this.selectedAccRemark;
            this.customerBankInfoText= custBankInfo;

            return custBankInfo;
        },


        isInvalid(value) {
            return value === null || value === undefined || value === '';
        },

        // 입력된 값을 대문자로 변환하는 메서드
        toUpperCase(event) {
            this.selectedAreaLine = event.toUpperCase();
        },


        checkforBasic(){
            let passRequied  = true; 
            
            if(this.isInvalid(this.selectedType)    
                    || this.isInvalid(this.custName) 
                    || this.isInvalid(this.custContactNo)
                    || this.isInvalid(this.selectedInitial)
                    || this.isInvalid(this.custEmail)
                    || this.isInvalid(this.custDOB)
                    || this.isInvalid(this.custGender)
                    || this.isInvalid(this.custRace)){
                        
                passRequied =false; 
            }

            if(this.selectedType ==965 && this.isInvalid(this.selectedCompanyType)) {
                passRequied =false; 
            }

            if(! passRequied){
                Vue.toasted
                .info("Please check the required field ", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);

                return 
            }
            this.getCustomerInfo();
            this.activeStep++;
        },


        /**
         * 
         */
        checkforInstall(){

            this.saveBTNDisabled =true;
            this.getInstallAddressInfo();

            let passRequied  = true; 
            if(this.isInvalid(this.selectedAreaLine)    
                    || this.isInvalid(this.selectedAreaId) 
                    || this.isInvalid(this.selectedPostCode)
                    || this.isInvalid(this.selectedState)
                    || this.isInvalid(this.selectedCountry)){
                        
                passRequied =false; 
            }

            if(! passRequied){
                Vue.toasted
                .info("Please check the required field ", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);

                return 
            }
       
            this.activeStep++;
            //this.saveBTNDisabled =false;
        },


          /**
         * 
         */
         checkforContact(){

            this.saveBTNDisabled =true;

            let passRequied  = true; 
            if(this.isInvalid(this.selectedContactName)    
                    || this.isInvalid(this.selectedContactMobile) 
                    || this.isInvalid(this.selectedContactOffice)){
                        
                passRequied =false; 
            }

            if(! passRequied){
                Vue.toasted
                .info("Please check the required field ", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);

                return 
            }

            this.activeStep++;
            this.saveBTNDisabled =false;
        },



        /**
         *  
         */
        checkforBankInfo(){

            this.getBankInfo();
            let passRequied  = true; 
            if(this.isInvalid(this.selectedBankTypeCode)    
                    || this.isInvalid(this.selectedDdlChnlCode) 
                    || this.isInvalid(this.selectedAccBankCode)
                    || this.isInvalid(this.selectedAccNo)
                    || this.isInvalid(this.selectedAccOwner)
                ){
                        
                passRequied =false; 
            }

            if(! passRequied){
                Vue.toasted
                .info("Please check the required field ", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);

                return 
            }

            
            const lengResult = cRegUtil.fn_lengthCheck(this.selectedAccBankCode, this.selectedAccNo);
            console.log('lengResult :::: ', lengResult);

            if(!lengResult){
                Vue.toasted
                .info("* Invalid bank account number", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);
                return ;
            }


            const availableResult = cRegUtil.fn_availabilityCheck(this.selectedAccBankCode, this.selectedAccNo);
            
            console.log('availableResult :::: ', availableResult);

            if(availableResult){
                Vue.toasted
                .info("* Invalid bank account number", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);
                return ;  
            }

            this.activeStep++;
        },
        



        closeDialog() {
            this.localIsOpen = false;
            this.$emit('update:isOpen', false);
        },
        
        onCityItemSelected(){

            console.log('onCityItemSelected')

            const obj ={type:"POSTCODE" ,state: this.selectedState ,  city: this.selectedCity};


            return new Promise((resolve, reject) => {
                quotationApi
                .selectMagicAddressComboList(obj) 
                .then((response) => {
                    this.$store.state.appMagicAddressStoreModule.postCodeDataList = response.data.dataList;          
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    
                });
            });
        },

        onStateItemSelected(){

            this.saveBTNDisabled =true;

            this.selectedPostCode = '';
            this.selectedCity     = '';
            this.selectedArea     = '';
            this.selectedAreaId   = '';

            const obj ={type:"CITY" ,state: this.selectedState};
            store.dispatch(`${appMagicAddressStoreModule}/selectMagicAddressComboList` , obj );
        },

        onItemSelected(item){
            console.log("onItemSelected ::: ",item)
            this.selectedCountry  = item.country;
            this.selectedPostCode = item.postcode;
            this.selectedCity     = item.city;
            this.selectedArea     = item.area;
            this.selectedAreaId   = item.areaId;
            this.onCityItemSelected();
        },

        onAreaItemSelected(item){
            // if(this.selectedAreaId){
            //     this.saveBTNDisabled =false;
            // }
        },


        onPostCopeItemSelected(){
            const obj ={type:"AREA" ,state: this.selectedState ,  city: this.selectedCity , postCode: this.selectedPostCode};
            return new Promise((resolve, reject) => {
                quotationApi
                .selectMagicAddressComboList(obj) 
                .then((response) => {
                    this.$store.state.appMagicAddressStoreModule.areaDataList = response.data.dataList;          
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                    
                });
            });

        },

        onKeydown(event) {

            // 다음 이벤트 루프로 넘어가기 전에 v-model이 업데이트될 시간을 줌
            this.autoAearSearch = event.target.value;
            if (this.autoAearSearch.length === 5) {
                    this.fetchItems(this.autoAearSearch);
            } else if (this.autoAearSearch.length < 4) {
                this.$store.state.appMagicAddressStoreModule.searchAreaDataList = [];
            }
        },

        fetchItems(query) {
            
            this.$store.state.appMagicAddressStoreModule.searchAreaDataList = [];            
          

            const userData={};

            // if (/^\d+$/.test(this.autoAearSearch)) { //for postcode
            //     userData.postCode = this.autoAearSearch
            // } else {
            //     userData.searchStreet = this.autoAearSearch
            // }
            
            userData.state = this.selectedState;
            userData.searchStreet = this.autoAearSearch;
            userData.postCode = this.selectedPostCode;
            userData.city = this.selectedCity;

            console.log(userData)
            store.dispatch(`${appMagicAddressStoreModule}/searchMagicAddressPopJsonList` , userData);


            //this.menuProps.value=true;
        },

        combineAreaText(item){
            //console.log(item)
            return `${item.area} (${item.postcode})`;
        },


    


        onCustTypeChanged(item){
            console.log(item)

            if(item =='964'){
                this.custTypeDisabled =true;
            }else{
                this.custTypeDisabled =false;
            }
        },
        onBankTypeItemSelected(item){
            console.log(item);
            this.clearBankInfo();
            this.selectedDdlChnlCode=null; 
            this.selectedAccBankCode=null;

        },

        onDdlChnlItemSelected(item){
            const obj ={ "ddlChnl":this.selectedDdlChnlCode}
            store.dispatch(`${appMagicAddressStoreModule}/selectAccBankDataList` ,obj);
            console.log(item);

            this.clearBankInfo();
            this.selectedAccBankCode=null;
        },

        onAccBankItemSelected(item){
            console.log(item)
            this.clearBankInfo();

        },

        onCardAccBankItemSelected(item){
            console.log(item)
        },


        onCardAccTypeItemSelected(item){
            console.log(item)
        },

        onCardAccCardTypeItemSelected(item){
            console.log(item)
        },

        clearBankInfo(){
            this.selectedAccNo =null ;
            this.selectedBankBranch=null ;
            this.selectedAccOwner=null ;
            this.selectedAccRemark=null ;
        },


        fn_padding(value, length, prefix) {
            var newVal = "";
            var pLength = length - value.length;

            for(var x = 0; x < pLength; x++) {
                newVal += prefix;
            }
            return newVal + value;
        },



        oepnMCPaymentPop(){

            if(this.isInvalid(this.checkCustNRIC)){
                Vue.toasted
                .info("Customer NRIC is mandatory", {
                        icon: "info",
                        position: "top-center",
                }).goAway(1500);

                return ;
            }

            const nric    = this.fn_padding(this.checkCustNRIC, 12, "0");
            const custId  = this.fn_padding('0', 12, "0");
            const crcId   = this.fn_padding('0', 12, "0");

            const refNo =`${nric}${custId}${crcId}`;
            

            return new Promise((resolve, reject) => {
                quotationApi
                .selectTknId({refId:refNo}) 
                .then((response) => {

                    this.selectedCardTRefId  =response.data.dataList.tknRef;    
                    const tknRef =response.data.dataList.tknRef;
                    this.selectedCardTknRefNo = tknRef;


                    const apiKey ='3fdgsTZ_COWAY_dsaAZ6E';
                    const url = `https://services.mcpayment.net:8080/newCardForm?apiKey=${apiKey}&refNo=${tknRef}`;
          
                    this.externalUrl = url;
                    this.nestedDialog=true;
                   
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {

                });
            });
         },


         oepnMCPaymentPopClose(){
             Vue.toasted
                .info("Card information is being updated and received.", {
                        icon: "info",
                        position: "top-center",
                        action: {
                            text: "Close",
                            onClick: (e, toastObject) => {
                                this.nestedDialog = false;
                                this.selectTokenNumber();
                            },
                        },
                })
            .goAway(3500);

            this.nestedDialog = false;
            this.selectTokenNumber();
         },



        selectTokenNumber(){
            let obj ={refId:this.selectedCardTRefId};
            return new Promise((resolve, reject) => {
                quotationApi
                .selectTokenNumber (obj) 
                .then((response) => {

                    const data =response.data.dataList.data;
                    console.log(response.data.dataList.data);  

                    this.selectedCardAccTypeCode= data.bin.substring(0,1) == '4' ? 'VISA' : 'MAST';
                    this.selectedCardExpiryDate =data.expr;
                    this.selectedCreditCardNo=data.bin + "******" + data.cclast4;
                    this.$store.state.appMagicAddressStoreModule.selectCardToken= data.token

                    
                    resolve(response);
                })
                .catch((error) => reject(error))
                .finally(() => {
                });
            });
        },


        onCustContactNoChanged(){

            let obj ={contactNumber:this.custContactNo};

            // this.contactLoding =true;

            // return new Promise((resolve, reject) => {
            //     quotationApi
            //     .existingHPCodyMobile (obj) 
            //     .then((response) => {

            //         console.log(response)

            //         if(response.data.dataList){
            //             this.custContactNo ='';
            //             Vue.toasted
            //                 .error(`This phone number has registered under HP/Cody : ${response.data.dataList.fullName} / ${response.data.dataList.memCode}`, {
            //                         icon: "error",
            //                         position: "top-center"
            //                 })
            //             .goAway(3500);
    
            //         }else{
            //             resolve(response);
            //         }
            //     })
            //     .catch((error) => reject(error))
            //     .finally(() => {
            //         this.contactLoding =false;
            //     });
            // });
        },

        createCustomer(){

            console.log('고객 정보 생성 준비......');

            console.log('Install Address 정보 확인');
            console.log(this.getInstallAddressInfo());

          
            console.log('Bank Info 정보 확인');
            //console.log(this.getBankInfo());

            
            console.log('Card Info 정보 확인');
            //console.log(this.getCardInfo());


            return new Promise((resolve, reject) => {
                quotationApi
                .saveCustomer(this.getCustomerInfo()) 
                .then((response) => {

                    console.log(response)
                    if(response.data.code =='99'){
                        Vue.toasted
                        .error(response.data.message, {
                                icon: "error",
                                position: "top-center",
                        }).goAway(3500);
                        return 
                    }else{
                        Vue.toasted
                        .info(`it's success to save customer (${response.data.dataList.custId})`, {
                                icon: "info",
                                position: "top-center",
                                action: {
                                    text: "Close",
                                    onClick: (e, toastObject) => {
                                        this.closeDialog();
                                        bus.$emit('callbackSearchCutomerFun');
                                    },
                                },
                        }).goAway(1500);

                        resolve(response);
                    }
                })
                .catch((error) => reject(error))
                .finally(() => {

                });
            });

        }
    },


    
    computed: {

        avatarStyle() {
            return {
                opacity: this.saveBTNDisabled ? '0.5' : '1',
                cursor: this.saveBTNDisabled ? 'not-allowed' : 'pointer' // 비활성 상태일 때 커서를 변경
            };
        },
            
        loading(){
          return this.$store.state.appMagicAddressStoreModule.loading
        },

        stateDataList(){
          return this.$store.state.appMagicAddressStoreModule.stateDataList
        },

        cityDataList(){
          return this.$store.state.appMagicAddressStoreModule.cityDataList
        },

        postCodeDataList(){
          return this.$store.state.appMagicAddressStoreModule.postCodeDataList
        },

        searchAreaDataList(){
            return this.$store.state.appMagicAddressStoreModule.searchAreaDataList          
        }, 

        areaDataList(){
            return this.$store.state.appMagicAddressStoreModule.areaDataList          
        }, 

        selectCodeList_20(){
            return this.$store.state.appMagicAddressStoreModule.selectCodeList_20          
        },

        selectDdlChnlDataList(){
            return this.$store.state.appMagicAddressStoreModule.selectDdlChnlDataList          
        },


        selectAccBankDataList(){
            return this.$store.state.appMagicAddressStoreModule.selectAccBankDataList          
        },

        selectCrcBankDataList(){
            return this.$store.state.appMagicAddressStoreModule.selectCrcBankDataList          
        },

        selectCrcTypeDataList(){
            return this.$store.state.appMagicAddressStoreModule.selectCrcTypeDataList          
        },
        selectCrcCardTypeDataList(){
            return this.$store.state.appMagicAddressStoreModule.selectCrcCardTypeDataList          
        },
        checkCustNRIC(){
            return this.$store.state.appQuotationStoreModule.checkCustNRIC          
        },

        // selectCardExpr(){
        //     return this.$store.state.appMagicAddressStoreModule.selectCardExpr          
        // },
        // selectCardTokenId(){
        //     return this.$store.state.appMagicAddressStoreModule.selectCardTokenId          
        // },
        // selectCustCardNoCombin(){
        //     return this.$store.state.appMagicAddressStoreModule.selectCustCardNoCombin          
        // },
              
     
    },
    created () {
        const obj ={type:"STATE"};
        store.dispatch(`${appMagicAddressStoreModule}/selectMagicAddressComboList` , obj );

        store.dispatch(`${appMagicAddressStoreModule}/selectCodeList` , 20);
        store.dispatch(`${appMagicAddressStoreModule}/selectDdlChnlDataList`);
        
        store.dispatch(`${appMagicAddressStoreModule}/selectCrcBankDataList`);
        store.dispatch(`${appMagicAddressStoreModule}/selectCodeList` , 21);
        store.dispatch(`${appMagicAddressStoreModule}/selectCodeList` , 115);


       // this.selectedCardAccTypeCode='MAST'
        
    },
}
</script>

<style lang="scss" scoped>





  .active-container {
      margin-right: 10px; 
      height : "10px"
  }

  .disabled-avatar {
    opacity: 0.5; /* 투명도 조절 */
    cursor: not-allowed; /* 커서를 비활성 상태로 변경 */
  }

  .cust_size{
    height:36px;min-width:80px;
  }
  
  .button-container {
        display: flex; /* 플렉스박스를 사용하여 버튼들을 가로로 배치 */
        gap: 10px; /* 버튼 사이의 간격을 10px로 설정 */
  }

   
</style>