<template>
  <div class="p-8 font-sans text-gray-800">
    <h1 class="text-3xl font-bold mb-8">პროექტები</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        :class="[
          'bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform transition-transform duration-200 hover:-translate-y-1',
          { 'opacity-50': !project.is_active },
        ]"
      >
        <div class="relative">
          <img
            :src="project.main_image"
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
            <li><strong>სტატუსი:</strong> {{ project.status }}</li>
            <li><strong>ლოკაცია:</strong> {{ project.location }}</li>
            <li><strong>წელი:</strong> {{ project.year }}</li>
            <li>
              <strong>დამთავრების პერიოდი:</strong>
              {{ formatDate(project.start_date) }} –
              {{ formatDate(project.completion_date) }}
            </li>
          </ul>

          <router-link
            :to="`/projects/${project.id}`"
            class="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            დეტალურად
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjects } from "@/http/projects";

const projects = ref([]);

async function fetchProjects() {
  try {
    const response = await getProjects();
    if (response.status === 200) {
      console.log("Projects fetched successfully:", response.data.data);
      projects.value = response.data.data;
    } else {
      console.error("Failed to fetch projects:", response.statusText);
    }
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

onMounted(fetchProjects);

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function truncate(str, len) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}
</script>
