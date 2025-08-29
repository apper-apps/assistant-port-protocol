import productsData from "../mockData/products.json";

let products = [...productsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const supplierService = {
  searchProducts: async (query) => {
    await delay(800);
    
    if (!query || !query.trim()) {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    // Simple search simulation
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
    
    // Simulate different result counts based on query
    const maxResults = Math.min(filtered.length, 24);
    return filtered.slice(0, maxResults);
  },

  getProductById: async (id) => {
    await delay(200);
    const product = products.find(p => p.id === parseInt(id));
    return product ? { ...product } : null;
  },

  getProductsByCategory: async (category) => {
    await delay(400);
    return products
      .filter(p => p.category?.toLowerCase() === category.toLowerCase())
      .map(product => ({ ...product }));
  },

  getPopularProducts: async (limit = 12) => {
    await delay(300);
    // Simulate popular products (highest rating or most orders)
    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit)
      .map(product => ({ ...product }));
  }
};