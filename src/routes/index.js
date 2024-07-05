import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import commission from "./commission";
import performance from "./performance";
import sales from "./sales";
import profile from "./profile";
import quotation from "./quotation";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
      name: "home",
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login/LoginPage.vue"),
      meta: {
        layout: 'blank',
        requiresAuth: false
      },
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/comm/ErrorPage.vue"),
    },
    {
      path: "/unknowUserTypeError",
      name: "unknowUserTypeError",
      component: () => import("../views/comm/UnknowUserTypeError.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content" },
    },
    {
      path: "/css",
      name: "css",
      component: () => import("../views/comm/CSS.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content" },
    },
    {
      path: "/ssoLogin",
      name: "ssoLogin",
      component: () => import("../views/login/AutoLogin.vue"),
    },
    {
      path: "/clock",
      name: "clock",
      component: () => import("../views/comm/DigitalClock.vue"),
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import("../views/login/LoginPage.vue"),
    // },
    {
      path: "/userInfo",
      name: "userInfo",
      component: () => import("../views/account-settings/AccountSettings.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/login/SignupPage.vue"),
    },
    {
      path: "*",
      component: () => import("../views/comm/NotFoundPage.vue"),
    },
    {
      path: "/SalesMain",
      name: "SalesMain",
      component: () => import("../views/dashboard/sales/SalesMainHQPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content" },
    },
    {
      path: "/SGMMain",
      name: "SGMMain",
      component: () => import("../views/dashboard/sales/SalesMainSGMPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH  ,layout: "content" },
    },
    {
      path: "/GMMain",
      name: "GMMain",
      component: () => import("../views/dashboard/sales/SalesMainGMPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH  ,layout: "content" },
    },
    {
      path: "/SMMain",
      name: "SMMain",
      component: () => import("../views/dashboard/sales/SalesMainSMPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content" },
    },

    {
      path: "/HMMain",
      name: "HMMain",
      component: () => import("../views/dashboard/sales/SalesMainHMPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content" },
    },
    {
      path: "/HPMain",
      name: "HPMain",
      component: () => import("../views/dashboard/sales/SalesMainHPPage.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH  ,layout: "content" },
    },
    {
      path: "/dscMain",
      name: "dscMain",
      component: () => import("../views/dashboard/dsc/HellowDsc.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH },
    },
    {
      path: "/CodyMain",
      name: "CodyMain",
      component: () => import("../views/dashboard/cody/HellowCody.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH  , layout: "content"},
    },
    {
      path: "/homecareMain",
      name: "homecareMain",
      component: () => import("../views/dashboard/homecare/HellowHomecare.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH   , layout: "content"},
    },
    {
      path: "/notif/NotificationList",
      name: "NotificationList",
      component: () => import("../views/notification/NotificationList.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content"},
    },
    {
      path: "/notif/NotificationItemDetailView",
      name: "NotificationItemDetailView",
      component: () => import("../views/notification/NotificationItemDetailView.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content"},
    },
    {
      path: "/notif/NotificationItemDetailEdit",
      name: "NotificationItemDetailEdit",
      component: () => import("../views/notification/NotificationItemDetailEdit.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH ,layout: "content"},
    },
    {
      path: "/AttendScanQR",
      name: "AttendScanQR",
      component: () => import("../views/comm/AttendScanQRCode.vue"),
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH , layout: "content"},
    },
    {
      path: "/AttendScanQRResult",
      name: "AttendScanQRResult",
      component: () => import("../views/comm/AttendScanQRCodeResult.vue"),
      props: true,
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH , layout: "content"},
    },
    {
      path: "/AttendScanQRSettingResult",
      name: "AttendScanQRSettingResult",
      component: () =>
        import(
          "../views/account-settings/AccountSettingASQRCodeSettingResult.vue"
        ),
      props: true,
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH , layout: "content"},
    },

    {
      path: "/AttendHistory",
      name: "AttendHistory",
      component: () => import("../views/comm/calendar/Calendar.vue"),
      props: true,
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH , layout: "content"},
    },

    {
      path: "/AttendHistoryList",
      name: "AttendHistoryList",
      component: () =>
        import("../views/comm/calendar/CalendarAttendanceHistory.vue"),
      props: true,
      meta: { requiresAuth: process.env.VUE_APP_CHK_AUH , layout: "content"},
    },
    ...profile,
    ...sales,
    ...commission,
    ...performance,
    ...quotation,
  ],
});

router.beforeEach((to, from, next) => {
  if (process.env.VUE_APP_CHK_AUH) {
    if (to.meta.requiresAuth) {
      // need to login
      if (store.getters.isLogin) {
        next();
      } else {
        next({
          name: "login",
        });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
