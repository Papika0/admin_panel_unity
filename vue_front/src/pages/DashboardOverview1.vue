<script setup lang="ts">
import _ from "lodash";
import { ref, provide } from "vue";
import Button from "@/components/Base/Button";

import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import Litepicker from "@/components/Base/Litepicker";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportLineChart from "@/components/ReportLineChart";
import ReportPieChart from "@/components/ReportPieChart";

import { Menu } from "@/components/Base/Headless";

const salesReportFilter = ref<string>("");
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">ძირითადი ინფორმაცია</h2>
            <a href="" class="flex items-center ml-auto text-primary">
              <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div
                :class="[
                  'relative zoom-in',
                  'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                ]"
              >
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="ShoppingCart"
                      class="w-[28px] h-[28px] text-primary"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="33% Higher than last month"
                      >
                        33%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">4.710</div>
                  <div class="mt-1 text-base text-slate-500">სააღწერო უბნები</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div
                :class="[
                  'relative zoom-in',
                  'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                ]"
              >
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="CreditCard"
                      class="w-[28px] h-[28px] text-pending"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="2% Lower than last month"
                      >
                        2%
                        <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">3.721</div>
                  <div class="mt-1 text-base text-slate-500">აღწერილი მოსახლეობა</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div
                :class="[
                  'relative zoom-in',
                  'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                ]"
              >
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="Monitor"
                      class="w-[28px] h-[28px] text-warning"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="12% Higher than last month"
                      >
                        12%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">2.149</div>
                  <div class="mt-1 text-base text-slate-500">
                    აღწერილი შინამეურნოება
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div
                :class="[
                  'relative zoom-in',
                  'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                ]"
              >
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide
                      icon="User"
                      class="w-[28px] h-[28px] text-success"
                    />
                    <div class="ml-auto">
                      <Tippy
                        as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="22% Higher than last month"
                      >
                        22%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">152.040</div>
                  <div class="mt-1 text-base text-slate-500">
                    შევსებული კითხვარები
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 mt-8 lg:col-span-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate">Sales Report</h2>
            <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <Lucide
                icon="Calendar"
                class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="pl-10 sm:w-56 !box"
              />
            </div>
          </div>
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="flex flex-col md:flex-row md:items-center">
              <div class="flex">
                <div>
                  <div
                    class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
                  >
                    $15,000
                  </div>
                  <div class="mt-0.5 text-slate-500">This Month</div>
                </div>
                <div
                  class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
                ></div>
                <div>
                  <div class="text-lg font-medium text-slate-500 xl:text-xl">
                    $10,000
                  </div>
                  <div class="mt-0.5 text-slate-500">Last Month</div>
                </div>
              </div>
              <Menu class="mt-5 md:ml-auto md:mt-0">
                <Menu.Button
                  :as="Button"
                  variant="outline-secondary"
                  class="font-normal"
                >
                  Filter by Category
                  <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
                </Menu.Button>
                <Menu.Items class="w-40 h-32 overflow-y-auto">
                  <Menu.Item>PC & Laptop</Menu.Item>
                  <Menu.Item>Smartphone</Menu.Item>
                  <Menu.Item>Electronic</Menu.Item>
                  <Menu.Item>Photography</Menu.Item>
                  <Menu.Item>Sport</Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div
              :class="[
                'relative',
                'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
                'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
              ]"
            >
              <ReportLineChart :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>
        <!-- END: Sales Report -->
        <!-- BEGIN: Weekly Top Seller -->
        <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Weekly Top Seller</h2>
            <a href="" class="ml-auto truncate text-primary"> Show More </a>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <ReportPieChart :height="213" />
            </div>
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">17 - 30 Years old</span>
                <span class="ml-auto font-medium">62%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">31 - 50 Years old</span>
                <span class="ml-auto font-medium">33%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span class="truncate">&gt;= 50 Years old</span>
                <span class="ml-auto font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Weekly Top Seller -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Sales Report</h2>
            <a href="" class="ml-auto truncate text-primary"> Show More </a>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <ReportDonutChart :height="213" />
            </div>
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">17 - 30 Years old</span>
                <span class="ml-auto font-medium">62%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">31 - 50 Years old</span>
                <span class="ml-auto font-medium">33%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span class="truncate">&gt;= 50 Years old</span>
                <span class="ml-auto font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Sales Report -->
       

      </div>
    </div>
   
  </div>
</template>
