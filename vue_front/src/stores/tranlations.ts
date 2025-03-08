import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getTranslations } from "@/http/translations";

interface Translation {
  id: number;
  key: string;
  group: string;
  active: boolean;
  text_en: string;
  text_ka: string;
  text_ru: string;
}

export const useTranslationsStore = defineStore("TranslationsStore", () => {
  const translations = ref<Translation[]>([]);
  const showPaginate = ref(true);
  const pagination = ref({
    current_page: 1,
    last_page: 2,
  });
  // Action to fetch staff data
  async function fetchTranslations(page = 1) {
    try {
      await getTranslations(page).then((response) => {
        console.log("Translations:", response.data);

        translations.value = response.data.data;
        pagination.value = response.data.meta;
      });
    } catch (error) {
      console.error("Failed to fetch staff:", error);
      // Handle error appropriately
    }
  }

  const pages = computed(() => {
    const { current_page, last_page } = pagination.value;
    let startPage, endPage;

    if (last_page <= 5) {
      startPage = 1;
      endPage = last_page;
    } else {
      if (current_page <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (current_page + 2 >= last_page) {
        startPage = last_page - 4;
        endPage = last_page;
      } else {
        startPage = current_page - 2;
        endPage = current_page + 2;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  });

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= pagination.value.last_page) {
      pagination.value.current_page = page;
      fetchTranslations(page);
    }
  };

  return {
    translations,
    fetchTranslations,
    pages,
    goToPage,
    showPaginate,
    pagination,
  };
});
