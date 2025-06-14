<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { createProject } from "@/http/projects";
import UploadField from "@/components/Upload/UploadField.vue";
import GalleryUpload from "@/components/Upload/GalleryUpload.vue";
import FormCard from "@/components/Form/FormCard.vue";
import FormSection from "@/components/Form/FormSection.vue";
import LanguageInputGroup from "@/components/Form/LanguageInputGroup.vue";
import ToggleSwitch from "@/components/Form/ToggleSwitch.vue";
import FormInput from "@/components/Form/FormInput.vue";
import { compressFileIfNeeded } from "@/utils/imageCompression";

const langs = ["ka", "en", "ru"]; // Changed order to put ka first
const router = useRouter();

const submitting = ref(false);

const form = reactive({
  title: { ka: "", en: "", ru: "" }, // Changed order to match langs array
  description: { ka: "", en: "", ru: "" }, // Changed order to match langs array
  location: { ka: "", en: "", ru: "" }, // Changed order to match langs array
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
  router.push({ name: "projects" });
}

async function onSubmit() {
  submitting.value = true;
  const data = new FormData();

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

  // 3) Compress and append files with better error handling
  try {
    if (form.main_image instanceof File) {
      console.log("Original main image size:", form.main_image.size);
      const compressedMainImage = await compressFileIfNeeded(form.main_image);
      if (compressedMainImage) {
        console.log("Compressed main image size:", compressedMainImage.size);
        data.append("main_image", compressedMainImage);
      } else {
        console.error("Main image compression returned null");
      }
    }

    if (form.render_image instanceof File) {
      console.log("Original render image size:", form.render_image.size);
      const compressedRenderImage = await compressFileIfNeeded(
        form.render_image
      );
      if (compressedRenderImage) {
        console.log(
          "Compressed render image size:",
          compressedRenderImage.size
        );
        data.append("render_image", compressedRenderImage);
      } else {
        console.error("Render image compression returned null");
      }
    }

    // Compress and append gallery files
    const galleryFiles = [];
    for (let i = 0; i < form.gallery_images.length; i++) {
      const file = form.gallery_images[i];
      if (file instanceof File) {
        console.log(`Original gallery image ${i} size:`, file.size);
        const compressedGalleryImage = await compressFileIfNeeded(file);
        if (compressedGalleryImage) {
          console.log(
            `Compressed gallery image ${i} size:`,
            compressedGalleryImage.size
          );
          galleryFiles.push(compressedGalleryImage);
        } else {
          console.error(`Gallery image ${i} compression returned null`);
          galleryFiles.push(file); // Use original if compression fails
        }
      }
    }

    // Append gallery files
    galleryFiles.forEach((file, i) => {
      data.append(`gallery_images[${i}]`, file);
    });

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let pair of data.entries()) {
      if (pair[1] instanceof File) {
        console.log(
          pair[0],
          "File:",
          pair[1].name,
          "Size:",
          pair[1].size,
          "Type:",
          pair[1].type
        );
      } else {
        console.log(pair[0], pair[1]);
      }
    }

    const res = await createProject(data);
    if (res.status === 201) {
      router.push({ name: "Projects" });
    }
  } catch (err) {
    console.error("Create failed", err);
    if (err.response?.data?.errors) {
      console.error("Server validation errors:", err.response.data.errors);
    }
  } finally {
    submitting.value = false;
    router.push({ name: "projects" });
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
    <div class="container mx-auto px-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="goBack"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-4 group"
        >
          <svg
            class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          უკან პროექტებზე
        </button>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          ახალი პროექტის დამატება
        </h1>
        <p class="text-gray-600">
          შექმენით ახალი პროექტი და ატვირთეთ საჭირო მედია ფაილები
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-8">
        <!-- Basic Information Card -->
        <FormCard
          title="ძირითადი ინფორმაცია"
          header-class="bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <template #default>
            <div class="space-y-8">
              <!-- Title -->
              <FormSection title="სათაური">
                <LanguageInputGroup
                  v-model="form.title"
                  field-name="title"
                  field-label="Title"
                  :languages="langs"
                />
              </FormSection>

              <!-- Description -->
              <FormSection title="აღწერა">
                <LanguageInputGroup
                  v-model="form.description"
                  field-name="description"
                  field-label="Description"
                  input-type="textarea"
                  :languages="langs"
                />
              </FormSection>

              <!-- Location -->
              <FormSection title="ლოკაცია">
                <LanguageInputGroup
                  v-model="form.location"
                  field-name="location"
                  field-label="Location"
                  :languages="langs"
                />
              </FormSection>
            </div>
          </template>
        </FormCard>

        <!-- Project Details Card -->
        <FormCard
          title="პროექტის დეტალები"
          header-class="bg-gradient-to-r from-green-500 to-blue-600"
        >
          <template #default>
            <div class="space-y-6">
              <!-- Status & Year -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  v-model="form.status"
                  label="Status"
                  input-type="select"
                  required
                  focus-color="focus:ring-green-500"
                >
                  <option value="planning">🎯 გეგმაში</option>
                  <option value="ongoing">⚡ მიმდინარეობს</option>
                  <option value="completed">✅ დასრულდა</option>
                </FormInput>

                <FormInput
                  v-model="form.year"
                  label="Year"
                  type="number"
                  min="1900"
                  max="2100"
                  required
                  focus-color="focus:ring-green-500"
                />
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  v-model="form.start_date"
                  label="Start Date"
                  type="date"
                  required
                  focus-color="focus:ring-green-500"
                />

                <FormInput
                  v-model="form.completion_date"
                  label="Completion Date"
                  type="date"
                  required
                  focus-color="focus:ring-green-500"
                />
              </div>

              <!-- Toggle Switches -->
              <div class="flex flex-wrap items-center gap-8 pt-4">
                <ToggleSwitch
                  v-model="form.is_active"
                  label="აქტიური"
                  active-color="bg-green-500"
                />
                <ToggleSwitch
                  v-model="form.is_featured"
                  label="მთავარზე"
                  active-color="bg-yellow-500"
                />
              </div>
            </div>
          </template>
        </FormCard>

        <!-- Media Upload Card -->
        <FormCard
          title="მედია ფაილები"
          header-class="bg-gradient-to-r from-purple-500 to-pink-600"
        >
          <template #default>
            <div class="space-y-8">
              <FormSection title="Main Image">
                <UploadField
                  v-model="form.main_image"
                  :preview="previews.main_image"
                  @update:preview="(p) => (previews.main_image = p)"
                />
              </FormSection>

              <FormSection title="Render Image">
                <UploadField
                  v-model="form.render_image"
                  :preview="previews.render_image"
                  @update:preview="(p) => (previews.render_image = p)"
                />
              </FormSection>

              <FormSection title="Gallery Images">
                <GalleryUpload
                  v-model="form.gallery_images"
                  :previews="previews.gallery_images"
                  @update:previews="(p) => (previews.gallery_images = p)"
                />
              </FormSection>
            </div>
          </template>
        </FormCard>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="submitting"
            class="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <svg
              v-if="submitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span>{{
              submitting ? "მიმდინარეობს შექმნა…" : "პროექტის შექმნა"
            }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

/* Custom select arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Focus visible for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
</style>
