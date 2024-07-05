
<template>
   <div class="background-container no-scroll">
      <v-row>
        <v-col cols="12" md="6" >                
        </v-col>
      </v-row>
      <v-row class="d-flex"  >
       <v-col cols="12" md="12">
          <div class="login-container">
            <v-row>
              <v-col cols="12" md="6">
                <v-img   src="../../assets/images/log-03.png"   contain  
                max-height="130px" />
              </v-col>
            </v-row>
            <v-col cols="12" md="12" >                
              <v-spacer></v-spacer>
            </v-col>

            <v-row>
              <v-col cols="12"  md="6">
                <v-spacer></v-spacer>
                <v-form @submit.prevent="submitForm">
                  <v-text-field
                    v-model="userId"
                    label="Username"
                    class="white-text-field"
                    required
                  ></v-text-field>
                  <v-text-field
                   v-model="password"
                    label="Password"
                    type="password"
                     class="white-text-field"
                    required
                    @click:append="isPasswordVisible = !isPasswordVisible"
                  ></v-text-field>
                  <v-btn color="#16B1FF" :disabled="!isFormValid"  class="login-button white-text-btn"  type="submit"
                  >Login</v-btn>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12"  md="6"  >
                <p class="white-text">&copy;2017 Coway Malaysia Snd Bhd.All rights reserved.</p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" >                
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </div>


</template>
<script>

import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import themeConfig from "/themeConfig";
import bus from "@/utils/bus.js";

export default {
  data() {
    return {
      userId: "",
      password: "",
      logMaessage: "",
      isPasswordVisible: false,
      sheet: true,
      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,
      result: ":::=>",

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    };
  },
  created() {
    console.log(process.env.VUE_APP_API_URL);
  },
  computed: {
    isFormValid() {
      var isValid = true; //validEmail(this.username);
      if (this.password == "") isValid = false;

      return isValid;
    },
  },

  mounted() {
    // console.debug('===========>');
    // // 웹에서 메시지를 받을 수 있도록 이벤터 리스너를 등록한다
    // document.addEventListener('message', this.receiveMessage, true);
    // window.addEventListener('message', this.receiveMessage, true);
    // alert(document.toString());
  },
  methods: {
    // receiveMessage(event) {
    // 	alert(event.data);
    // 	console.log('origin: ', event.origin); // 메시지를 보낸 곳
    // 	console.log('message: ', event.data); // 보낸 메시지
    // },

    onNativeEventTest() {
      // "getLocationInfo"는 react-native에서 받는 메서드 이름입니다.
      window.webViewBridge.send(
        "getLocationInfo",
        "",
        function (res) {
          this.result = JSON.stringify(res);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    async submitForm() {
      try {
        const userdata = {
          memCode: this.userId,
          password: this.password,
        };

        //start spinner
        bus.$emit("start:spinner");

        //call lgoin api
        const data = await this.$store.dispatch("LOGIN", userdata);

        if (data.success) {
          //const dataNotifi = await this.$store.dispatch('GETNOTIFI', userInfo);
          //go to main page

          console.log('mainFun:::',data.user[0].mainFun);

          this.$store.dispatch('SET_USER_MAIN_HOME', data.user[0].mainFun);
          this.$router.push(data.user[0].mainFun);
          
        } else {
          this.$toasted
            .error(data.message, {
              icon: "error",
              position: "top-center",
              action: {
                text: "Close",
                onClick: (e, toastObject) => {
                  this.btIsActive = true;
                  toastObject.goAway(0);
                },
              },
            })
            .goAway(2500);
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.initForm();
        bus.$emit("end:spinner");
      }
    },

    initForm() {
      this.userId = "";
      this.password = "";
      this.isPasswordVisible = false;
    },
  },
};

</script>

<style lang="scss" scoped>

.background-container {
    background-image: url('../../assets/images/bg-02.png'); /* 실제 이미지 경로로 변경 */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
  border-radius: 8px;
  padding: 20px;
}

.logo {
  width: 100px;
}

.login-button {
  margin-top: 20px;
  width: 100%;
  border-radius: 80px; /* 원하는 라운드 정도로 설정 */

}



.login_input .v-input__control {
  border-radius: 30px; /* 원하는 라운드 정도로 설정 */
}

  
.white-text {
    color: white !important;
    font-size: 10px;
    font-weight: bold;
    font-style: italic;
}
.white-text-btn {
  color: white !important;
  font-weight: bold;

}
.no-scroll {
  overflow: hidden; /* 특정 요소에서 스크롤 제거 */
}

</style>
