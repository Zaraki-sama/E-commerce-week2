<template>
  <div class="min-h-screen bg-white text-gray-900">
   <Header/>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-8 py-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-12">CONTACT US</h1>
      
      <!-- Hero Section -->
      <div class="mb-16">
        <div class="bg-gradient-to-r from-gray-300 to-gray-400 h-96 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p class="text-2xl font-bold mb-2">Get in Touch</p>
            <p class="text-lg">We're here to help you with any questions</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="form.firstName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your first name"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="form.lastName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your last name"
                >
              </div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your email"
              >
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                id="subject"
                v-model="form.subject"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="product">Product Question</option>
                <option value="order">Order Support</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="wholesale">Wholesale Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              class="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
          
          <!-- Contact Methods -->
          <div class="space-y-6 mb-8">
            <div class="flex items-start space-x-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Customer Service</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
                <p class="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Email Us</h3>
                <p class="text-gray-600">support@gymshark.com</p>
                <p class="text-gray-600">We'll respond within 24 hours</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Headquarters</h3>
                <p class="text-gray-600">Gymshark Global</p>
                <p class="text-gray-600">Solihull, UK</p>
                <p class="text-gray-600">Denver, Colorado, USA</p>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="font-bold text-lg mb-4">Frequently Asked Questions</h3>
            <div class="space-y-3">
              <div v-for="faq in faqs" :key="faq.question" class="border-b border-gray-200 pb-3">
                <button 
                  @click="toggleFAQ(faq)"
                  class="w-full text-left font-medium hover:text-gray-600 flex justify-between items-center"
                >
                  <span>{{ faq.question }}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-4 w-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': faq.isOpen }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="faq.isOpen" class="mt-2 text-gray-600 text-sm">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from "./Header.vue";

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

// FAQ data
const faqs = ref([
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.',
    isOpen: false
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer 30-day returns on all unworn items with original tags attached.',
    isOpen: false
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 200 countries worldwide through our 14 online stores.',
    isOpen: false
  },
  {
    question: 'How do I track my order?',
    answer: 'You will receive a tracking number via email once your order has been shipped.',
    isOpen: false
  }
])

// Methods
const handleSubmit = () => {
  console.log('Form submitted:', form)
  // Here you would typically send the form data to your backend
  alert('Thank you for your message! We will get back to you soon.')
  
  // Reset form
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

const toggleFAQ = (faq) => {
  faq.isOpen = !faq.isOpen
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
impo

body {
  font-family: 'Inter', sans-serif;
}
</style>