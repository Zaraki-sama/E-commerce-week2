<template>
  <div class="min-h-screen bg-neutral-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-neutral-900 tracking-tight">CHECKOUT</h1>
        <div class="w-24 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left Column - Form -->
        <div class="xl:col-span-2 space-y-6">
          <!-- Contact Information -->
          <section class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">CONTACT INFORMATION</h2>
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                placeholder="your@email.com"
                v-model="contact.email"
              >
            </div>
          </section>

          <!-- Shipping Address -->
          <section class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">SHIPPING ADDRESS</h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                  v-model="shipping.name"
                  required
                >
                <p class="text-red-500 text-xs font-medium mt-2 uppercase tracking-wide" v-if="errors.shippingName">Name is required</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Street Address</label>
                <input 
                  type="text" 
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                  v-model="shipping.address"
                  required
                >
                <p class="text-red-500 text-xs font-medium mt-2 uppercase tracking-wide" v-if="errors.shippingAddress">Address is required</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">City</label>
                  <input 
                    type="text" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="shipping.city"
                    required
                  >
                  <p class="text-red-500 text-xs font-medium mt-2 uppercase tracking-wide" v-if="errors.shippingCity">City is required</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Province</label>
                  <input 
                    type="text" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="shipping.province"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Postal Code</label>
                  <input 
                    type="text" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="shipping.postalCode"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Phone Number</label>
                  <input 
                    type="tel" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="shipping.phone"
                    required
                  >
                  <p class="text-red-500 text-xs font-medium mt-2 uppercase tracking-wide" v-if="errors.shippingPhone">Phone is required</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Delivery Zone</label>
                  <select 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white"
                    v-model="shipping.deliveryZone"
                  >
                    <option value="" disabled class="text-neutral-400">Select Nearest Zone</option>
                    <option value="central">Central District</option>
                    <option value="east">East District</option>
                    <option value="west">West District</option>
                    <option value="north">North District</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <!-- Billing Address -->
          <section class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">BILLING ADDRESS</h2>
            
            <div class="space-y-6">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="sameAsShipping"
                  class="w-5 h-5 text-black border-2 border-neutral-300 rounded focus:ring-black focus:ring-2"
                  v-model="sameAsShipping"
                >
                <label for="sameAsShipping" class="ml-3 text-lg font-semibold text-neutral-800">Same as Shipping Address</label>
              </div>

              <div v-if="!sameAsShipping" class="space-y-6 border-t border-neutral-200 pt-6">
                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="billing.name"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Street Address</label>
                  <input 
                    type="text" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="billing.address"
                  >
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">City</label>
                    <input 
                      type="text" 
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                      v-model="billing.city"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Province</label>
                    <input 
                      type="text" 
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                      v-model="billing.province"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Postal Code</label>
                    <input 
                      type="text" 
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                      v-model="billing.postalCode"
                    >
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Phone Number</label>
                  <input 
                    type="tel" 
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    v-model="billing.phone"
                  >
                </div>
              </div>
            </div>
          </section>

          <!-- Delivery Options -->
          <section class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">DELIVERY OPTIONS</h2>
            
            <div class="space-y-4">
              <label class="flex items-start p-6 border-2 border-neutral-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-neutral-400"
                :class="{'border-neutral-400 bg-neutral-50': selectedDelivery === 'pickup'}">
                <input 
                  type="radio" 
                  name="delivery" 
                  class="mt-1 text-black focus:ring-black"
                  value="pickup"
                  v-model="selectedDelivery"
                >
                <div class="ml-4 flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-bold text-lg text-neutral-900">Store Pickup</p>
                      <p class="text-neutral-600 mt-1">Ready for pickup today at 4:00 PM</p>
                    </div>
                    <span class="font-bold text-lg text-neutral-900">FREE</span>
                  </div>
                </div>
              </label>

              <label class="flex items-start p-6 border-2 border-neutral-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-neutral-400"
                :class="{'border-neutral-400 bg-neutral-50': selectedDelivery === 'shipping'}">
                <input 
                  type="radio" 
                  name="delivery" 
                  class="mt-1 text-black focus:ring-black"
                  value="shipping"
                  v-model="selectedDelivery"
                >
                <div class="ml-4 flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-bold text-lg text-neutral-900">Express Shipping</p>
                      <p class="text-neutral-600 mt-1">Delivery within 1-2 business days</p>
                    </div>
                    <span class="font-bold text-lg text-neutral-900">FREE</span>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="xl:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 sticky top-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">ORDER SUMMARY</h2>
            
            <div class="mb-6 p-4 bg-neutral-50 rounded-lg">
              <p class="text-sm text-neutral-700 text-center">
                <a href="#" class="font-semibold text-black hover:underline underline-offset-2">SIGN IN</a> to access exclusive member offers
              </p>
            </div>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between py-3 border-b border-neutral-200">
                <span class="text-neutral-600 font-medium">Subtotal (1 item)</span>
                <span class="font-semibold">¥ 2,699</span>
              </div>
              <div class="flex justify-between py-3 border-b border-neutral-200">
                <span class="text-neutral-600 font-medium">Shipping</span>
                <span class="font-semibold text-green-600">FREE</span>
              </div>
              <div class="flex justify-between py-3 border-b border-neutral-200">
                <span class="text-neutral-600 font-medium">Discount</span>
                <span class="font-semibold text-green-600">- ¥ 850</span>
              </div>
              <div class="flex justify-between py-4 border-t border-neutral-300">
                <span class="text-lg font-bold text-neutral-900">TOTAL</span>
                <span class="text-lg font-bold text-neutral-900">¥ 1,849</span>
              </div>
            </div>

            <button 
              @click="handleContinue"
              class="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              COMPLETE ORDER
            </button>

            <!-- Security Badge -->
            <div class="mt-8 pt-6 border-t border-neutral-200">
              <div class="flex items-center justify-center mb-3">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-bold text-neutral-900 text-sm uppercase tracking-wide">Secure Checkout</span>
                </div>
              </div>
              <p class="text-xs text-neutral-600 text-center leading-relaxed">
                Your transaction is protected with bank-level security. All data is encrypted and securely processed.
              </p>
            </div>

            <!-- Trust Badges -->
            <div class="mt-6 flex justify-center space-x-6">
              <div class="text-center">
                <div class="w-8 h-8 mx-auto mb-1 bg-neutral-100 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold">✓</span>
                </div>
                <p class="text-xs text-neutral-600">SSL Secure</p>
              </div>
              <div class="text-center">
                <div class="w-8 h-8 mx-auto mb-1 bg-neutral-100 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold">✓</span>
                </div>
                <p class="text-xs text-neutral-600">256-bit</p>
              </div>
              <div class="text-center">
                <div class="w-8 h-8 mx-auto mb-1 bg-neutral-100 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold">✓</span>
                </div>
                <p class="text-xs text-neutral-600">PCI DSS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// Reactive data
