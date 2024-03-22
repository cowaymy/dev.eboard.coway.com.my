const performance = [
  {
    path: "/performance/eKeyinPerformance",
    name: "eKeyin-Performance",
    component: () => import("../views/infoHub/KnowledgeBase.vue"),
    meta: {
      layout: "content",
      requiresAuth: false,
    },
  },
  { 
    path: "/performance/codyPerformance",
    name: "codyPerformance",
    component: () => import("../views/dashboard/cody/HellowCody.vue"),
    meta: {
      layout: "content",
      requiresAuth: false,
    },
  },
  {
    path: "/performance/DSTPerformance",
    name: "DSTPerformance",
    component: () => import("../views/dashboard/sales/SalesMainHQPage.vue"),
    meta: {
      layout: "content",
      requiresAuth: false,
    },
  },
  {
    path: "/performance/NetSalesReport",
    name: "NetSalesReport",
    component: () => import("../views/performance/netSales/netSalesReport.vue"),
    meta: {
      layout: "content",
      requiresAuth: false,
    },
  },
];

export default performance;
