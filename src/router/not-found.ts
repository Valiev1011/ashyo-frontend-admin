export default {
  path: "/:pathMatch(.*)*",
  name: "not-found",
  component: () => import("../pages/404/NotFound.vue"),
};
