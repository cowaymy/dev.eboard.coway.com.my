const notiList = [
    {
      path: "/notifiaction/NotificationList",
      name: "notificationList",
      component: () => import("../views/notification/NotificationList.vue"),
      meta: {
        layout: "content",
        requiresAuth: process.env.VUE_APP_CHK_AUH,
      }, 
    }
  ];
  