<template>
    <v-card class="body">
          <v-row class="ma-0 h-full">
            <v-col
              cols="12"
              order="1"
              order-lg="1"
            >
              <v-card-title class="d-flex font-weight-semibold text--primary">{{item.SUBJECT}}</v-card-title>
            
              <v-card-text>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text class="d-flex justify-center">
                <div class="d-flex align-center rounded-lg" >
                    <v-avatar
                        size="40"
                        rounded
                        class="v-avatar-light-bg"
                    >
                        <v-img
                        contain
                        :src=userImg
                        ></v-img>
                    </v-avatar>
                    <div class="create_info">
                        <p> <span class="font-weight-semibold">{{item.createUser}} &nbsp; create by <b class="font-weight-semibold">{{item.branchName}}</b></span></p>
                        <p> <span class="font-weight-semibold">{{item.CRT_DT }} </span> <span class="create_bar">|</span>  <span class="create_read font-weight-semibold"> READ &nbsp; {{item.rcnt}}  </span></p>
                    </div>
                </div>
               
                <div class="ms-auto">
                    <v-divider class="my-2"></v-divider>
                </div> 
            </v-card-text>

            <v-card-text>
                <v-chip-group filter>
                    <v-chip v-for="(item, index) in files" :key="item.file_Id" 
                        size="small" elevation="1" color="#82c3fb"  @click="filedown(item)" >
                           atteched File{{index +1}}
                    </v-chip>
                </v-chip-group>
            </v-card-text>

            <v-card-text>
                <v-divider></v-divider>
            </v-card-text>
              
            <v-card-text>
                <quill-editor
                    ref="myQuillEditor"
                    v-model="contents"
                    :options="editorOption"
                />



            
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                     <v-btn  color="info" @click="goBack()" >
                        <v-icon> 
                        {{ icons.mdiBackburger }}
                        </v-icon>
                        <span>LIST</span>
                    </v-btn>
            </v-card-actions>
       
          

            </v-col>
          
          </v-row>
        </v-card>
  </template>

<script>

import themeConfig from "../../../themeConfig";
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiCartPlus,
  mdiShareVariantOutline,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiHelpCircleOutline,mdiBackburger
} from '@mdi/js'

import baseApi from "../../api/index.js";
import utils from "../../utils/utils.js";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {

  beforeRouteUpdate(to, from, next) {
    // 라우터 쿼리 값이 변경될 때마다 실행되는 메서드
    // 이곳에서 화면을 다시 렌더링하거나 필요한 동작을 수행할 수 있습니다.

    console.log('in.....')

    console.log('in.....',to.query)
    this.query = to.query;
    next();
  },
  watch: {
    '$route'(to, from) {
      // $route 객체의 변경을 감지하여 쿼리나 경로가 변경되었을 때 실행되는 watch 속성
      // 여기에서 화면을 다시 렌더링하거나 필요한 동작을 수행합니다.
      console.log('Route changed');
      //this.fetchData(); // 데이터 다시 불러오기 등의 동작을 수행할 수 있음
      this.selectNotification() ;
    }
  },

  components: {
    quillEditor
  },
  data() {
    return {
          appLogo: themeConfig.app.logo,
          item : {} ,
          contents :'',
          userImg: "", 
          query: this.$route.query,
          files : [] ,
          icons: {
                mdiChevronUp,
                mdiChevronDown,
                mdiCartPlus,
                mdiShareVariantOutline,
                mdiLockOpenOutline,
                mdiStarOutline,
                mdiAccountOutline,
                mdiTrendingUp,
                mdiHelpCircleOutline,mdiBackburger
      },
      editorOption: {
        readOnly: "true",
        modules: {
            toolbar: null
        },
      }
    };
  }, 

  methods: {
    async selectNotification() {
        if( this.query.id != undefined){

            console.log('in select ...' ,this.query.id)
            const obj ={ID:this.query.id}
            const data = await baseApi.getNotification(obj);
            if(data.data.dataList){
                this.item = data.data.dataList[0];
                this.contents = this.unescapeHTML(data.data.dataList[0].CONTENTS);
                //this.contents = data.data.dataList[0].CONTENTS;

                    // ArrayBuffer를 텍스트로 디코딩
        
                this.userImg = `https://epapanapis.malaysia.coway.do/users/${data.data.dataList[0].imgPath}`

                this.updateHitNotification();
            }
        } 
    },

    
    async selectAttachedFiles() {
        if( this.query.id != undefined){
            const obj ={ID:this.query.id}
            const {data} = await baseApi.selectAttachedNotificationFiles(obj);
            this.files = data.dataList;
          //   data.dataList.forEach(e =>{
          //        if(e.size >0 ) this.files =e;
          //  });

        } 
    },

    
    async updateHitNotification() {
        if( this.query.id != undefined){
            const obj ={ID:this.query.id , userName :  this.$store.state.userName}
            const data = await baseApi.updateHitNotification(obj);
        } 
    },

    async  filedown(item){

        console.log(item)

        if( this.query.id!= undefined){
            const obj ={path:item.fileurl}
            const data = await baseApi.fileDownload(obj);

            console.log(data)
            const newUrl = window.URL.createObjectURL(data.data);
            const a = document.createElement('a');
            a.href = newUrl;
            a.download =item.file_Path;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(newUrl);
        } 
        

    },
 
    unescapeHTML(str){
        return utils.unescapeHTML(str);
    },
    goBack() {
      this.$router.push({ name: 'NotificationList' }); 
      //this.$router.go(-1); // 또는 this.$router.back()을 사용할 수 있습니다.
    },

    onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.contents = quill
      }
  },

  mounted () {
    this.selectNotification();
    this.selectAttachedFiles();
  },
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },

    },
};
</script>

<style scoped>
    .create_info p {
        margin: 0;
        margin-left: 10px;
    }
    .create_read {
        color: blue !important;
        /*font-size: 3 */
    }
    .create_bar {
        color: rgb(243, 10, 10) !important;
        font-weight: bold;
    } 

</style>
