<template>
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
</template>

<script setup>
import { ref } from "vue";

const sizes = ["S", "M", "L"];
const selectedSize = ref(null);
</script>
