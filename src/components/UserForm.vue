<script setup></script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-700">My Account</h2>
      <button
        class="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
      >
        Settings
      </button>
    </div>

    <form class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">
          User Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Username</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="lucky.jesse"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="jesse@example.com"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">First Name</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Lucky"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Jesse"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">
          Contact Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="text-sm text-gray-600">Address</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">City</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="New York"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Country</label>
            <input
              type="text"
              class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">
          About Me
        </h3>
        <textarea
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          rows="4"
          placeholder="A beautiful UI Kit and Admin for VueJS & Tailwind CSS. It is Free and Open Source."
        ></textarea>
      </div>
    </form>
  </div>
</template>
