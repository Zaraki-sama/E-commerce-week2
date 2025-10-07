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
  },
});

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

export default api;
