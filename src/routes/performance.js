const performance = [
  {
    path: "/performance/eKeyinPerformance",
    name: "eKeyin-Performance",
    component: () => import("../views/infoHub/KnowledgeBase.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  { 
    path: "/performance/codyPerformance",
    name: "codyPerformance",
    component: () => import("../views/dashboard/cody/HellowCody.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/DSTPerformance",
    name: "DSTPerformance",
    component: () => import("../views/dashboard/sales/SalesMainHQPage.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/NetSalesReport",
    name: "NetSalesReport",
    component: () => import("../views/performance/netSales/ds/netSalesReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/NetSalesGMReport",
    name: "NetSalesGMReport",
    component: () => import("../views/performance/netSales/ds/netSalesGMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
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
      requiresAuth: true,
    },
  },

  




  
  {
    path: "/performance/ActiveHPReport",
    name: "ActiveHPReport",
    component: () => import("../views/performance/active/ds/activeHPReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/ActiveHPGMReport",
    name: "ActiveHPGMReport",
    component: () => import("../views/performance/active/ds/activeHPGMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/ActiveHPSMReport",
    name: "ActiveHPSMReport",
    component: () => import("../views/performance/active/ds/activeHPSMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/ActiveHPHMReport",
    name: "ActiveHPHMReport",
    component: () => import("../views/performance/active/ds/activeHPHMReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/performance/KeyInReport",
    name: "KeyInReport",
    component: () => import("../views/performance/keyIn/ds/keyInReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  }
];

export default performance;
