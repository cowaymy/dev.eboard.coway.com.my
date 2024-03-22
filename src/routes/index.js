import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import commission from "./commission";
import performance from "./performance";
import sales from "./sales";
import profile from "./profile";





Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginPage.vue'),
      meta: {
        layout: 'blank',
        resource: 'Public',
      },
    }
    ,{
      path: "/",
      redirect: "/login",
      name: "home",
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/comm/ErrorPage.vue"),
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
      path: "/salesMainHQ",
      name: "salesMainHQ",
      component: () => import("../views/dashboard/sales/SalesMainHQPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/salesMainSGM",
      name: "salesMainSGM",
      component: () => import("../views/dashboard/sales/SalesMainSGMPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/salesMainGM",
      name: "salesMainGM",
      component: () => import("../views/dashboard/sales/SalesMainGMPage.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/salesMainSM",
      name: "salesMainSM",
      component: () => import("../views/dashboard/sales/SalesMainSMPage.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/salesMainHM",
      name: "salesMainHM",
      component: () => import("../views/dashboard/sales/SalesMainHMPage.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/salesMainHP",
      name: "salesMainHP",
      component: () => import("../views/dashboard/sales/SalesMainHPage.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/salesMain",
      name: "salesMain",
      component: () => import("../views/dashboard/sales/SalesMainPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dscMain",
      name: "dscMain",
      component: () => import("../views/dashboard/dsc/HellowDsc.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/codyMain",
      name: "codyMain",
      component: () => import("../views/dashboard/cody/HellowCody.vue"),
      meta: { requiresAuth: true  , layout: "content"},
    },
    {
      path: "/homecareMain",
      name: "homecareMain",
      component: () => import("../views/dashboard/homecare/HellowHomecare.vue"),
      meta: { requiresAuth: true   , layout: "content"},
    },

    {
      path: "/hpmain",
      name: "hpmain",
      component: () => import("../views/dashboard/TempMainPageForHp.vue"),
      meta: { requiresAuth: true  , layout: "content"},
    },
    {
      path: "/notif/NotificationList",
      name: "NotificationList",
      component: () => import("../views/notification/NotificationList.vue"),
      meta: { requiresAuth: false ,layout: "content"},
    },
    {
      path: "/notif/NotificationItemDetailView",
      name: "NotificationItemDetailView",
      component: () => import("../views/notification/NotificationItemDetailView.vue"),
      meta: { requiresAuth: false ,layout: "content"},
    },
    {
      path: "/notif/NotificationItemDetailEdit",
      name: "NotificationItemDetailEdit",
      component: () => import("../views/notification/NotificationItemDetailEdit.vue"),
      meta: { requiresAuth: false ,layout: "content"},
    },
    {
      path: "/AttendScanQR",
      name: "AttendScanQR",
      component: () => import("../views/comm/AttendScanQRCode.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/AttendScanQRResult",
      name: "AttendScanQRResult",
      component: () => import("../views/comm/AttendScanQRCodeResult.vue"),
      props: true,
      meta: { requiresAuth: false },
    },
    {
      path: "/AttendScanQRSettingResult",
      name: "AttendScanQRSettingResult",
      component: () =>
        import(
          "../views/account-settings/AccountSettingASQRCodeSettingResult.vue"
        ),
      props: true,
      meta: { requiresAuth: false },
    },

    {
      path: "/AttendHistory",
      name: "AttendHistory",
      component: () => import("../views/comm/calendar/Calendar.vue"),
      props: true,
      meta: { requiresAuth: false },
    },

    {
      path: "/AttendHistoryList",
      name: "AttendHistoryList",
      component: () =>
        import("../views/comm/calendar/CalendarAttendanceHistory.vue"),
      props: true,
      meta: { requiresAuth: false },
    },
    ...profile,
    ...sales,
    ...commission,
    ...performance,
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
