// src/stores/auth.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Initialize user from localStorage
  const initAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  };

  // Register
  const register = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/register', userData);
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Login
  const login = async (credentials) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/login', credentials);
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Fetch current user
  const fetchUser = async () => {
    try {
      const response = await api.get('/user');
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (err) {
      console.error('Fetch user error:', err);
      logout();
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    initAuth,
    register,
    login,
    logout,
    fetchUser,
  };
});