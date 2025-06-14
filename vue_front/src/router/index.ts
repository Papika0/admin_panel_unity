import { storeToRefs } from "pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/themes";
import ProjectDetails from "@/pages/ProjectDetails.vue";
import _ from "lodash";
import { useAuthStore } from "@/stores/auth";

interface RouteMeta {
  requiresAuth?: boolean;
  breadcrumb?: Array<{ label: string; path: string }>;
  userCategory?: number[];
}

const routes: Array<RouteRecordRaw & { meta: RouteMeta }> = [
  {
    path: "/",
    name: "login",
    meta: { requiresAuth: false },
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/auth",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard-overview-1",
        meta: {
          breadcrumb: [{ label: "მთავარი", path: "dashboard" }],
        },
        component: () => import("../pages/DashboardOverview1.vue"),
      },

      {
        path: "translations",
        name: "translations-editor",
        meta: {
          breadcrumb: [{ label: "ტექსტები", path: "translations" }],
        },
        component: () => import("../pages/TransaltionEditor.vue"),
      },

      {
        path: "projects",
        name: "projects",
        meta: {
          breadcrumb: [{ label: "პროექტები", path: "projects" }],
        },
        component: () => import("../pages/Projects.vue"),
      },

      {
        path: "/projects/:id",
        name: "ProjectDetail",
        component: ProjectDetails,
        meta: {
          breadcrumb: [
            { label: "პროექტები", path: "projects" },
            { label: "პროექტის დეტალები", path: "/projects/:id" },
          ],
        },
        props: true, // so that route.params.id becomes a prop
      },
      {
        path: "projects/create",
        name: "ProjectAdd",
        component: () => import("@/pages/ProjectAdd.vue"),
        meta: {
          breadcrumb: [
            { label: "პროექტები", path: "projects" },
            { label: "პროექტის შექმნა", path: "/projects/create" },
          ],
        },
      },

      {
        path: "projects/:id/edit",
        name: "ProjectEdit",
        component: () => import("@/pages/ProjectEdit.vue"),
        props: true,
        meta: {
          breadcrumb: [
            { label: "პროექტები", path: "projects" },
            { label: "პროექტის დეტალები", path: "/projects/:id" },
            { label: "რედაქტირება", path: "/projects/:id/edit" },
          ],
        },
      },

      {
        path: ":pathMatch(.*)*",
        name: "auth-not-found",
        meta: {},
        component: () => import("../pages/ErrorPage.vue"),
      },
    ],
  },
  {
    path: "/:notFound(.*)",
    name: "not-found",
    meta: {},
    component: () => import("../pages/ErrorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const authToken = localStorage.getItem("jwt_token");
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  if (authToken && !user.value) {
    try {
      await authStore.checkAuthToken();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const isAuthenticated = !!authToken && !!user.value; // Set isAuthenticated based on the presence of the token
  const categoryId = parseInt(localStorage.getItem("category_id") || "0", 10);

  if (to.meta.requiresAuth && !isAuthenticated) {
    return router.push({ name: "login" });
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    return router.push({ name: "dashboard-overview-1" });
  } else if (
    to.meta.userCategory &&
    !_.includes(to.meta.userCategory as number[], categoryId)
  ) {
    // Redirect to an error page or show an error message
    return router.push({ name: "auth-not-found" });
  }
});

export default router;
