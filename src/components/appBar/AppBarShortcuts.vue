<template>
  <v-menu offset-y left nudge-bottom="22" content-class="list-style">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">
        {{ icons.mdiStarShootingOutline }}
      </v-icon>
    </template>
    <v-card elevation="0">
      <perfect-scrollbar
        class="ps-user-notifications"
        :options="perfectScrollbarOptions"
      >
        <v-list class="py-0" link>
          <!-- Header -->
          <v-list-item class="d-flex">
            <div class="d-flex align-center justify-space-between flex-grow-1">
              <span class="font-weight-semibold">Shortcuts</span>
              <v-icon @click="addShortcuts()">
                {{ icons.mdiViewGridPlus }}</v-icon
              >
            </div>
          </v-list-item>
          <v-divider></v-divider>

          <v-card
            class="mx-auto"
            elevation="1"
            max-width="400"
            min-width="300"
            link
            hover
            color="#EEF5FF"
          >
            <v-container fluid>
              <v-row dense>
                <v-col v-for="card in cards" :key="card.short_menu_id" cols="6">
                  <v-card min-height="120">
                    <v-card-text
                      class="xcard_text"
                      @click="goLink(`${card.menu_url}`)"
                    >
                      <span class="text-sm font-weight-semibold mb-0">{{
                        card.menu_name
                      }}</span>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-icon @click="updateShortcuts(`${card.short_menu_id}`)">
                        {{ icons.mdiMinusBoxOutline }}</v-icon
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-divider></v-divider>
        </v-list>
      </perfect-scrollbar>
    </v-card>
  </v-menu>
</template>

<script>
import {
  mdiStarShootingOutline,
  mdiViewGridPlus,
  mdiMinusBoxOutline,
  mdiLinkBoxVariantOutline,
} from "@mdi/js";
import appBarShortCutsStoreModule from "./appBarShortCutsStoreModule";
// 3rd Party
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import store from "@/store";

const APPBAR_SHORTCUSTS_STORE_MODULE_NAME = "appShortcusts";

export default {
  components: {
    PerfectScrollbar,
  },
  data() {
    if (!store.hasModule(APPBAR_SHORTCUSTS_STORE_MODULE_NAME)) {
      store.registerModule(
        APPBAR_SHORTCUSTS_STORE_MODULE_NAME,
        appBarShortCutsStoreModule
      );
    }
    const perfectScrollbarOptions = {
      suppressScrollY: true,
      wheelPropagation: true,
    };

    return {
      perfectScrollbarOptions,
      icons: {
        mdiStarShootingOutline,
        mdiViewGridPlus,
        mdiMinusBoxOutline,
        mdiLinkBoxVariantOutline,
      },
    };
  },
  mounted() {},

  computed: {
    cards() {
      return this.$store.state.appShortcusts.shortCustsItemList;
    },
  },

  methods: {
    goLink(key) {
      if (key != this.$router.history.current.path) {
        this.$router.push(key);
      }
    },

    updateShortcuts(key) {
      const data = { menuId: key, memCode: store.state.userInfo.userName };
      store.dispatch(
        `${APPBAR_SHORTCUSTS_STORE_MODULE_NAME}/updateEvents`,
        data
      );
    },

    fatchShortcuts() {
      store.dispatch(`${APPBAR_SHORTCUSTS_STORE_MODULE_NAME}/fetchEvents`);
    },

    addShortcuts() {
      const userInfo = store.state.userInfo;
      const shortcuts = this.$router.history.current.path;
      const data = {
        memCode: userInfo.userName,
        shortcuts: `${shortcuts}`,
      };

      store.dispatch(
        `${APPBAR_SHORTCUSTS_STORE_MODULE_NAME}/insertEvents`,
        data
      );
    },
  },

  created() {
    this.fatchShortcuts();
  },
};
</script>

<style lang="scss">
.xcard_text {
  min-height: 78px;
}

.app-bar-notification-content-container {
  .read-all-btn-list-item {
    padding-top: 14px;
    padding-bottom: 14px;
    min-height: unset;
  }
}

.ps-user-notifications {
  max-height: calc(var(--vh, 1vh) * 80);
}

.notification-menu-content {

}
</style>
