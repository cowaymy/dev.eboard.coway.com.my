<template>
  <v-card elevation="1">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> 
      <span class="font-weight-semibold text-2xl">SHI Ranking by HP</span>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <!-- <v-card-actions>
      <v-btn icon color="success" @click="show = !show">
        <v-icon>{{ show ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
      </v-btn>
    </v-card-actions> -->

    <!-- <v-expand-transition>
      <div v-show="show"> -->
        <v-divider></v-divider>
        <v-card-text class="scroll-card">
          <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
          ></v-progress-circular>
          
          <v-list>
            <v-list-item-group
              active-class="border"
              color="indigo"
            >
              <v-list-item
                v-for="(data, index) in dataList"
                :key="index"
                :class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''}`"
              >
                <v-avatar
                  color="secondary"
                  size="30"
                  class="secondary white--text font-weight-medium me-3"
                >
                  <span class="text-base">{{ data.RNK }}</span>
                </v-avatar>

                <div class="d-flex align-center flex-grow-1 flex-wrap">
                  <div class="me-2">
                    <div class="font-weight-semibold">
                      <span class="text--primary text-xS me-1"
                          >{{ fun_numFormat(data.PCRC) }}<span class="text-xs me-1 lastmonth-font">  ({{ fun_numFormat(data.PMRC) }}) </span> <span class="text-xs me-1 lastyear-font">  ({{ (fun_numFormat(data.PYRC))}}) </span> 
                           </span>  <span class="text-xs me-1">  ({{data.MEM_CODE}})</span>
                     
                    </div>

                    <v-list-item-subtitle class="font-weight-semibold text-xs">
                      <span class="orgCode-font"> </span>   {{ data.NAME }}
                    </v-list-item-subtitle>
                  </div>

                  <v-spacer></v-spacer>

                  <div>
                    <h4 class="font-weight-semibold"></h4>
                    <span class="text-xs"> ({{ data.DEPT_CODE }}) </span>  
                  </div>
                </div>
              </v-list-item>
              </v-list-item-group>
          </v-list>
        </v-card-text>
      <!-- </div>
    </v-expand-transition> -->
  </v-card>
</template>


<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from "@mdi/js";
export default {

    computed: {
      dataList() {
        return  this.$store
                  .state
                  .appPerformanceRcHP.dataItemLevel4List
                  .filter(
                      (item) =>
                      item.NAME
                          .toLowerCase()
                          .includes(this.search.toLowerCase()) ||
                      item.DEPT_CODE
                          .toLowerCase()
                          .includes(this.search.toLowerCase()) ||
                      item.MEM_CODE
                          .toLowerCase()
                          .includes(this.search.toLowerCase()) ||
                      item.ORG_CODE
                          .toLowerCase()
                          .includes(this.search.toLowerCase())
                  );
      },


    },

    data() {


      const selectedItem = -1;
      const polling = null;
      const salesByCountries = [];
      

      return {
        salesByCountries,
        selectedItem,
        polling,
        show: false,
        loading :false,
        search: '',
        icons: {
          mdiDotsVertical,
          mdiChevronUp,
          mdiChevronDown,
        },
      };
    },

    methods: {


      resolveUserProgressVariant(progrss) {
        if (progrss <= 25) return "warning";
        if (progrss > 25 && progrss <= 50) return "info";
        if (progrss > 50 && progrss <= 75) return "success";
        if (progrss > 75 && progrss <= 99) return "#FE9A2E";
        if (progrss > 100) return "error";
        return "secondary";
      },

      fun_numFormat(number) {
        if(number == null )  return '-'; 
          if(number) return    this.fun_toFixed(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +' %';
          //console.log(neFor);
          return null;
      },
      fun_zore(number) {
          if(number != null ) return  this.fun_numFormat(number)
          
          return '-';
      },
            
      fun_toFixed(val){
          if(val){
            return  val.toFixed(2);
          }
      },
    },
};
</script>
<style lang="scss" scoped>
  .project-progress {
       min-width: 4rem;
  }
  .border {
      border: 6px dashed orange;
  }
  .lastyear-font {
      font-size: 16px;
      color: orange;
      font-style: italic;
  }
  .lastmonth-font {
      font-size: 16px;
      color: rgb(43, 241, 165);
      font-style: italic;
  }
  .scroll-card {
      height: 450px;
      overflow-x: auto;
      overflow-y: auto;
  }
</style>
