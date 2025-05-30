<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProject, updateProject } from "@/http/projects";
import UploadField from "@/components/Upload/UploadField.vue";
import GalleryUpload from "@/components/Upload/GalleryUpload.vue";

const langs = ["en", "ka", "ru"];
const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const submitting = ref(false);

const form = reactive({
  title: { en: "", ka: "", ru: "" },
  description: { en: "", ka: "", ru: "" },
  location: { en: "", ka: "", ru: "" },
  status: "ongoing",
  year: new Date().getFullYear(),
  start_date: "",
  completion_date: "",
  is_active: true,
  is_featured: false,
  main_image: null,
  render_image: null,
  gallery_images: [],
});

const previews = reactive({
  main_image: "",
  render_image: "",
  gallery_images: [],
});

function goBack() {
  router.push({ name: "ProjectDetail", params: { id } });
}

async function load() {
  const res = await getProject(id);
  const p = res.data.data;

  // Translations
  form.title = { en: p.title_en, ka: p.title_ka, ru: p.title_ru };
  form.description = {
    en: p.description_en,
    ka: p.description_ka,
    ru: p.description_ru,
  };
  form.location = {
    en: p.location_en,
    ka: p.location_ka,
    ru: p.location_ru,
  };

  // Other fields
  form.status = p.status_code || p.status;
  form.year = Number(p.year);
  form.start_date = p.start_date;
  form.completion_date = p.completion_date;
  form.is_active = p.is_active;
  form.is_featured = p.is_featured;

  previews.main_image = p.main_image;
  form.main_image = null;

  previews.render_image = p.render_image;
  form.render_image = null;

  previews.gallery_images = p.gallery_images;
  form.gallery_images = []; // clear old preview paths
}

async function onSubmit() {
  submitting.value = true;
  const data = new FormData();

  data.append("_method", "PUT"); // Or "PATCH"
  // 1) Build the nested arrays one field at a time:
  for (const lang of langs) {
    data.append(`title[${lang}]`, form.title[lang]);
    data.append(`description[${lang}]`, form.description[lang]);
    data.append(`location[${lang}]`, form.location[lang]);
  }

  // 2) Simple scalar fields
  data.append("status", form.status);
  data.append("year", String(form.year));
  data.append("start_date", form.start_date);
  data.append("completion_date", form.completion_date);
  data.append("is_active", form.is_active ? "1" : "0");
  data.append("is_featured", form.is_featured ? "1" : "0");

  // 3) Files
  if (form.main_image instanceof File) {
    data.append("main_image", form.main_image);
  } else {
    console.warn("Main image is not a valid file.");
  }

  if (form.render_image instanceof File) {
    data.append("render_image", form.render_image);
  } else {
    console.warn("Render image is not a valid file.");
  }

  form.gallery_images.forEach((file, i) => {
    if (file instanceof File) {
      data.append(`gallery_images[${i}]`, file);
    } else {
      console.warn(`Gallery image at index ${i} is not a valid file.`);
    }
  });

  try {
    const res = await updateProject(id, data);
    if (res.status === 200) {
      router.push({ name: "ProjectDetail", params: { id } });
    }
  } catch (err) {
    console.error("Update failed", err);
  } finally {
    submitting.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="container mx-auto p-6 max-w-3xl">
    <div class="flex items-center justify-between mb-6">
      <button @click="goBack" class="text-blue-500 hover:underline">
        ← უკან დეტალებზე
      </button>
      <h1 class="text-2xl font-bold">პროექტის რედაქტირება</h1>
    </div>

    <form
      @submit.prevent="onSubmit"
      class="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <!-- Title Translations -->
      <div>
        <h2 class="font-semibold mb-2">სათაური</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="lang in langs" :key="'title-' + lang">
            <label class="block text-sm font-medium mb-1"
              >Title ({{ lang }})</label
            >
            <input
              v-model="form.title[lang]"
              type="text"
              required
              class="w-full border rounded p-2"
            />
          </div>
        </div>
      </div>

      <!-- Description Translations -->
      <div>
        <h2 class="font-semibold mb-2">აღწერა</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="lang in langs" :key="'desc-' + lang">
            <label class="block text-sm font-medium mb-1"
              >Description ({{ lang }})</label
            >
            <textarea
              v-model="form.description[lang]"
              rows="3"
              required
              class="w-full border rounded p-2"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Location Translations -->
      <div>
        <h2 class="font-semibold mb-2">ლოკაცია</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="lang in langs" :key="'loc-' + lang">
            <label class="block text-sm font-medium mb-1"
              >Location ({{ lang }})</label
            >
            <input
              v-model="form.location[lang]"
              type="text"
              required
              class="w-full border rounded p-2"
            />
          </div>
        </div>
      </div>

      <!-- Status & Year -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select
            v-model="form.status"
            required
            class="w-full border rounded p-2"
          >
            <option value="planning">გეგმაში</option>
            <option value="ongoing">მიმდინარეობს</option>
            <option value="completed">დასრულდა</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Year</label>
          <input
            v-model="form.year"
            type="number"
            min="1900"
            max="2100"
            required
            class="w-full border rounded p-2"
          />
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Start Date</label>
          <input
            v-model="form.start_date"
            type="date"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Completion Date</label>
          <input
            v-model="form.completion_date"
            type="date"
            required
            class="w-full border rounded p-2"
          />
        </div>
      </div>

      <!-- Active / Featured -->
      <div class="flex items-center space-x-6">
        <label class="inline-flex items-center">
          <input
            v-model="form.is_active"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">აქტიური</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="form.is_featured"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">მთავარზე</span>
        </label>
      </div>

      <!-- Main Image Upload -->
      <div>
        <h2 class="font-semibold mb-2">Main Image</h2>
        <UploadField
          v-model="form.main_image"
          :preview="previews.main_image ? `${previews.main_image}` : null"
          @update:preview="(p) => (previews.main_image = p)"
        />
      </div>

      <!-- Render Image Upload -->
      <div>
        <h2 class="font-semibold mb-2">Render Image</h2>
        <UploadField
          v-model="form.render_image"
          :preview="previews.render_image"
          @update:preview="(p) => (previews.render_image = p)"
        />
      </div>

      <!-- Gallery Upload -->
      <div>
        <h2 class="font-semibold mb-2">Gallery Images</h2>
        <GalleryUpload
          v-model="form.gallery_images"
          :previews="previews.gallery_images"
          @update:previews="(p) => (previews.gallery_images = p)"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="submitting"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ submitting ? "მიმდინარეობს შენახვა…" : "შენახვა" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
</style>
