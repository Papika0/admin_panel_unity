<script setup lang="ts">
import { ref, computed } from "vue";
import Lucide from "@/components/Base/Lucide";
import InfoDiv from "@/components/Base/InfoDiv/InfoDiv.vue";
import InformationAlert from "../Alert/InformationAlert.vue";
import _, { add } from "lodash";

interface Address {
  country: string | null | undefined;
  cl_country_id: number | null | undefined;
  region: string | null;
  municipal: string | null;
  municipal_id: number | null;
  unity: string | null;
  city: string | null;
  village: string | null;
  street_name: string | null;
  street_number: string | null;
  mr: string | null;
  quarter: string | null;
  corpus_number: string | null;
  flat_number: string | null;
  dwelling_type: string | null;
  dwelling_status: string | null;
  district: string | null;
  building_name: string | null;
  cl_dwelling_status_id: number | null;
  cl_dwelling_type_id: number | null;
}

const props = defineProps<{
  address: Address;
  header?: string;
  showDwellingInformation?: boolean;
}>();

const hasNotChilde = (municipal_id: number | null) => {
  if (!municipal_id) return false;
  const notChilde = [10, 19, 31, 47, 49, 709, 2831, 3916];
  return _.includes(notChilde, municipal_id);
};
</script>
<template>
  <div class="p-5 rounded-md box">
    <div
      class="flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400"
    >
      <Lucide icon="MapPin" class="w-4 h-4 mr-2" />
      <div class="text-base font-medium truncate">
        {{ header }}
      </div>
    </div>
    <InformationAlert
      v-if="address.unity && !address.city && !address.village"
      message="დასახლების დასახელება არ არის მითითებული"
      class="mb-2"
    />

    <InfoDiv v-if="address.country" field="ქვეყანა" :value="address.country" />
    <div
      v-if="
        !address.country || (address.country && address.cl_country_id === 1)
      "
    >
      <InfoDiv field="რეგიონი" :value="address.region" />
      <InfoDiv field="მუნიციპალიტეტი" :value="address.municipal" />
      <InfoDiv
        field="ადმინისტრაციული ერთეული (თემი)"
        :value="address.unity"
        :showDash="hasNotChilde(address.municipal_id)"
      />
      <InfoDiv
        field="ქალაქი (დაბა)"
        :value="address.city"
        v-if="!address.village"
        :showDash="hasNotChilde(address.municipal_id)"
      />
      <InfoDiv
        field="სოფელი"
        :value="address.village"
        v-if="!address.city"
        :showDash="hasNotChilde(address.municipal_id)"
      />
      <InfoDiv field="ქუჩა" :value="address.street_name" :showDash="true" />
      <InfoDiv
        field="უბნის დასახელება (მასივი, პლატო, უბანი)"
        :value="address.district"
        :showDash="true"
      />
      <InfoDiv
        field="შენობის № ქუჩის ფარგლებში"
        :value="address.street_number"
        :showDash="true"
      />
      <InfoDiv field="მიკრო რაიონი" :value="address.mr" :showDash="true" />
      <InfoDiv field="კვარტალი" :value="address.quarter" :showDash="true" />
      <InfoDiv
        field="კორპუსი"
        :value="address.corpus_number"
        :showDash="true"
      />
      <InfoDiv field="ბინა" :value="address.flat_number" :showDash="true" />
      <div v-if="showDwellingInformation">
        <InfoDiv field="საცხოვრისის ტიპი:" :value="address.dwelling_type" />
        <InfoDiv
          field="საცხოვრისის სტატუსი:"
          :value="address.dwelling_status"
          v-if="address.cl_dwelling_status_id"
        />
        <InfoDiv
          field="დასახელება:"
          :value="address.building_name"
          v-if="
            address.cl_dwelling_type_id == 7 || address.cl_dwelling_type_id == 8
          "
        />
      </div>
    </div>
  </div>
</template>
