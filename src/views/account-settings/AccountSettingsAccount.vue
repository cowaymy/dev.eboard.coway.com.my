<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text class="d-flex">
      <v-avatar rounded size="120" class="me-6">
        <v-img :src="userImage"></v-img>
      </v-avatar>

      <!-- upload photo -->
      <div>
        <v-btn
          color="primary"
          class="me-3 mt-5"
          @click="$refs.refInputEl.click()"
        >
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Upload new photo</span>
        </v-btn>

        <input
          ref="refInputEl"
          type="file"
          accept=".jpeg,.png,.jpg,GIF"
          :hidden="true"
          @change="fileChange"
        />

        <p class="text-sm mt-5">Allowed JPG, GIF or PNG. Max size of 800K</p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountDataLocale.username"
              label="Username"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountDataLocale.name"
              label="Name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="accountDataLocale.email"
              label="E-mail"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="accountDataLocale.role"
              dense
              label="Role"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="accountDataLocale.status"
              dense
              outlined
              label="Status"
              :items="status"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="accountDataLocale.branch"
              dense
              outlined
              label="Branch"
            ></v-text-field>
          </v-col>

          <!-- alert
					<v-col cols="12">
						<v-alert color="warning" text class="mb-0">
							<div class="d-flex align-start">
								<v-icon color="warning">
									{{ icons.mdiAlertOutline }}
								</v-icon>

								<div class="ms-3">
									<p class="text-base font-weight-medium mb-1">
										Your email is not confirmed. Please check your inbox.
									</p>
									<a
										href="javascript:void(0)"
										class="text-decoration-none warning--text"
									>
										<span class="text-sm">Resend Confirmation</span>
									</a>
								</div>
							</div>
						</v-alert>
					</v-col> -->

          <!-- <v-col cols="12">
						<v-btn color="primary" class="me-3 mt-4"> Save changes </v-btn>
						<v-btn
							color="secondary"
							outlined
							class="mt-4"
							type="reset"
							@click.prevent="resetForm"
						>
							Cancel
						</v-btn>
					</v-col> -->
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from "@mdi/js";
//import { ref } from '@vue/composition-api';

import bus from "../../utils/bus";
import comApi from "../../api/index";

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    fileChange: function (e) {
      console.log(e.target.files); //files는 배열로 들어온다.
      this.file = e.target.files[0];
      this.uploadImage(this.file);
    },

    async uploadImage(vFile) {
      let form = new FormData();
      let image = vFile;
      form.append("name", this.$store.state.userName);
      form.append("userImage", image);

      //start spinner
      bus.$emit("start:spinner");
      const result = await comApi.fileUpLoad(form);

      if (result.data.success) {
        this.$toasted
          .success("It has been processed", {
            icon: "check",
            position: "bottom-right",
            action: {
              text: "Close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          })
          .goAway(2500);

        this.$store.state.userInfo.imgPath = result.data.dataList.filename;
      }
      bus.$emit("end:spinner");
      console.log(result);
    },
    clickInputTag: function () {
      this.$refs["image"].click();
    },
  },
  data(props) {
    const status = ["Active", "Inactive", "Pending", "Closed"];

    const accountDataLocale = JSON.parse(JSON.stringify(props.accountData));

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData));
    };

    return {
      status,
      accountDataLocale,
      resetForm,
      file: "",
      userImage: `https://epapanapis.malaysia.coway.do/users/${this.$store.state.userInfo.imgPath}`,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    };
  },
};
</script>
