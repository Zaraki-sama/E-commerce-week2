<script setup>
import Header from "./Header.vue";
</script>
import cardItems from "./com"

<template>
  <Header />
  <section class="container mx-auto p-6">
    <div class="flex items-start gap-[36px] max-md:flex-col">
      <!-- LEFT: Product Image -->
      <div class="flex-1 f">
        <img src="../assets/shirt1.png" alt="Product Image" />
      </div>

      <!-- RIGHT: Product Details -->
      <div class="flex-1">
        <h1 class="mb-2 font-semibold text-[24px] text-[#565656]">JUNGEY</h1>
        <p class="currency font-bold text-[24px] text-primary-600">Rs 1,600</p>
        <p class="mt-2 text-sm text-dim">Shipping is calculated at checkout</p>
        <p class="mt-3 font-semibold font-base text-gray-600">Choose Variant</p>

        <div class="flex flex-wrap gap-2">
          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">White</p>
          </button>
          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">Red</p>
          </button>

          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">Black</p>
          </button>
        </div>

        <button
          class="w-fit px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
