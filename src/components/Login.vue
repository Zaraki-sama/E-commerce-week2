<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img
          src="..\assets\logo.jpg"
          alt="Logo"
          class="max-h-16 mx-auto object-contain"
        />
      </div>

      <!-- Title -->
      <h1 class="text-center text-2xl font-bold mb-3">KAMERO LOGIN</h1>
      <p class="text-center text-gray-600 mb-8">
        Sign in to your account to continue.
      </p>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mt-2"
        >
          Log In
        </button>

        <p class="text-center text-gray-600 mt-6">
          Don't have an account?
          <a href="#" class="text-black font-medium hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

function handleLogin() {
  // Replace with actual login logic
  console.log("Email:", email.value);
  console.log("Password:", password.value);
}
</script>

<style scoped>
/* Add any extra styling if needed */
</style>
