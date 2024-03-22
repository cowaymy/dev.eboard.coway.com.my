import RollingNumber from "./components/rolling-number";

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(RollingNumber.name, RollingNumber);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

RollingNumber.install = install;
export default RollingNumber;
