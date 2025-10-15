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
      <h1 class="text-center text-2xl font-bold mb-3">KAMERO SIGN UP</h1>
      <p class="text-center text-gray-600 mb-8">
        Create a new account to get started.
      </p>

      <!-- Sign Up Form -->
      <form @submit.prevent="handleSignup" class="space-y-5">
        <div>
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <input
            v-model="dob"
            type="date"
            placeholder="Date of Birth"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

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
          Sign Up
        </button>

        <p class="text-center text-gray-600 mt-6">
          Already have an account?
          <a href="#" class="text-black font-medium hover:underline">Log In</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const dob = ref("");
const email = ref("");
const password = ref("");

function handleSignup() {
  // Replace with actual signup logic
  console.log("First Name:", firstName.value);
  console.log("Last Name:", lastName.value);
  console.log("Date of Birth:", dob.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);
}
</script>

<style scoped>
/* Ensure the date picker looks smooth */
input[type="date"] {
  color-scheme: light;
  cursor: pointer;
}
</style>
