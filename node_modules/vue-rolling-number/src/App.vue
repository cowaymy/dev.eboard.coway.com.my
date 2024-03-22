<template>
  <div id="app">
    <vue-rolling-number :from="50" :to="to" :speed="0.5" />
    <button class="shuffle-button" @click="shuffle">shuffle</button>
  </div>
</template>

<script>
// import Vue from "vue";
import VueRollingNumber from "./index.js";
// Vue.use(RollingNumber);
export default {
  name: "App",
  components: {
    VueRollingNumber
  },
  data() {
    return {
      to: 999
    };
  },
  methods: {
    shuffle() {
      this.to = parseInt(Math.random() * 10000);
      console.log(this.to);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.shuffle-button {
  margin-top: 150px;
  margin-bottom: 150px;
  width: 200px;
  line-height: 50px;
}
</style>
