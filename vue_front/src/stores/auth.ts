import { defineStore, storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { login, logout, getUser } from "@/http/auth_api";
// import { deleteUserCache } from "@/http/cahce";
import { useRouter } from "vue-router";
import { toastify } from "@/utils/toast";
import axios, { AxiosError } from "axios";

export interface User {
  id: number;
  role_id: number;
  // Add other user properties as needed
}

enum RoutePath {
  Dashboard = "/dashboard",
  Home = "/",
}
export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);

  const token = ref(localStorage.getItem("jwt_token"));
  const isAuthenticated = computed(() => !!user.value);
  const router = useRouter();

  const fetchUser = async (): Promise<void> => {
    try {
      const { data } = await getUser();

      user.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    try {
      const result = await login(email, password, rememberMe);
      console.log(result);
      user.value = result.data.data.user;
      // await fetchUser();
      if (result.status === 200 && user.value) {
        setToken(result.data.data.token);
        router.push(RoutePath.Dashboard);
      }
    } catch (error) {
      console.log(error);
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

  const role_id = computed(() => user.value?.role_id);

  const checkAuthToken = async () => {
    const authToken = localStorage.getItem("jwt_token");
    if (authToken) {
      await fetchUser();
    }
  };

  // const deleteCache = async () => {
  //   try {
  //     const response = await deleteUserCache();
  //     if (response.status === 200) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error deleting cache:", error);
  //   }
  // };
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
    fetchUser,
    loginUser,
    logoutUser,
    role_id,
    checkAuthToken,
    // deleteCache,
  };
});
