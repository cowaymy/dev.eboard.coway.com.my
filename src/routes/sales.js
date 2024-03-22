const sales = [
    {
      path: "/order/orderMgmt",
      name: "orderMgmt",
      component: () => import("../views/comm/orderMgt/OrderMgt.vue"),
      meta: {
        layout: "content",
        requiresAuth: false,
      },
    }
  ];
  
  export default sales;
  