const contact = reactive({
  email: ''
})

const shipping = reactive({
  name: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  phone: '',
  deliveryZone: ''
})

const billing = reactive({
  name: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  phone: ''
})

const errors = reactive({
  shippingName: false,
  shippingAddress: false,
  shippingCity: false,
  shippingPhone: false
})

const sameAsShipping = ref(true)
const selectedDelivery = ref('pickup')

// Watch for changes to sameAsShipping
watch(sameAsShipping, (newValue) => {
  if (newValue) {
    // Copy shipping address to billing address
    billing.name = shipping.name
    billing.address = shipping.address
    billing.city = shipping.city
    billing.province = shipping.province
    billing.postalCode = shipping.postalCode
    billing.phone = shipping.phone
  }
})

// Handle form submission
const handleContinue = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = false
  })

  // Validate required fields
  let hasErrors = false

  if (!shipping.name.trim()) {
    errors.shippingName = true
    hasErrors = true
  }

  if (!shipping.address.trim()) {
    errors.shippingAddress = true
    hasErrors = true
  }

  if (!shipping.city.trim()) {
    errors.shippingCity = true
    hasErrors = true
  }

  if (!shipping.phone.trim()) {
    errors.shippingPhone = true
    hasErrors = true
  }

  if (!hasErrors) {
    // Proceed with checkout
    console.log('Proceeding to checkout with:', {
      contact,
      shipping,
      billing: sameAsShipping.value ? shipping : billing,
      delivery: selectedDelivery.value
    })
    
    // In a real application, you would submit the data to your backend
    alert('Order placed successfully!')
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>