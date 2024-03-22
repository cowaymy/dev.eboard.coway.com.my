<template>
  <v-carousel
    :cycle="true"
    height="auto"
    :show-arrows="false"
    hide-delimiter-background
  >
    <v-carousel-item v-for="(slide, i) in original" :key="i">
      <v-sheet class="fill-height" justify="center">
        <div class="item">{{ slide }}</div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import baseApi from "../../api/index.js";

export default {
  props: {
    autoplay: Boolean,
    noteType: String,
  },
  data() {
    return {
      timer: null,
      index: 0,
      polling: null,
      type: this.noteType,
      // 원본 메시지
      // 분해한 메시지
      original: [],
      messages: [],
      text: "",
    };
  },
  computed: {
    editor: {
      get() {
        return this.text.map((e) => e.text).join("");
      },
      set(text) {
        this.text = this.convText(text);
      },
    },
  },
  watch: {
    autoplay(val) {
      //clearTimeout(this.timer);
      if (val) {
        //this.ticker();
      }
    },
  },
  methods: {
    async callApiNootificationData() {
      try {
        const userInfo = this.$store.state.userInfo;

        userInfo.notificationsType = this.noteType;

        console.log("-----------------------");
        console.log("TYPE", this.type);
        console.log("-----------------------");

        var dataList = [];
        this.original.pop();
        await baseApi.getNotification(userInfo).then((request) =>
          request.data.dataList.forEach(function (v) {
            dataList.push(v.CONTENTS);
          })
        );

        this.original = dataList;

        // var obj = [
        // 	'The ETRUST system performance is currently normal.',
        // 	'The ekeyin closing day is in 23rd this month.',
        // ];
        //return obj;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    // this.callApiNootificationData();
    // this.polling = setInterval(() => {
    // 	this.callApiNootificationData();
    // }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style scoped>
.title {
  font-size: 3rem;
}
.item {
  display: inline-block;
  min-width: 0.3em;
  font-weight: bold;
  color: #ff8c00;
}
/* 트랜지션 전용 스타일 */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 2s;
}
.v-leave-active {
  /* position: absolute; */
  transition: all 0.5s ease;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
