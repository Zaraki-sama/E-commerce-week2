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
      <h1 class="text-center text-2xl font-bold mb-3">KAMERO SIGN UP</h1>
      <p class="text-center text-gray-600 mb-8">
        Create a new account to get started.
      </p>

      <!-- Error/Success Message -->
      <div
        v-if="authStore.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-5"
      >
        {{ authStore.error }}
      </div>

      <!-- Sign Up Form -->
      <form @submit.prevent="handleSignup" class="space-y-5">
        <div>
          <input
            v-model="form.name"
            type="text"
            placeholder="Full Name"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

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
            placeholder="Password (min 8 characters)"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
            minlength="8"
          />
        </div>

        <div>
          <input
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirm Password"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
            minlength="8"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Creating Account...' : 'Sign Up' }}
        </button>

        <p class="text-center text-gray-600 mt-6">
          Already have an account?
          <router-link to="/login" class="text-black font-medium hover:underline">
            Log In
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
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleSignup = async () => {
  // Clear any previous errors
  authStore.error = null;

  // Check if passwords match
  if (form.password !== form.password_confirmation) {
    authStore.error = "Passwords do not match";
    return;
  }

  try {
    await authStore.register(form);
    // After successful registration, redirect to home
    router.push('/');
  } catch (error) {
    console.error('Registration failed:', error);
    // Error is already stored in authStore.error
  }
};
</script>

<style scoped>
/* Ensure smooth styling */
</style>