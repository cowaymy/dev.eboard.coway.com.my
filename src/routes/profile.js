const profile = [
    {
      path: "/profile/account",
      name: "account",
      component: () => import("../views/account-settings/AccountSettings.vue"),
      meta: {
        layout: "content",
        requiresAuth: false,
      },
    }
  ];
  
  export default profile;
  