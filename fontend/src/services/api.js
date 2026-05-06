// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

//product
export const getProducts = (limit = 10) => API.get(`/products?limit=${limit}`);

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


//Category
export const getCategories = () => API.get("/categories");


// Reviews
export const getReviewsByProduct = (productId) => {
  return API.get(`/reviews/product/${productId}`);
};
export const createReview = (data) =>
  API.post("/reviews", data);


// Orders
export const getOrders = () => API.get("/orders");
export const getOrderById = (id) => API.get(`/orders/${id}`);


// R
export const registerAPI = (data) => {
  return API.post("/users/register", data);
};

export const loginAPI = (data) => {
  return API.post("/users/login", data);
};