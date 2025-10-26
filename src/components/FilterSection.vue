<template>
  <div class="border-t border-gray-200 pt-4">
    <h3 class="text-sm font-medium text-gray-900 mb-3">{{ title }}</h3>
    <div class="space-y-2">
      <label 
        v-for="option in options" 
        :key="option"
        class="flex items-center space-x-3 cursor-pointer"
      >
        <input 
          type="checkbox" 
          :value="option"
          v-model="localSelectedValues"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        >
        <span class="text-sm text-gray-700">{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  title: String,
  options: Array,
  selectedValues: Array
})

const emit = defineEmits(['update:selectedValues'])

const localSelectedValues = ref([...props.selectedValues])

watch(localSelectedValues, (newValues) => {
  emit('update:selectedValues', newValues)
})

watch(() => props.selectedValues, (newValues) => {
  localSelectedValues.value = [...newValues]
})
</script>