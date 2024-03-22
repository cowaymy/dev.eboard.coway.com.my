<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" dark app>
      <div class="text-center mt-3">
        <v-btn fab color="white" x-large>
          <v-icon color="black">fas fa-chart-line </v-icon>
        </v-btn>
      </div>

      <div class="text-center mt-3">
        <v-divider></v-divider>
      </div>
      <v-list nav>
        <div v-for="(link, i) in links" :key="i">
          <v-list-item
            v-if="!link.sublinks"
            :to="link.toLink"
            :ripple="false"
            class="ListItemClass"
          >
            <v-list-item-icon>
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="ListItemClass" v-text="link.menuName" />
          </v-list-item>

          <v-list-group
            active-class="SelectedTile-active"
            v-else
            :key="link.menuName"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              class="SelectedTile"
              v-for="sublink in link.sublinks"
              :to="sublink.toLink"
              :key="sublink.text"
            >
              <v-list-item-icon class="ListItemImgClass">
                <v-icon> {{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="ListItemClass">{{
                sublink.text
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            <v-icon @click="logoutUser"> fas fa-sign-out-alt</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar height="50" app>
      <span> &nbsp;</span>&nbsp;
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>eTtrust ePapan</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Right  Notification & User Dropdown -->
      <div class="d-flex align-center right-row">
        <AppBarShortcuts></AppBarShortcuts> &nbsp; &nbsp;
        <AppBarNotification></AppBarNotification> &nbsp;
        <AppBarUserMenu> </AppBarUserMenu>
      </div>
    </v-app-bar>

    <v-main>
      <div
        v-if="$store.state.userInfo && $store.state.userInfo.userTypeId == '1'"
        class="app-content-container boxed-container pa-6"
      >
        <eMdaltor open="false"></eMdaltor>
      </div>

      <template v-if="spinnerStatus">
        <spinner :loading="spinnerStatus"> </spinner>
      </template>
      <v-container fluid>
        <keep-alive :include="['LoginForm']">
          <transition name="fab-transition" appear>
            <router-view></router-view>
          </transition>
        </keep-alive>

        <!-- <div class="wrapper">
					<div class="content">
						<spinner :loading="spinnerStatus"> </spinner>
					</div>
				</div> -->
      </v-container>
    </v-main>

    <v-footer app inset color="transparent" absolute height="56" class="px-0">
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2022
            <a href="" class="text-decoration-none" target="_blank"
              >COWAY ITS&O</a
            ></span
          >
        </div>
      </div>
    </v-footer>
  </v-app>
</template>
<script>
import baseApi from "../../api/index";
import AppBarNotification from "../../components/appBar/AppBarNotification.vue";
import AppBarUserMenu from "../../components/appBar/AppBarUserMenu.vue";
import AppBarShortcuts from "../../components/appBar/AppBarShortcuts";
var temp = [];

export default {
  components: {
    AppBarNotification,
    AppBarUserMenu,
    AppBarShortcuts,
  },

  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },

    userInfo() {
      return this.$store.state.userInfo;
    },
  },

  created() {
    this.asyncfetchDataList().then((request) => {
      request.data.dataList.map((mysqlObj) => {
        var t = {
          text: mysqlObj.text,
          connect_by_order: mysqlObj.connect_by_order,
          sublinks: [],
        };

        if (mysqlObj.sublinks == "") {
          temp.push(t);
        } else {
          for (var i in temp) {
            if (temp[i].connect_by_order == mysqlObj.connect_by_order) {
              temp[i].sublinks.push(mysqlObj);
            }
          }
        }
      });
    });
  },
  data() {
    return {
      drawer: null,
      spinnerStatus: false,
      links: temp,
    };
  },

  methods: {
    logoutUser() {
      this.$store.commit("clearUserInfo");
      this.$router.push("/");
    },
    async asyncfetchDataList() {
      try {
        const userInfo = this.$store.state.userInfo;
        return await baseApi.getMenuList(userInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.ListItemClass {
  color: #f5f5f5;
}
.ListItemImgClass {
  color: #d9f00f;
}

.SelectedTile:hover {
  border-radius: 4px;
  background: #aaabac;
}

.SelectedTile-active {
  background: #fff;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  text-decoration: none;
}

@media all and (display-mode: standalone) {
  #pwa {
    display: block;
  }
}

@media all and (display-mode: browser) {
  #pwa {
    display: none;
  }
}
</style>
