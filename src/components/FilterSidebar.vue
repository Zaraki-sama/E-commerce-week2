<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900">FILTER & SORT</h2>
      <button 
        @click="$emit('clear-all')"
        class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Clear All
      </button>
    </div>

    <!-- Sort Section -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-gray-900 mb-3">SORT BY</h3>
      <div class="space-y-2">
        <label 
          v-for="option in sortOptions" 
          :key="option.value"
          class="flex items-center space-x-3 cursor-pointer"
        >
          <input 
            type="radio" 
            :value="option.value"
            v-model="localSort"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          >
          <span class="text-sm text-gray-700">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Filter Sections -->
    <div class="space-y-6">
      <FilterSection 
        v-for="section in filterSections"
        :key="section.key"
        :title="section.title"
        :options="section.options"
        :selected-values="localFilters[section.key]"
        @update:selected-values="updateSectionFilters(section.key, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import FilterSection from './FilterSection.vue'

// Props
const props = defineProps({
  sort: {
    type: String,
    default: 'relevancy'
  },
  filters: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:sort', 'update:filters', 'clear-all'])

// Sort options
const sortOptions = [
  { label: 'Price: Low to High', value: 'price_low_high' },
  { label: 'Price: High to Low', value: 'price_high_low' },
  { label: 'Relevancy', value: 'relevancy' },
  { label: 'Newest', value: 'newest' }
]

// Filter sections data - Only the sections you want
const filterSections = [
  {
    key: 'productType',
    title: 'PRODUCT TYPE',
    options: ['T-Shirts', 'Shirts', 'Sweaters', 'Hoodies', 'Accessories']
  },
  {
    key: 'size',
    title: 'SIZE',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
  }
]

// Local state - Only include the keys you're using
const localSort = ref(props.sort)
const localFilters = reactive({ 
  productType: props.filters.productType || [],
  size: props.filters.size || []
})

// Watchers
watch(localSort, (newValue) => {
  emit('update:sort', newValue)
})

watch(() => props.sort, (newValue) => {
  localSort.value = newValue
})

watch(localFilters, (newValue) => {
  emit('update:filters', { ...newValue })
}, { deep: true })

watch(() => props.filters, (newValue) => {
  localFilters.productType = [...(newValue.productType || [])]
  localFilters.size = [...(newValue.size || [])]
}, { deep: true })

// Methods
const updateSectionFilters = (sectionKey, values) => {
  localFilters[sectionKey] = values
}
</script>