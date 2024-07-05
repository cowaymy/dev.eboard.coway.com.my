<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        

        <v-overlay :value="loading">
            <v-progress-circular
            indeterminate
            color="info"
            ></v-progress-circular>
        </v-overlay>
        
        <v-card>
            <v-card-title> eKey-in  &amp; Filter </v-card-title>

            <v-row class="v-input__prepend-outer">
                <v-col cols="12" md="3" >
                  <v-dialog
                    ref="dialog"
                    v-model="startdateModel"
                    :return-value.sync="startdate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startdate"
                        label="Start Date"
                        :prepend-icon="icons.mdiCalendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker
                      v-model="startdate"
                      scrollable
                      color="primary"
                    >
                      <v-btn
                        text
                        color="primary"
                        @click="startdateModel = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(startdate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12" md="3">
                  <v-dialog
                    ref="dialog2"
                    v-model="enddateModel"
                    :return-value.sync="enddate"
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="enddate"
                        label="End Date"
                        persistent-hint
                        :prepend-icon="icons.mdiCalendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="enddate" scrollable color="primary">
                      <v-btn text color="primary" @click="enddateModel = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog2.save(enddate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                        v-model="selectedPreOrderStatus"
                        :items="preOrderStatus"
                        label="PreOrderStatus"
                        item-value="code"
                        item-text="codeName"
                        return-object
                        multiple
                      >
                      <template v-slot:prepend-item>
                        <v-list-item
                          title="Select All"
                          @click="toggle"
                        >
                        <v-list-item-title>
                          Select All
                        </v-list-item-title>
                          <template v-slot:prepend>
                            <v-checkbox-btn
                              :color="likesSomeStatus ? 'indigo-darken-4' : undefined"
                              :indeterminate="likesSomeStatus && !likesAllStatus"
                              :model-value="likesAllStatus"
                            ></v-checkbox-btn>
                          </template>
                        </v-list-item>

                        <v-divider class="mt-2"></v-divider>
                      </template>  



                    </v-select>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model = "sofNo"
                        variant="underlined"
                        placeholder="SOF No"
                        hide-details
                        single-line
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model = "bdnlNo"
                        variant="underlined"
                        placeholder="BDNL No"
                        hide-details
                        single-line
                    >
                    </v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="primary"  @click="fetchEvents()">
                      <v-icon size="18" class="me-1">
                        {{ icons.mdiMagnifyPlusOutline }}
                      </v-icon>
                      <span>Search</span>
                    </v-btn>
              </v-card-actions>
      </v-card>
    </v-col>
    </v-row> 

    <v-row>
      <v-col cols="12" md="12">
        <v-card-text>
          <v-row>
              <v-col  cols="12"  md="4">
                  <v-card-title>Keyin List</v-card-title>
              </v-col> 
              <v-col  cols="12" offset-md="4" md="4">
                  <v-text-field
                    v-model="searchHA"
                    label="Search"
                    placeholder="Search ..."
                    append-inner-icon="ri-search-line"
                    single-line
                    hide-details
                    dense
                    outlined
                  />
            </v-col>
          </v-row>
        </v-card-text>
        <v-data-table
              :headers="headersHA"
              :items="dataHAList"
              :items-per-page="10"
              :fixed-header="true"
              :mobile-breakpoint="0"
              height="300"
          >
            
           <!-- product -->
          <template #item.product="{ item }">
            <div class="d-flex align-center">
              <div>
                <v-img  v-if="item.appType =='Rental'"
                  src ="../../assets/images/product/hc/mattress.png"
                  height="40"
                  width="40"
                />
              </div>
              <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.product }}</span>
                <span class="text-xs">{{ item.appType }}</span>
              </div>
            </div>
          </template>

          <!-- status -->
          <template #item.stusName="{ item }">
            <v-chip
              :color="resolveStatusVariant(item.stusName).color"
              class="font-weight-medium"
              size="small"
            >
              {{ resolveStatusVariant(item.stusName).text }}
            </v-chip>
          </template>

          
          <!-- salesOrdNo -->
          <template #item.salesOrdNo="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column ms-3">
                  <router-link :to="{ name: 'orderMgmt', params: { id: item.salesOrdNo } }">
                        {{ item.salesOrdNo }}
                  </router-link>
                </div>
              </div>
          </template>
            



           <!-- requestTm -->
           <template #item.requestDt="{ item }">
            <div class="d-flex align-center">
              <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.requestDt }}</span>
                <span class="text-xs">{{ item.requestTm }}</span>
              </div>
            </div>
          </template>
          
        </v-data-table>
       </v-col>  
    </v-row> 



    <v-row>
      <v-col cols="12" md="12">
        <v-card-text>
          <v-row>
              <v-col  cols="12"  md="4">
                  <v-card-title> Homecare Keyin List</v-card-title>
              </v-col> 
              <v-col  cols="12" offset-md="4" md="4">
                  <v-text-field
                    v-model="searchHC"
                    label="Search"
                    placeholder="Search ..."
                    append-inner-icon="ri-search-line"
                    single-line
                    hide-details
                    dense
                    outlined
                  />
            </v-col>
          </v-row>
        </v-card-text>
        <v-data-table
              :headers="headersHC"
              :items="dataList"
              :items-per-page="10"
              :fixed-header="true"
              :mobile-breakpoint="0"
              height="300"
          >
            
           <!-- product -->
          <template #item.product="{ item }">
            <div class="d-flex align-center">
              <div>
                <v-img  v-if="item.appType =='Auxiliary'"
                  src ="../../assets/images/product/hc/frame.png"
                  height="40"
                  width="40"
                />

                <v-img  v-if="item.appType =='Rental'"
                  src ="../../assets/images/product/hc/mattress.png"
                  height="40"
                  width="40"
                />
              </div>
              <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.product }}</span>
                <span class="text-xs">{{ item.appType }}</span>
              </div>
            </div>
          </template>

          <!-- status -->
          <template #item.stusName="{ item }">
            <v-chip
              :color="resolveStatusVariant(item.stusName).color"
              class="font-weight-medium"
              size="small"
            >
              {{ resolveStatusVariant(item.stusName).text }}
            </v-chip>
          </template>



          <!-- salesOrdNo -->
          <template #item.salesOrdNo="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column ms-3">
                  <router-link :to="{ name: 'orderMgmt', params: { id: item.salesOrdNo } }">
                        {{ item.salesOrdNo }}
                  </router-link>
                </div>
              </div>
          </template>
            
           <!-- requestTm -->
           <template #item.requestDt="{ item }">
            <div class="d-flex align-center">
              <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.requestDt }}</span>
                <span class="text-xs">{{ item.requestTm }}</span>
              </div>
            </div>
          </template>
          
        </v-data-table>
       </v-col>  
    </v-row> 
    
  </div>
