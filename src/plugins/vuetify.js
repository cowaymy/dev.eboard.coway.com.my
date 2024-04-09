import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";

import preset from "@/@core/preset/preset";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  icons: {
    iconfont: "md" || "fa",
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
  },
});
