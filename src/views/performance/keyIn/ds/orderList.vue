<template>
    <v-card class="scroll-card" >
        <v-card-title> {{listTitle}}</v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                cols="12"
                offset-md="8"
                md="4"
                >
                <v-text-field
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details
                    dense
                    outlined
                ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
            
    

        <v-data-table
        :headers="headers"
        :items="userList"
        :items-per-page="10"
        :search="search"
        class="text-no-wrap"
        >
        <!-- name -->
        <template #[`item.NAME`]="{item}">
            <div class="d-flex align-center">
            <v-avatar
                :color="item.avatar ? '' : 'primary'"
                :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
                size="32"
            >   
                <span >{{ item.NAME.slice(0,2).toUpperCase() }}</span>
            </v-avatar>
            <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.NAME }}</span>
                <small>{{ item.NRIC }}</small>
            </div>
            </div>
        </template>
    
        <!-- salary -->
        <template #[`item.salary`]="{item}">
            {{ `$${item.salary}` }}
        </template>
    
        <!-- status -->
        <template #[`item.CODE`]="{item}">
            <v-chip
            small
            :color="statusColor[item.CODE]"
            :class="`${statusColor[item.CODE]}--text`"
            class="v-chip-light-bg"
            >
            {{ item.CODE }}
            </v-chip>
        </template>
        </v-data-table>
    </v-card>
  </template>
  
  <script>
  import { mdiSquareEditOutline, mdiDotsVertical ,mdiChevronRight ,mdiMagnify } from '@mdi/js'
  
  export default {

    
    computed: {
        userList(){
          return this.$store.state.appPerformanceKeyIn.dataKeyInOrderList
        },

        listTitle(){
            return this.$store.state.appPerformanceKeyIn.keyInDataTableTitle
        }
    },

    data() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Cancelled: 'warning',
        Completed: 'completed',
        Active:    'active',
        Approved: 'completed',
        Rejected: 'info',
        Inactive: 'info',
        Failed: 'warning',
        /* eslint-enable key-spacing */
      }
     
      return {
        headers: [
          { text: 'Customer', value: 'NAME' },
          { text: 'OrderNo', value: 'SALES_ORD_NO' },
          { text: 'Product', value: 'STK_DESC' },
          { text: 'Date', value: 'SALES_DT' },
          { text: 'Remark', value: 'REM' },
          { text: 'Status', value: 'CODE' },
        ],
        //userList,
        statusColor,
        search:null,
        // icons
        icons: {
          mdiSquareEditOutline,
          mdiDotsVertical,mdiChevronRight,mdiMagnify
        },
      }
    },
  }
  </script>
  <style lang="scss" scoped>
  .table-kitchen-sink ::v-deep {
    .v-data-table-header {
      white-space: nowrap;
    }
  }
  
  .scroll-card {
    width: 100%; /* 모바일 화면에서는 가로 전체 너비를 사용 */
    overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 허용 */
  }

  </style>