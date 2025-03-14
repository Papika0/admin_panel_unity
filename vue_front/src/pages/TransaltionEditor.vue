<script setup lang="ts">
import _ from "lodash";
import { useTranslationsStore } from "@/stores/tranlations";
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import {
    FormInput,
} from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import Table from "@/components/Base/Table";
import Pagination from "@/components/Base/Pagination";
import EditTranslationButton from "@/components/Button/EditTranslationButton.vue";
import AddTranslationButton from "@/components/Button/AddTranslationButton.vue";

const translationsStore = useTranslationsStore();
const { translations, pages, showPaginate, pagination } = storeToRefs(translationsStore);
const { goToPage } = translationsStore;

const searchQuery = ref("");

const searchTranslations = () => {
    translationsStore.fetchTranslations(1, searchQuery.value);
};

const clearSearch = () => {
    searchQuery.value = "";
    translationsStore.fetchTranslations();
};

onBeforeMount(() => {
    translationsStore.fetchTranslations();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 mt-8">
            <div class="flex items-center h-10 justify-between">
                <!-- Title -->
                <h2 class="mr-5 text-lg font-medium truncate">გამოყენებული ტექსტები</h2>
                <!-- Search Bar -->
                <div class="flex items-center space-x-2">
                    <div class="relative">
                        <FormInput type="text" v-model="searchQuery" class="w-56 pr-10" placeholder="მოძებნე ტექსტი" />
                        <button v-if="searchQuery" @click="clearSearch"
                            class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <Button variant="primary" class="rounded-xl flex" @click="searchTranslations">
                        <Lucide icon="Search" class="w-4 h-4 mr-2 " /> ძიება
                    </Button>
                </div>

                <!-- Additional Button -->
                <AddTranslationButton />
            </div>

            <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
                <Table class="table-fixed border-spacing-y-[10px] border-separate -mt-2">
                    <Table.Thead>
                        <Table.Tr>
                            <!-- <Table.Th class="border-b-0 whitespace-nowrap"> IMAGES </Table.Th> -->
                            <Table.Th class="border-b-0 whitespace-nowrap font-black">
                                საიდენტიფიკაციო კოდი
                            </Table.Th>
                            <Table.Th class="border-b-0 whitespace-nowrap font-black">
                                ტექსტი ქართულად
                            </Table.Th>
                            <Table.Th class="border-b-0 whitespace-nowrap font-black">
                                ტექსტი ინგლისურად
                            </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap font-black">
                                ტექსტი რუსულად
                            </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap font-black">
                                ჯგუფი
                            </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap font-black">
                                აქტიურია
                            </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap font-black">
                                ACTIONS
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr v-for="(value, index) in translations" :key="index" class="intro-x">
                            <Table.Td
                                class="box rounded-l-none rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black">
                                {{ value.key }}
                            </Table.Td>
                            <Table.Td
                                class="box rounded-l-none whitespace-normal break-words rounded-r-none border-x-0 text-center shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black">
                                {{ value.text_ka }}
                            </Table.Td>

                            <Table.Td
                                class=" box rounded-l-none rounded-r-none border-x-0 text-center
                                shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l
                                last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black whitespace-normal break-words">
                                {{ value.text_en }}
                            </Table.Td>
                            <Table.Td
                                class=" box rounded-l-none rounded-r-none border-x-0 text-center 
                                shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l
                                last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black whitespace-normal break-words">
                                {{ value.text_ru }}
                            </Table.Td>
                            <Table.Td
                                class=" box rounded-l-none rounded-r-none border-x-0 text-center
                                shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l
                                last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black whitespace-normal break-words">
                                {{ value.group }}
                            </Table.Td>
                            <Table.Td class=" box rounded-l-none rounded-r-none border-x-0 text-center
                                shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l
                                last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black">
                                {{ value.active ? "კი" : "არა" }}
                            </Table.Td>
                            <Table.Td :class="[
                                'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 font-black',
                                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',

                            ]">
                                <div class="flex items-center justify-center">
                                    <EditTranslationButton :translation="value"
                                        :currentPage="pagination.current_page" />
                                </div>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <!-- END: Data List -->
            <!-- BEGIN: Pagination -->
            <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
                <Pagination class="w-full sm:w-auto sm:mr-auto" v-if="showPaginate">
                    <Pagination.Link @click="goToPage(1, searchQuery)" :disabled="pagination.current_page === 1">
                        <Lucide icon="ChevronsLeft" class="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link @click="goToPage(pagination.current_page - 1, searchQuery)"
                        :disabled="pagination.current_page === 1">
                        <Lucide icon="ChevronLeft" class="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link v-if="pagination.current_page > 2">...</Pagination.Link>
                    <Pagination.Link v-for="page in pages" :key="page" @click="goToPage(page, searchQuery)"
                        :class="{ 'paginate-active-class': page === pagination.current_page }">
                        <!-- :active="page === pagination.current_page" -->
                        {{ page }}
                    </Pagination.Link>
                    <Pagination.Link v-if="pagination.current_page < pagination.last_page - 1">...</Pagination.Link>
                    <Pagination.Link @click="goToPage(pagination.current_page + 1, searchQuery)"
                        :disabled="pagination.current_page === pagination.last_page">
                        <Lucide icon="ChevronRight" class="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link @click="goToPage(pagination.last_page, searchQuery)"
                        :disabled="pagination.current_page === pagination.last_page">
                        <Lucide icon="ChevronsRight" class="w-4 h-4" />
                    </Pagination.Link>
                </Pagination>
            </div>
        </div>
    </div>
</template>
