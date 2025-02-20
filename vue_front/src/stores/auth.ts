import { defineStore, storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { login, logout, getUser } from "@/http/auth_api";
import { deleteUserCache } from "@/http/cahce";
import { useRouter } from "vue-router";
import { toastify } from "@/utils/toast";
import axios, { AxiosError } from "axios";

export interface User {
  id: number;
  user_name: string;
  category_id: number;
  category_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  distr_code: string;
  remember_token: string;
  // Add other user properties as needed
}

enum RoutePath {
  Dashboard = "/dashboard",
  Home = "/",
}
export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);
  const distr_code = ref<string>("");
  const token = ref(localStorage.getItem("jwt_token"));
  const isAuthenticated = computed(() => !!user.value);
  const router = useRouter();

  const fetchUser = async (): Promise<void> => {
    try {
      const { data } = await getUser();

      user.value = data;
      distr_code.value = data.distr_code;

      // Store category_id in local storage
      localStorage.setItem("category_id", data.category_id);
      localStorage.setItem("auth_distr_code", data.distr_code);
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (
    code: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    try {
      const result = await login(code, password, rememberMe);

      user.value = result.data.user;
      // await fetchUser();
      if (result.status === 200 && user.value) {
        localStorage.setItem("category_id", String(user.value.category_id));
        localStorage.setItem("auth_distr_code", String(user.value.distr_code));
        setToken(result.data.token);
        distr_code.value = String(user.value.distr_code);

        router.push(RoutePath.Dashboard);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        toastify.error(
          error.response.data.message ||
            "მომხმარებელის კოდი ან პაროლი არასწორია."
        );
      } else {
        toastify.error("შეცდომა სერვერთან კომუნიკაციისას.");
      }
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      const response = await logout();
      if (response.status === 204) {
        clearAuth();
      }
      router.push(RoutePath.Home);
    } catch (error) {
      console.error(error);
    }
  };

  const category_id = computed(() => user.value?.category_id);

  const checkAuthToken = async () => {
    const authToken = localStorage.getItem("jwt_token");
    if (authToken) {
      await fetchUser();
    }
  };

  const deleteCache = async () => {
    try {
      const response = await deleteUserCache();
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting cache:", error);
    }
  };
  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("jwt_token", newToken); // Save token to localStorage
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return {
    user,
    isAuthenticated,
    distr_code,
    category_id,
    fetchUser,
    loginUser,
    logoutUser,
    checkAuthToken,
    deleteCache,
  };
});
