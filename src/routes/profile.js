export const profile = [
  {
    path: "/profile/account",
    name: "account",
    component: () => import("../views/account-settings/AccountSettings.vue"),
    meta: {
      layout: "content",
      requiresAuth: process.env.VUE_APP_CHK_AUH,
    },
  }
];
export default profile; 