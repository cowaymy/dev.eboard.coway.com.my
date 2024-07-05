<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
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
                  <v-card-title> Homecare Keyin List</v-card-title>
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
              :headers="headers"
              :items="dataList"
              :items-per-page="10"
              :fixed-header="true"
              :mobile-breakpoint="0"
              height="300"
          >
            
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

  computed: {
      likesAllStatus () {
        return this.selectedPreOrderStatus.length === this.preOrderStatus.length
      },

      likesSomeStatus () {
        return this.selectedPreOrderStatus.length > 0
      },

      dataList() {
          return  store
                    .state
                    .appQuotationStoreModule.hcEkeyinDataList.filter(
                        (item) =>
                      item.email
                          .toLowerCase()
                          .includes(this.searchHA.toLowerCase()) ||
                      item.full_name
                          .toLowerCase()
                          .includes(this.searchHA.toLowerCase()) 
                    );
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
          payload._memCode        =store.state.userInfo.userName 
          payload.arrPreOrdStusId =  this.selectedPreOrderStatus.map(item => item.code);
          console.log(payload)  

          store.dispatch(`${appQuotationStoreModule}/selectHcPreOrderList` ,payload );
      }
  },

  data() {

    if (!store.hasModule(appQuotationStoreModule)) {
          store.registerModule( appQuotationStoreModule,quotationStoreModule );
    }


    const statusColor = {
      /* eslint-disable key-spacing */
      Current: 'primary',
      Professional: 'success',
      Rejected: 'error',
      Resigned: 'warning',
      Applied: 'info',
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

      headers: [
        { text: 'BDLN No', value: 'full_name' },
        { text: 'SOF No', value: 'full_name' },
        { text: 'ekey-in Date', value: 'email' },
        { text: 'Entry Point', value: 'start_date' },
        { text: 'App Type', value: 'salary' },
        { text: 'AGE', value: 'age' },
        { text: 'STATUS', value: 'status' },
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