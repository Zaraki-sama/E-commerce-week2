<script setup>
import { ref } from "vue";
import shirt1 from "../assets/shirt1.png";
import shirt2 from "../assets/shirt2.png";
import shirt3 from "../assets/shirt3.png";

const cardItems = ref([
  {
    id: 0,
    image: shirt1,
    title: "50+ Best creative website themes & templates",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
  {
    id: 1,
    image: shirt2,
    title: "The ultimate UX and UI guide to card design",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
  {
    id: 2,
    image: shirt3,
    title: "Creative Card Component designs graphic elements",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
  {
    id: 3,
    image: shirt3,
    title: "Creative Card Component designs graphic elements",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
  {
    id: 4,
    image: shirt3,
    title: "Creative Card Component designs graphic elements",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
  {
    id: 5,
    image: shirt3,
    title: "Creative Card Component designs graphic elements",
    details: "Lorem ipsum...",
    buttonText: "View Details",
    buttonLink: "#/details",
  },
]);
</script>

<template>
  <!-- ====== Cards Section Start ====== -->
  <section class="bg-gray-2 dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container mx-auto">
      <div class="flex flex-wrap mx-4">
        <!-- v-for is on the column element that needs the width/padding classes -->
        <div
          v-for="(item, index) in cardItems"
          :key="index"
          class="w-full px-4 md:w-1/2 xl:w-1/3"
        >
          <div
            class="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3 h-[60vh]"
          >
            <div class="h-[20vh] flex justify-center items-center">
              <img
                :src="item.image"
                alt="image"
                class="w-[200px] h-[250px] hover:scale-105 ease-in-out object-cover pt-20"
              />
            </div>

            <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9 m-10">
              <div>
                <h3
                  class="text-dark dark:text-black hover:text-primary mb-4 block text-xl font-semibold"
                >
                  {{ item.title }}
                </h3>
              </div>
              <p
                class="text-base leading-relaxed text-body-color dark:text-dark-6 mb-7"
              >
                {{ item.details }}
              </p>
              <RouterLink
                :to="`/details/${item.id}`"
                class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-black border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                {{ item.buttonText }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
