import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupForm from "../components/SignupForm.vue";
import SigninForm from "../components/SigninForm.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import MarketPlaceView from "@/views/MarketPlaceView.vue";
import CartView from "@/views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "SignupForm",
    component: SignupForm,
    meta: { requiresAuth: false },
  },
  {
    path: "/signin",
    name: "SigninForm",
    component: SigninForm,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "DashBoardLayout",
    component: ProjectsView,
    meta: { requiresAuth: true, layout: "default" },
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: MarketPlaceView,
    meta: { requiresAuth: true, layout: "default" },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: { requiresAuth: true, layout: "default" },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Check if the route requires authentication and the user is not authenticated
  if (to.meta.requiresAuth && (!token || token === undefined)) {
    next({ name: "home" });
  }
  // Check if the user is authenticated and trying to access non-authenticated routes
  else if (!to.meta.requiresAuth && token) {
    next({ name: "DashBoardLayout" });
  }
  // Allow navigation
  else {
    next();
  }
});

export default router;
