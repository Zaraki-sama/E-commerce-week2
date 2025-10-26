<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <Header />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"
      ></div>
      <p class="mt-4 text-gray-600 text-lg">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 text-lg font-medium mb-4">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        Retry
      </button>
    </div>

    <!-- Main Content -->
    <main v-else class="flex">
      <!-- Filter Sidebar -->
      <aside class="w-80 flex-shrink-0 pl-6">
        <FilterSidebar 
          v-model:sort="selectedSort"
          v-model:filters="selectedFilters"
          @clear-all="clearAllFilters"
        />
      </aside>

      <!-- Product Grid -->
      <section class="flex-1 px-6">
        <!-- Page Header -->
        <div class="text-center mb-12 pt-8">
          <h1 class="text-4xl font-semibold text-gray-900 mb-4 capitalize">
            {{ currentCategory || 'All Products' }}
          </h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Explore our latest collection of premium {{ currentCategory || 'items' }}.
          </p>
        </div>

        <!-- Results Summary -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-gray-600 text-sm">
            Showing {{ filteredProducts.length }} products
          </p>
          <p class="text-sm text-gray-500">
            Sorted by: {{ getSortLabel(selectedSort) }}
          </p>
        </div>

        <!-- Products Grid -->
        <div
          v-if="filteredProducts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No products match your filters.</p>
          <button 
            @click="clearAllFilters"
            class="mt-4 text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import ProductCard from './ProductCard.vue'
import FilterSidebar from './FilterSidebar.vue'
import { productService } from '../services/api'

const route = useRoute()
const currentCategory = ref(route.query.category || null)

// Backend data state
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch products from backend
const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const data = await productService.getAllProducts()
    
    // Transform backend data to match component structure
    products.value = (data ?? []).map((product, index) => {
      const id = product?.id ?? product?.product_id ?? index
      const name = product?.title ?? product?.name ?? 'Untitled'
      const details = product?.details ?? product?.description ?? ''
      const price = product?.price ?? 0
      const image = product?.image ?? product?.image_url ?? product?.imagePath ?? ''

      // Truncate long text to prevent layout issues
      const truncatedName = name.length > 50 ? name.substring(0, 50) + '...' : name
      const truncatedColor = product?.color ?? (details.length > 40 ? details.substring(0, 40) + '...' : details) ?? 'Default'

      return {
        id,
        name: truncatedName,
        color: truncatedColor,
        price: parseFloat(price) || 0,
        brand: (product?.brand ?? 'Brand').substring(0, 30),
        category: product?.category ?? 'Uncategorized',
        size: Array.isArray(product?.size) ? product?.size : ['S', 'M', 'L'],
        features: Array.isArray(product?.features) ? product?.features : [],
        fit: product?.fit ?? 'Regular',
        activity: Array.isArray(product?.activity) ? product?.activity : [],
        collection: product?.collection ?? 'General',
        image: image || 'https://via.placeholder.com/500',
        hoverImage: product?.hoverImage ?? (image || 'https://via.placeholder.com/500'),
        originalPrice: product?.originalPrice ?? null
      }
    })
  } catch (err) {
    error.value = 'Failed to fetch products'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

// Filters & sort state
const selectedSort = ref('relevancy')
const selectedFilters = reactive({
  productType: [],
  size: [],
  features: [],
  fit: [],
  activity: [],
  collection: [],
  color: []
})

// Watch for category change in URL
watch(
  () => route.query.category,
  (newCategory) => {
    currentCategory.value = newCategory || null
  }
)

// Computed: Filter + Sort
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filter by category if selected
  if (currentCategory.value) {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.value.toLowerCase())
  }

  // Apply sidebar filters
  Object.keys(selectedFilters).forEach(key => {
    if (selectedFilters[key].length > 0) {
      filtered = filtered.filter(product => {
        const value = getProductFilterValue(product, key)
        return selectedFilters[key].some(selected => 
          Array.isArray(value) ? value.includes(selected) : value === selected
        )
      })
    }
  })

  // Sorting
  switch (selectedSort.value) {
    case 'price_low_high':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price_high_low':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
  }

  return filtered
})

// Helpers
const getProductFilterValue = (product, key) => {
  const mapping = {
    productType: 'category',
    color: 'color',
    size: 'size',
    features: 'features',
    fit: 'fit',
    activity: 'activity',
    collection: 'collection'
  }
  return product[mapping[key] || key]
}

const getSortLabel = (value) => {
  const labels = {
    price_low_high: 'Price: Low to High',
    price_high_low: 'Price: High to Low',
    relevancy: 'Relevancy',
    newest: 'Newest'
  }
  return labels[value] || 'Relevancy'
}

const clearAllFilters = () => {
  selectedSort.value = 'relevancy'
  Object.keys(selectedFilters).forEach(key => (selectedFilters[key] = []))
}

const addToCart = (product) => {
  console.log('Added to cart:', product)
  // TODO: Implement cart functionality
}

// Fetch products on component mount
onMounted(() => {
  fetchProducts()
})
</script>