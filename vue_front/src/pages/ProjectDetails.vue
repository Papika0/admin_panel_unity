<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProject } from "@/http/projects";

// Swiper components & modules
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const project = ref(null);
const route = useRoute();
const router = useRouter();

async function fetchProject() {
  try {
    const res = await getProject(Number(route.params.id));
    if (res.status === 200) {
      project.value = res.data.data;
    }
  } catch (e) {
    console.error("Failed to load project:", e);
  }
}

onMounted(fetchProject);

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function formatDate(dateStr) {
  const dt = new Date(dateStr);
  const months = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

const slidesPerView = computed(() => {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
});
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between mb-4">
      <!-- Back button -->
      <button
        @click="router.push({ name: 'projects' })"
        class="text-blue-500 hover:underline"
      >
        ← უკან პროექტებზე
      </button>

      <!-- Edit button -->
      <button
        @click="
          router.push({ name: 'ProjectEdit', params: { id: project.id } })
        "
        class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
      >
        რედაქტირება
      </button>
    </div>

    <div v-if="project" class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Main Hero Image -->
      <img
        :src="backendUrl + project.main_image"
        alt="Main Project Image"
        class="w-full h-64 object-cover"
      />

      <div class="p-6">
        <!-- Title & Badges -->
        <h1 class="text-3xl font-bold mb-4">{{ project.title }}</h1>
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-if="project.is_featured"
            class="bg-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold"
          >
            მთავარი
          </span>
          <span
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ project.status_name }}
          </span>
          <span
            v-if="!project.is_active"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
          >
            არააქტიური
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-700 mb-6">{{ project.description }}</p>

        <!-- Key Details -->
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-8">
          <li><strong>ლოკაცია:</strong> {{ project.location }}</li>
          <li><strong>წელი:</strong> {{ project.year }}</li>
          <li>
            <strong>დაწყების თარიღი:</strong>
            {{ formatDate(project.start_date) }}
          </li>
          <li>
            <strong>დამთავრების თარიღი:</strong>
            {{ formatDate(project.completion_date) }}
          </li>
        </ul>

        <!-- Render Image -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">რენდერი</h2>
          <img
            :src="backendUrl + project.render_image"
            alt="Render Image"
            class="w-full h-64 object-cover rounded"
          />
        </div>

        <!-- Gallery Slider -->
        <div class="p-6 border-t">
          <h2 class="text-2xl font-semibold mb-4">გალერია</h2>
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="slidesPerView"
            :space-between="16"
            loop
            centeredSlides
            grabCursor
            navigation
            :pagination="{ clickable: true }"
            class="h-60"
          >
            <SwiperSlide
              v-for="(img, idx) in project.gallery_images"
              :key="idx"
              class="flex items-center justify-center transform transition-transform duration-300 hover:scale-105"
            >
              <img
                :src="backendUrl + img"
                alt="Gallery Image"
                class="object-cover w-full h-60 rounded-xl shadow-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500">იტვირთება…</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}

/* Navigation arrows */
.swiper-button-next,
.swiper-button-prev {
  color: #1e40af; /* Tailwind blue-800 */
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #1e40af;
  color: white;
}

/* Pagination bullets */
.swiper-pagination-bullet {
  background: #cbd5e1; /* Tailwind gray-300 */
  opacity: 1;
  width: 0.75rem;
  height: 0.75rem;
}
.swiper-pagination-bullet-active {
  background: #1e40af; /* Tailwind blue-800 */
}
</style>
