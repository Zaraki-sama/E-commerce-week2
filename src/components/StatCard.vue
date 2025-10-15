<script setup>
defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  color: {
    type: String,
    default: "from-blue-500 to-indigo-500",
  },
  icon: String,
});
</script>

<template>
  <div
    class="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition"
  >
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-sm font-medium text-gray-500 uppercase">{{ title }}</h3>
        <p class="text-2xl font-bold text-gray-800 mt-2">{{ value }}</p>
        <span class="text-xs text-gray-400">{{ subtitle }}</span>
      </div>
      <div
        :class="`p-3 rounded-full bg-gradient-to-tr ${color} text-white shadow`"
      >
        <span class="material-icons">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>
