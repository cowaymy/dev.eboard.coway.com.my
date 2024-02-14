<template>
    <v-card>
			<v-card-title> HP Income Statement </v-card-title>
            <!-- actions -->
			<v-card-text class="d-flex align-center flex-wrap pb-0">
				<!-- search -->
				<v-text-field
					v-model="memCode"
					placeholder="Member Code"
					class="user-search mb-4 me-3"
				>
				</v-text-field>

                <v-select
						v-model="targetFilter"
						clearable
						closable-chips="true"
						:items="targetOptions"
						label="Select Target"
                        class="user-search mb-4 me-3"
				></v-select>

				<div class="d-flex align-center flex-wrap">
					<v-btn
						color="primary"
						class="mb-4 me-3"
						@click="getCP58Form"
					>
						<v-icon>{{ icons.mdiSearchWeb }} </v-icon>
						<span>CP58 Form</span>
					</v-btn>
				</div>
			</v-card-text>
    </v-card>
</template>

<script>

import { mdiSearchWeb} from '@mdi/js';
import  rpt  from '../../utils/callRPT'



export default {

    components: {},

	computed: {
    },
    watch:{},


    methods: {
	
        getCP58Form(){

                var formdata = new FormData();
                formdata.append("reportFileName", "/commission/CP58.rpt");
                formdata.append("reportDownFileName", "CP58_08022024");
                formdata.append("viewType", "PDF");
                formdata.append("V_MEMBERCODE", this.memCode);
                formdata.append("V_YEAR",this.targetFilter);
                //formdata.append("V_MEMBERCODE", '500571');
               //formdata.append("V_YEAR",this.targetFilter);


                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow',
                    rptFuncViewType: 'view-proc-submit.do',
                    fileName:"CP58Form.pdf",
                };

                const r =   rpt.callRPT(requestOptions);
            
        },
        getYearList(){
            let rtnYen =[];
            const cYear = new Date().getFullYear();
            for ( let c = (cYear -4) ; c <=cYear ;  c++){
                rtnYen.push(c)
            }
            return  rtnYen;
        }
    },


    created(){
            const userInfo = this.$store.state.userInfo;
            this.memCode = userInfo.userName;
    },
    beforeCreate(){
        console.log('......beforeCreate ......');
    },
	beforeDestroy(){
        console.log('......beforeDestroy ......');
    },
    mounted() {
        console.log('......mounted ......');
    },
    beforeMount() {
        console.log('......beforeMount ......');
    },
    beforeUpdate() {
        console.log(   this.targetFilter );
    },
    beforeUnmount() {
        console.log('......beforeUnmount ......');
    },
    



    data (){
        const memCode  = "";
        const targetFilter  = new Date().getFullYear();
        const targetOptions = this.getYearList();

        return { 
            memCode  ,
            notificationDataList : "",
            targetOptions,
            targetFilter,
            icons:{mdiSearchWeb}
        }
    }
};
</script>

<style></style>
