<template>
  <div class="">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card-title class="d-flex align-center justify-center py-7">
          <qrcode-stream @decode="onDecode" @init="onInit">
            <div v-if="validationSuccess" class="validation-success">
              The attendance check is complete.
            </div>

            <div v-if="validationFailure" class="validation-failure">
              This is NOT a URL!
            </div>

            <div v-if="validationPending" class="validation-pending">
              Long validation in progress...
            </div>
          </qrcode-stream>
        </v-card-title>

        <v-card-text class="d-flex align-center mt-5">
          <v-avatar
            size="54"
            rounded
            color="primary"
            class="v-avatar-light-bg primary--text mt-1"
          >
            <div>
              <span class="font-weight-medium">
                {{ month }}
              </span>
              <p class="text-xl primary--text font-weight-bold mb-0">
                {{ ndate }}
              </p>
            </div>
          </v-avatar>

          <div class="ms-3">
            <h4 class="text-base font-weight-semibold">
              {{ this.$store.state.userInfo.userName }}
            </h4>
            <p class="text-xs mb-0">Please scan QRcode in the sales office</p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-divider></v-divider>
        </v-card-text>

        <template v-if="validationSuccess">
          <v-card-text class="d-flex align-center mt-5">
            <v-avatar size="54" rounded>
              <v-icon size="30" color="success"> {{ mdiCheckBold }} </v-icon>
            </v-avatar>

            <div class="ms-3">
              <p class="text-xs mb-0">{{ result }}</p>
            </div>
          </v-card-text>
        </template>
        <template v-if="validationFailure">
          <v-card-text class="d-flex align-center mt-5">
            <v-avatar size="54" rounded>
              <v-icon size="30" color="error">
                {{ mdiCheckDecagramOutline }}
              </v-icon>
            </v-avatar>

            <div class="ms-3">
              <p class="text-xs mb-0">{{ result }}</p>
            </div>
          </v-card-text>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiClose, mdiCheckBold, mdiCheckDecagramOutline } from "@mdi/js";

import { QrcodeStream } from "vue-qrcode-reader";
import bus from "../../utils/bus.js";
import { getMonthName, getDate } from "../../utils/validation";

export default {
  components: { QrcodeStream },
  data() {
    return {
      // icon
      icons: {
        mdiClose,
      },
      isValid: undefined,
      camera: "auto",
      result: null,
      month: getMonthName(),
      ndate: getDate(),
      mdiCheckBold,
      mdiCheckDecagramOutline,
    };
  },

  computed: {
    validationPending() {
      return this.isValid === undefined && this.camera === "off";
    },

    validationSuccess() {
      return this.isValid === true;
    },

    validationFailure() {
      return this.isValid === false;
    },

    isCameraOn() {
      return this.camera != "close";
    },
  },

  beforeDestroy() {
    console.info("------- 메인 페이지 아웃시 --------------------");
  },

  methods: {
    onInit(promise) {
      promise.catch(console.error).then(this.resetValidationState);
    },

    resetValidationState() {
      this.isValid = undefined;
    },

    async onDecode(content) {
      this.result = content;
      this.turnCameraOff();
      //this.isValid = content.startsWith('http');

      // pretend it's taking really long
      //await this.timeout(1000);

      // some more delay, so users have time to read the message
      //await this.timeout(100);

      //start spinner
      //bus.$emit('start:spinner');
      this.getLocationInfo(content);
      //this.toPassRouter(content);
    },

    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },

    getLocationInfo(content) {
      // "getLocationInfo"는 react-native에서 받는 메서드 이름입니다.
      window.webViewBridge.send(
        "getLocationInfo",
        "",
        (res) => {
          this.result = JSON.stringify(res);
          //bus.$emit('end:spinner');
          this.toPassRouter(content);
        },
        (err) => {
          alert("native errr::::", err.toString());
          console.error(err);
        }
      );
    },

    toPassRouter(content) {
      this.$router.push({
        name: "AttendScanQRResult",
        params: { scandata: content, gpsInfo: this.result },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/preset/preset/pages/auth.scss";
#camera {
  text-align: center;
  color: #2c3e50;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
