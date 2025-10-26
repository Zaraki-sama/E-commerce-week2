<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

// Sidebar collapse state
const sidebarOpen = ref(false);

// Toggle sidebar
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// Close sidebar on mobile
function closeSidebar() {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
  }
}

// Navigation data - Updated with your actual routes
const navigation = [
  {
    title: "ADMIN",
    items: [
      { name: "Dashboard", path: "/admin/dashboard", icon: "fa-tv" },
      { name: "Product List", path: "/admin/list", icon: "fa-table" },
    ],
  },
  {
    title: "SHOP",
    items: [
      { name: "Home", path: "/", icon: "fa-home" },
      { name: "Cart", path: "/cart", icon: "fa-shopping-cart" },
      { name: "Checkout", path: "/checkout", icon: "fa-credit-card" },
      { name: "Search", path: "/search", icon: "fa-search" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { name: "Login", path: "/login", icon: "fa-sign-in-alt" },
      { name: "Sign Up", path: "/signup", icon: "fa-user-plus" },
    ],
  },
];

// Router instance
const router = useRouter();
const route = useRoute();

// Check if a route is active
const isActiveRoute = (path) => {
  // Exact match for home route
  if (path === "/" && route.path === "/") return true;
  // For other routes, check if current path starts with the nav path
  if (path !== "/" && route.path.startsWith(path)) return true;
  return false;
};

// Handle navigation
const navigateTo = (path) => {
  router.push(path);
  closeSidebar();
};
</script>

<template>
  <div>
    <!-- Mobile sidebar backdrop -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-gray-900 bg-opacity-30 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b border-gray-200"
        >
          <div class="flex items-center">
            <span class="text-gray-800 text-xl font-bold tracking-wider"
              >KAMERO</span
            >
          </div>
          <button
            class="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            @click="toggleSidebar"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- Sidebar content -->
        <div class="flex-1 overflow-y-auto py-4">
          <nav class="px-4 space-y-6">
            <div
              v-for="(section, index) in navigation"
              :key="index"
              class="space-y-1"
            >
              <!-- Section title -->
              <h3
                class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {{ section.title }}
              </h3>

              <!-- Section items -->
              <div class="space-y-1">
                <a
                  v-for="item in section.items"
                  :key="item.name"
                  @click="navigateTo(item.path)"
                  class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer"
                  :class="
                    isActiveRoute(item.path)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  "
                >
                  <i
                    :class="[
                      'fas',
                      item.icon,
                      'mr-3 flex-shrink-0',
                      isActiveRoute(item.path)
                        ? 'text-gray-900'
                        : 'text-gray-400 group-hover:text-gray-700',
                    ]"
                  ></i>
                  <span class="truncate">{{ item.name }}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <!-- Sidebar footer -->
        <div class="flex-shrink-0 border-t border-gray-200 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center"
              >
                <span class="text-white font-bold">K</span>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-800">Krishna</p>
              <p class="text-xs font-medium text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu button -->
    <div class="md:hidden fixed top-4 left-4 z-30">
      <button
        class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        @click="toggleSidebar"
      >
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6; /* light gray for white sidebar */
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db; /* medium gray */
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af; /* darker gray on hover */
}
</style>