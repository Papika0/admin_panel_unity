// import { createRouter, createWebHistory } from "vue-router";
// import Layout from "@/themes";
// import _ from "lodash";
// import { useAuthStore } from "@/stores/auth";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       name: "login",
//       meta: { requiresAuth: false },
//       component: () => import("../pages/Login.vue"),
//     },
//     {
//       path: "/auth",
//       component: Layout,
//       meta: { requiresAuth: true },
//       children: [
//         {
//           path: "dashboard",
//           name: "dashboard-overview-1",
//           component: () => import("../pages/DashboardOverview1.vue"),
//         },
//         {
//           path: "users-layout-1",
//           name: "users-layout-1",
//           component: () => import("../pages/UsersLayout1.vue"),
//         },
//         {
//           path: "map",
//           name: "map",
//           component: () => import("../pages/Map.vue"),
//         },
//         {
//           path: "building-list",
//           name: "building-list",
//           component: () => import("../pages/BuildingList.vue"),
//         },
//         {
//           path: "questionnaire-list",
//           name: "questionnaire-list",
//           component: () => import("../pages/QuestionnaireList.vue"),
//         },
//         {
//           path: "questionnaire",
//           name: "questionnaire",
//           component: () => import("../pages/Questionnaire.vue"),
//         },

//         // ზედა რგოლის გვერდები
//         {
//           path: "personnel",
//           name: "personnel",
//           component: () => import("../pages/Personnel.vue"),
//         },
//       ],
//     },
//     {
//       path: "/:notFound(.*)",
//       name: "not-found",
//       component: () => import("../pages/ErrorPage.vue"),
//     },
//     // {
//     //   path: "/register",
//     //   name: "register",
//     //   component: () => import("../pages/Register.vue"),
//     // },
//   ],
// });

// router.beforeEach(async (to, from) => {
//   const authStore = useAuthStore();
//   await authStore.fetchUser();
//   const isAuthenticated = authStore.isAuthenticated;
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return router.push({ name: "login" });
//   } else if (!to.meta.requiresAuth && isAuthenticated) {
//     return router.push({ name: "dashboard-overview-1" });
//   }
// });

// export default router;

import { storeToRefs } from "pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/themes";
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

      // {
      //   path: "settlements-information",
      //   name: "settlements-information",
      //   meta: {
      //     breadcrumb: [
      //       { label: "მთავარი", path: "dashboard" },
      //       {
      //         label: "დაასახლებები",
      //         path: "settlements-information",
      //       },
      //     ],
      //     userCategory: [5, 6],
      //   },
      //   component: () => import("../pages/SettlementInformation.vue"),
      // },

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
