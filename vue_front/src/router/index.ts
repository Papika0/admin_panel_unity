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
      {
        path: "users-layout",
        name: "users-layout",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
          ],
          userCategory: [2, 3, 4, 5],
        },

        component: () => import("../pages/UsersLayout.vue"),
      },
      // {
      //   path: "users-tree-layout",
      //   name: "users-tree-layout",
      //   meta: {
      //     breadcrumb: [
      //       { label: "მთავარი", path: "dashboard" },
      //       { label: "ზედამხედველები", path: "users-tree-layout" },
      //     ],
      //     userCategory: [3, 4, 5],
      //   },
      //   component: () => import("../pages/UsersTreeLayout.vue"),
      // },
      {
        path: "map",
        name: "map",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "Map", path: "map" },
          ],
          userCategory: [2, 3, 4, 5, 6],
        },
        component: () => import("../pages/Map/Map.vue"),
      },
      {
        path: "observer-map",
        name: "observer-map",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "რუკა", path: "observer-map" },
          ],
          userCategory: [2, 3, 4, 5, 6],
        },
        component: () => import("../pages/Map/ObserverMap.vue"),
      },
      {
        path: "building-list",
        name: "building-list",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "აღმწერები", path: "users-layout" },
            { label: "შენობები", path: "building-list" },
          ],
          userCategory: [2, 3, 4, 5, 6],
        },
        component: () => import("../pages/BuildingList.vue"),
      },
      {
        path: "questionnaire-list",
        name: "questionnaire-list",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
          ],
          userCategory: [2, 3, 4, 5, 6],
        },
        component: () => import("../pages/QuestionnaireList.vue"),
      },
      {
        path: "questionnaire",
        name: "questionnaire",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
          ],
          userCategory: [2, 3, 4, 5, 6, 7, 8],
        },
        component: () => import("../pages/Questionnaire.vue"),
      },
      {
        path: "dwelling-information",
        name: "dwelling-information",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
            { label: "ინფორმაცია საცხოვრისზე", path: "dwelling-information" },
          ],
          userCategory: [2, 3, 4, 5, 6, 7, 8],
        },
        component: () =>
          import("../pages/QuestionnaireDetail/DwellingInformation.vue"),
      },
      {
        path: "household",
        name: "household",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
            { label: "ინფორმაცია საცხოვრისზე", path: "dwelling-information" },
          ],
          userCategory: [2, 3, 4, 5],
        },
        component: () => import("../pages/QuestionnaireDetail/Household.vue"),
      },
      {
        path: "personal-information",
        name: "personal-information",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
            { label: "პერსონალური ინფორმაცია", path: "personal-information" },
          ],
          userCategory: [2, 3, 4, 5, 6, 7, 8],
        },
        component: () =>
          import("../pages/QuestionnaireDetail/PersonalInformation.vue"),
      },
      {
        path: "agriculture",
        name: "agriculture",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
            { label: "სოფლის მეურნეობა", path: "agriculture" },
          ],
          userCategory: [2, 3, 4, 5, 6, 7, 8],
        },
        component: () => import("../pages/QuestionnaireDetail/Agriculture.vue"),
      },
      {
        path: "field",
        name: "field",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "აღმწერები",
              path: "users-layout",
            },
            { label: "შენობები", path: "building-list" },
            { label: "კითხვარები", path: "questionnaire-list" },
            { label: "დეტალები", path: "questionnaire" },
            { label: "ნაკვეთები", path: "field" },
          ],
          userCategory: [2, 3, 4, 5, 6, 7, 8],
        },
        component: () => import("../pages/QuestionnaireDetail/Field.vue"),
      },
      {
        path: "personnel",
        name: "personnel",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "პერსონალი", path: "personnel" },
          ],
          userCategory: [4],
        },
        component: () => import("../pages/Personnel.vue"),
      },

      {
        path: "delete-house",
        name: "delete-house",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "შენობების წაშლა", path: "delete-house" },
          ],
          userCategory: [3],
        },
        component: () => import("../pages/DeleteHouse.vue"),
      },
      {
        path: "questionaire-transfer",
        name: "questionaire-transfer",
        component: () => import("../pages/QuestionnaireTransfer.vue"),
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            { label: "კითხვარების გადატანა", path: "questionaire-transfer" },
          ],
          userCategory: [3],
        },
      },
      {
        path: "questionnaire-level-control",
        name: "questionnaire-level-control",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "კითხვარების ხარისხის კონტროლი",
              path: "questionnaire-level-control",
            },
          ],
          userCategory: [2],
        },
        component: () => import("../pages/QuestionnaireLevelControl.vue"),
      },

      {
        path: "information",
        name: "information",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "ინფორმაცია",
              path: "information",
            },
          ],
          userCategory: [2, 3, 4, 5, 6],
        },
        component: () => import("../pages/Information.vue"),
      },

      {
        path: "admin-charts",
        name: "admin-charts",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "გრაფიკები",
              path: "admin-charts",
            },
          ],
          userCategory: [6],
        },
        component: () => import("../pages/Chart/AdminCharts.vue"),
      },

      {
        path: "add-user",
        name: "add-user",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "იუზერის დამატება",
              path: "add-user",
            },
          ],
          userCategory: [6],
        },
        component: () => import("../pages/UserAdd.vue"),
      },

      {
        path: "search-respodent",
        name: "search-respodent",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "რესპოდენტის ძებნა",
              path: "search-respodent",
            },
          ],
          userCategory: [6, 8],
        },
        component: () => import("../pages/SearchPerson.vue"),
      },
      {
        path: "questionnaire-control",
        name: "questionnaire-control",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "კონტროლი",
              path: "questionnaire-control",
            },
          ],
          userCategory: [3, 4, 5, 6],
        },
        component: () => import("../pages/Control/QuestionnaireControl.vue"),
      },

      {
        path: "self-registration",
        name: "self-registration",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "თვითრეგისტრაცია",
              path: "self-registration",
            },
          ],
          userCategory: [6],
        },
        component: () => import("../pages/SelfRegistration.vue"),
      },
      {
        path: "restore-base",
        name: "restore-base",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "ბაზის აღდგენა",
              path: "restore-base",
            },
          ],
          userCategory: [4, 5, 6],
        },
        component: () => import("../pages/RestoreBase.vue"),
      },
      {
        path: "export-daily-report",
        name: "export-daily-report",
        meta: {
          breadcrumb: [
            { label: "მთავარი", path: "dashboard" },
            {
              label: "ჩამოტვირთვა",
              path: "export-daily-report",
            },
          ],
          userCategory: [4],
        },
        component: () => import("../pages/Export/ExportDailyReport.vue"),
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
