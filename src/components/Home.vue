<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import Header from "./Header.vue"
import Newsletter from "./Newsletter.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css/navigation"
import { productService } from '../services/api'

import slider1 from "../assets/slider1.jpg"
import slider2 from "../assets/slider2.jpg"
import slider3 from "../assets/slider3.jpg"
import slider4 from "../assets/slider4.jpg"
import maybebanner from "../assets/maybebanner.jpg"

const images = [maybebanner, slider1, slider2, slider3, slider4]
const modules = [Navigation, Autoplay]

// Products state
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch products from backend
const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const data = await productService.getAllProducts()
    
    products.value = (data ?? []).map((product, index) => {
      const id = product?.id ?? product?.product_id ?? index
      const name = product?.title ?? product?.name ?? 'Untitled'
      const price = product?.price ?? 0
      const image = product?.image ?? product?.image_url ?? product?.imagePath ?? ''

      return {
        id,
        name: name.length > 50 ? name.substring(0, 50) + '...' : name,
        price: parseFloat(price) || 0,
        brand: product?.brand ?? 'Brand',
        image: image || 'https://via.placeholder.com/500',
        hoverImage: (product?.hoverImage ?? image) || 'https://via.placeholder.com/500',
        originalPrice: product?.originalPrice ?? null
      }
    })
    
    // Show first 8 products on homepage
    products.value = products.value.slice(0, 8)
    
  } catch (err) {
    error.value = 'Failed to fetch products'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />

    <!-- Hero Slider Section -->
    <section class="relative">
      <Swiper
        class="hero-swiper"
        :modules="modules"
        :slides-per-view="1"
        navigation
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :loop="true"
      >
        <SwiperSlide v-for="(img, index) in images" :key="index">
          <img
            :src="img"
            :alt="'Slide ' + (index + 1)"
            class="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Featured Products Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-light text-gray-900 mb-4 tracking-tight">New Arrivals</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our latest collection of premium products crafted with exceptional quality and style.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
          <p class="mt-4 text-gray-600 text-lg">Loading products...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">{{ error }}</h3>
            <button @click="fetchProducts" class="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Retry
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-else-if="products.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductCard 
              v-for="product in products" 
              :key="product.id" 
              :product="product"
              class="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <!-- View All Button -->
          <div class="text-center mt-12">
            <router-link to="/products" class="inline-block bg-white border border-gray-300 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium">
              View All Products
            </router-link>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">No Products Available</h3>
            <p class="text-gray-600">Check back soon for new arrivals.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white border-t border-gray-100">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Free Shipping</h3>
            <p class="text-gray-600 text-sm">Free shipping on all orders over $100</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Secure Payment</h3>
            <p class="text-gray-600 text-sm">Your payment information is safe with us</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Quality Guarantee</h3>
            <p class="text-gray-600 text-sm">30-day money back guarantee</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <Newsletter />
  </div>
</template>

<style scoped>
.hero-swiper {
  width: 100%;
  height: 700px;
  overflow: hidden;
}

.hero-swiper .swiper-slide {
  width: 100%;
  height: 100%;
}

.hero-swiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-swiper :deep(.swiper-button-next),
.hero-swiper :deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.hero-swiper :deep(.swiper-button-next):hover,
.hero-swiper :deep(.swiper-button-prev):hover {
  background: rgba(0, 0, 0, 0.6);
}

.hero-swiper :deep(.swiper-button-next)::after,
.hero-swiper :deep(.swiper-button-prev)::after {
  font-size: 20px;
  font-weight: bold;
}

.container {
  max-width: 1280px;
}

@media (max-width: 768px) {
  .hero-swiper {
    height: 400px;
  }
  
  .hero-swiper :deep(.swiper-button-next),
  .hero-swiper :deep(.swiper-button-prev) {
    width: 40px;
    height: 40px;
  }
  
  .hero-swiper :deep(.swiper-button-next)::after,
  .hero-swiper :deep(.swiper-button-prev)::after {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .hero-swiper {
    height: 300px;
  }
}
</style>