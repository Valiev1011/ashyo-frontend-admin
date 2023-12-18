export default {
  path: "/admin",
  name: "admin",
  component: () => import("../pages/admin/Admin.vue"),
  children: [
    {
      path: "products",
      name: "products",
      meta: {
        child: "products",
      },
      component: () => import("../pages/admin/Products.vue"),
    },
    {
      path: "category",
      name: "category",
      meta: {
        child: "category",
      },
      component: () => import("../pages/admin/Category.vue"),
    },
    {
      path: "brands",
      name: "brands",
      meta: {
        child: "brands",
      },
      component: () => import("../pages/admin/Brands.vue"),
    },
    {
      path: "models",
      name: "models",
      meta: {
        child: "models",
      },
      component: () => import("../pages/admin/Models.vue"),
    },
    {
      path: "model/create",
      name: "create_model",
      meta: {
        child: "models",
      },
      component: () => import("../pages/admin/Modals/addModel.vue"),
    },
    {
      path: "sales",
      name: "sales",
      meta: {
        child: "sales",
      },
      // @ts-ignore
      component: () => import("@/pages/admin/Sales.vue"),
    },
  ],
};
