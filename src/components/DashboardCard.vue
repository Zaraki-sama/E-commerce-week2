<template>
  <div
    class="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg"
    :class="bgColor"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="uppercase font-bold text-xs" :class="subtitleColor">
            {{ statSubtitle }}
          </h5>
          <span class="font-semibold text-xl" :class="titleColor">
            {{ statTitle }}
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="statIconColor"
          >
            <i :class="statIconName"></i>
          </div>
        </div>
      </div>
      <p class="text-sm mt-4" :class="descriptionColor">
        <span class="mr-2" :class="statPercentColor">
          <i :class="statArrowIcon"></i>
          {{ statPercent }}%
        </span>
        <span class="whitespace-nowrap">{{ statDescription }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props definition
const props = defineProps({
  statSubtitle: {
    type: String,
    default: "Traffic",
  },
  statTitle: {
    type: String,
    default: "350,897",
  },
  statArrow: {
    type: String,
    default: "up",
    validator: (value) => ["up", "down"].includes(value),
  },
  statPercent: {
    type: String,
    default: "3.48",
  },
  statPercentColor: {
    type: String,
    default: "text-emerald-500",
  },
  statDescription: {
    type: String,
    default: "Since last month",
  },
  statIconName: {
    type: String,
    default: "far fa-chart-bar",
  },
  statIconColor: {
    type: String,
    default: "bg-red-500",
  },
  // New props for dark mode
  bgColor: {
    type: String,
    default: "bg-white",
  },
  subtitleColor: {
    type: String,
    default: "text-black",
  },
  titleColor: {
    type: String,
    default: "text-black",
  },
  descriptionColor: {
    type: String,
    default: "text-black",
  },
});

// Computed property for arrow icon class
const statArrowIcon = computed(() => {
  return props.statArrow === "up" ? "fas fa-arrow-up" : "fas fa-arrow-down";
});
</script>
