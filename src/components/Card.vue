<script setup>
import { ref, onMounted } from "vue";
import { productService } from "../services/api";

const cardItems = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const products = await productService.getAllProducts();
    cardItems.value = (products ?? []).map((product, index) => {
      const id = product?.id ?? product?.product_id ?? index;
      const title = product?.title ?? product?.name ?? "Untitled";
      const details = product?.details ?? product?.description ?? "";
      const price = product?.price ?? 0;
      const image =
        product?.image ?? product?.image_url ?? product?.imagePath ?? "";

      return {
        id,
        title,
        details,
        price,
        image,
        buttonText: "View Details",
        buttonLink: `#/details/${id}`,
      };
    });
  } catch (err) {
    error.value = "Failed to fetch products";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <!-- ====== Cards Section Start ====== -->
  <section class="bg-gray-2 dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
        <p class="mt-2 text-gray-600">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="fetchProducts"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else class="flex flex-wrap mx-4">
        <div
          v-for="(item, index) in cardItems"
          :key="item.id"
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
              <p class="text-lg font-bold text-black-600 mb-4">
                ${{ item.price }}
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
