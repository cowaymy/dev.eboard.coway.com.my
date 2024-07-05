<template>
  <component :is="resolveLayoutVariant">
    <transition name="fab-transition" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </component>
</template>

<script>
import { useRouter, useDynamicVh } from "./utils";
import LayoutContentVerticalNav from "./layout/vertical/LayoutContentVerticalNav.vue";
import LayoutContentVerticalPrint from "./layout/vertical/LayoutContentVerticalPrint.vue";
import LayoutBlank from "./layout/blank/LayoutBlank";

export default {
  name: "App",
  components: { LayoutContentVerticalNav, LayoutBlank , LayoutContentVerticalPrint},

  computed: {
    resolveLayoutVariant() {
      const { route } = useRouter();

      if (route.value.meta.layout === "print") return "layout-content-vertical-print";
      if (route.value.meta.layout === "blank") return "layout-blank";
      if (route.value.meta.layout === "content")
        return `layout-content-Vertical-nav`;
      return null;
    },
  },
  created() {},

  data() {
    useDynamicVh();
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media all and (display-mode: standalone) {
  .pwa {
    display: block;
  }
  .browser {
    display: none;
  }
}

@media all and (display-mode: browser) {
  .pwa {
    display: none;
  }
  .browser {
    display: block;
  }
}
</style>
