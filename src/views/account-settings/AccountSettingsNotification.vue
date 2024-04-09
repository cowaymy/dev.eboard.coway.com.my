<template>
  <v-card flat class="pa-3">
    <v-form class="multi-col-validation" @submit.prevent="submitForm">

      <v-card-text class="pt-5">
        <v-row class="fill-height ">          
          <v-col cols="12">
            <v-text-field
              v-model="subject"
              label="Subject"
              dense
              hide-details
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="example">
                <quill-editor
                  ref="quillio"
                  class="editor"
                  v-model="contents"
                  :options="editorOption"
                  placeholder= "Insert text here ..."
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
              </div>
            </v-col>
            <v-divider></v-divider>
          <v-col cols="12" md="6">
          <div>
            <v-dialog
              ref="dialog"
              v-model="smodal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Start Date"
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="date" scrollable color="primary">
                <v-btn text color="primary" @click="smodal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
        </v-col>
     
        <v-col cols="12" md="6">
          <v-dialog
            ref="dialog2"
            v-model="emodal"
            :return-value.sync="enddate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="enddate"
                label="End Date"
                :prepend-icon="icons.mdiCalendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="enddate" scrollable color="primary">
              <v-btn text color="primary" @click="emodal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog2.save(enddate)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
       
        <v-col cols="12" md="6">
          <label class="text-1xl font-weight-semibold">Target </label>
          <v-treeview
            v-model="selection"
            :items="items"
            :selection-type="selectionType"
            selectable
            return-object
          ></v-treeview>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col cols="12" md="6">
          <template v-if="!selection.length"> No nodes selected. </template>
          <template v-else>
            <div>
              <v-chip-group
                column
                active-class="primary accent-4  font-weight-semibold"
              >
                <v-chip v-for="node in selection" :key="node.id">
                  {{ node.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </template>
        </v-col>
        <v-divider></v-divider>

        <v-col cols="12" md="6">
          <label class="text-1xl font-weight-semibold">Use </label>
          <v-switch
            v-model="useYn"
            :label="`${useYn.toString()}`"
            hide-details
          ></v-switch>
        </v-col>


        <v-col cols="12" md="6">
          <label class="text-1xl font-weight-semibold">Notification Type</label>
          <v-radio-group v-model="nType" mandatory row>
            <v-radio label="Emergency" value="E"></v-radio>
            <v-radio label="Normal" value="N"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12">
         
          <div>
              <!-- 파일 업로드 컴포넌트 -->
              <vue-dropzone
                ref="dropzone"
                id="dropzone"
                :options="dropzoneOptions"
                @vdropzone-success="onSuccess"
                @vdropzone-error="onError"
                @vdropzone-complete="onComplete"
              ></vue-dropzone>
                        
              <!-- 업로드된 파일 목록 -->
              <ul>
                <li v-for="(file, index) in uploadedFiles" :key="index">{{ file.name }}</li>
              </ul>
          </div>
        </v-col>
      </v-row>  
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer> 
        <v-btn color="primary" type="submit" :disabled="btIsActive">
            Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar } from "@mdi/js";

import bus from "../../utils/bus";
import utils from "../../utils/utils";
import comApi from "../../api/index";



import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import { quillEditor } from 'vue-quill-editor'

import { quillEditor } from 'vue-quill-editor';

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vueDropzone from 'vue2-dropzone';

export default {
  props: {
    notificationData: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    quillEditor ,vueDropzone
  },

  data(props) {
    const optionsLocale = JSON.parse(JSON.stringify(props.notificationData));
    const useYn = true;

    const items = [
      {
        id: "ALL",
        name: "ALL",
        children: [
          {
            id: "SAL",
            name: "SALES",
            children: [
              { id: "GM", name: "GM" },
              { id: "SM", name: "SM" },
              { id: "HM", name: "HM" },
              { id: "HP", name: "HP" },
            ],
          },
          {
            id: "COD",
            name: "CODY",
            children: [
              { id: "GCM", name: "GCM" },
              { id: "SCM", name: "SCM" },
              { id: "CM", name: "CM" },
              { id: "CODY", name: "CODY" },
            ],
          },
        ],
      },
    ];

    const date = new Date().toISOString().substr(0, 10);
    const enddate = new Date().toISOString().substr(0, 10);

    const smodal = "";
    const emodal = "";
    const nType = "Emergency";
    const subject = "";
    return {
      selectionType: "leaf",
      selection: [],
      items,
      optionsLocale,
      date,
      enddate,
      smodal,
      emodal,
      nType,
      useYn,
      subject,
      btIsActive: false,
      selectedFile : null,
      icons: { mdiChartTimelineVariant, mdiEmailOutline, mdiCalendar },
      contents: '',
      editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video']
            ]
        }  
      },
      dropzoneOptions: {
        url: 'http://localhost:3000/apps/api/upload/mFileUpload', // 파일 업로드를 처리할 서버의 엔드포인트
        paramName: 'file', // 서버로 전송될 파일의 이름
        maxFilesize: 5, // 최대 파일 크기 (MB)
        // acceptedFiles: '.jpg, .jpeg, .png, .gif', // 허용되는 파일 형식
        headers: { "My-Awesome-Header": "header value" }
      },
      uploadedFiles: [] // 업로드된 파일 목록을 저장할 배열
    };
  },

  methods: {

    onSuccess(file, response) {
      console.log('파일 업로드 성공:', file, response.path);
      this.uploadedFiles.push(file);
    },
    onError(file, error, xhr) {
      console.error('파일 업로드 실패:', file, error, xhr);
    },
    onComplete(file) {
      //console.log('파일 업로드 완료:', JSON.parse(file.xhr.response.path));
    },

    // imageButtonClickHandler() {

    //   console.log('imageButtonClickHandler ====>')
    //   // Add a file input element to the document, then click it (open file).
    //   const input = document.createElement('input');
    //   input.setAttribute('type', 'file');
    //   input.click();

    //   // Once file is selected.
    //   input.onchange = () => {
    //       const file = input.files[0];

    //       // Validate file type is an image.
    //       if (/^image\//.test(file.type)) {

    //           // Create form.
    //           const formData = new FormData();
    //           formData.append('image', file);
              
              
    //           // Upload image to AWS via app route handler.
    //           comApi.fileUpLoad(formData)
    //           .then(function (response) {

    //               // Set returned image URL to variable.
    //               const url = response.data;

    //               // Get the current cursor position.
    //               const range = this.$refs.quillio.quill.getSelection();

    //               // Insert the image via URL where the cursor is.
    //               this.$refs.quillio.quill.insertEmbed(range.index, 'image', url);

    //               // Move the cursor past the image.
    //               this.$refs.quillio.quill.setSelection(range.index + 1);

    //           })
    //           .catch(function (error) {
    //               console.log(error);
    //           });
    //       }

    //       // Not an image.
    //       else {
    //           console.warn('You could only upload images.');
    //       }
    //   };
    // },
    async submitForm() {
      try {
          let target = "";
          this.selection.forEach(function (v) {
            console.log(v);
            target += "^" + v.id;
          });


        console.log(this.$refs.dropzone.getAcceptedFiles())


        let uploadedFileId =[];
        let uploadedFileName =[];
        let uploadedFileSize =[];
        let uploadedFileType =[];
        
        this.$refs.dropzone.getAcceptedFiles().forEach(function (v) {


          const obj = JSON.parse(v.xhr.response); 
          uploadedFileId.push(obj.path);
          uploadedFileName.push(obj.name);
          uploadedFileSize.push(v.size);
          uploadedFileType.push(v.type);
        });

        const notiObj = {
          SUBJECT: this.subject,
          CONTENTS:   utils.escapeHtml( this.contents),
          STD_DATE: this.date,
          END_DATE: this.enddate,
          TYPE: this.nType,
          STATUS: this.useYn ? "A" : "P",
          TARGET: target,
          CRD_USER : this.$store.state.userInfo.userName,
          UPLOAD_FILE_ID: uploadedFileId,
          UPLOAD_FILE_NAME: uploadedFileName,
          UPLOAD_FILE_SIZE: uploadedFileSize,
          UPLOAD_FILE_TYPE: uploadedFileType,
          NOTIFI_TRAN_MODE: 'NEW'
          
        };
        //start spinner
        bus.$emit("start:spinner");


        

        const result = await comApi.saveNotification(notiObj);

        if (result.data.success) {
          this.$toasted
            .success("It has been processed", {
              icon: "check",
              position: "bottom-right",
              action: {
                text: "Close",
                onClick: (e, toastObject) => {
                  this.btIsActive = true;
                  toastObject.goAway(0);
                },
              },
            })
            .goAway(2500);

          this.btIsActive = true;
        } else {
          this.$toasted.show(result.message);
        }
      } catch (error) {
        console.log("=========>" + error);
        bus.$emit("end:spinner");
      } finally {
        bus.$emit("end:spinner");
      }
    },

    onEditorBlur(quill) {
        //console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
       // console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
       // quill.getModule('toolbar').addHandler('image', this.imageButtonClickHandler);
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
       // console.log('editor change!', quill, html, text)
        this.content = html
      },

      fileSelected(file) {
        console.log('선택된 파일:', file);
        // 선택된 파일을 여기서 처리할 수 있습니다.
        this.uploadFile(file);
      },
      
    async uploadFile(vFile) {
      let form = new FormData();
      form.append("name", this.$store.state.userName);
      form.append("files", vFile);




            
      fetch('http://localhost:3000/apps/api/upload/mFileUpload', {
          method: 'POST',
          body: form,
      })
      .then((response) => { 
          console.log(response);
      })
      .catch((error) => {
          console.error(error);
      });



      // //start spinner
      // bus.$emit("start:spinner");
      // const result = await comApi.mfileUpLoad(form);

      // if (result.data.success) {
      //   this.$toasted
      //     .success("It has been processed", {
      //       icon: "check",
      //       position: "bottom-right",
      //       action: {
      //         text: "Close",
      //         onClick: (e, toastObject) => {
      //           toastObject.goAway(0);
      //         },
      //       },
      //     })
      //     .goAway(2500);
      // }
      // bus.$emit("end:spinner");
      // console.log(result);
    },
  }, 

  computed: {
      editor() {
        return this.$refs.quillio.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }

};
</script>
<style lang="scss" scoped>
  .example {
    display: flex;
    flex-direction: column;
    height: 23rem;
    .editor {
      height: 15rem;
      margin-bottom: 0;
    }
  
  }
</style>