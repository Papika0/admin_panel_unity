import { type Icon } from "@/components/Base/Lucide/Lucide.vue";
import { type Themes } from "@/stores/theme";
import { defineStore, storeToRefs } from "pinia";
import sideMenu from "@/main/side-menu";
import simpleMenu from "@/main/simple-menu";
import topMenu from "@/main/top-menu";
import _ from "lodash";
import { useAuthStore } from "./auth";
import { ref } from "vue";
export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  categories: number[];
}

export interface MenuState {
  menuValue: Array<Menu | "divider">;
}

export const useMenuStore = defineStore("menu", () => {
  const authStore = useAuthStore();
  const { category_id } = storeToRefs(authStore);
  const menuValue = ref<MenuState["menuValue"]>([]);
  const menu = (layout: Themes["layout"]) => {
    let menuItems;
    if (layout == "top-menu") {
      menuItems = topMenu;
    } else if (layout == "simple-menu") {
      menuItems = simpleMenu;
    } else {
      menuItems = sideMenu;
    }
    // Filter items where show is true
    return _.filter(menuItems, (item) => {
      if (
        typeof item !== "string" &&
        _.includes(item.categories, category_id.value)
      ) {
        return true;
      }
      return false;
    });
  };

  return {
    menuValue,
    menu,
  };
});