</template>


<script>
import { mdiSquareEditOutline, mdiDotsVertical ,mdiCalendar} from '@mdi/js'
import store from "@/store";
import moment from 'moment';

import quotationStoreModule from "./quotationStoreModule";
const  appQuotationStoreModule  = "appQuotationStoreModule";


export default {

  props: ['id'],

  computed: {

      loading(){
          return this.$store.state.appQuotationStoreModule.loading
      },

      likesAllStatus () {
        return this.selectedPreOrderStatus.length === this.preOrderStatus.length
      },

      likesSomeStatus () {
        return this.selectedPreOrderStatus.length > 0
      },

      // eslint-disable-next-line vue/return-in-computed-property
      dataList() {
          if(store.state.appQuotationStoreModule.hcEkeyinDataList){
            return  store
                    .state
                    .appQuotationStoreModule.hcEkeyinDataList.filter(
                        (item) =>
                      item.sofNo
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.product
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.crtName
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.bndlNo
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) 
                    );
          }
      },


      // eslint-disable-next-line vue/return-in-computed-property
      dataHAList() {
          if(store.state.appQuotationStoreModule.haEkeyinDataList){
            return  store
                    .state
                    .appQuotationStoreModule.haEkeyinDataList.filter(
                        (item) =>
                      item.sofNo
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.product
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.crtName
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) ||
                      item.bndlNo
                          .toLowerCase()
                          .includes(this.searchHC.toLowerCase()) 
                    );
          }
      },
  },

  methods: {

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    
    toggle () {
        if (this.likesAllStatus) {
            this.selectedPreOrderStatus = []
        } else {
            this.selectedPreOrderStatus = this.preOrderStatus.slice();
        }
    },

    fetchEvents(){
        let payload ={};
          payload._reqstStartDt   =this.formatDate(this.startdate);
          payload._reqstEndDt     =this.formatDate(this.enddate);
          payload._sofNo          =this.sofNo;
          payload._memCode        =store.state.userInfo.userName ;
          payload.bdnlNo          =this.bdnlNo; 
          
          payload.arrPreOrdStusId =  this.selectedPreOrderStatus.map(item => item.code);
          console.log(payload)  

          store.dispatch(`${appQuotationStoreModule}/selectHcPreOrderList` ,payload );
          store.dispatch(`${appQuotationStoreModule}/selectHaPreOrderList` ,payload );
    },

    

    resolveHcImageVariant(appType){
      if (appType === 'Rental'){

        console.log(appType)
        return   "../../assets/images/product/hc/CMK-ST01S.svg";
      }else if (appType === 'Auxiliary'){

        console.log(appType)
        return "../../assets/images/product/hc/mattress.png"
      }
    },
    resolveStatusVariant(status){

        if (status === 'Active')
          return {
            color: 'primary',
            text: 'Active',
          }
        else if (status === 'Processing')
          return {
            color: 'success',
            text: 'Processing',
          }
        else if (status ==='Failed')
          return {
            color: 'error',
            text: 'Failed',
          }
        else if (status === 'warning')
          return {
            color: 'warning',
            text: 'warning',
          }
        else
          return {
            color: 'info',
            text: 'Completed',
          }
    }
  },

  watch: {
    id() {
      console.log("id====>",this.id)
    }
  },


  created(){
    let ID =this.$route.query.id;
    console.log("created::::",ID)
    if(ID){
      if(ID.startsWith('AAA')){
         this.sofNo=ID;
      }else{
        this.bdnlNo=ID;
      }
      this.fetchEvents();
    }
  }, 

  data() {

    if (!store.hasModule(appQuotationStoreModule)) {
          store.registerModule( appQuotationStoreModule,quotationStoreModule );
    }


    const statusColor = {
      /* eslint-disable key-spacing */
      Active: 'primary',
      Processing: 'success',
      Failed: 'error',
      Cancelled: 'warning',
      Completed: 'info',
      /* eslint-enable key-spacing */
    }

    return {

      preOrderStatus:[
          {code:"1", codeName:"Active"},
          {code:"104", codeName:"Processing"},
          {code:"4", codeName:"Completed"},
          {code:"21", codeName:"Failed"},
          {code:"10", codeName:"Cancelled"},
      ],

      headersHC: [
          { text: 'BDLN No', value: 'bndlNo' , width: '150px' },
          { text: 'product', value: 'product' , width: '250px'},
          { text: 'SOF No', value: 'sofNo' , width: '150px' },
          { text: 'Date', value: 'requestDt' , width: '150px'},
          { text: 'Status', value: 'stusName' , width: '150px' },
          { text: 'Sales OrdNo', value: 'salesOrdNo', width: '150px' },
          
          { text: 'Entry Point', value: 'channel', width: '150px' },
          { text: 'DT Branch', value: 'dtBranch' , width: '200px'},
          { text: 'CustomerName', value: 'custNm' , width: '150px'},
          { text: 'Creator', value: 'crtName' , width: '150px'}
      ],

      headersHA: [
        
          { text: 'product', value: 'product' , width: '250px'},
          { text: 'SOF No', value: 'sofNo' , width: '150px' },
          { text: 'Date', value: 'requestDt' , width: '150px'},
          { text: 'Status', value: 'stusName' , width: '150px' },
          { text: 'Sales OrdNo', value: 'salesOrdNo', width: '150px' },
          
          { text: 'Entry Point', value: 'channel', width: '150px' },
          { text: 'DT Branch', value: 'dtBranch' , width: '200px'},
          { text: 'CustomerName', value: 'custNm' , width: '150px'},
          { text: 'Creator', value: 'crtName' , width: '150px'}
      ],

      status: {
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
      statusColor,

      date: new Date().toISOString().substr(0, 7),

      startdate : new Date().toISOString().substr(0, 10),
      enddate : new Date().toISOString().substr(0, 10),
      modal: false,
      selectedPreOrderStatus: [], 
      startdateModel: false,
      enddateModel:false,
      sofNo : '', 
      bdnlNo: '', 
      searchHA: '',
      searchHC: '',
      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,mdiCalendar
      },
    }
  },
}
</script>


<style lang="scss" scoped>

.v-input__append-outer, .v-input__prepend-outer {
    display: inline-flex;
    margin-bottom: 4px;
    margin-top: 4px;
    line-height: 1;
    margin-left: 10px;
}
</style>