const performance = [
  {
    path: "/performance/eKeyinPerformance",
    name: "eKeyin-Performance",
    component: () => import("../views/infoHub/KnowledgeBase.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  { 
    path: "/performance/codyPerformance",
    name: "codyPerformance",
    component: () => import("../views/dashboard/cody/HellowCody.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/salesPerformance",
    name: "DSTPerformance",
    component: () => import("../views/dashboard/sales/SalesMainHQPage.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/NetSalesReport",
    name: "NetSalesReport",
    component: () => import("../views/performance/netSales/ds/netSalesReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/NetSalesGMReport",
    name: "NetSalesGMReport",
    component: () => import("../views/performance/netSales/ds/netSalesGMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/NetSalesSMReport",
    name: "NetSalesSMReport",
    component: () => import("../views/performance/netSales/ds/netSalesSMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/NetSalesHMReport",
    name: "NetSalesHMReport",
    component: () => import("../views/performance/netSales/ds/netSalesHMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/NetSalesHPReport",
    name: "NetSalesHPReport",
    component: () => import("../views/performance/netSales/ds/netSalesHPReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },

  

  




  
  {
    path: "/performance/ActiveHPReport",
    name: "ActiveHPReport",
    component: () => import("../views/performance/active/ds/activeHPReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/ActiveHPGMReport",
    name: "ActiveHPGMReport",
    component: () => import("../views/performance/active/ds/activeHPGMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/ActiveHPSMReport",
    name: "ActiveHPSMReport",
    component: () => import("../views/performance/active/ds/activeHPSMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/ActiveHPHMReport",
    name: "ActiveHPHMReport",
    component: () => import("../views/performance/active/ds/activeHPHMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/keyInReport",
    name: "keyInReport",
    component: () => import("../views/performance/keyIn/ds/keyInReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/SHIReport",
    name: "SHIReport",
    component: () => import("../views/performance/shi/ds/rcHPReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  } ,
  {
    path: "/performance/SHIGMReport",
    name: "SHIGMReport",
    component: () => import("../views/performance/shi/ds/rcHPGMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  }
  ,
  {
    path: "/performance/SHIHMReport",
    name: "SHIHMReport",
    component: () => import("../views/performance/shi/ds/rcHPHMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/SHISMReport",
    name: "SHISMReport",
    component: () => import("../views/performance/shi/ds/rcHPSMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  },
  {
    path: "/performance/SHIHPReport",
    name: "SHIHPReport",
    component: () => import("../views/performance/shi/ds/rcHPHPReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  }

  
];

export default performance;
