<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img
          src="../assets/logo.jpg"
          alt="Logo"
          class="max-h-16 mx-auto object-contain"
        />
      </div>

      <!-- Title -->
      <h1 class="text-center text-2xl font-bold mb-3">KAMERO LOGIN</h1>
      <p class="text-center text-gray-600 mb-8">
        Sign in to your account to continue.
      </p>

      <!-- Error Message -->
      <div
        v-if="authStore.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-5"
      >
        {{ authStore.error }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email address"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Logging in...' : 'Log In' }}
        </button>

        <<p class="text-center text-gray-600 mt-6">
  Don't have an account?
  <router-link to="/signup" class="text-black font-medium hover:underline">
    Sign Up
  </router-link>
</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await authStore.login(form);
    
    // Redirect based on user role
    if (authStore.isAdmin) {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
  } catch (error) {
    console.error('Login failed:', error);
    // Error is already stored in authStore.error
  }
};
</script>

<style scoped>
/* Add any extra styling if needed */
</style>