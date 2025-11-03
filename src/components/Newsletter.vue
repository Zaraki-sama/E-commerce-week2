<script setup>
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('') // 'success' or 'error'

const handleSubscribe = async () => {
  if (!email.value) {
    message.value = 'Please enter your email address'
    messageType.value = 'error'
    return
  }

  if (!isValidEmail(email.value)) {
    message.value = 'Please enter a valid email address'
    messageType.value = 'error'
    return
  }

  isSubmitting.value = true
  message.value = ''

  try {
    // Simulate API call - replace with your actual newsletter subscription API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    message.value = 'Successfully subscribed to our newsletter!'
    messageType.value = 'success'
    email.value = ''
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } catch (error) {
    message.value = 'Subscription failed. Please try again.'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>

<template>
  <section class="py-16 bg-gray-900 text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-light mb-4">Stay Updated</h2>
      <p class="text-gray-300 mb-8 max-w-md mx-auto text-lg">
        Subscribe to our newsletter for the latest updates and exclusive offers.
      </p>
      
      <form @submit.prevent="handleSubscribe" class="max-w-md mx-auto">
        <div class="flex">
          <input 
            v-model="email"
            type="email" 
            placeholder="Your email address" 
            :disabled="isSubmitting"
            class="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="bg-white text-gray-900 px-6 py-3 rounded-r-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            <span v-if="!isSubmitting">Subscribe</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>
        </div>
        
        <!-- Message Display -->
        <transition name="fade">
          <div 
            v-if="message" 
            :class="[
              'mt-4 p-3 rounded-lg text-sm',
              messageType === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
            ]"
          >
            {{ message }}
          </div>
        </transition>
      </form>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1280px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>