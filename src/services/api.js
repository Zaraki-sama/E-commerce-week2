import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/?api\/?$/, "");

function resolveImageUrl(image) {
  if (!image) return image;
  const isAbsolute = /^(https?:)?\/\//i.test(image);
  if (isAbsolute) return image;
  // Handle cases like "/images/shirt1.png" or "images/shirt1.png"
  const normalized = image.startsWith("/") ? image : `/${image}`;
  return `${API_ORIGIN}${normalized}`;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// ============================================
// ADD AUTHENTICATION INTERCEPTORS
// ============================================

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// PRODUCT SERVICE
// ============================================

export const productService = {
  /**
   * Get all products with optional category filter
   * @param {string|null} category - Category to filter by (men, women, accessories)
   */
  async getAllProducts(category = null) {
    try {
      // Build URL with category parameter if provided
      const url = category ? `/products?category=${category}` : '/products';
      const response = await api.get(url);
      const payload = response?.data;
      const list = Array.isArray(payload) ? payload : payload?.data ?? [];
      return list.map((p) => ({
        ...p,
        image: resolveImageUrl(p?.image || p?.image_url || p?.imagePath),
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      const payload = response?.data;
      const p = payload?.data ?? payload ?? null;
      if (!p) return p;
      return { 
        ...p, 
        image: resolveImageUrl(p?.image || p?.image_url || p?.imagePath) 
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  /**
   * Create new product (Admin only)
   */
  async createProduct(productData) {
    try {
      const response = await api.post("/products", productData);
      const payload = response?.data;
      return payload?.data ?? payload ?? null;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update product (Admin only)
   */
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      const payload = response?.data;
      return payload?.data ?? payload ?? null;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  /**
 * Delete product (Admin only)
 */
async deleteProduct(id) {
  try {
    const response = await api.delete(`/products/${id}`);
    // Return the full response data which includes success message
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
},

  /**
   * Search products with optional category filter
   * @param {string} query - Search query
   * @param {string|null} category - Optional category filter
   */
  async searchProducts(query, category = null) {
    try {
      let url = `/products/search?q=${encodeURIComponent(query)}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await api.get(url);
      const payload = response?.data;
      const products = payload?.products ?? [];
      return {
        products: products.map((p) => ({
          ...p,
          image: resolveImageUrl(p?.image || p?.image_url || p?.imagePath),
        })),
        query: payload?.query,
        category: payload?.category,
        count: payload?.count || products.length,
      };
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  /**
   * Get category statistics
   */
  async getCategoryStats() {
    try {
      const response = await api.get('/products/stats');
      return response.data;
    } catch (error) {
      console.error("Error fetching category stats:", error);
      throw error;
    }
  },
};

// ============================================
// AUTHENTICATION SERVICE
// ============================================

export const authService = {
  async login(credentials) {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/register', userData);
    return response.data;
  },

  async logout() {
    const response = await api.post('/logout');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/user');
    return response.data;
  },
};

// ============================================
// USER SERVICE (for admin)
// ============================================

export const userService = {
  async getAllUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async updateUserRole(userId, role) {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

// ============================================
// CART SERVICE (server-based via API)
// ============================================

export const cartService = {
  async getCart() {
    const response = await api.get('/cart');
    const cart = response.data;
    const items = Array.isArray(cart?.items) ? cart.items : [];
    return items.map((i) => ({
      id: i.product?.id ?? i.product_id,
      title: i.product?.title,
      image: resolveImageUrl(i.product?.image || i.product?.image_url),
      price: Number(i.price) || Number(i.product?.price) || 0,
      quantity: Number(i.quantity) || 0,
      cartItemId: i.id,
    }));
  },

  async addToCart(productId, quantity = 1) {
    const response = await api.post('/cart', { product_id: productId, quantity });
    const i = response.data;
    return {
      id: i.product?.id ?? i.product_id,
      title: i.product?.title,
      image: resolveImageUrl(i.product?.image || i.product?.image_url),
      price: Number(i.price) || Number(i.product?.price) || 0,
      quantity: Number(i.quantity) || 0,
      cartItemId: i.id,
    };
  },

  async updateQuantity(cartItemId, quantity) {
    const response = await api.put(`/cart/${cartItemId}`, { quantity });
    const i = response.data;
    return {
      id: i.product?.id ?? i.product_id,
      title: i.product?.title,
      image: resolveImageUrl(i.product?.image || i.product?.image_url),
      price: Number(i.price) || Number(i.product?.price) || 0,
      quantity: Number(i.quantity) || 0,
      cartItemId: i.id,
    };
  },

  async removeFromCart(cartItemId) {
    await api.delete(`/cart/${cartItemId}`);
    return true;
  },
};

// ============================================
// ORDER + SHIPPING SERVICE
// ============================================

export const orderService = {
  async checkoutFromCart() {
    const response = await api.post('/orders/checkout');
    return response.data; // order with items
  },
  async getOrders() {
    const response = await api.get('/orders');
    return response.data;
  },
  async getOrder(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  async submitShipping(orderId, payload) {
    const response = await api.post(`/orders/${orderId}/shipping`, payload);
    return response.data; // shipping record
  },
};

export default api;