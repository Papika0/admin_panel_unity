<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProjects } from "@/http/projects";

const projects = ref([]);
const router = useRouter();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function fetchProjects() {
  try {
    const res = await getProjects();
    if (res.status === 200) {
      projects.value = res.data.data;
    }
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

function goToDetail(id) {
  router.push({ name: "ProjectDetail", params: { id } });
}

function formatDate(dateStr) {
  const dt = new Date(dateStr);
  const months = [
    "იან",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

function truncate(str, len) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}

onMounted(fetchProjects);
</script>

<template>
  <div class="p-8 font-sans text-gray-800">
    <h1 class="text-3xl font-bold mb-8">პროექტები</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        @click="goToDetail(project.id)"
        class="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform transition-transform duration-200 hover:-translate-y-1"
        :class="{ 'opacity-50': !project.is_active }"
      >
        <div class="relative">
          <img
            :src="backendUrl + project.main_image"
            alt="Project Image"
            class="w-full h-48 object-cover"
          />
          <span
            v-if="project.is_featured"
            class="absolute top-2 right-2 bg-yellow-300 text-gray-800 px-2 py-1 rounded text-xs font-bold"
          >
            მთავარზე
          </span>
        </div>

        <div class="p-6 flex-1 flex flex-col">
          <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
          <p class="text-gray-600 text-sm mb-4 flex-none">
            {{ truncate(project.description, 100) }}
          </p>
          <ul class="text-gray-700 text-sm space-y-1 mb-4 flex-none">
            <li>
              <strong>სტატუსი:</strong>
              <span
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold ml-1"
              >
                {{ project.status_name }}
              </span>
            </li>
            <li><strong>ლოკაცია:</strong> {{ project.location }}</li>
            <li><strong>წელი:</strong> {{ project.year }}</li>
            <li>
              <strong>დამთავრების პერიოდ:</strong>
              {{ formatDate(project.start_date) }} –
              {{ formatDate(project.completion_date) }}
            </li>
          </ul>

          <button
            @click.stop="goToDetail(project.id)"
            class="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            დეტალურად
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
