<script setup lang="ts">
import Preview from "@/components/Base/Preview";
import { Tab } from "@/components/Base/Headless";
// import { FormSwitch } from "@/components/Base/Form";
</script>

<template>
  <div class="mt-5 overflow-hidden intro-y box">
    <!-- <div class="col-span-12 "> -->
          <!-- BEGIN: Basic Tab -->
      <Preview class="intro-y box" v-slot="{ toggle }">
        <!-- <div
          class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="mr-auto text-base font-medium">Basic Tab</h2>
          <FormSwitch class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <FormSwitch.Label htmlFor="show-example-1">
              Show example code
            </FormSwitch.Label>
            <FormSwitch.Input
              id="show-example-1"
              @click="toggle"
              class="ml-3 mr-0"
              type="checkbox"
            />
          </FormSwitch>
        </div> -->
        <div class="p-5">
          <Preview.Panel>
            <Tab.Group>
              <Tab.List variant="tabs">
                <Tab>
                  <Tab.Button class="w-full py-2" as="button">
                    კითხვარი 1
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button class="w-full py-2" as="button">
                    კითხვარი 2
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button class="w-full py-2" as="button">
                    კითხვარი 3
                  </Tab.Button>
                </Tab>
              </Tab.List>
              <Tab.Panels class="border-b border-l border-r">
                <Tab.Panel class="p-5 leading-relaxed">
                  კითხვარი 1
                </Tab.Panel>
                <Tab.Panel class="p-5 leading-relaxed">
                 კითხვარი 2
                </Tab.Panel>
                <Tab.Panel class="p-5 leading-relaxed">
                  კითხვარი 3
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Preview.Panel>
        </div>
      </Preview>
      <!-- END: Basic Tab -->
    </div>
  <!-- </div> -->
</template>