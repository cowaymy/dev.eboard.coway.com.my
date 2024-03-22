import { getCurrentInstance, reactive, toRefs, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

export const useRouter = () => {
  const vm = getCurrentInstance().proxy;

  const state = reactive({
    route: vm.$route,
  });

  watch(
    () => vm.$route,
    (r) => {
      state.route = r;
    }
  );
  return { ...toRefs(state), router: vm.$router };
};

export const useDynamicVh = () => {
  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };
  const { width: windowWidth } = useWindowSize();

  watch(windowWidth, setVh, { immediate: true });

  return {};
};
