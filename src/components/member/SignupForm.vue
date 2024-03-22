<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="userName"> id : </label>
      <input id="userName" type="text" v-model="username" />
    </div>

    <div>
      <label for="password">pw: </label>
      <input id="password" type="text" v-model="password" />
    </div>

    <div>
      <label for="nickname"> nickname</label>
      <input id="nickname" type="text" v-model="nickname" />
    </div>
    <button type="submit">signUp</button>
  </form>
</template>

<script>
import userApi from "@/api/index";
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  methods: {
    async submitForm() {
      const userdata = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const response = await userApi.registerUser(userdata);
      console.log(response);

      this.initForm();
    },
    initForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
  },
};
</script>

<style></style>
