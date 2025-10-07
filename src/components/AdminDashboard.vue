<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import DashboardCard from "@/components/DashboardCard.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="flex bg-gray-100 min-h-screen">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main content - with proper spacing for sidebar -->
    <div class="flex-1 md:ml-64 min-w-0 flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 flex-shrink-0">
        <Header />
      </div>

      <!-- Black dashboard container occupying top section -->
      <div class="bg-black text-white">
        <!-- Dashboard Navigation Header - Full width -->
        <header class="p-6">
          <h1 class="text-xl font-semibold uppercase tracking-wide">
            Dashboard
          </h1>
        </header>

        <!-- Stats Cards inside the black container -->
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              statSubtitle="Traffic"
              statTitle="350,897"
              statPercent="3.48"
              statDescription="Since last month"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
            <DashboardCard
              statSubtitle="New Users"
              statTitle="2,356"
              statPercent="3.48"
              statDescription="Since last week"
              statIconName="fas fa-user-plus"
              statIconColor="bg-orange-500"
            />
            <DashboardCard
              statSubtitle="Sales"
              statTitle="924"
              statPercent="1.10"
              statDescription="Since yesterday"
              statIconName="fas fa-shopping-cart"
              statIconColor="bg-pink-500"
            />
            <DashboardCard
              statSubtitle="Performance"
              statTitle="49.65%"
              statPercent="12"
              statDescription="Since last month"
              statIconName="fas fa-trending-up"
              statIconColor="bg-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Product Form and Profile Card - Outside the black container with increased spacing -->
      <div class="p-8 bg-gray-100">
        <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <ProductForm />
          </div>
          <div>
            <ProfileCard />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 1.5rem;
}
</style>
