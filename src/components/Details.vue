<script setup>
import Header from "./Header.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const sizes = ["S", "M", "L"];
const selectedSize = ref(null);
const colors = ["White", "Red", "Black"];
const selectedColor = ref(null);


</script>

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
            v-for="color in colors"
            :key="color"
            @click="selectedColor = color"
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium border-primary-500"
            :class="
              selectedColor === color
                ? 'border-orange-500'
                : 'border-primary-500 '
            "
          >
            <p class="text-center font-medium text-gray-700">{{ color }}</p>
          </button>
        </div>

        <p class="mt-3 mb-3 font-semibold font-base text-gray-600">
          Choose Size
        </p>

        <div class="flex flex-wrap mb-3 gap-2">
          <button
            v-for="size in sizes"
            :key="size"
            @click="selectedSize = size"
            class="flex justify-center items-center cursor-pointer py-1 px-6 rounded-[4px] border text-base font-medium transition-colors"
            :class="
              selectedSize === size
                ? 'border-orange-500'
                : 'border-primary-500 hover:bg-gray-50'
            "
          >
            <p class="text-center font-medium text-gray-700">{{ size }}</p>
          </button>
        </div>
        <div class="mt-[28px] flex gap-[6px]">
          <button
            class="btn-secondary border-gray-200 hover:bg-gray-50 h-[55px] w-[55px] p-0"
          >
            -
          </button>
          <div
            class="btn-secondary cursor-auto border-gray-200 hover:bg-gray-50 text-black text-[18px] w-[64px]"
          >
            1
          </div>
          <button
            class="btn-secondary border-gray-200 hover:bg-gray-50 h-[55px] w-[55px] p-0"
          >
            +
          </button>

          <RouterLink
            to="/cart"
            class="w-fit px-6 py-3 transition rounded-md border border-transparent bg-[#ff922b] px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-[#fd7e14] h-[55px] inline-flex items-center justify-center"
            >ADD TO CART</RouterLink
          >
        </div>
        <hr class="mt-10 my-4 border-gray-300" />
        <div><p class="font-semibold text-[16px]">Description</p></div>
        <div class="mt-5 overflow-wrap: break-word text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis dolor recusandae unde id similique quae maiores
            deserunt magni error, iste vitae, quo laudantium minus. Blanditiis
            quis minus possimus alias dolorum.
          </p>
        </div>
        <div class="mt-5 break-words">
          <ul class="list-disc pl-5">
            <li><strong>Premium cotton</strong> for everyday comfort</li>
            <li>
              <strong>Unisex & Regular fit</strong> – perfect for any vibe
            </li>
            <li><strong>Nature inspired artwork</strong></li>
            <li><strong>Available in</strong> Black, White, Beige, and Grey</li>
            <li><strong>Best In Class Print</strong></li>
          </ul>
        </div>
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
