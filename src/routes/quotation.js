const quotation = [
    {
      path: "/quot/quotation",
      name: "quotation",
      component: () => import("../views/quotation/quotation.vue"),
      meta: {
        layout: "content",
        requiresAuth: false
      },
    },
    {
      path: "/quot/quotationPreview",
      name: "quotationPreview",
      component: () => import("../views/quotation/quotationPreview.vue"),
      meta: {
        layout: "print",
        requiresAuth: false
      },
    },
    {
      path: "/quot/ekeyInList/:id?",
      name: "ekeyInList",
      component: () => import("../views/quotation/ekeyInList.vue"),
      props: true,
      meta: {
        layout: "content",
        requiresAuth: false
      },
    },
    
  ];
  
  export default quotation;
  