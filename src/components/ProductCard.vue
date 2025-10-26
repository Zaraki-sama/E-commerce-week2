<template>
  <div class="group bg-white">
    <!-- Image Container -->
    <div class="relative overflow-hidden mb-3 bg-gray-50">
      <div class="aspect-square">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        >
        <!-- Hover Image -->
        <img 
          :src="product.hoverImage || product.image" 
          :alt="product.name"
          class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
      </div>
      
      <!-- Quick Actions -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          @click="toggleFavorite"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <i 
            :class="[
              'text-sm',
              isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600'
            ]"
          ></i>
        </button>
      </div>

      <!-- Quick Add -->
      <div class="absolute bottom-0 left-0 right-0 bg-black text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button 
          class="w-full py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleAddToCart"
          :disabled="isAddingToCart"
        >
          {{ isAddingToCart ? 'ADDING...' : 'ADD' }}
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-1">
      <!-- Brand/Collection -->
      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide truncate mb-1">
        {{ product.brand }}
      </div>

      <!-- Product Name -->
      <h3 class="font-normal text-gray-900 text-lg leading-tight line-clamp-2 mb-1 cursor-pointer hover:text-gray-600" @click="viewDetails">
        {{ product.name }}
      </h3>

      <!-- Price -->
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-900">US${{ product.price }}</span>
        <span 
          v-if="product.originalPrice"
          class="text-sm text-gray-500 line-through"
        >
          US${{ product.originalPrice }}
        </span>
        <span 
          v-if="product.originalPrice && discountPercentage"
          class="text-xs bg-red-500 text-white px-2 py-0.5 rounded"
        >
          -{{ discountPercentage }}%
        </span>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const { addToCart } = useCart()

const isFavorite = ref(false)
const isAddingToCart = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

// Calculate discount percentage
const discountPercentage = computed(() => {
  if (!props.product.originalPrice || !props.product.price) return null
  const discount = ((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100
  return Math.round(discount)
})

// Toggle favorite functionality
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  
  // Get favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  
  if (isFavorite.value) {
    // Add to favorites
    if (!favorites.includes(props.product.id)) {
      favorites.push(props.product.id)
      showToastMessage('Added to favorites!')
    }
  } else {
    // Remove from favorites
    favorites = favorites.filter(id => id !== props.product.id)
    showToastMessage('Removed from favorites')
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

// Add to cart using Pinia store
const handleAddToCart = () => {
  isAddingToCart.value = true
  
  try {
    // Normalize product data to match cart store format
    const cartProduct = {
      id: props.product.id,
      title: props.product.name || props.product.title,
      price: props.product.price,
      image: props.product.image
    }
    
    addToCart(cartProduct)
    showToastMessage('Added to cart!')
    
  } catch (error) {
    console.error('Error adding to cart:', error)
    showToastMessage('Failed to add to cart')
  } finally {
    // Small delay for UI feedback
    setTimeout(() => {
      isAddingToCart.value = false
    }, 300)
  }
}

// View product details
const viewDetails = () => {
  if (props.product.id) {
    router.push(`/details/${props.product.id}`)
  }
}

// Show toast notification
const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Check if product is already in favorites on mount
const checkFavoriteStatus = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  isFavorite.value = favorites.includes(props.product.id)
}

// Initialize
onMounted(() => {
  checkFavoriteStatus()
})
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>