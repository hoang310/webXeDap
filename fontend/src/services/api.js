
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json',
  }
});

//product
export const getProducts = (page = 1, limit = 10) => API.get(`/products?page=${page}&limit=${limit}`);

export const getProductsById = (id) => {
  return API.get(`/products/${id}`);
};

export const getProductsByCategory = (categoryId, limit = 4) => {
  return API.get(`/products?category=${categoryId}&limit=${limit}`);
};

export const createProduct = (data) => {
  return API.post("/products", data);
};

export const updateProduct = (id, data) => {
  return API.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return API.delete(`/products/${id}`);
};

export const getImages = () => {
  return API.get("/products/upload/images")
};

export const gSearch = (query) => {
  return API.get(`/products?keyword=${query}`);
};


//Category
export const getCategories = () => API.get("/categories");

export const createCategory = (data) => {
  return API.post("/categories", data);
};

export const updateCategory = (id, data) => {
  return API.put(`/categories/${id}`, data);
};

export const getCategoriesById = (id) => {
  return API.get(`/categories/${id}`);
};

export const deleteCategory = (id) => {
  return API.delete(`/categories/${id}`);
};


// Reviews
export const getReviewsByProduct = (productId) => {
  return API.get(`/reviews/product/${productId}`);
};
export const createReview = (data) =>
  API.post("/reviews", data);


// Orders
export const getOrders = (page = 1, limit = 5) => API.get(`/orders?page=${page}&limit=${limit}`);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const createOrder = (data) => {
  return API.post("/orders", data);
};
export const updateOrder = (id, data) => {
  return API.put(`/orders/${id}`, data);
};


// R
export const getUser = () => {
  return API.get("/users")
}

export const registerAPI = (data) => {
  return API.post("/users/register", data);
};

export const loginAPI = (data) => {
  return API.post("/users/login", data);
};

export const aiGen = (specs) => {
  return API.post("/generate-description", { specs });
};
