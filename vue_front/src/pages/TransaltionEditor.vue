<script setup lang="ts">
import _ from "lodash";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";

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
                            <div :class="[
                                'relative zoom-in',
                                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                            ]">
                                <div class="p-5 box">
                                    <div class="flex">
                                        <Lucide icon="ShoppingCart" class="w-[28px] h-[28px] text-primary" />
                                        <div class="ml-auto">
                                            <Tippy as="div"
                                                class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                content="33% Higher than last month">
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
                            <div :class="[
                                'relative zoom-in',
                                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                            ]">
                                <div class="p-5 box">
                                    <div class="flex">
                                        <Lucide icon="CreditCard" class="w-[28px] h-[28px] text-pending" />
                                        <div class="ml-auto">
                                            <Tippy as="div"
                                                class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                content="2% Lower than last month">
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
                            <div :class="[
                                'relative zoom-in',
                                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                            ]">
                                <div class="p-5 box">
                                    <div class="flex">
                                        <Lucide icon="Monitor" class="w-[28px] h-[28px] text-warning" />
                                        <div class="ml-auto">
                                            <Tippy as="div"
                                                class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                content="12% Higher than last month">
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
                            <div :class="[
                                'relative zoom-in',
                                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
                            ]">
                                <div class="p-5 box">
                                    <div class="flex">
                                        <Lucide icon="User" class="w-[28px] h-[28px] text-success" />
                                        <div class="ml-auto">
                                            <Tippy as="div"
                                                class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                content="22% Higher than last month">
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
            </div>
        </div>

    </div>
</template>
