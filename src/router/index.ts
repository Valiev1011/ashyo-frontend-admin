import { createRouter, createWebHistory } from "vue-router";
import notFound from "./not-found";
import admin from "./admin";
import auth from "./auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [notFound, admin, auth],
});

export default router;
