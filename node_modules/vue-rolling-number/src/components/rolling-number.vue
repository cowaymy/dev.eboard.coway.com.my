<template>
  <div class="rolling-wrap" :style="{ height: height }">
    <div
      class="rolling-item"
      :class="{ inited }"
      v-for="(num, numIndex) in totalLength"
      :key="totalLength - numIndex"
      :style="{
        '--duration': (totalLength - num + 1) * speed + 's',
        transform: `translate3d(0,${transformList[numIndex] || 0}px,0)`
      }"
    >
      <div class="digit" v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rolling-number",
  props: {
    from: {
      type: [Number, String],
      required: true,
      default: 0
    },
    to: {
      type: [Number, String],
      default: 0
    },
    speed: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      transformList: [],
      height: "0px",
      maxLength: 1,
      inited: false
    };
  },
  computed: {
    totalLength() {
      return Math.max(this.from.toString().length, this.to.toString().length);
    }
  },
  watch: {
    to(val, oldval) {
      if (val.toString().length > oldval.toString().length) {
        this.transformList.unshift(0);
      }
      setTimeout(() => {
        this.transformList = this.getTransformList(String(val));
      }, 50);
    },
    totalLength(val) {
      if (this.maxLength < val) {
        this.maxLength = val;
      }
    }
  },
  mounted() {
    this.height = getComputedStyle(document.querySelector(".digit")).height; // 44px
    this.transformList = this.getTransformList(this.from);
    if (this.to) {
      this.$nextTick(() => {
        this.transformList = this.getTransformList(String(this.to));
        this.inited = true;
      });
    }
  },
  methods: {
    getTransformList(number) {
      const list = [];
      number = String(number);
      for (let i = 0; i < this.totalLength; i++) {
        list[i] =
          -Number(number[i]) *
          this.height.substring(-2, this.height.length - 2);
      }
      return list;
    }
  }
};
</script>

<style>
.rolling-wrap {
  overflow: hidden;
}
.rolling-item {
  position: relative;
  display: inline-block;
  vertical-align: top;
  transform: translate3d(0px, 0px, 0px);
}
.rolling-item.inited {
  transition: all var(--duration);
}
</style>
