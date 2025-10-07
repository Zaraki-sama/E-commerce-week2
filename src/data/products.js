// products.js - Updated to use API calls instead of hardcoded data
import { api } from './services/api.js';

// Keep image imports for fallback/default images
// import shirt1 from "../assets/shirt1.png";
// import shirt2 from "../assets/shirt2.png";
// import shirt3 from "../assets/shirt3.png";
// import shirt4 from "../assets/shirt4.png";
// import shirt5 from "../assets/shirt5.png";
// import shirt6 from "../assets/shirt6.png";

// Default images mapping (fallback for products without images)
// const defaultImages = {
//   0: shirt1,
//   1: shirt2,
//   2: shirt3,
//   3: shirt4,
//   4: shirt5,
//   5: shirt6,
// };

// Function to get all products from API
export const getProducts = async () => {
  try {
    const products = await api.getProducts();
    
    // Map API data - no fallback images, use only API data
    return products.map((product, index) => ({
      ...product,
      // Use only API image - no fallback
      image: product.image,
      // Ensure features array exists
      features: product.features || [
        "Premium quality materials",
        "Modern design",
        "Comfortable fit",
        "Available in multiple sizes",
        "High-quality construction"
      ]
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    
    // Return empty array if API fails - no fallback data
    return [];
  }
};

// Function to get single product by ID from API
export const getProductById = async (id) => {
  try {
    const product = await api.getProductById(id);
    
    // Return only API data - no fallback image
    return {
      ...product,
      image: product.image, // Use only API image - no fallback
      features: product.features || [
        "Premium quality materials",
        "Modern design",
        "Comfortable fit",
        "Available in multiple sizes",
        "High-quality construction"
      ]
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    
    // Return null if API fails - no fallback product
    return null;
  }
};

// Fallback data in case API is not available - COMMENTED OUT
// const getFallbackProducts = () => [
//   {
//     id: 0,
//     image: shirt1,
//     title: "Retro",
//     details: "Premium collection of creative website themes and templates for modern web.",
//     price: 1600,
//     description: "Premium collection of creative website themes and templates for modern web development. Perfect for designers and developers looking for inspiration and ready-to-use components.",
//     features: [
//       "Premium cotton for everyday comfort",
//       "Unisex & Regular fit – perfect for any vibe",
//       "Nature inspired artwork",
//       "Available in Black, White, Beige, and Grey",
//       "Best In Class Print",
//     ],
//   },
//   {
//     id: 1,
//     image: shirt2,
//     title: "Stepheno",
//     details: "Comprehensive guide covering all aspects of card design in modern user interfaces.",
//     price: 1200,
//     description: "Comprehensive guide covering all aspects of card design in modern user interfaces. Learn best practices, patterns, and techniques for creating effective card-based layouts.",
//     features: [
//       "High-quality fabric blend",
//       "Modern slim fit design",
//       "Contemporary graphics",
//       "Multiple color options available",
//       "Durable construction",
//     ],
//   },
//   {
//     id: 2,
//     image: shirt3,
//     title: "Mild",
//     details: "Innovative card component designs with cutting-edge graphic elements.",
//     price: 1800,
//     description: "Innovative card component designs with cutting-edge graphic elements. Explore creative layouts and visual techniques that push the boundaries of modern web design.",
//     features: [
//       "Premium material construction",
//       "Artistic design elements",
//       "Comfortable fit for all body types",
//       "Eco-friendly materials",
//       "Unique artistic prints",
//     ],
//   },
//   {
//     id: 3,
//     image: shirt4,
//     title: "Revo",
//     details: "Advanced design patterns and techniques for creating sophisticated user interfaces.",
//     price: 1400,
//     description: "Advanced design patterns and techniques for creating sophisticated user interfaces. Master complex layouts and interactive elements.",
//     features: [
//       "Professional grade materials",
//       "Sophisticated design patterns",
//       "Versatile styling options",
//       "Long-lasting quality",
//       "Trend-setting aesthetics",
//     ],
//   },
//   {
//     id: 4,
//     image: shirt5,
//     title: "Stereo",
//     details: "Essential tools and techniques for modern web design.",
//     price: 2000,
//     description: "Essential tools and techniques for modern web design. Everything you need to create stunning, responsive websites that engage users.",
//     features: [
//       "Premium construction quality",
//       "Modern design philosophy",
//       "Versatile color palette",
//       "Comfortable daily wear",
//       "Contemporary styling",
//     ],
//   },
//   {
//     id: 5,
//     image: shirt6,
//     title: "Apprento",
//     details: "Interactive design solutions that enhance user engagement.",
//     price: 1600,
//     description: "Interactive design solutions that enhance user engagement and create memorable experiences. Learn to build dynamic, responsive interfaces.",
//     features: [
//       "Interactive design elements",
//       "Responsive construction",
//       "Dynamic styling options",
//       "User-focused design",
//       "Innovative features",
//     ],
//   },
// ];