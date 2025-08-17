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
        <p class="mt-3 mb-3 font-semibold font-base text-gray-600">
          Choose Variant
        </p>

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

        <p class="mt-3 mb-3 font-semibold font-base text-gray-600">
          Choose Size
        </p>

        <div class="flex flex-wrap mb-3x gap-2">
          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">S</p>
          </button>
          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">M</p>
          </button>

          <button
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium hover:bg-gray-50 transition-colors border-primary-500"
          >
            <p class="text-center font-medium text-gray-700">L</p>
          </button>
        </div>

        <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-minus"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            stroke-width="4"
            stroke="#202020"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg> -->

        <div class="mt-[28px] flex gap-[6px]">
          <button
            class="btn-secondary border-gray-200 hover:bg-gray-50 h-[55px] w-[55px] p-0"
          >
            -
          </button>
          <button
            class="btn-secondary border-gray-200 hover:bg-gray-50 h-[55px] w-[55px] p-0"
          >
            +
          </button>

          <a
            href="#"
            class="w-fit px-6 py-3 transition rounded-md border border-transparent bg-[#ff922b] px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-[#fd7e14] h-[55px]"
            >ADD TO CART</a
          >
        </div>

        <!-- 
        <button
          class="w-fit px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add to Cart
        </button> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-secondary {
  cursor: pointer;
  border-style: var(--tw-border-style);
  border-width: 1px;
  border-color: var(--color-primary-500);
  padding-inline: calc(var(--spacing) * 6);
  padding-block: calc(var(--spacing) * 2);
  --tw-font-weight: var(--font-weight-semibold);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-500);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
