import { useRouter } from "vue-router";

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (name: string) => {
    router.push({ name: name });
  };

  return { navigateTo };
};
