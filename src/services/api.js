  import axios from "axios";

  const API_BASE_URL = "http://localhost:8000/api"; // Updated to 8001
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
  // PRODUCT SERVICE (Your existing code)
  // ============================================

  export const productService = {
    // Get all products
    async getAllProducts() {
      try {
        const response = await api.get("/products");
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

    // Get product by ID
    async getProductById(id) {
      try {
        const response = await api.get(`/products/${id}`);
        const payload = response?.data;
        const p = payload?.data ?? payload ?? null;
        if (!p) return p;
        return { ...p, image: resolveImageUrl(p?.image || p?.image_url || p?.imagePath) };
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },

    // Create new product
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

    // Update product
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

    // Delete product
    async deleteProduct(id) {
      try {
        const response = await api.delete(`/products/${id}`);
        const payload = response?.data;
        return payload?.data ?? payload ?? null;
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },

    // Search products
    async searchProducts(query) {
      try {
        const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
        const payload = response?.data;
        const products = payload?.products ?? [];
        return {
          products: products.map((p) => ({
            ...p,
            image: resolveImageUrl(p?.image || p?.image_url || p?.imagePath),
          })),
          query: payload?.query,
          count: payload?.count || products.length,
        };
      } catch (error) {
        console.error("Error searching products:", error);
        throw error;
      }
    },
  };

  // ============================================
  // AUTHENTICATION SERVICE (NEW)
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
  // USER SERVICE (NEW - for admin)
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

  export default api;