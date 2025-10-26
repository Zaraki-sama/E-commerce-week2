<template>
  <div class="min-h-screen bg-white text-gray-900">
   <Header/>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-8 py-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-12">ABOUT US</h1>
      
      <!-- Hero Image Section -->
      <div class="mb-16">
        <div class="bg-gradient-to-r from-gray-300 to-gray-400 h-96 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-lg font-medium">Gymshark Community</p>
            <p class="text-sm">Fitness enthusiasts training together</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-12">
        <!-- Intro Section -->
        <section>
          <p class="text-xl md:text-2xl leading-relaxed mb-6">
            We're Gymshark. We exist to unite the conditioning* community.
          </p>
          <p class="text-lg md:text-xl leading-relaxed mb-6">
            It's not our goals that unite us, but the things we do to achieve them. Because although our training grounds and end goals might be different, sweat is our sport. And we're a team of individuals who know that to go further, we go together.
          </p>
        </section>
        
        <!-- Legacy Section with Image -->
        <section class="flex flex-col md:flex-row gap-8 items-center">
          <div class="md:w-1/2">
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 h-80 rounded-lg flex items-center justify-center">
              <div class="text-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p class="font-medium">Our Humble Beginnings</p>
                <p class="text-sm">2012 Garage in Birmingham</p>
              </div>
            </div>
          </div>
          <div class="md:w-1/2">
            <p class="text-lg md:text-xl leading-relaxed">
              Our legacy began in 2012, from a garage in Birmingham, UK with nothing but a sewing machine, a screen-printer and ambitions we had no right to hold. Today, we create the tools that help everyone become their personal best: the clothing you'll sweat in, the content you'll find inspiration in, and the community you'll become your best in.
            </p>
          </div>
        </section>
        
        <!-- Stats Section -->
        <section>
          <p class="text-lg md:text-xl leading-relaxed mb-6">
            Our Gymshark family of employees, athletes and followers is now over 10 million strong, with a total social media following of over 18 million and customers in over 200 countries across our 14 online stores. Our employee family is growing too, with over 900 employees across offices in five regions, including Solihull, UK (just outside our hometown) and Denver, Colorado.
          </p>
        </section>
        
        <!-- Global Presence Image -->
        <section class="bg-gradient-to-r from-purple-100 to-pink-100 h-64 rounded-lg flex items-center justify-center">
          <div class="text-center text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xl font-bold">Global Community</p>
            <p class="text-lg">200+ Countries • 18M+ Followers</p>
          </div>
        </section>
        
        <!-- Footnote -->
        <section>
          <p class="text-sm text-gray-600 mb-12">
            *Conditioning is everything we do today to prepare for tomorrow.
          </p>
        </section>
        
        <!-- Leadership Section -->
        <section>
          <h2 class="text-2xl md:text-3xl font-bold mb-8">Gymshark is led by:</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div v-for="leader in leaders" :key="leader.name" class="text-center">
              <div class="bg-gradient-to-br from-gray-200 to-gray-300 h-48 rounded-lg flex items-center justify-center mb-4">
                <div class="text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p class="font-medium">Portrait</p>
                </div>
              </div>
              <h3 class="font-bold text-lg">{{ leader.name }}</h3>
              <p class="text-gray-600">{{ leader.title }}</p>
            </div>
          </div>
          <ul class="space-y-4 md:hidden">
            <li 
              v-for="leader in leaders" 
              :key="leader.name"
              class="text-lg"
            >
              • {{ leader.name }} - {{ leader.title }}
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leaders = ref([
  { name: 'Ben Francis', title: 'Founder & Chief Executive Officer' },
  { name: 'Laurent Madeleine', title: 'Chief Supply Chain Officer' },
  { name: 'Noel Mack', title: 'Chief Brand Officer' }
])
import Header from "./Header.vue";
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>