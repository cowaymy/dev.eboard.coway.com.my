const sales = [
    {
      path: "/order/orderMgmt/:id?",
      name: "orderMgmt",
      component: () => import("../views/comm/orderMgt/OrderMgt.vue"),
      props: true,
      meta: {
        layout: "content",
        requiresAuth: false,
      },
    }
  ];
  
  export default sales;
  